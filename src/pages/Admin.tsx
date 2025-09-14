import Navigation from "@/components/Navigation";
import { BarChart3, Users, BookOpen, Trophy, Settings, Shield, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const stats = {
    totalUsers: 15420,
    activeUsers: 8930,
    totalCourses: 42,
    completionRate: 73,
    totalProjects: 1250,
    communityPosts: 3890
  };

  const recentUsers = [
    { name: "Sarah Johnson", email: "sarah@example.com", joined: "2 hours ago", status: "active" },
    { name: "Mike Chen", email: "mike@example.com", joined: "5 hours ago", status: "learning" },
    { name: "Emma Wilson", email: "emma@example.com", joined: "1 day ago", status: "completed" }
  ];

  const courseMetrics = [
    { name: "Web Development Fundamentals", enrolled: 3240, completed: 2150, rating: 4.8 },
    { name: "AI & Machine Learning", enrolled: 2890, completed: 1980, rating: 4.9 },
    { name: "Cybersecurity Essentials", enrolled: 2100, completed: 1540, rating: 4.7 }
  ];

  const systemHealth = [
    { metric: "Server Uptime", value: "99.9%", status: "excellent" },
    { metric: "Response Time", value: "120ms", status: "good" },
    { metric: "Database Load", value: "45%", status: "good" },
    { metric: "Storage Usage", value: "67%", status: "warning" }
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      
      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Admin Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Monitor and manage the SkillForge platform
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            <Card className="glass-card border-0 animate-scale-in">
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stats.totalUsers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Users</div>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-0 animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <CardContent className="p-4 text-center">
                <Activity className="w-8 h-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stats.activeUsers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-0 animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stats.totalCourses}</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-0 animate-scale-in" style={{ animationDelay: "0.3s" }}>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stats.completionRate}%</div>
                <div className="text-sm text-muted-foreground">Completion</div>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-0 animate-scale-in" style={{ animationDelay: "0.4s" }}>
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stats.totalProjects.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-0 animate-scale-in" style={{ animationDelay: "0.5s" }}>
              <CardContent className="p-4 text-center">
                <BarChart3 className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{stats.communityPosts.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Community</div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Tabs */}
          <Tabs defaultValue="overview" className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <TabsList className="glass-card border-0 p-1">
              <TabsTrigger value="overview" className="glass-button">Overview</TabsTrigger>
              <TabsTrigger value="users" className="glass-button">Users</TabsTrigger>
              <TabsTrigger value="courses" className="glass-button">Courses</TabsTrigger>
              <TabsTrigger value="system" className="glass-button">System</TabsTrigger>
              <TabsTrigger value="settings" className="glass-button">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Recent Activity */}
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-primary" />
                      <span>Recent User Activity</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentUsers.map((user, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                        <div>
                          <div className="font-medium text-foreground">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                        <div className="text-right">
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className="mb-1">
                            {user.status}
                          </Badge>
                          <div className="text-xs text-muted-foreground">{user.joined}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* System Health */}
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-accent" />
                      <span>System Health</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {systemHealth.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-foreground">{item.metric}</span>
                          <span className="text-sm text-foreground">{item.value}</span>
                        </div>
                        <Progress 
                          value={item.status === 'excellent' ? 95 : item.status === 'good' ? 75 : 60} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="courses" className="mt-8">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span>Course Analytics</span>
                    </div>
                    <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground border-0">
                      Add New Course
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {courseMetrics.map((course, index) => (
                      <div key={index} className="p-4 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-semibold text-foreground">{course.name}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">Rating:</span>
                            <Badge className="bg-gradient-to-r from-secondary to-accent text-secondary-foreground border-0">
                              ⭐ {course.rating}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <div className="text-center">
                            <div className="text-lg font-bold text-foreground">{course.enrolled}</div>
                            <div className="text-xs text-muted-foreground">Enrolled</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-foreground">{course.completed}</div>
                            <div className="text-xs text-muted-foreground">Completed</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-foreground">
                              {Math.round((course.completed / course.enrolled) * 100)}%
                            </div>
                            <div className="text-xs text-muted-foreground">Completion Rate</div>
                          </div>
                        </div>
                        <Progress value={(course.completed / course.enrolled) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="mt-8">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-secondary" />
                    <span>User Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">User management features require backend integration</p>
                    <Badge variant="outline" className="text-xs">Coming Soon</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="mt-8">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-accent" />
                    <span>System Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {systemHealth.map((item, index) => (
                      <div key={index} className="p-4 rounded-xl bg-muted/20">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-foreground">{item.metric}</span>
                          <Badge variant={item.status === 'excellent' ? 'default' : item.status === 'good' ? 'secondary' : 'outline'}>
                            {item.status}
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold text-foreground mb-2">{item.value}</div>
                        <Progress 
                          value={item.status === 'excellent' ? 95 : item.status === 'good' ? 75 : 60} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-8">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-primary" />
                    <span>Platform Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Platform configuration requires backend integration</p>
                    <Badge variant="outline" className="text-xs">Coming Soon</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;