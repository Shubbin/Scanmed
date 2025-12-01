import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ScanResultCardProps {
  title: string;
  score: number;
  updatedAgo: string;
  icon: LucideIcon;
  className?: string;
}

export function ScanResultCard({
  title,
  score,
  updatedAgo,
  icon: Icon,
  className,
}: ScanResultCardProps) {
  const getStatus = (score: number) => {
    if (score >= 70) return { label: "Good", color: "bg-success/10 text-success border-success/20" };
    if (score >= 40) return { label: "Moderate", color: "bg-warning/10 text-warning border-warning/20" };
    return { label: "Critical", color: "bg-destructive/10 text-destructive border-destructive/20" };
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-success";
    if (score >= 40) return "text-warning";
    return "text-destructive";
  };

  const getIconBg = (score: number) => {
    if (score >= 70) return "bg-success/10 text-success";
    if (score >= 40) return "bg-warning/10 text-warning";
    return "bg-destructive/10 text-destructive";
  };

  const status = getStatus(score);

  return (
    <div className={cn("medical-card relative flex items-start gap-4", className)}>
      <div className={cn("p-3 rounded-xl", getIconBg(score))}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium border", status.color)}>
            {status.label}
          </span>
        </div>
        <p className={cn("text-3xl font-bold", getScoreColor(score))}>{score}%</p>
        <p className="text-xs text-muted-foreground mt-1">Updated {updatedAgo}</p>
      </div>
    </div>
  );
}
