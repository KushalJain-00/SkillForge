import Navigation from "@/components/Navigation";
import { Github, ExternalLink, Award, Star, Calendar, Users, Eye, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Portfolio = () => {
  const profile = {
    name: "Alex Chen",
    title: "Full Stack Developer",
    bio: "Passionate developer with expertise in React, Node.js, and AI/ML. Love building products that make a difference.",
    avatar: "/placeholder-avatar.jpg",
    location: "San Francisco, CA",
    joinDate: "January 2024",
    totalXP: 2840,
    level: 12,
    completedProjects: 8,
    badges: 12
  };

  const projects = [
    {
      id: 1,
      title: "E-commerce Dashboard",
      description: "Modern admin dashboard with real-time analytics, built with React and Node.js",
      image: "/placeholder-project.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
      githubUrl: "https://github.com/alexchen/ecommerce-dashboard",
      liveUrl: "https://dashboard.alexchen.dev",
      rating: 4.8,
      reviews: 12,
      completedDate: "March 2024"
    },
    {
      id: 2,
      title: "AI Chat Bot",
      description: "Intelligent chatbot using OpenAI API with context awareness and memory",
      image: "/placeholder-project.jpg",
      technologies: ["Python", "OpenAI API", "FastAPI", "React"],
      githubUrl: "https://github.com/alexchen/ai-chatbot",
      liveUrl: "https://chatbot.alexchen.dev",
      rating: 4.9,
      reviews: 8,
      completedDate: "February 2024"
    },
    {
      id: 3,
      title: "Task Management App",
      description: "Collaborative task management with real-time updates and team features",
      image: "/placeholder-project.jpg",
      technologies: ["TypeScript", "React", "Supabase", "Tailwind CSS"],
      githubUrl: "https://github.com/alexchen/task-manager",
      liveUrl: "https://tasks.alexchen.dev",
      rating: 4.7,
      reviews: 15,
      completedDate: "January 2024"
    }
  ];

  const badges = [
    { name: "JavaScript Expert", icon: "🚀", earned: "March 2024" },
    { name: "React Master", icon: "⚛️", earned: "February 2024" },
    { name: "API Architect", icon: "🏗️", earned: "February 2024" },
    { name: "UI/UX Designer", icon: "🎨", earned: "January 2024" },
    { name: "Team Player", icon: "👥", earned: "January 2024" },
    { name: "Problem Solver", icon: "🧩", earned: "December 2023" }
  ];

  const certificates = [
    { name: "Full Stack Web Development", provider: "SkillForge", date: "March 2024", verified: true },
    { name: "Advanced React Patterns", provider: "SkillForge", date: "February 2024", verified: true },
    { name: "Node.js Certification", provider: "SkillForge", date: "January 2024", verified: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      
      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Portfolio
            </h1>
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground border-0 flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Share Portfolio</span>
            </Button>
          </div>

          {/* Profile Section */}
          <Card className="glass-card border-0 mb-12 animate-fade-in">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0">
                  <Avatar className="w-32 h-32 border-4 border-gradient-to-r from-primary to-accent shadow-elevated">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-foreground mb-2">{profile.name}</h2>
                  <p className="text-xl text-primary mb-4">{profile.title}</p>
                  <p className="text-muted-foreground mb-6 max-w-2xl">{profile.bio}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{profile.totalXP}</div>
                      <div className="text-sm text-muted-foreground">Total XP</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">Level {profile.level}</div>
                      <div className="text-sm text-muted-foreground">Current Level</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{profile.completedProjects}</div>
                      <div className="text-sm text-muted-foreground">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{profile.badges}</div>
                      <div className="text-sm text-muted-foreground">Badges</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {profile.joinDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Projects Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-8 animate-fade-in">Featured Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card key={project.id} className="glass-card border-0 hover:shadow-elevated transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-xl flex items-center justify-center">
                    <Eye className="w-12 h-12 text-primary/60" />
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-foreground mb-2">{project.title}</h4>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs bg-muted/20 text-muted-foreground border-muted/30">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-foreground">{project.rating}</span>
                        <span className="text-sm text-muted-foreground">({project.reviews})</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{project.completedDate}</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1 glass-button" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground border-0" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Badges Section */}
            <Card className="glass-card border-0 animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-accent" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {badges.map((badge, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors">
                      <div className="text-2xl">{badge.icon}</div>
                      <div>
                        <div className="font-medium text-foreground text-sm">{badge.name}</div>
                        <div className="text-xs text-muted-foreground">{badge.earned}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certificates Section */}
            <Card className="glass-card border-0 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span>Certificates</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {certificates.map((cert, index) => (
                  <div key={index} className="p-4 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{cert.name}</h4>
                      {cert.verified && (
                        <Badge className="bg-gradient-to-r from-secondary to-accent text-secondary-foreground border-0 text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">{cert.provider}</p>
                      <p className="text-xs text-muted-foreground">{cert.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;