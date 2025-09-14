import { User, BarChart3, Briefcase, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="glass-button h-10 w-10 rounded-full p-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="Profile" />
            <AvatarFallback className="bg-primary text-primary-foreground">SF</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 glass-card border-border/20" 
        align="end"
      >
        <DropdownMenuItem asChild>
          <a
            href="/dashboard"
            className="flex items-center space-x-2 cursor-pointer"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Dashboard</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href="/portfolio"
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Briefcase className="w-4 h-4" />
            <span>Portfolio</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href="/profile"
            className="flex items-center space-x-2 cursor-pointer"
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a
            href="/admin"
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            <span>Admin</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;