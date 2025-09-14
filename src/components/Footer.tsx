import { Github, Linkedin, Twitter, MessageCircle, Mail, BookOpen, Users, Trophy, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Learn", href: "/learn" },
    { name: "Projects", href: "/projects" },
    { name: "Community", href: "/community" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Portfolio", href: "/portfolio" }
  ];

  const learningPaths = [
    { name: "Web Development", href: "/learn/web-dev" },
    { name: "Data Science", href: "/learn/data-science" },
    { name: "Mobile Development", href: "/learn/mobile-dev" },
    { name: "DevOps & Cloud", href: "/learn/devops" },
    { name: "UI/UX Design", href: "/learn/design" },
    { name: "Cybersecurity", href: "/learn/cybersecurity" }
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Bug Reports", href: "/bugs" },
    { name: "Feature Requests", href: "/features" },
    { name: "Community Guidelines", href: "/guidelines" },
    { name: "Privacy Policy", href: "/privacy" }
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/skillforge", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com/company/skillforge", icon: Linkedin },
    { name: "Twitter", href: "https://twitter.com/skillforge", icon: Twitter },
    { name: "Discord", href: "https://discord.gg/skillforge", icon: MessageCircle }
  ];

  return (
    <footer className="bg-muted/30 border-t border-border/20 mt-24">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-soft rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">SkillForge</span>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Empowering learners worldwide with hands-on projects, expert guidance, 
              and a supportive community. Build skills that matter in today's world.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/10 transition-colors duration-200"
                >
                  <social.icon className="w-4 h-4 text-muted-foreground hover:text-primary" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Paths */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Learning Paths</h3>
            <ul className="space-y-2">
              {learningPaths.map((path) => (
                <li key={path.name}>
                  <a
                    href={path.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                  >
                    {path.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-primary/10 to-primary-soft/10 rounded-xl p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Stay Updated with SkillForge
            </h3>
            <p className="text-muted-foreground mb-6">
              Get the latest courses, projects, and community updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button className="flex items-center gap-2">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50K+</div>
            <div className="text-sm text-muted-foreground">Active Learners</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">1M+</div>
            <div className="text-sm text-muted-foreground">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Skills Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 SkillForge. All rights reserved. Built with ❤️ for learners worldwide.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;