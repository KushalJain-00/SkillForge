import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  Star, 
  Users, 
  ArrowRight, 
  Play, 
  CheckCircle,
  Lock,
  TrendingUp,
  Award,
  Target,
  Filter,
  Search
} from "lucide-react";
import { useState, useEffect } from "react";
import { learningAPI } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const Learn = () => {
  const [learningTracks, setLearningTracks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchLearningTracks();
  }, []);

  const fetchLearningTracks = async () => {
    try {
      setIsLoading(true);
      const response = await learningAPI.getTracks();
      if (response.data.success) {
        setLearningTracks(response.data.data.tracks || []);
      } else {
        // Fallback to mock data
        setLearningTracks(getMockTracks());
      }
    } catch (error) {
      console.error('Failed to fetch learning tracks:', error);
      setLearningTracks(getMockTracks());
    } finally {
      setIsLoading(false);
    }
  };

  const getMockTracks = () => [
    {
      id: 1,
      title: "Web Development Fundamentals",
      description: "Master HTML, CSS, JavaScript, and React to build modern web applications",
      level: "Beginner",
      duration: "8 weeks",
      students: 2840,
      rating: 4.9,
      progress: 0,
      gradient: "from-primary/20 to-primary-soft/30",
      modules: [
        "HTML & CSS Basics",
        "JavaScript Fundamentals", 
        "React Introduction",
        "Building Your First App"
      ],
      skills: ["HTML", "CSS", "JavaScript", "React"],
      price: "Free"
    },
    {
      id: 2,
      title: "AI & Machine Learning",
      description: "Dive into artificial intelligence, machine learning algorithms, and neural networks",
      level: "Intermediate",
      duration: "12 weeks", 
      students: 1650,
      rating: 4.8,
      progress: 0,
      gradient: "from-secondary/20 to-secondary-soft/30",
      modules: [
        "Python for AI",
        "Machine Learning Basics",
        "Neural Networks",
        "AI Project Development"
      ],
      skills: ["Python", "TensorFlow", "Machine Learning", "Neural Networks"],
      price: "$99"
    },
    {
      id: 3,
      title: "Cybersecurity Essentials",
      description: "Learn to protect systems, networks, and data from digital attacks",
      level: "Beginner",
      duration: "10 weeks",
      students: 980,
      rating: 4.7,
      progress: 0,
      gradient: "from-accent/20 to-accent-soft/30",
      modules: [
        "Security Fundamentals",
        "Network Security",
        "Ethical Hacking",
        "Incident Response"
      ],
      skills: ["Security", "Networking", "Ethical Hacking", "Incident Response"],
      price: "$149"
    },
    {
      id: 4,
      title: "Mobile App Development",
      description: "Build iOS and Android apps using React Native and Flutter",
      level: "Intermediate",
      duration: "10 weeks",
      students: 1200,
      rating: 4.8,
      progress: 0,
      gradient: "from-primary/20 to-accent/20",
      modules: [
        "React Native Basics",
        "Flutter Development",
        "App Store Deployment",
        "Cross-Platform Design"
      ],
      skills: ["React Native", "Flutter", "Mobile Design", "App Deployment"],
      price: "$199"
    },
    {
      id: 5,
      title: "Data Science & Analytics",
      description: "Master data analysis, visualization, and statistical modeling",
      level: "Intermediate",
      duration: "14 weeks",
      students: 2100,
      rating: 4.9,
      progress: 0,
      gradient: "from-secondary/20 to-primary/20",
      modules: [
        "Python for Data Science",
        "Statistical Analysis",
        "Data Visualization",
        "Machine Learning"
      ],
      skills: ["Python", "Pandas", "Matplotlib", "Scikit-learn"],
      price: "$179"
    },
    {
      id: 6,
      title: "DevOps & Cloud Computing",
      description: "Learn deployment, scaling, and cloud infrastructure management",
      level: "Advanced",
      duration: "12 weeks",
      students: 850,
      rating: 4.8,
      progress: 0,
      gradient: "from-accent/20 to-secondary/20",
      modules: [
        "Docker & Kubernetes",
        "AWS Cloud Services",
        "CI/CD Pipelines",
        "Infrastructure as Code"
      ],
      skills: ["Docker", "Kubernetes", "AWS", "Terraform"],
      price: "$249"
    }
  ];

  const levels = ["all", "Beginner", "Intermediate", "Advanced"];

  const filteredTracks = learningTracks.filter(track => {
    const matchesLevel = selectedLevel === "all" || track.level === selectedLevel;
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         track.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleEnroll = async (trackId: number) => {
    try {
      await learningAPI.enrollInTrack(trackId.toString());
      toast.success("Successfully enrolled in the learning track!");
      // Update local state
      setLearningTracks(prev => prev.map(track => 
        track.id === trackId ? { ...track, progress: 5 } : track
      ));
    } catch (error) {
      toast.error("Failed to enroll. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-br from-primary/5 to-primary-soft/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Master New Skills
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Choose from our comprehensive learning tracks designed by industry experts. 
              Build real-world projects and advance your career.
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search learning tracks..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>
                      {level === "all" ? "All Levels" : level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{learningTracks.length}+</div>
              <div className="text-sm text-muted-foreground">Learning Tracks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.8</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Tracks Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="modern-card">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex space-x-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTracks.map((track) => (
                <Card key={track.id} className="modern-card hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className={`w-full h-32 rounded-lg bg-gradient-to-br ${track.gradient} mb-4 flex items-center justify-center`}>
                      <BookOpen className="w-12 h-12 text-white/80" />
                    </div>
                    
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl font-bold text-foreground line-clamp-2">
                        {track.title}
                      </CardTitle>
                      <Badge className={getLevelColor(track.level)}>
                        {track.level}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {track.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {track.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {track.students.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                        {track.rating}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Skills */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {track.skills?.map((skill: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Progress */}
                    {track.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-foreground font-medium">{track.progress}%</span>
                        </div>
                        <Progress value={track.progress} className="h-2" />
                      </div>
                    )}
                    
                    {/* Modules Preview */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground mb-2">Modules:</h4>
                      <ul className="space-y-1">
                        {track.modules?.slice(0, 3).map((module: string, index: number) => (
                          <li key={index} className="text-xs text-muted-foreground flex items-center">
                            <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                            {module}
                          </li>
                        ))}
                        {track.modules?.length > 3 && (
                          <li className="text-xs text-muted-foreground">
                            +{track.modules.length - 3} more modules
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    {/* Action Button */}
                    <Button 
                      className="w-full" 
                      onClick={() => handleEnroll(track.id)}
                      disabled={track.progress > 0}
                    >
                      {track.progress > 0 ? (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Continue Learning
                        </>
                      ) : (
                        <>
                          <BookOpen className="w-4 h-4 mr-2" />
                          Start Learning
                        </>
                      )}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    
                    <div className="text-center mt-3">
                      <span className="text-lg font-bold text-primary">{track.price}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {!isLoading && filteredTracks.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No tracks found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Learn;