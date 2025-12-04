import { Users, Scan, MessageSquare, Eye, Smile, User } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import { AnalyticsCharts } from "@/components/admin/AnalyticsCharts";
import { ScanResultCard } from "@/components/dashboard/ScanResultCard";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12% from last month",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Eye Scans",
      value: "5,432",
      change: "+8% from last month",
      changeType: "positive" as const,
      icon: Eye,
    },
    {
      title: "Teeth Scans",
      value: "4,891",
      change: "+15% from last month",
      changeType: "positive" as const,
      icon: Smile,
    },
    {
      title: "Skin Scans",
      value: "3,209",
      change: "+5% from last month",
      changeType: "positive" as const,
      icon: User,
    },
  ];

  // Platform-wide scan health averages
  const platformScans = {
    eye: { score: 78, updatedAgo: "Real-time" },
    teeth: { score: 72, updatedAgo: "Real-time" },
    skin: { score: 65, updatedAgo: "Real-time" },
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of ScanMed platform performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Platform Health Scores */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Platform Health Averages</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <ScanResultCard
              title="Eye Scan Average"
              score={platformScans.eye.score}
              updatedAgo={platformScans.eye.updatedAgo}
              icon={Eye}
            />
            <ScanResultCard
              title="Teeth Scan Average"
              score={platformScans.teeth.score}
              updatedAgo={platformScans.teeth.updatedAgo}
              icon={Smile}
            />
            <ScanResultCard
              title="Skin Scan Average"
              score={platformScans.skin.score}
              updatedAgo={platformScans.skin.updatedAgo}
              icon={User}
            />
          </div>
        </div>

        {/* Analytics Charts */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Analytics</h2>
          <AnalyticsCharts />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
