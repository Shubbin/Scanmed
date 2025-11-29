import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  FileText, 
  MessageSquare, 
  Settings,
  ChevronRight,
  Shield,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { name: "Admin Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Scan Analytics", path: "/admin/analytics", icon: BarChart3 },
  { name: "Reports", path: "/admin/reports", icon: FileText },
  { name: "Chat Monitoring", path: "/admin/chats", icon: MessageSquare },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  className?: string;
}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const admin = {
    name: "Admin User",
    role: "Administrator",
    initials: "AD",
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-foreground rounded-lg shadow-medical"
      >
        <Menu className="w-5 h-5 text-background" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-foreground/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-foreground flex flex-col transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        {/* Mobile close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-1 text-muted-foreground hover:text-background"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-muted-foreground/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xl font-semibold text-background">ScanMed</span>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted-foreground/10 hover:text-background"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Admin profile */}
        <div className="p-4 border-t border-muted-foreground/20">
          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted-foreground/10 transition-colors">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
              {admin.initials}
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-background">{admin.name}</p>
              <p className="text-xs text-muted-foreground">{admin.role}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </aside>
    </>
  );
}
