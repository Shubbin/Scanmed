import { ArrowLeft, Download, Share2, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ReportDetailProps {
  report: {
    id: string;
    scanType: string;
    date: string;
    percentage: number;
    imageUrl?: string;
    diagnosis: string;
    issues: string[];
    recommendations: string[];
    severity: "low" | "medium" | "high";
  };
  onBack?: () => void;
  className?: string;
}

export function ReportDetail({ report, onBack, className }: ReportDetailProps) {
  const getSeverityConfig = (severity: ReportDetailProps["report"]["severity"]) => {
    switch (severity) {
      case "low":
        return { label: "Low", color: "bg-success/10 text-success", icon: CheckCircle };
      case "medium":
        return { label: "Medium", color: "bg-warning/10 text-warning", icon: Info };
      case "high":
        return { label: "High", color: "bg-destructive/10 text-destructive", icon: AlertTriangle };
    }
  };

  const severityConfig = getSeverityConfig(report.severity);
  const SeverityIcon = severityConfig.icon;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Reports
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button size="sm" className="gradient-medical text-primary-foreground">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Report content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left column - Image */}
        <div className="medical-card">
          <h3 className="font-semibold text-foreground mb-4">{report.scanType} Image</h3>
          <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
            {report.imageUrl ? (
              <img
                src={report.imageUrl}
                alt={report.scanType}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <p className="text-muted-foreground">Scan image preview</p>
            )}
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">{report.date}</span>
            <span className={cn("flex items-center gap-1.5 text-sm px-3 py-1 rounded-full", severityConfig.color)}>
              <SeverityIcon className="w-4 h-4" />
              {severityConfig.label} Severity
            </span>
          </div>
        </div>

        {/* Right column - Details */}
        <div className="space-y-6">
          {/* Diagnosis */}
          <div className="medical-card">
            <h3 className="font-semibold text-foreground mb-3">AI Diagnosis Summary</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {report.diagnosis}
            </p>
          </div>

          {/* Detected Issues */}
          <div className="medical-card">
            <h3 className="font-semibold text-foreground mb-3">Detected Issues</h3>
            <ul className="space-y-2">
              {report.issues.map((issue, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {issue}
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div className="medical-card">
            <h3 className="font-semibold text-foreground mb-3">Recommendations</h3>
            <ul className="space-y-2">
              {report.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
