import { Eye, Smile, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { HealthScoreCard } from "@/components/dashboard/HealthScoreCard";
import { ScanCard } from "@/components/dashboard/ScanCard";
import { RecentInsights } from "@/components/dashboard/RecentInsights";
import { QuickActions } from "@/components/dashboard/QuickActions";

const Index = () => {
  const navigate = useNavigate();

  const scanTypes = [
    {
      title: "Eye Scan",
      description: "Scan your eyes for irritation, redness, or early infections.",
      icon: Eye,
      buttonText: "Start Eye Scan",
    },
    {
      title: "Teeth Scan",
      description: "Analyze your teeth for dental health insights.",
      icon: Smile,
      buttonText: "Start Teeth Scan",
    },
    {
      title: "Face/Skin Scan",
      description: "Detect skin issues or inflammation.",
      icon: User,
      buttonText: "Start Skin Scan",
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
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
          healthScore={77}
        />

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <QuickActions />
        </div>

        {/* Scan Cards */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Start a Scan</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scanTypes.map((scan) => (
              <ScanCard
                key={scan.title}
                {...scan}
                onClick={() => navigate("/scan")}
              />
            ))}
          </div>
        </div>

        {/* Recent Insights */}
        <div className="grid lg:grid-cols-2 gap-6">
          <RecentInsights
            scanType="Eye Scan"
            resultSummary="Your recent eye scan shows healthy results with minor signs of digital strain. Consider the 20-20-20 rule for eye rest."
            percentage={82}
            onViewReport={() => navigate("/reports")}
          />
          <RecentInsights
            scanType="Teeth Scan"
            resultSummary="Dental analysis indicates good overall health. Light plaque buildup detected on back molars. Regular flossing recommended."
            percentage={71}
            onViewReport={() => navigate("/reports")}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
