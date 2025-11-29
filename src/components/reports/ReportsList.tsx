import { Eye, FileText, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Report {
  id: string;
  scanType: string;
  date: string;
  percentage: number;
  status: "good" | "warning" | "critical";
}

interface ReportsListProps {
  reports: Report[];
  onViewReport?: (id: string) => void;
  className?: string;
}

export function ReportsList({ reports, onViewReport, className }: ReportsListProps) {
  const getStatusColor = (status: Report["status"]) => {
    switch (status) {
      case "good":
        return "bg-medical-green-light text-success";
      case "warning":
        return "bg-medical-orange-light text-warning";
      case "critical":
        return "bg-destructive/10 text-destructive";
    }
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className={cn("space-y-3", className)}>
      {reports.map((report) => (
        <div
          key={report.id}
          className="medical-card-hover flex items-center justify-between p-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">{report.scanType}</h4>
              <p className="text-sm text-muted-foreground">{report.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className={cn("text-xl font-bold", getPercentageColor(report.percentage))}>
                {report.percentage}%
              </p>
              <span className={cn("text-xs px-2 py-0.5 rounded-full", getStatusColor(report.status))}>
                {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onViewReport?.(report.id)}
              className="text-muted-foreground hover:text-primary"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
