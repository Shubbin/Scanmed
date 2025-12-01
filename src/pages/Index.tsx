import { MainLayout } from "@/components/layout/MainLayout";
import { HealthScoreCard } from "@/components/dashboard/HealthScoreCard";
import { ScanResultCard } from "@/components/dashboard/ScanResultCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Eye, Smile, User } from "lucide-react";

const Index = () => {
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
          healthScore={overallScore}
        />

        {/* Recent Scan Results */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Scan Results</h2>
          <div className="grid md:grid-cols-3 gap-4">
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

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <QuickActions />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
