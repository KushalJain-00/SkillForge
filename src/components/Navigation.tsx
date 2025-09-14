import { BookOpen, Users, Trophy, Home, ChevronDown, Code, Brain, Shield, Globe, Gamepad2, Palette, TrendingUp, Bot, Cloud, Database } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import ProfileDropdown from "./ProfileDropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFieldsOpen, setIsFieldsOpen] = useState(false);

  const navItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Learn", icon: BookOpen, href: "/learn" },
    { name: "Projects", icon: Trophy, href: "/projects" },
    { name: "Community", icon: Users, href: "/community" }
  ];

  const fields = [
    {
      name: "Robotics",
      icon: Bot,
      courses: [
        { title: "Arduino Basics", emoji: "🤖", duration: "4 weeks" },
        { title: "Robot Vision", emoji: "👁️", duration: "6 weeks" },
        { title: "Autonomous Navigation", emoji: "🚗", duration: "8 weeks" }
      ]
    },
    {
      name: "Business",
      icon: TrendingUp,
      courses: [
        { title: "Startup Fundamentals", emoji: "🚀", duration: "3 weeks" },
        { title: "Digital Marketing", emoji: "📈", duration: "5 weeks" },
        { title: "Financial Planning", emoji: "💰", duration: "4 weeks" }
      ]
    },
    {
      name: "Artificial Intelligence",
      icon: Brain,
      courses: [
        { title: "Machine Learning 101", emoji: "🧠", duration: "8 weeks" },
        { title: "Neural Networks", emoji: "🔗", duration: "10 weeks" },
        { title: "Computer Vision", emoji: "👀", duration: "6 weeks" }
      ]
    },
    {
      name: "Cybersecurity",
      icon: Shield,
      courses: [
        { title: "Ethical Hacking", emoji: "🔒", duration: "7 weeks" },
        { title: "Network Security", emoji: "🛡️", duration: "6 weeks" },
        { title: "Incident Response", emoji: "🚨", duration: "5 weeks" }
      ]
    },
    {
      name: "Web Development",
      icon: Code,
      courses: [
        { title: "React Mastery", emoji: "⚛️", duration: "8 weeks" },
        { title: "Full-Stack Node", emoji: "🟢", duration: "12 weeks" },
        { title: "Modern CSS", emoji: "🎨", duration: "4 weeks" }
      ]
    },
    {
      name: "Cloud Computing",
      icon: Cloud,
      courses: [
        { title: "AWS Fundamentals", emoji: "☁️", duration: "6 weeks" },
        { title: "Docker & Kubernetes", emoji: "🐳", duration: "8 weeks" },
        { title: "Serverless Architecture", emoji: "⚡", duration: "5 weeks" }
      ]
    },
    {
      name: "Data Science",
      icon: Database,
      courses: [
        { title: "Python for Data", emoji: "🐍", duration: "6 weeks" },
        { title: "Data Visualization", emoji: "📊", duration: "4 weeks" },
        { title: "Big Data Analytics", emoji: "📈", duration: "10 weeks" }
      ]
    },
    {
      name: "Game Development",
      icon: Gamepad2,
      courses: [
        { title: "Unity 3D Basics", emoji: "🎮", duration: "8 weeks" },
        { title: "Game Design Theory", emoji: "🎲", duration: "5 weeks" },
        { title: "Mobile Games", emoji: "📱", duration: "6 weeks" }
      ]
    },
    {
      name: "Design (UI/UX)",
      icon: Palette,
      courses: [
        { title: "Figma Mastery", emoji: "🎨", duration: "4 weeks" },
        { title: "User Research", emoji: "🔍", duration: "3 weeks" },
        { title: "Design Systems", emoji: "🧩", duration: "5 weeks" }
      ]
    }
  ];

  return (
    <>
      {/* Particles Background */}
      <div className="particles-bg" />
      
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav transition-theme">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-soft">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">SkillForge</h1>
                <p className="text-xs text-muted-foreground">Growth Hub</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center space-x-2 flex-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="glass-button px-4 py-2 rounded-xl flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-all duration-300 text-sm font-medium"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </a>
              ))}
              
              {/* Fields Dropdown */}
              <DropdownMenu open={isFieldsOpen} onOpenChange={setIsFieldsOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="glass-button px-4 py-2 rounded-xl flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-all duration-300 text-sm font-medium"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Fields</span>
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isFieldsOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 glass-card border-border/20 max-h-96 overflow-y-auto">
                  {fields.map((field, index) => (
                    <div key={field.name}>
                      <DropdownMenuLabel className="flex items-center space-x-2 text-foreground">
                        <field.icon className="w-4 h-4" />
                        <span>{field.name}</span>
                      </DropdownMenuLabel>
                      <div className="px-2 pb-2">
                        {field.courses.map((course) => (
                          <DropdownMenuItem key={course.title} asChild>
                            <a
                              href={`/course/${field.name.toLowerCase().replace(/\s+/g, '-')}/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                              className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                            >
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">{course.emoji}</span>
                                <span className="text-sm font-medium">{course.title}</span>
                              </div>
                              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                                {course.duration}
                              </span>
                            </a>
                          </DropdownMenuItem>
                        ))}
                      </div>
                      {index < fields.length - 1 && <DropdownMenuSeparator />}
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <ThemeToggle />
              <Button variant="ghost" className="glass-button text-muted-foreground hover:text-foreground" asChild>
                <a href="/signin">Sign In</a>
              </Button>
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-soft border-0">
                Get Started
              </Button>
              <ProfileDropdown />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-3 lg:hidden">
              <ThemeToggle />
              <ProfileDropdown />
              <Button
                variant="ghost"
                size="icon"
                className="glass-button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? "✕" : "☰"}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden mt-6 pb-6 border-t border-white/10 animate-fade-in">
              <div className="flex flex-col space-y-3 mt-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="glass-button p-3 rounded-xl flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-all duration-300"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </a>
                ))}
                
                {/* Mobile Fields Accordion */}
                <div className="mt-4">
                  <Button
                    variant="ghost"
                    className="glass-button p-3 rounded-xl flex items-center justify-between w-full text-muted-foreground hover:text-foreground transition-all duration-300"
                    onClick={() => setIsFieldsOpen(!isFieldsOpen)}
                  >
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5" />
                      <span>Fields</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isFieldsOpen ? 'rotate-180' : ''}`} />
                  </Button>
                  
                  {isFieldsOpen && (
                    <div className="mt-3 space-y-4 pl-4 animate-fade-in">
                      {fields.slice(0, 5).map((field) => (
                        <div key={field.name} className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm font-medium text-foreground">
                            <field.icon className="w-4 h-4" />
                            <span>{field.name}</span>
                          </div>
                          <div className="space-y-1 pl-6">
                            {field.courses.slice(0, 2).map((course) => (
                              <a
                                key={course.title}
                                href={`/course/${field.name.toLowerCase().replace(/\s+/g, '-')}/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors text-sm"
                              >
                                <div className="flex items-center space-x-2">
                                  <span>{course.emoji}</span>
                                  <span>{course.title}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {course.duration}
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col space-y-3 mt-6 pt-3 border-t border-white/10">
                  <Button variant="ghost" className="glass-button text-muted-foreground hover:text-foreground justify-start" asChild>
                    <a href="/signin">Sign In</a>
                  </Button>
                  <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground justify-start border-0">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;