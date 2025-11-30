import { cn } from "@/lib/utils";

interface ScanResultCardProps {
  title: string;
  score: number;
  updatedAgo: string;
  className?: string;
}

export function ScanResultCard({
  title,
  score,
  updatedAgo,
  className,
}: ScanResultCardProps) {
  const getStatus = (score: number) => {
    if (score >= 70) return { label: "Good", color: "bg-success/10 text-success" };
    if (score >= 40) return { label: "Moderate", color: "bg-warning/10 text-warning" };
    return { label: "Critical", color: "bg-destructive/10 text-destructive" };
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-success";
    if (score >= 40) return "text-warning";
    return "text-destructive";
  };

  const status = getStatus(score);

  return (
    <div className={cn("medical-card relative", className)}>
      <span className={cn("absolute top-4 right-4 text-xs px-2 py-1 rounded-full font-medium", status.color)}>
        {status.label}
      </span>
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
      <p className={cn("text-4xl font-bold mb-2", getScoreColor(score))}>{score}%</p>
      <p className="text-xs text-muted-foreground">Updated {updatedAgo}</p>
    </div>
  );
}
