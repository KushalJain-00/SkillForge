import { Users, Trophy, Briefcase, Globe } from "lucide-react";

const ReachImpactSection = () => {
  const stats = [
    {
      icon: Users,
      number: "10K+",
      label: "Active Learners",
      description: "Students actively building skills"
    },
    {
      icon: Trophy,
      number: "500+",
      label: "Projects Completed",
      description: "Real-world projects built"
    },
    {
      icon: Briefcase,
      number: "100+",
      label: "Mentors & Instructors",
      description: "Industry professionals guiding"
    },
    {
      icon: Globe,
      number: "50+",
      label: "Countries Represented",
      description: "Global learning community"
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Reach & Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building a global community of learners, creators, and innovators who are 
            shaping the future through practical skill development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-2xl text-center group hover:scale-105 transition-all duration-300 hover:shadow-soft border border-primary/10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-foreground mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReachImpactSection;