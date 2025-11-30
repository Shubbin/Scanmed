import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Scan, 
  MessageCircle, 
  Clock, 
  ChevronRight,
  Menu,
  X,
  Pill,
  BookOpen,
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Scan", path: "/scan", icon: Scan },
  { name: "Chat", path: "/chat", icon: MessageCircle },
  { name: "Recent Chats", path: "/recent-chats", icon: Clock },
  { name: "Med Buddy", path: "/med-buddy", icon: Pill },
  { name: "Health Blog", path: "/health-blog", icon: BookOpen },
  { name: "Settings", path: "/settings", icon: Settings },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = {
    name: "Mohamed Omar",
    username: "@mohamedomar",
    initials: "MO",
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-lg shadow-medical border border-border"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-foreground/20 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        {/* Mobile close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-medical flex items-center justify-center">
              <Scan className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">ScanMed</span>
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
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* User profile */}
        <div className="p-4 border-t border-sidebar-border space-y-2">
          <NavLink
            to="/settings"
            onClick={() => setMobileOpen(false)}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full gradient-medical flex items-center justify-center text-primary-foreground font-semibold text-sm">
              {user.initials}
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.username}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </NavLink>
          <button
            onClick={() => {
              setMobileOpen(false);
              // Navigate to auth page for logout
              window.location.href = "/auth";
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
