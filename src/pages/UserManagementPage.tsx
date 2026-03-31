import { Users, Plus, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const mockUsers = [
  { id: "U-001", name: "Ravi Kumar", role: "technician", email: "ravi@facility.com", status: "active" },
  { id: "U-002", name: "Suresh B.", role: "technician", email: "suresh@facility.com", status: "active" },
  { id: "U-003", name: "Mohan S.", role: "technician", email: "mohan@facility.com", status: "inactive" },
  { id: "U-004", name: "Priya Sharma", role: "supervisor", email: "priya@facility.com", status: "active" },
  { id: "U-005", name: "Amit Patel", role: "admin", email: "amit@facility.com", status: "active" },
];

const roleColors: Record<string, string> = {
  technician: "bg-primary/10 text-primary",
  supervisor: "bg-warning/10 text-warning",
  admin: "bg-success/10 text-success",
  superadmin: "bg-destructive/10 text-destructive",
};

const UserManagementPage = () => (
  <div className="p-6">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-bold font-display text-foreground">User Management</h1>
        <p className="text-sm text-muted-foreground">Create and manage login IDs</p>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all duration-150">
        <Plus className="w-4 h-4" /> Add User
      </button>
    </div>

    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="text-left px-4 py-3 font-semibold text-foreground">ID</th>
            <th className="text-left px-4 py-3 font-semibold text-foreground">Name</th>
            <th className="text-left px-4 py-3 font-semibold text-foreground">Email</th>
            <th className="text-left px-4 py-3 font-semibold text-foreground">Role</th>
            <th className="text-left px-4 py-3 font-semibold text-foreground">Status</th>
            <th className="text-left px-4 py-3 font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map((u) => (
            <tr key={u.id} className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{u.id}</td>
              <td className="px-4 py-3 font-medium text-foreground">{u.name}</td>
              <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
              <td className="px-4 py-3">
                <span className={cn("text-xs font-medium px-2 py-1 rounded-full capitalize", roleColors[u.role])}>
                  {u.role}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={cn("text-xs font-medium px-2 py-1 rounded-full",
                  u.status === "active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                )}>
                  {u.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  <button className="p-1.5 rounded hover:bg-accent transition-colors"><Edit className="w-3.5 h-3.5 text-muted-foreground" /></button>
                  <button className="p-1.5 rounded hover:bg-destructive/10 transition-colors"><Trash2 className="w-3.5 h-3.5 text-destructive" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default UserManagementPage;
