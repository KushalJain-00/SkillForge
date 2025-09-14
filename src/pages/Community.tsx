import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MessageSquare, Users, TrendingUp, Clock, Heart, Reply, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Community = () => {
  const forumPosts = [
    {
      id: 1,
      title: "How to debug React useState not updating immediately?",
      content: "I'm having trouble with useState in React. When I call setState, the state doesn't seem to update immediately...",
      author: "DevNewbie23",
      authorAvatar: "DN",
      category: "React",
      replies: 12,
      likes: 24,
      timeAgo: "2 hours ago",
      tags: ["React", "useState", "Debug"],
      solved: true
    },
    {
      id: 2, 
      title: "Best practices for machine learning model deployment?",
      content: "I've trained a ML model that works great locally, but I'm struggling with deployment strategies...",
      author: "MLEnthusiast",
      authorAvatar: "ME",
      category: "AI/ML",
      replies: 8,
      likes: 31,
      timeAgo: "4 hours ago",
      tags: ["Machine Learning", "Deployment", "Best Practices"],
      solved: false
    },
    {
      id: 3,
      title: "Cybersecurity career path guidance needed",
      content: "I'm transitioning from web development to cybersecurity. What skills should I focus on first?",
      author: "SecureCoder",
      authorAvatar: "SC",
      category: "Career",
      replies: 15,
      likes: 42,
      timeAgo: "6 hours ago",
      tags: ["Career", "Cybersecurity", "Advice"],
      solved: false
    },
    {
      id: 4,
      title: "Looking for team members for hackathon project",
      content: "Building an AI-powered productivity app for the upcoming hackathon. Need frontend and backend developers!",
      author: "HackathonHero",
      authorAvatar: "HH", 
      category: "Collaboration",
      replies: 6,
      likes: 18,
      timeAgo: "1 day ago",
      tags: ["Hackathon", "Team", "AI"],
      solved: false
    }
  ];

  const categories = [
    { name: "General", count: 1245, color: "bg-primary/10 text-primary" },
    { name: "React", count: 842, color: "bg-blue-100 text-blue-700" },
    { name: "AI/ML", count: 567, color: "bg-purple-100 text-purple-700" },
    { name: "Career", count: 423, color: "bg-green-100 text-green-700" },
    { name: "Collaboration", count: 298, color: "bg-orange-100 text-orange-700" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 animate-fade-in">
                Community Forum
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Connect with fellow learners, share knowledge, ask questions, and collaborate on projects. 
                Together we learn faster.
              </p>
            </div>
            <Button 
              className="bg-primary hover:bg-primary/90 text-white mt-6 md:mt-0 animate-fade-in" 
              style={{ animationDelay: "0.4s" }}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Discussion
            </Button>
          </div>
        </div>
      </section>

      {/* Community Stats & Categories */}
      <section className="pb-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {categories.map((category, index) => (
              <div 
                key={category.name}
                className="glass-card p-6 rounded-xl text-center hover:shadow-soft transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${category.color}`}>
                  {category.name}
                </div>
                <div className="text-2xl font-bold text-foreground">{category.count}</div>
                <div className="text-sm text-muted-foreground">discussions</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forum Posts */}
      <section className="pb-24 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {forumPosts.map((post, index) => (
                <div 
                  key={post.id}
                  className="glass-card p-6 rounded-xl hover:shadow-soft transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-sm font-medium">
                        {post.authorAvatar}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-foreground">{post.author}</span>
                          {post.solved && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                              Solved
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{post.timeAgo}</span>
                          <span>•</span>
                          <span>{post.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-3 hover:text-primary cursor-pointer transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {post.content}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center space-x-6 text-muted-foreground">
                    <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                      <Reply className="w-4 h-4" />
                      <span className="text-sm">{post.replies} replies</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Active Discussions */}
              <div className="glass-card p-6 rounded-xl animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Trending Today
                </h3>
                <div className="space-y-3">
                  {["React Hooks Deep Dive", "ML Model Optimization Tips", "Git Workflow Best Practices"].map((topic, idx) => (
                    <div key={idx} className="text-sm">
                      <div className="text-foreground hover:text-primary cursor-pointer transition-colors">{topic}</div>
                      <div className="text-muted-foreground text-xs mt-1">{Math.floor(Math.random() * 50) + 10} replies</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Guidelines */}
              <div className="glass-card p-6 rounded-xl animate-fade-in" style={{ animationDelay: "0.8s" }}>
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Community Guidelines
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Be respectful and constructive</li>
                  <li>• Search before posting</li>
                  <li>• Use relevant tags</li>
                  <li>• Share knowledge generously</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Community;