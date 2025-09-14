import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import ConfettiAnimation from "@/components/ConfettiAnimation";
import { useState } from "react";

const Dashboard = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  
  const user = {
    name: "Alex Thompson",
    currentXP: 2450,
    xpToNext: 3000,
    currentLevel: 5,
    streak: 12,
    badges: 8
  };

  const handleBadgeClick = () => {
    setShowConfetti(true);
  };

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
              Welcome back, {user.name}! 👋
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
                <div className="text-2xl font-bold text-foreground">{user.currentXP.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total XP</div>
              </CardContent>
            </Card>

            <Card 
              className="modern-card hover:shadow-lg transition-all text-center cursor-pointer" 
              onClick={handleBadgeClick}
            >
              <CardContent className="p-6">
                <div className="text-4xl mb-2">🔥</div>
                <div className="text-2xl font-bold text-foreground">{user.streak} days</div>
                <div className="text-sm text-muted-foreground">Current Streak</div>
              </CardContent>
            </Card>

            <Card className="modern-card hover:shadow-lg transition-all text-center">
              <CardContent className="p-6">
                <div className="text-4xl mb-2">🏆</div>
                <div className="text-2xl font-bold text-foreground">{user.badges}</div>
                <div className="text-sm text-muted-foreground">Badges Earned</div>
              </CardContent>
            </Card>
          </div>

          {/* XP Progress Circle */}
          <Card className="modern-card mb-8">
            <CardContent className="text-center p-8">
              <h3 className="text-lg font-semibold mb-6">Level {user.currentLevel} Progress</h3>
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
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - user.currentXP / user.xpToNext)}`}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-bold">{Math.round((user.currentXP / user.xpToNext) * 100)}%</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {user.xpToNext - user.currentXP} XP to Level {user.currentLevel + 1}
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