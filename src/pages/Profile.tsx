import Navigation from "@/components/Navigation";
import { 
  User, 
  MapPin, 
  Calendar, 
  Mail, 
  Github, 
  ExternalLink, 
  Trophy, 
  Star, 
  BookOpen, 
  Target,
  Edit3,
  Settings,
  Award,
  Clock,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  const user = {
    name: "Alex Johnson",
    username: "alexdev",
    email: "alex.johnson@email.com",
    location: "San Francisco, CA",
    joinDate: "January 2024",
    bio: "Full-stack developer passionate about creating innovative solutions. Currently learning AI/ML and contributing to open-source projects.",
    avatar: "AJ",
    stats: {
      projectsCompleted: 12,
      skillBadges: 8,
      learningStreak: 45,
      totalXP: 2400,
      rank: "Advanced Learner"
    }
  };

  const badges = [
    { name: "React Master", color: "bg-blue-500", earned: "2 weeks ago" },
    { name: "JavaScript Pro", color: "bg-yellow-500", earned: "1 month ago" },
    { name: "Project Collaborator", color: "bg-green-500", earned: "3 weeks ago" },
    { name: "Community Helper", color: "bg-purple-500", earned: "1 week ago" },
    { name: "Code Reviewer", color: "bg-red-500", earned: "4 days ago" },
    { name: "Quick Learner", color: "bg-indigo-500", earned: "2 months ago" },
    { name: "Problem Solver", color: "bg-pink-500", earned: "1 month ago" },
    { name: "Team Player", color: "bg-teal-500", earned: "3 weeks ago" }
  ];

  const projects = [
    {
      id: 1,
      title: "E-commerce Dashboard",
      description: "React-based analytics dashboard with real-time data visualization",
      tech: ["React", "TypeScript", "Chart.js"],
      status: "Completed",
      score: 95
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Full-stack application with user authentication and real-time updates",
      tech: ["React", "Node.js", "MongoDB"],
      status: "Completed",
      score: 88
    },
    {
      id: 3,
      title: "AI Image Generator",
      description: "Machine learning project using Stable Diffusion models",
      tech: ["Python", "TensorFlow", "FastAPI"],
      status: "In Progress",
      score: null
    }
  ];

  const learningPath = [
    { skill: "React Development", progress: 95, level: "Expert" },
    { skill: "JavaScript", progress: 90, level: "Advanced" },
    { skill: "Node.js", progress: 75, level: "Intermediate" },
    { skill: "Python", progress: 60, level: "Intermediate" },
    { skill: "Machine Learning", progress: 40, level: "Beginner" }
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-yellow-500"; 
    return "bg-blue-500";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Profile Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto">
          <div className="modern-card p-8 animate-fade-in">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center text-4xl font-bold text-primary">
                  {user.avatar}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2">
                  <Clock className="w-4 h-4" />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-1">{user.name}</h1>
                    <p className="text-muted-foreground mb-2">@{user.username}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{user.email}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{user.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {user.joinDate}</span>
                      </span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3 mt-4 md:mt-0">
                    <Button variant="outline" size="sm">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 max-w-2xl">{user.bio}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { label: "Projects", value: user.stats.projectsCompleted, icon: BookOpen },
                    { label: "Badges", value: user.stats.skillBadges, icon: Award },
                    { label: "Streak", value: `${user.stats.learningStreak} days`, icon: Target },
                    { label: "XP", value: user.stats.totalXP, icon: Star },
                    { label: "Rank", value: user.stats.rank, icon: TrendingUp, isText: true }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <stat.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Badges & Learning Path */}
            <div className="space-y-8">
              
              {/* Skill Badges */}
              <div className="modern-card p-6 animate-slide-up">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <Trophy className="w-5 h-5 mr-2" />
                  Skill Badges
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {badges.map((badge, index) => (
                    <div 
                      key={index} 
                      className="group cursor-pointer"
                      title={`Earned ${badge.earned}`}
                    >
                      <div className="flex flex-col items-center p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                        <div className={`w-12 h-12 ${badge.color} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm font-medium text-foreground text-center">{badge.name}</span>
                        <span className="text-xs text-muted-foreground mt-1">{badge.earned}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Progress */}
              <div className="modern-card p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Learning Progress
                </h3>
                <div className="space-y-4">
                  {learningPath.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-foreground">{skill.skill}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(skill.progress)} transition-all duration-500`}
                          style={{ width: `${skill.progress}%` }}
                        />
                      </div>
                      <div className="text-right mt-1">
                        <span className="text-xs text-muted-foreground">{skill.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Projects */}
            <div className="lg:col-span-2">
              <div className="modern-card p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-foreground flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    My Projects
                  </h3>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {projects.map((project, index) => (
                    <div key={project.id} className="border border-border rounded-lg p-6 hover:bg-muted/30 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-foreground mb-2 flex items-center">
                            {project.title}
                            <ExternalLink className="w-4 h-4 ml-2 text-muted-foreground hover:text-primary cursor-pointer" />
                          </h4>
                          <p className="text-muted-foreground mb-3">{project.description}</p>
                          
                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.tech.map((tech) => (
                              <span 
                                key={tech}
                                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            project.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {project.status}
                          </div>
                          {project.score && (
                            <div className="mt-2 text-sm text-muted-foreground">
                              Score: <span className="font-semibold text-foreground">{project.score}/100</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <Separator className="my-4" />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Github className="w-4 h-4" />
                            <span>View Code</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <ExternalLink className="w-4 h-4" />
                            <span>Live Demo</span>
                          </span>
                        </div>
                        
                        {project.score && (
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium text-foreground">Excellent Work!</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;