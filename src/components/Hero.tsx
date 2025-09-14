import HyperspeedBackground from "./HyperspeedBackground";
import { ArrowRight, Play, Star, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hyperspeed Background */}
      <HyperspeedBackground />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-primary/20 via-secondary/15 to-transparent" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 z-20">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-white/10 rounded-lg rotate-45 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-white/5 rounded-full animate-float" style={{ animationDelay: "2s" }} />
      </div>

      {/* Content */}
      <div className="relative z-30 text-center px-6 max-w-4xl mx-auto">
        {/* Stats Badge */}
        <div className="inline-flex items-center space-x-4 glass px-4 py-2 rounded-full mb-8 animate-fade-in">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground">10,000+ learners</span>
          </div>
          <div className="w-1 h-1 bg-muted rounded-full" />
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-foreground">4.9 rating</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
          Master Skills
          <span className="block gradient-accent bg-clip-text text-transparent">
            Through Practice
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.2s" }}>
          Join SkillForge, the interactive learning platform where you build real projects, 
          earn recognition, and connect with a community of passionate learners.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <Button 
            size="lg" 
            className="glass hover:bg-white/20 border-white/30 text-white font-semibold px-8 py-4 transition-bounce group"
            asChild
          >
            <a href="/learn">
              Start Learning Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="glass border-white/40 text-white hover:bg-white/10 font-semibold px-8 py-4 group"
          >
            <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Watch Demo
          </Button>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          {[
            { icon: BookOpen, text: "Interactive Lessons" },
            { icon: Users, text: "Peer Learning" },
            { icon: Star, text: "Skill Badges" }
          ].map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 glass px-4 py-2 rounded-full">
              <feature.icon className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;