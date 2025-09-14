import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import ReachImpactSection from "@/components/ReachImpactSection";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Code, 
  Users, 
  Trophy, 
  Zap, 
  Target, 
  BookOpen, 
  Star,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Globe,
  Award,
  Clock,
  Play
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Code,
      title: "Hands-on Projects",
      description: "Learn by building real-world projects that matter. From web apps to AI models, create a portfolio that showcases your skills.",
      gradient: "primary" as const,
      stats: "500+ Projects"
    },
    {
      icon: Users,
      title: "Peer Learning",
      description: "Connect with fellow learners, get feedback on your work, and collaborate on exciting projects together.",
      gradient: "secondary" as const,
      stats: "50K+ Learners"
    },
    {
      icon: Trophy,
      title: "Skill Recognition",
      description: "Earn verified badges and certificates as you master new skills. Build credibility that employers trust.",
      gradient: "accent" as const,
      stats: "100+ Badges"
    },
    {
      icon: Zap,
      title: "Personalized Path",
      description: "AI-powered learning recommendations adapted to your pace, interests, and career goals.",
      gradient: "primary" as const,
      stats: "95% Success Rate"
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Set learning objectives and track your progress with detailed analytics and milestone celebrations.",
      gradient: "secondary" as const,
      stats: "Real-time Progress"
    },
    {
      icon: BookOpen,
      title: "Expert Content",
      description: "Learn from industry professionals with curated content designed for practical skill development.",
      gradient: "accent" as const,
      stats: "200+ Experts"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      avatar: "SC",
      content: "SkillForge helped me transition from marketing to tech. The hands-on projects and community support made all the difference.",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Full-Stack Developer",
      avatar: "MJ",
      content: "The personalized learning paths and real-world projects gave me the confidence to start my own startup.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Data Scientist at Microsoft",
      avatar: "ER",
      content: "From beginner to data scientist in 8 months. The structured approach and expert guidance were invaluable.",
      rating: 5
    }
  ];

  const stats = [
    { label: "Active Learners", value: "50,000+", icon: Users },
    { label: "Projects Completed", value: "1M+", icon: Code },
    { label: "Skills Mastered", value: "500+", icon: Trophy },
    { label: "Success Rate", value: "95%", icon: TrendingUp }
  ];

  const learningPaths = [
    {
      title: "Web Development",
      description: "Master modern web technologies",
      duration: "6 months",
      level: "Beginner to Advanced",
      students: "15,000+",
      rating: 4.9,
      color: "bg-blue-500"
    },
    {
      title: "Data Science",
      description: "Learn data analysis and ML",
      duration: "8 months",
      level: "Intermediate to Expert",
      students: "12,000+",
      rating: 4.8,
      color: "bg-green-500"
    },
    {
      title: "Mobile Development",
      description: "Build iOS and Android apps",
      duration: "7 months",
      level: "Beginner to Advanced",
      students: "8,000+",
      rating: 4.9,
      color: "bg-purple-500"
    },
    {
      title: "DevOps & Cloud",
      description: "Master deployment and scaling",
      duration: "5 months",
      level: "Intermediate to Expert",
      students: "6,000+",
      rating: 4.7,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Stats Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose SkillForge?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We combine cutting-edge technology with proven learning methods to help you achieve your goals faster.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                gradient={feature.gradient}
                stats={feature.stats}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Popular Learning Paths
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our most popular learning paths, designed by industry experts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {learningPaths.map((path, index) => (
              <Card key={index} className="modern-card hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${path.color} rounded-lg flex items-center justify-center`}>
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span className="text-sm font-medium">{path.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2">{path.title}</h3>
                  <p className="text-muted-foreground mb-4">{path.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      {path.duration}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Target className="w-4 h-4 mr-2" />
                      {path.level}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2" />
                      {path.students} students
                    </div>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    Start Learning
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how SkillForge has transformed careers and lives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="modern-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center">
                    <Avatar className="w-10 h-10 mr-3">
                      <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-primary/10 to-primary-soft/10">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already building their future with SkillForge.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              <Play className="w-5 h-5 mr-2" />
              Start Learning Free
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Users className="w-5 h-5 mr-2" />
              Join Community
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Free to start
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Reach & Impact Section */}
      <ReachImpactSection />
      
      <Footer />
    </div>
  );
};

export default Index;