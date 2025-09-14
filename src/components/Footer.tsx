import { Github, Linkedin, Twitter, MessageCircle, Mail } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Learn", href: "/learn" },
    { name: "Projects", href: "/projects" },
    { name: "Community", href: "/community" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Portfolio", href: "/portfolio" }
  ];

  const socialLinks = [
    { name: "GitHub", href: "#", icon: Github },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "Discord", href: "#", icon: MessageCircle }
  ];

  return (
    <footer className="glass-card border-t border-border/20 mt-24">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">About SkillForge</h3>
            <p className="text-muted-foreground leading-relaxed">
              SkillForge helps learners build real-world skills through practice, 
              community collaboration, and hands-on projects. Join thousands of 
              developers, designers, and innovators growing together.
            </p>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Mail className="w-4 h-4" />
              <a href="mailto:hello@skillforge.dev" className="hover:text-primary transition-colors">
                hello@skillforge.dev
              </a>
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
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 block py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Connect</h3>
            <p className="text-muted-foreground">
              Join our community and stay updated with the latest learning opportunities.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full glass-button flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-border/20 mt-12 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2025 SkillForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;