import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard, ClipboardCheck, Wrench, FileText, ShieldCheck,
  Building2, Gauge, BookOpen, AlertTriangle, Settings, LogOut,
  ChevronLeft, ChevronRight, Flame, Droplets
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: string[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" />, roles: ["supervisor", "admin", "superadmin"] },
  { label: "MEP Checklists", path: "/checklists", icon: <ClipboardCheck className="w-5 h-5" />, roles: ["technician", "supervisor", "admin", "superadmin"] },
  { label: "Logbooks", path: "/logbooks", icon: <BookOpen className="w-5 h-5" />, roles: ["technician", "supervisor", "admin", "superadmin"] },
  { label: "Service Requests", path: "/service-requests", icon: <Wrench className="w-5 h-5" />, roles: ["technician", "supervisor", "admin", "superadmin"] },
  { label: "Assets", path: "/assets", icon: <Building2 className="w-5 h-5" />, roles: ["admin", "superadmin"] },
  { label: "AMC Tracking", path: "/amc", icon: <AlertTriangle className="w-5 h-5" />, roles: ["admin", "superadmin"] },
  { label: "Meter Readings", path: "/meters", icon: <Gauge className="w-5 h-5" />, roles: ["technician", "supervisor", "admin", "superadmin"] },
  { label: "Fire & Safety", path: "/fire-safety", icon: <Flame className="w-5 h-5" />, roles: ["technician", "supervisor", "admin", "superadmin"] },
  { label: "Housekeeping", path: "/housekeeping", icon: <Droplets className="w-5 h-5" />, roles: ["technician", "supervisor", "admin", "superadmin"] },
  { label: "SOP & Certificates", path: "/sop", icon: <FileText className="w-5 h-5" />, roles: ["admin", "superadmin"] },
  { label: "Reports", path: "/reports", icon: <ShieldCheck className="w-5 h-5" />, roles: ["admin", "superadmin"] },
  { label: "User Management", path: "/users", icon: <Settings className="w-5 h-5" />, roles: ["superadmin"] },
];

const AppSidebar = () => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const filteredItems = navItems.filter((item) => user && item.roles.includes(user.role));

  return (
    <aside className={cn(
      "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-150",
      collapsed ? "w-16" : "w-60"
    )}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-sidebar-border flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="w-4 h-4 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && <span className="font-bold text-sm text-sidebar-accent-foreground font-display">FacilityOps</span>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {filteredItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 mb-0.5",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
            title={collapsed ? item.label : undefined}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-2">
        {!collapsed && user && (
          <div className="px-3 py-2 mb-1">
            <p className="text-xs font-medium text-sidebar-accent-foreground truncate">{user.name}</p>
            <p className="text-xs text-sidebar-muted capitalize">{user.role}</p>
          </div>
        )}
        <div className="flex items-center gap-1">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-150 flex-1"
            title="Logout"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-150"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
