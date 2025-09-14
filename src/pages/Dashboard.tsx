import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import ConfettiAnimation from "@/components/ConfettiAnimation";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usersAPI } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await usersAPI.getDashboard();
        if (response.data.success) {
          setDashboardData(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const handleBadgeClick = () => {
    setShowConfetti(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <Skeleton className="h-8 w-64 mx-auto mb-2" />
              <Skeleton className="h-4 w-96 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="modern-card">
                  <CardContent className="p-6 text-center">
                    <Skeleton className="h-8 w-8 mx-auto mb-2" />
                    <Skeleton className="h-6 w-16 mx-auto mb-1" />
                    <Skeleton className="h-4 w-20 mx-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const userData = dashboardData?.user || user;
  const currentXP = userData?.totalXP || 0;
  const currentLevel = userData?.currentLevel || 1;
  const xpToNext = currentLevel * 1000;
  const streak = userData?.learningStreak || 0;
  const badges = dashboardData?.recentBadges?.length || 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ConfettiAnimation trigger={showConfetti} onComplete={() => setShowConfetti(false)} />
      
      {/* Main Content */}
      <div className="pt-20 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Welcome Section */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Welcome back, {userData?.firstName || 'User'}! 👋
            </h1>
            <p className="text-muted-foreground text-lg">
              Ready to continue your learning journey?
            </p>
          </div>

          {/* Minimal Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="modern-card hover:shadow-lg transition-all text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-2">⚡</div>
                <div className="text-2xl font-bold text-foreground">{currentXP.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total XP</div>
              </CardContent>
            </Card>

            <Card 
              className="modern-card hover:shadow-lg transition-all text-center cursor-pointer" 
              onClick={handleBadgeClick}
            >
              <CardContent className="p-6">
                <div className="text-4xl mb-2">🔥</div>
                <div className="text-2xl font-bold text-foreground">{streak} days</div>
                <div className="text-sm text-muted-foreground">Current Streak</div>
              </CardContent>
            </Card>

            <Card className="modern-card hover:shadow-lg transition-all text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-2">🏆</div>
                <div className="text-2xl font-bold text-foreground">{badges}</div>
                <div className="text-sm text-muted-foreground">Badges Earned</div>
              </CardContent>
            </Card>
          </div>

          {/* XP Progress Circle */}
          <Card className="modern-card mb-8">
            <CardContent className="text-center p-8">
              <h3 className="text-lg font-semibold mb-6">Level {currentLevel} Progress</h3>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - currentXP / xpToNext)}`}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-bold">{Math.round((currentXP / xpToNext) * 100)}%</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {xpToNext - currentXP} XP to Level {currentLevel + 1}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;