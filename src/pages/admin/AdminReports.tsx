import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ReportsList } from "@/components/reports/ReportsList";
import { ReportDetail } from "@/components/reports/ReportDetail";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

const mockReports = [
  {
    id: "1",
    scanType: "Eye Scan - Mohamed Omar",
    date: "Nov 28, 2024",
    percentage: 82,
    status: "good" as const,
  },
  {
    id: "2",
    scanType: "Teeth Scan - Sarah Johnson",
    date: "Nov 27, 2024",
    percentage: 71,
    status: "warning" as const,
  },
  {
    id: "3",
    scanType: "Skin Scan - James Wilson",
    date: "Nov 26, 2024",
    percentage: 45,
    status: "critical" as const,
  },
  {
    id: "4",
    scanType: "Eye Scan - Emily Chen",
    date: "Nov 25, 2024",
    percentage: 88,
    status: "good" as const,
  },
  {
    id: "5",
    scanType: "Teeth Scan - Michael Brown",
    date: "Nov 24, 2024",
    percentage: 92,
    status: "good" as const,
  },
];

const mockReportDetail = {
  id: "1",
  scanType: "Eye Scan",
  date: "Nov 28, 2024",
  percentage: 82,
  diagnosis:
    "Overall eye health appears good. The scan detected minor signs of digital eye strain, which is common among individuals who spend extended periods looking at screens. No signs of infection or serious conditions were detected.",
  issues: [
    "Mild redness detected in both eyes",
    "Signs of digital eye strain",
    "Slight dryness around the corneal area",
  ],
  recommendations: [
    "Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds",
    "Use artificial tears to maintain eye moisture",
    "Reduce screen brightness and use blue light filters",
    "Ensure proper lighting when using digital devices",
    "Consider scheduling an eye exam if symptoms persist",
  ],
  severity: "low" as const,
};

const AdminReports = () => {
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  if (selectedReportId) {
    return (
      <AdminLayout>
        <div className="max-w-5xl mx-auto space-y-6">
          <ReportDetail
            report={mockReportDetail}
            onBack={() => setSelectedReportId(null)}
          />
          
          {/* Admin Notes Section */}
          <div className="medical-card">
            <h3 className="font-semibold text-foreground mb-4">Admin Notes</h3>
            <textarea
              placeholder="Add internal notes about this report..."
              className="w-full h-24 p-3 bg-muted rounded-lg text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button className="mt-3 gradient-medical text-primary-foreground">
              Save Notes
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports Management</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all user scan reports
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        <ReportsList
          reports={mockReports}
          onViewReport={(id) => setSelectedReportId(id)}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminReports;
