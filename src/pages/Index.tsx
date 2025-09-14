import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import ReachImpactSection from "@/components/ReachImpactSection";
import Footer from "@/components/Footer";
import { Code, Users, Trophy, Zap, Target, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const features = [
    {
      icon: Code,
      title: "Hands-on Projects",
      description: "Learn by building real-world projects that matter. From web apps to AI models, create a portfolio that showcases your skills.",
      gradient: "primary" as const
    },
    {
      icon: Users,
      title: "Peer Learning",
      description: "Connect with fellow learners, get feedback on your work, and collaborate on exciting projects together.",
      gradient: "secondary" as const
    },
    {
      icon: Trophy,
      title: "Skill Recognition",
      description: "Earn verified badges and certificates as you master new skills. Build credibility that employers trust.",
      gradient: "accent" as const
    },
    {
      icon: Zap,
      title: "Personalized Path",
      description: "AI-powered learning recommendations adapted to your pace, interests, and career goals.",
      gradient: "primary" as const
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Set learning objectives and track your progress with detailed analytics and milestone celebrations.",
      gradient: "secondary" as const
    },
    {
      icon: BookOpen,
      title: "Expert Content",
      description: "Learn from industry professionals with curated content designed for practical skill development.",
      gradient: "accent" as const
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose SkillForge?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're redefining how skills are learned and mastered through interactive, 
              project-based experiences that prepare you for real-world challenges.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const getClickHandler = () => {
                switch (feature.title) {
                  case "Hands-on Projects": return () => window.location.href = "/projects";
                  case "Peer Learning": return () => window.location.href = "/community";
                  case "Skill Recognition": return () => window.location.href = "/learn";
                  case "Personalized Path": return () => window.location.href = "/learn";
                  case "Goal Tracking": return () => window.location.href = "/dashboard";
                  case "Expert Content": return () => window.location.href = "/learn";
                  default: return undefined;
                }
              };
              
              return (
                <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <FeatureCard {...feature} onClick={getClickHandler()} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reach & Impact Section */}
      <ReachImpactSection />
      
      {/* CTA Section */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto modern-card p-12 rounded-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Start Your Learning Journey?
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of learners who are already building skills, earning recognition, 
              and advancing their careers with SkillForge.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 hover:scale-105 transition-all duration-200" asChild>
                <a href="/dashboard">Track Progress</a>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 hover:scale-105 transition-all duration-200 hover:shadow-lg" asChild>
                <a href="/learn">Explore Courses</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
