import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ReportsList } from "@/components/reports/ReportsList";
import { ReportDetail } from "@/components/reports/ReportDetail";

const mockReports = [
  {
    id: "1",
    scanType: "Eye Scan",
    date: "Nov 28, 2024",
    percentage: 82,
    status: "good" as const,
  },
  {
    id: "2",
    scanType: "Teeth Scan",
    date: "Nov 26, 2024",
    percentage: 71,
    status: "warning" as const,
  },
  {
    id: "3",
    scanType: "Skin Scan",
    date: "Nov 24, 2024",
    percentage: 88,
    status: "good" as const,
  },
  {
    id: "4",
    scanType: "Eye Scan",
    date: "Nov 20, 2024",
    percentage: 75,
    status: "good" as const,
  },
  {
    id: "5",
    scanType: "Teeth Scan",
    date: "Nov 18, 2024",
    percentage: 45,
    status: "critical" as const,
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

const Reports = () => {
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  if (selectedReportId) {
    return (
      <MainLayout>
        <div className="max-w-5xl mx-auto">
          <ReportDetail
            report={mockReportDetail}
            onBack={() => setSelectedReportId(null)}
          />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1">
            View your scan history and detailed reports
          </p>
        </div>

        <ReportsList
          reports={mockReports}
          onViewReport={(id) => setSelectedReportId(id)}
        />
      </div>
    </MainLayout>
  );
};

export default Reports;
