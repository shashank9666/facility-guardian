import { useAuth } from "@/contexts/AuthContext";
import KPICard from "@/components/KPICard";
import {
  ClipboardCheck, Wrench, AlertTriangle, CheckCircle2, Clock,
  FileWarning, TrendingUp, Users
} from "lucide-react";

const recentActivity = [
  { id: 1, text: "DG Daily Checklist completed", by: "Ravi Kumar", time: "10 min ago", type: "success" as const },
  { id: 2, text: "Service Request #SR-042 raised", by: "Floor 3 Staff", time: "25 min ago", type: "warning" as const },
  { id: 3, text: "AMC for Lift maintenance expiring", by: "System", time: "1 hr ago", type: "destructive" as const },
  { id: 4, text: "Fire pump checklist completed", by: "Ravi Kumar", time: "2 hrs ago", type: "success" as const },
  { id: 5, text: "RO Plant reading updated", by: "Suresh B.", time: "3 hrs ago", type: "success" as const },
];

const pendingChecklists = [
  { name: "Lift Daily Checklist", due: "Today", status: "overdue" },
  { name: "UPS Daily Check", due: "Today", status: "pending" },
  { name: "Transformer Weekly", due: "Tomorrow", status: "upcoming" },
  { name: "Split AC Fortnightly", due: "In 3 days", status: "upcoming" },
];

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold font-display text-foreground">
          Welcome back, {user?.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Pending Service Requests" value={12} subtitle="3 critical" icon={Wrench} variant="warning" />
        <KPICard title="Checklists Completed" value="18/24" subtitle="Today's progress" icon={ClipboardCheck} variant="success" />
        <KPICard title="AMC Expiring (30 days)" value={4} subtitle="Action required" icon={AlertTriangle} variant="destructive" pulse />
        <KPICard title="Technicians Active" value={8} subtitle="Out of 12" icon={Users} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Checklists */}
        <div className="lg:col-span-1 bg-card rounded-xl border border-border shadow-sm p-4">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-warning" />
            <h2 className="font-semibold text-sm font-display text-foreground">Pending Checklists</h2>
          </div>
          <div className="space-y-2">
            {pendingChecklists.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.due}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  item.status === "overdue" ? "bg-destructive/10 text-destructive" :
                  item.status === "pending" ? "bg-warning/10 text-warning" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-sm p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h2 className="font-semibold text-sm font-display text-foreground">Recent Activity</h2>
          </div>
          <div className="space-y-2">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  item.type === "success" ? "bg-success" :
                  item.type === "warning" ? "bg-warning" :
                  "bg-destructive"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{item.text}</p>
                  <p className="text-xs text-muted-foreground">{item.by} · {item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AMC Alerts */}
      <div className="mt-6 bg-card rounded-xl border border-warning/30 shadow-sm p-4">
        <div className="flex items-center gap-2 mb-4">
          <FileWarning className="w-4 h-4 text-warning pulse-warning" />
          <h2 className="font-semibold text-sm font-display text-foreground">AMC & Certificate Alerts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { name: "Lift AMC – ThyssenKrupp", expiry: "15 Apr 2026", days: 32 },
            { name: "DG AMC – Kirloskar", expiry: "28 Mar 2026", days: 14 },
            { name: "Fire NOC Certificate", expiry: "01 Apr 2026", days: 18 },
            { name: "Electrical Audit Certificate", expiry: "20 Mar 2026", days: 6 },
          ].map((item, i) => (
            <div key={i} className={`p-3 rounded-lg border ${
              item.days <= 7 ? "border-destructive/30 bg-destructive/5" :
              item.days <= 15 ? "border-warning/30 bg-warning/5" :
              "border-border bg-background"
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Expires: {item.expiry}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  item.days <= 7 ? "bg-destructive/10 text-destructive pulse-warning" :
                  item.days <= 15 ? "bg-warning/10 text-warning" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {item.days}d
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
