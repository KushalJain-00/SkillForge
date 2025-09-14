import { BookOpen, Users, Trophy, Home, ChevronDown, Code, Brain, Shield, Globe, Gamepad2, Palette, TrendingUp, Bot, Cloud, Database, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "@/contexts/AuthContext";
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
  const { isAuthenticated } = useAuth();

  const navItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Learn", icon: BookOpen, href: "/learn" },
    { name: "Projects", icon: Trophy, href: "/projects" },
    { name: "Community", icon: Users, href: "/community" }
  ];

  const fields = [
    {
      name: "Web Development",
      icon: Code,
      courses: [
        { title: "React Fundamentals", emoji: "⚛️", duration: "6 weeks" },
        { title: "Node.js Backend", emoji: "🟢", duration: "8 weeks" },
        { title: "Full-Stack Projects", emoji: "🚀", duration: "10 weeks" }
      ]
    },
    {
      name: "Data Science",
      icon: Brain,
      courses: [
        { title: "Python for Data", emoji: "🐍", duration: "6 weeks" },
        { title: "Machine Learning", emoji: "🤖", duration: "10 weeks" },
        { title: "Data Visualization", emoji: "📊", duration: "4 weeks" }
      ]
    },
    {
      name: "Mobile Development",
      icon: Globe,
      courses: [
        { title: "React Native", emoji: "📱", duration: "8 weeks" },
        { title: "Flutter Basics", emoji: "🦋", duration: "6 weeks" },
        { title: "iOS Development", emoji: "🍎", duration: "12 weeks" }
      ]
    },
    {
      name: "DevOps & Cloud",
      icon: Cloud,
      courses: [
        { title: "Docker & Kubernetes", emoji: "🐳", duration: "6 weeks" },
        { title: "AWS Fundamentals", emoji: "☁️", duration: "8 weeks" },
        { title: "CI/CD Pipelines", emoji: "🔄", duration: "4 weeks" }
      ]
    },
    {
      name: "UI/UX Design",
      icon: Palette,
      courses: [
        { title: "Figma Mastery", emoji: "🎨", duration: "4 weeks" },
        { title: "User Research", emoji: "🔍", duration: "6 weeks" },
        { title: "Prototyping", emoji: "📐", duration: "5 weeks" }
      ]
    },
    {
      name: "Cybersecurity",
      icon: Shield,
      courses: [
        { title: "Ethical Hacking", emoji: "🔒", duration: "8 weeks" },
        { title: "Network Security", emoji: "🛡️", duration: "6 weeks" },
        { title: "Penetration Testing", emoji: "🎯", duration: "10 weeks" }
      ]
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-soft rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">SkillForge</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </a>
            ))}

            {/* Fields Dropdown */}
            <DropdownMenu open={isFieldsOpen} onOpenChange={setIsFieldsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                  <span>Fields</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-96 p-4" align="start">
                <DropdownMenuLabel className="text-lg font-semibold">Learning Fields</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <div className="flex items-center space-x-2 font-medium text-foreground">
                        <field.icon className="w-4 h-4" />
                        <span className="text-sm">{field.name}</span>
                      </div>
                      <div className="space-y-1">
                        {field.courses.map((course, index) => (
                          <div key={index} className="text-xs text-muted-foreground hover:text-foreground cursor-pointer">
                            {course.emoji} {course.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <a href="/signin">Sign In</a>
                </Button>
                <Button asChild>
                  <a href="/signup">Get Started</a>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </a>
              ))}

              {/* Mobile Fields Section */}
              <div className="pt-4 border-t border-border/50">
                <h3 className="text-sm font-semibold text-foreground mb-3">Learning Fields</h3>
                <div className="grid grid-cols-1 gap-3">
                  {fields.slice(0, 4).map((field) => (
                    <div key={field.name} className="space-y-2">
                      <div className="flex items-center space-x-2 font-medium text-foreground">
                        <field.icon className="w-4 h-4" />
                        <span className="text-sm">{field.name}</span>
                      </div>
                      <div className="space-y-1 ml-6">
                        {field.courses.slice(0, 2).map((course, index) => (
                          <div key={index} className="text-xs text-muted-foreground">
                            {course.emoji} {course.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Auth Buttons */}
              {!isAuthenticated && (
                <div className="pt-4 border-t border-border/50 space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="/signin">Sign In</a>
                  </Button>
                  <Button className="w-full" asChild>
                    <a href="/signup">Get Started</a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;