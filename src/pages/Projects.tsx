import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Github, ExternalLink, Heart, MessageCircle, Star, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { projectsAPI } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, [page]);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await projectsAPI.getProjects({ page, limit: 12 });
      if (response.data.success) {
        const newProjects = response.data.data.projects;
        if (page === 1) {
          setProjects(newProjects);
        } else {
          setProjects(prev => [...prev, ...newProjects]);
        }
        setHasMore(response.data.data.pagination.page < response.data.data.pagination.pages);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (projectId: string) => {
    try {
      await projectsAPI.likeProject(projectId);
      // Update local state
      setProjects(prev => prev.map(project => 
        project.id === projectId 
          ? { ...project, likes: project.likes + (project.userLiked ? -1 : 1), userLiked: !project.userLiked }
          : project
      ));
    } catch (error) {
      toast.error('Failed to like project');
    }
  };

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
          {isLoading && projects.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="glass-card rounded-2xl overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-6 w-20" />
                      <div className="flex space-x-4">
                        <Skeleton className="h-4 w-8" />
                        <Skeleton className="h-4 w-8" />
                        <Skeleton className="h-4 w-8" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {projects.map((project, index) => (
                <div 
                  key={project.id}
                  className="group glass-card rounded-2xl overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Project Image/Preview */}
                  <div className={`h-48 ${project.thumbnail ? 'bg-cover bg-center' : 'bg-gradient-to-br from-primary/20 to-primary-soft/30'} flex items-center justify-center relative overflow-hidden`}
                       style={project.thumbnail ? { backgroundImage: `url(${project.thumbnail})` } : {}}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    {!project.thumbnail && (
                      <div className="text-white text-2xl font-bold z-10 text-center px-4">{project.title}</div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                      {project.githubUrl && (
                        <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
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
                            {project.author?.firstName?.[0]}{project.author?.lastName?.[0]}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {project.author?.firstName} {project.author?.lastName}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technology?.slice(0, 3).map((tech: string) => (
                        <span 
                          key={tech}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Difficulty and Stats */}
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[project.difficulty as keyof typeof difficultyColors]}`}>
                        {project.difficulty}
                      </span>
                      
                      <div className="flex items-center space-x-4 text-muted-foreground">
                        <button 
                          className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                          onClick={() => handleLike(project.id)}
                        >
                          <Heart className={`w-4 h-4 ${project.userLiked ? 'fill-red-500 text-red-500' : ''}`} />
                          <span className="text-sm">{project.likes || 0}</span>
                        </button>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{project.comments || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span className="text-sm">{Math.round(project.rating || 0)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Load More Button */}
          {hasMore && !isLoading && (
            <div className="text-center mt-12">
              <Button 
                onClick={() => setPage(prev => prev + 1)}
                variant="outline"
                className="px-8 py-3"
              >
                Load More Projects
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Projects;