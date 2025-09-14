import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { usersAPI } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  MapPin, 
  Calendar, 
  Mail, 
  Globe, 
  Github, 
  Linkedin, 
  Award, 
  BookOpen, 
  Code, 
  Users,
  Star,
  TrendingUp,
  Target,
  Clock,
  Briefcase,
  GraduationCap,
  Edit,
  ExternalLink
} from "lucide-react";

const Profile = () => {
  const { user: currentUser, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (currentUser) {
        try {
          const response = await usersAPI.getProfile(currentUser.username);
          if (response.data.success) {
            setProfileData(response.data.data);
          } else {
            // Fallback to current user data
            setProfileData(currentUser);
          }
        } catch (error) {
          console.error('Failed to fetch profile data:', error);
          // Fallback to current user data
          setProfileData(currentUser);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [currentUser]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <Card className="modern-card">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
                <p className="text-muted-foreground mb-6">
                  You need to be signed in to view your profile.
                </p>
                <Button asChild>
                  <a href="/signin">Sign In</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card Skeleton */}
              <div className="lg:col-span-1">
                <Card className="modern-card">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
                      <Skeleton className="h-6 w-32 mx-auto mb-2" />
                      <Skeleton className="h-4 w-24 mx-auto mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4 mx-auto" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Content Skeleton */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="modern-card">
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-48 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-2" />
                    <Skeleton className="h-4 w-4/6" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const user = profileData || currentUser;
  const experienceLevel = user.experienceLevel || 'beginner';
  const interests = user.interests || [];
  const learningGoals = user.learningGoals || [];
  const skills = user.skills || [];

  const getExperienceColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeCommitmentText = (commitment: string) => {
    switch (commitment) {
      case '1-5': return '1-5 hours per week';
      case '5-10': return '5-10 hours per week';
      case '10-20': return '10-20 hours per week';
      case '20+': return '20+ hours per week';
      default: return 'Not specified';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Main Content */}
      <div className="pt-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card className="modern-card sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-2xl">
                        {user.firstName?.[0]}{user.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h1 className="text-2xl font-bold text-foreground mb-1">
                      {user.firstName} {user.lastName}
                    </h1>
                    <p className="text-muted-foreground mb-4">@{user.username}</p>
                    
                    {user.bio && (
                      <p className="text-sm text-muted-foreground mb-4">
                        {user.bio}
                      </p>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{user.totalXP || 0}</div>
                        <div className="text-xs text-muted-foreground">Total XP</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{user.learningStreak || 0}</div>
                        <div className="text-xs text-muted-foreground">Day Streak</div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2 text-sm">
                      {user.location && (
                        <div className="flex items-center justify-center text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2" />
                          {user.location}
                        </div>
                      )}
                      {user.website && (
                        <div className="flex items-center justify-center">
                          <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
                          <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Website
                          </a>
                        </div>
                      )}
                      {user.githubUrl && (
                        <div className="flex items-center justify-center">
                          <Github className="w-4 h-4 mr-2 text-muted-foreground" />
                          <a href={user.githubUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            GitHub
                          </a>
                        </div>
                      )}
                      {user.linkedinUrl && (
                        <div className="flex items-center justify-center">
                          <Linkedin className="w-4 h-4 mr-2 text-muted-foreground" />
                          <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            LinkedIn
                          </a>
                        </div>
                      )}
                    </div>

                    <Button className="w-full mt-6" variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Experience & Goals */}
              <Card className="modern-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Learning Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Experience Level</h3>
                      <Badge className={getExperienceColor(experienceLevel)}>
                        {experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Time Commitment</h3>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2" />
                        {getTimeCommitmentText(user.timeCommitment)}
                      </div>
                    </div>
                  </div>

                  {interests.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Areas of Interest</h3>
                      <div className="flex flex-wrap gap-2">
                        {interests.map((interest: string) => (
                          <Badge key={interest} variant="secondary">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {learningGoals.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Learning Goals</h3>
                      <div className="flex flex-wrap gap-2">
                        {learningGoals.map((goal: string) => (
                          <Badge key={goal} variant="outline">
                            <Target className="w-3 h-3 mr-1" />
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Professional Info */}
              {(user.currentRole || user.company || user.yearsOfExperience) && (
                <Card className="modern-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="w-5 h-5 mr-2" />
                      Professional Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user.currentRole && (
                        <div>
                          <h3 className="font-semibold mb-2">Current Role</h3>
                          <p className="text-muted-foreground">{user.currentRole}</p>
                        </div>
                      )}
                      {user.company && (
                        <div>
                          <h3 className="font-semibold mb-2">Company</h3>
                          <p className="text-muted-foreground">{user.company}</p>
                        </div>
                      )}
                      {user.yearsOfExperience && (
                        <div>
                          <h3 className="font-semibold mb-2">Experience</h3>
                          <p className="text-muted-foreground">{user.yearsOfExperience} years</p>
                        </div>
                      )}
                    </div>
                    
                    {skills.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-3">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill: string) => (
                            <Badge key={skill} variant="secondary">
                              <Code className="w-3 h-3 mr-1" />
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Progress & Achievements */}
              <Card className="modern-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Progress & Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Level Progress</span>
                      <span className="text-sm text-muted-foreground">
                        Level {user.currentLevel || 1}
                      </span>
                    </div>
                    <Progress 
                      value={((user.totalXP || 0) % 1000) / 10} 
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {((user.totalXP || 0) % 1000)} / 1000 XP to next level
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{user.totalXP || 0}</div>
                      <div className="text-sm text-muted-foreground">Total XP</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{user.learningStreak || 0}</div>
                      <div className="text-sm text-muted-foreground">Day Streak</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Info */}
              <Card className="modern-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Email</h3>
                      <div className="flex items-center text-muted-foreground">
                        <Mail className="w-4 h-4 mr-2" />
                        {user.email}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Member Since</h3>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(user.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${user.isEmailVerified ? 'bg-green-500' : 'bg-yellow-500'}`} />
                      <span className="text-sm">
                        {user.isEmailVerified ? 'Email Verified' : 'Email Not Verified'}
                      </span>
                    </div>
                    {!user.isEmailVerified && (
                      <Button variant="outline" size="sm">
                        Verify Email
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;