import { useState } from "react";
import { Plus, Clock, CheckCircle2, AlertCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  location: string;
  raisedBy: string;
  raisedAt: string;
  status: "open" | "assigned" | "in_progress" | "completed" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  assignedTo?: string;
}

const mockRequests: ServiceRequest[] = [
  { id: "SR-042", title: "AC not cooling in Room 302", description: "Split AC unit not blowing cold air since morning", location: "Floor 3, Room 302", raisedBy: "Dr. Mehta", raisedAt: "2026-03-14 09:30", status: "open", priority: "high" },
  { id: "SR-041", title: "Water leakage in washroom", description: "Continuous dripping from ceiling pipe", location: "Floor 2, Washroom B", raisedBy: "Housekeeping", raisedAt: "2026-03-14 08:15", status: "assigned", priority: "critical", assignedTo: "Ravi Kumar" },
  { id: "SR-040", title: "Light flickering in lobby", description: "Main lobby lights flickering intermittently", location: "Ground Floor, Lobby", raisedBy: "Security", raisedAt: "2026-03-13 16:45", status: "in_progress", priority: "medium", assignedTo: "Suresh B." },
  { id: "SR-039", title: "UPS beeping alarm", description: "UPS making continuous beep sound", location: "Server Room", raisedBy: "IT Dept", raisedAt: "2026-03-13 14:20", status: "completed", priority: "high", assignedTo: "Ravi Kumar" },
  { id: "SR-038", title: "Broken door handle", description: "Door handle of conference room loose", location: "Floor 1, Conf Room A", raisedBy: "Admin", raisedAt: "2026-03-13 11:00", status: "closed", priority: "low", assignedTo: "Mohan S." },
];

const statusConfig = {
  open: { label: "Open", color: "bg-warning/10 text-warning", icon: AlertCircle },
  assigned: { label: "Assigned", color: "bg-primary/10 text-primary", icon: Clock },
  in_progress: { label: "In Progress", color: "bg-primary/10 text-primary", icon: Clock },
  completed: { label: "Completed", color: "bg-success/10 text-success", icon: CheckCircle2 },
  closed: { label: "Closed", color: "bg-muted text-muted-foreground", icon: CheckCircle2 },
};

const priorityConfig = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-primary/10 text-primary",
  high: "bg-warning/10 text-warning",
  critical: "bg-destructive/10 text-destructive pulse-warning",
};

const ServiceRequestsPage = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<string>("all");
  const [showForm, setShowForm] = useState(false);

  const filtered = filter === "all" ? mockRequests : mockRequests.filter((r) => r.status === filter);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold font-display text-foreground">Service Requests</h1>
          <p className="text-sm text-muted-foreground">{mockRequests.length} total requests</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all duration-150"
        >
          <Plus className="w-4 h-4" /> New Request
        </button>
      </div>

      {/* New Request Form */}
      {showForm && (
        <div className="bg-card rounded-xl border border-border shadow-sm p-4 mb-6 slide-in">
          <h2 className="text-sm font-semibold text-foreground mb-3">Raise New Service Request</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input placeholder="Title" className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input placeholder="Location" className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <textarea placeholder="Description" rows={2} className="md:col-span-2 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
            <select className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option>Low</option>
              <option>Medium</option>
              <option selected>High</option>
              <option>Critical</option>
            </select>
            <button
              onClick={() => { setShowForm(false); alert("Service Request submitted! (Demo mode)"); }}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all duration-150"
            >
              Submit Request
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {["all", "open", "assigned", "in_progress", "completed", "closed"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150",
              filter === s ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:border-primary/30"
            )}
          >
            {s === "all" ? "All" : s.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Request List */}
      <div className="space-y-2">
        {filtered.map((req) => {
          const StatusIcon = statusConfig[req.status].icon;
          return (
            <div key={req.id} className="bg-card rounded-xl border border-border shadow-sm p-4 hover:border-primary/20 transition-all duration-150">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-muted-foreground">{req.id}</span>
                    <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", priorityConfig[req.priority])}>
                      {req.priority}
                    </span>
                    <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1", statusConfig[req.status].color)}>
                      <StatusIcon className="w-3 h-3" /> {statusConfig[req.status].label}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{req.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{req.location} · {req.raisedBy} · {req.raisedAt}</p>
                  {req.assignedTo && (
                    <p className="text-xs text-primary mt-1">Assigned to: {req.assignedTo}</p>
                  )}
                </div>
                {(user?.role === "supervisor" || user?.role === "admin" || user?.role === "superadmin") && (
                  <button className="p-2 rounded-lg hover:bg-accent transition-colors">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceRequestsPage;
