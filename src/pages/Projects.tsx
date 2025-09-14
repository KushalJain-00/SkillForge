import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Github, ExternalLink, Heart, MessageCircle, Star, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-commerce Dashboard",
      description: "A modern React dashboard for managing online store analytics, inventory, and customer data with real-time updates.",
      author: "Sarah Chen",
      authorAvatar: "SC",
      technology: "React",
      difficulty: "Intermediate",
      likes: 142,
      comments: 28,
      stars: 89,
      image: "bg-gradient-to-br from-primary/20 to-primary-soft/30",
      tags: ["React", "TypeScript", "Charts"]
    },
    {
      id: 2,
      title: "AI Image Generator",
      description: "Machine learning application that generates unique images from text prompts using stable diffusion models.",
      author: "Alex Rodriguez",
      authorAvatar: "AR",
      technology: "Python",
      difficulty: "Advanced",
      likes: 298,
      comments: 45,
      stars: 156,
      image: "bg-gradient-to-br from-secondary/20 to-secondary-soft/30",
      tags: ["Python", "AI", "Machine Learning"]
    },
    {
      id: 3,
      title: "Secure Chat App",
      description: "End-to-end encrypted messaging application with real-time communication and advanced security features.",
      author: "Maya Patel",
      authorAvatar: "MP",
      technology: "Node.js",
      difficulty: "Advanced", 
      likes: 87,
      comments: 19,
      stars: 67,
      image: "bg-gradient-to-br from-accent/20 to-accent-soft/30",
      tags: ["Node.js", "WebSocket", "Encryption"]
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "Responsive portfolio website showcasing creative work with smooth animations and modern design principles.",
      author: "Jordan Kim",
      authorAvatar: "JK",
      technology: "HTML/CSS",
      difficulty: "Beginner",
      likes: 203,
      comments: 34,
      stars: 91,
      image: "bg-gradient-to-br from-primary/20 to-accent/20",
      tags: ["HTML", "CSS", "Animation"]
    }
  ];

  const difficultyColors = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-yellow-100 text-yellow-800", 
    Advanced: "bg-red-100 text-red-800"
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 animate-fade-in">
                Student Projects
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Discover amazing projects built by our community. Get inspired, provide feedback, 
                or collaborate on exciting new ideas.
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-6 md:mt-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button variant="outline" className="glass">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Submit Project
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className="group glass-card rounded-2xl overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image/Preview */}
                <div className={`h-48 ${project.image} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="text-white text-2xl font-bold z-10">{project.title}</div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                    <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                      <Github className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  {/* Title and Author */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-1">{project.title}</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-medium">
                          {project.authorAvatar}
                        </div>
                        <span className="text-sm text-muted-foreground">{project.author}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Difficulty and Stats */}
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[project.difficulty as keyof typeof difficultyColors]}`}>
                      {project.difficulty}
                    </span>
                    
                    <div className="flex items-center space-x-4 text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{project.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{project.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span className="text-sm">{project.stars}</span>
                      </div>
                    </div>
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

export default Projects;