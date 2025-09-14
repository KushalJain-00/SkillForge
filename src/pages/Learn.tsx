import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BookOpen, Clock, Star, Users, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const Learn = () => {
  const learningTracks = [
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
      ]
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
      ]
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
        "Security Frameworks"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              Choose Your Learning Path
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Explore our carefully crafted learning tracks designed to take you from beginner to expert 
              through hands-on projects and real-world applications.
            </p>
          </div>
        </div>
      </section>

      {/* Learning Tracks */}
      <section className="pb-24 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {learningTracks.map((track, index) => (
              <div 
                key={track.id} 
                className="glass-card rounded-2xl overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Track Header */}
                <div className={`p-6 bg-gradient-to-br ${track.gradient}`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium text-foreground">
                      {track.level}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-foreground">{track.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2">{track.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{track.description}</p>
                </div>

                {/* Track Stats */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{track.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{track.students.toLocaleString()} students</span>
                    </div>
                  </div>

                  {/* Modules Preview */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3">What you'll learn:</h4>
                    <div className="space-y-2">
                      {track.modules.slice(0, 3).map((module, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <BookOpen className="w-3 h-3 text-primary" />
                          <span className="text-sm text-muted-foreground">{module}</span>
                        </div>
                      ))}
                      {track.modules.length > 3 && (
                        <div className="text-sm text-primary font-medium">
                          +{track.modules.length - 3} more modules
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3">
                    <Button className="flex-1 bg-primary hover:bg-primary/90 text-white group">
                      Start Learning
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" size="icon" className="glass">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Learn;