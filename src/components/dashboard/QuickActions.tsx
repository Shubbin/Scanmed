import { Scan, MessageCircle, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface QuickActionsProps {
  className?: string;
}

export function QuickActions({ className }: QuickActionsProps) {
  const navigate = useNavigate();

  const actions = [
    { label: "Start New Scan", icon: Scan, path: "/scan" },
    { label: "Open Chat", icon: MessageCircle, path: "/chat" },
    { label: "View Reports", icon: FileText, path: "/reports" },
  ];

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {actions.map((action) => (
        <button
          key={action.path}
          onClick={() => navigate(action.path)}
          className="quick-action-btn"
        >
          <action.icon className="w-4 h-4 text-primary" />
          {action.label}
        </button>
      ))}
    </div>
  );
}
