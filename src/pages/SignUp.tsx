import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, MapPin, Calendar, Briefcase, GraduationCap, ArrowRight, BookOpen, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SignUpData {
  // Basic Info
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  
  // Profile Info
  bio: string;
  location: string;
  website: string;
  githubUrl: string;
  linkedinUrl: string;
  
  // Learning Preferences
  experienceLevel: string;
  interests: string[];
  learningGoals: string[];
  timeCommitment: string;
  
  // Professional Info
  currentRole: string;
  company: string;
  yearsOfExperience: string;
  skills: string[];
  
  // Terms
  agreeToTerms: boolean;
  agreeToNewsletter: boolean;
}

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignUpData>({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    bio: "",
    location: "",
    website: "",
    githubUrl: "",
    linkedinUrl: "",
    experienceLevel: "",
    interests: [],
    learningGoals: [],
    timeCommitment: "",
    currentRole: "",
    company: "",
    yearsOfExperience: "",
    skills: [],
    agreeToTerms: false,
    agreeToNewsletter: false,
  });

  const experienceLevels = [
    { value: "beginner", label: "Beginner (0-1 years)" },
    { value: "intermediate", label: "Intermediate (1-3 years)" },
    { value: "advanced", label: "Advanced (3-5 years)" },
    { value: "expert", label: "Expert (5+ years)" },
  ];

  const interestOptions = [
    "Web Development", "Mobile Development", "Data Science", "Machine Learning",
    "DevOps", "Cloud Computing", "Cybersecurity", "UI/UX Design",
    "Game Development", "Blockchain", "AI/ML", "Backend Development",
    "Frontend Development", "Full Stack Development", "Database Design"
  ];

  const learningGoalOptions = [
    "Career Change", "Skill Enhancement", "Personal Project", "Certification",
    "Freelancing", "Startup", "Open Source", "Teaching Others"
  ];

  const timeCommitmentOptions = [
    { value: "1-5", label: "1-5 hours per week" },
    { value: "5-10", label: "5-10 hours per week" },
    { value: "10-20", label: "10-20 hours per week" },
    { value: "20+", label: "20+ hours per week" },
  ];

  const yearsOfExperienceOptions = [
    { value: "0-1", label: "0-1 years" },
    { value: "1-3", label: "1-3 years" },
    { value: "3-5", label: "3-5 years" },
    { value: "5-10", label: "5-10 years" },
    { value: "10+", label: "10+ years" },
  ];

  const handleInputChange = (field: keyof SignUpData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: keyof SignUpData, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter(item => item !== value)
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.email && formData.username && formData.firstName && 
                 formData.lastName && formData.password && formData.confirmPassword &&
                 formData.password === formData.confirmPassword && formData.agreeToTerms);
      case 2:
        return !!(formData.experienceLevel && formData.interests.length > 0 && 
                 formData.learningGoals.length > 0 && formData.timeCommitment);
      case 3:
        return true; // Optional step
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      await register({
        email: formData.email,
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        bio: formData.bio,
        location: formData.location,
        website: formData.website,
        githubUrl: formData.githubUrl,
        linkedinUrl: formData.linkedinUrl,
        experienceLevel: formData.experienceLevel,
        interests: formData.interests,
        learningGoals: formData.learningGoals,
        timeCommitment: formData.timeCommitment,
        currentRole: formData.currentRole,
        company: formData.company,
        yearsOfExperience: formData.yearsOfExperience,
        skills: formData.skills,
        agreeToNewsletter: formData.agreeToNewsletter,
      });
      
      toast.success("Account created successfully! Welcome to SkillForge!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Create Your Account</h2>
        <p className="text-muted-foreground">Join thousands of learners building their skills</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            className="pl-10"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Username *</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="username"
            type="text"
            placeholder="johndoe"
            className="pl-10"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password *</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            className="pl-10 pr-10"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password *</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="pl-10 pr-10"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
          />
          <Label htmlFor="terms" className="text-sm">
            I agree to the{" "}
            <a href="/terms" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="newsletter"
            checked={formData.agreeToNewsletter}
            onCheckedChange={(checked) => handleInputChange("agreeToNewsletter", checked)}
          />
          <Label htmlFor="newsletter" className="text-sm">
            Send me updates about new courses and features
          </Label>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Tell Us About Yourself</h2>
        <p className="text-muted-foreground">Help us personalize your learning experience</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="experienceLevel">Experience Level *</Label>
        <Select value={formData.experienceLevel} onValueChange={(value) => handleInputChange("experienceLevel", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your experience level" />
          </SelectTrigger>
          <SelectContent>
            {experienceLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Areas of Interest *</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {interestOptions.map((interest) => (
            <div key={interest} className="flex items-center space-x-2">
              <Checkbox
                id={interest}
                checked={formData.interests.includes(interest)}
                onCheckedChange={(checked) => handleArrayChange("interests", interest, checked as boolean)}
              />
              <Label htmlFor={interest} className="text-sm">
                {interest}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Learning Goals *</Label>
        <div className="grid grid-cols-2 gap-2">
          {learningGoalOptions.map((goal) => (
            <div key={goal} className="flex items-center space-x-2">
              <Checkbox
                id={goal}
                checked={formData.learningGoals.includes(goal)}
                onCheckedChange={(checked) => handleArrayChange("learningGoals", goal, checked as boolean)}
              />
              <Label htmlFor={goal} className="text-sm">
                {goal}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeCommitment">Time Commitment *</Label>
        <Select value={formData.timeCommitment} onValueChange={(value) => handleInputChange("timeCommitment", value)}>
          <SelectTrigger>
            <SelectValue placeholder="How much time can you commit?" />
          </SelectTrigger>
          <SelectContent>
            {timeCommitmentOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Professional Information</h2>
        <p className="text-muted-foreground">Optional - helps us connect you with relevant opportunities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="currentRole">Current Role</Label>
          <Input
            id="currentRole"
            type="text"
            placeholder="Software Developer"
            value={formData.currentRole}
            onChange={(e) => handleInputChange("currentRole", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            type="text"
            placeholder="Tech Corp"
            value={formData.company}
            onChange={(e) => handleInputChange("company", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="yearsOfExperience">Years of Experience</Label>
        <Select value={formData.yearsOfExperience} onValueChange={(value) => handleInputChange("yearsOfExperience", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select years of experience" />
          </SelectTrigger>
          <SelectContent>
            {yearsOfExperienceOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself..."
          value={formData.bio}
          onChange={(e) => handleInputChange("bio", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="location"
            type="text"
            placeholder="San Francisco, CA"
            className="pl-10"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          type="url"
          placeholder="https://yourwebsite.com"
          value={formData.website}
          onChange={(e) => handleInputChange("website", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="githubUrl">GitHub Profile</Label>
        <div className="relative">
          <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="githubUrl"
            type="url"
            placeholder="https://github.com/username"
            className="pl-10"
            value={formData.githubUrl}
            onChange={(e) => handleInputChange("githubUrl", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
        <Input
          id="linkedinUrl"
          type="url"
          placeholder="https://linkedin.com/in/username"
          value={formData.linkedinUrl}
          onChange={(e) => handleInputChange("linkedinUrl", e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
                SkillForge
              </CardTitle>
              <CardDescription className="text-center">
                Step {currentStep} of 3
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              <div className="mt-8 flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep < 3 ? (
                  <Button onClick={handleNext} className="flex items-center gap-2">
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isLoading}
                    className="flex items-center gap-2"
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <a href="/signin" className="text-primary hover:underline font-medium">
                    Sign in
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Benefits */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary/10 to-primary-soft/20 items-center justify-center p-8">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Join the Future of Learning
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Personalized Learning Paths</h3>
                <p className="text-sm text-muted-foreground">
                  Get customized courses based on your goals and experience level
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Real Projects</h3>
                <p className="text-sm text-muted-foreground">
                  Build real-world projects and add them to your portfolio
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Community Support</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with fellow learners and get help when you need it
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
