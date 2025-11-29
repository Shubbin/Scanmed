import { Users, Scan, MessageSquare, FileText } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import { AnalyticsCharts } from "@/components/admin/AnalyticsCharts";

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
      title: "Total Scans",
      value: "15,432",
      change: "+8% from last month",
      changeType: "positive" as const,
      icon: Scan,
    },
    {
      title: "Active Chats",
      value: "342",
      change: "+23% from last month",
      changeType: "positive" as const,
      icon: MessageSquare,
    },
    {
      title: "Reports Generated",
      value: "12,891",
      change: "+5% from last month",
      changeType: "positive" as const,
      icon: FileText,
    },
  ];

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
