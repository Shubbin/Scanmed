import { MainLayout } from "@/components/layout/MainLayout";
import { HealthScoreCard } from "@/components/dashboard/HealthScoreCard";
import { ScanResultCard } from "@/components/dashboard/ScanResultCard";
import { Eye, Smile, User, Scan, MessageCircle, Pill, ArrowRight, Sparkles, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  
  // Sample scan data
  const scanResults = {
    eye: { score: 30, updatedAgo: "2 hours ago" },
    teeth: { score: 40, updatedAgo: "5 hours ago" },
    skin: { score: 0, updatedAgo: "Not scanned yet" },
  };

  // Calculate overall health score (average of completed scans)
  const completedScans = [scanResults.eye, scanResults.teeth].filter(s => s.score > 0);
  const overallScore = completedScans.length > 0
    ? Math.round(completedScans.reduce((acc, s) => acc + s.score, 0) / completedScans.length)
    : 0;

  const recommendations = [
    { icon: Eye, title: "Eye Care", description: "Consider reducing screen time and using blue light glasses" },
    { icon: Smile, title: "Dental Health", description: "Schedule a professional cleaning within the next 2 weeks" },
    { icon: Lightbulb, title: "General Tip", description: "Stay hydrated - drink at least 8 glasses of water daily" },
  ];

  const quickActions = [
    { label: "Start New Scan", icon: Scan, path: "/scan" },
    { label: "Open Chat", icon: MessageCircle, path: "/chat" },
    { label: "Med Buddy", icon: Pill, path: "/med-buddy" },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor your health and start new scans</p>
        </div>

        {/* Health Score Card */}
        <HealthScoreCard
          userName="Mohamed Omar"
          initials="MO"
          lastScanDate="Nov 28, 2024"
          totalScans={12}
          healthScore={overallScore}
        />

        {/* AI Health Scanner Card */}
        <div className="medical-card flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="p-4 rounded-2xl bg-accent">
            <Scan className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">AI Health Scanner</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Get instant AI-powered insights about your eyes, teeth, and skin health. Early detection can make all the difference.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-accent text-primary rounded-full border border-primary/20">
                <Sparkles className="h-3 w-3" /> AI Powered
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-success border border-success/30 rounded-full">
                Instant Results
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-primary border border-primary/30 rounded-full">
                Free to Use
              </span>
            </div>
          </div>
          <Button 
            onClick={() => navigate("/scan")}
            className="gradient-medical text-primary-foreground shrink-0"
          >
            Start Scan
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Scan Results & Recommendations */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Scan Results */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Recent Scan Results</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <ScanResultCard
                  title="Eye Scan"
                  score={scanResults.eye.score}
                  updatedAgo={scanResults.eye.updatedAgo}
                  icon={Eye}
                />
                <ScanResultCard
                  title="Teeth Scan"
                  score={scanResults.teeth.score}
                  updatedAgo={scanResults.teeth.updatedAgo}
                  icon={Smile}
                />
                <ScanResultCard
                  title="Face / Skin Scan"
                  score={scanResults.skin.score}
                  updatedAgo={scanResults.skin.updatedAgo}
                  icon={User}
                />
              </div>
            </div>

            {/* Self Care Recommendations */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Self Care Recommendations</h2>
              <div className="medical-card space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 last:pb-0 border-b border-border last:border-0">
                    <div className="p-2.5 rounded-xl bg-accent shrink-0">
                      <rec.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">{rec.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="medical-card space-y-3">
              {quickActions.map((action) => (
                <button
                  key={action.path}
                  onClick={() => navigate(action.path)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-accent transition-colors group"
                >
                  <div className="p-2.5 rounded-xl bg-accent group-hover:bg-primary/10 transition-colors">
                    <action.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{action.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
