import { Building2, Search, Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Asset {
  id: string;
  name: string;
  category: string;
  location: string;
  status: "running" | "under_maintenance" | "non_operational";
  amcStatus: "active" | "expired" | "not_applicable";
  lastService: string;
}

const mockAssets: Asset[] = [
  { id: "AST-001", name: "DG Set – 500 KVA", category: "Power", location: "DG Room", status: "running", amcStatus: "active", lastService: "2026-02-15" },
  { id: "AST-002", name: "Passenger Lift #1", category: "Vertical Transport", location: "Main Building", status: "running", amcStatus: "active", lastService: "2026-03-01" },
  { id: "AST-003", name: "Transformer 1000 KVA", category: "Power", location: "Substation", status: "running", amcStatus: "not_applicable", lastService: "2026-01-20" },
  { id: "AST-004", name: "Split AC – Floor 3", category: "HVAC", location: "Floor 3", status: "under_maintenance", amcStatus: "expired", lastService: "2025-12-10" },
  { id: "AST-005", name: "RO Plant 500 LPH", category: "Water Treatment", location: "Utility Block", status: "running", amcStatus: "active", lastService: "2026-03-10" },
  { id: "AST-006", name: "Fire Hydrant Pump", category: "Fire & Safety", location: "Pump Room", status: "running", amcStatus: "active", lastService: "2026-02-28" },
  { id: "AST-007", name: "STP Plant 50 KLD", category: "Water Treatment", location: "Basement", status: "running", amcStatus: "active", lastService: "2026-03-05" },
  { id: "AST-008", name: "UPS 20 KVA", category: "Power", location: "Server Room", status: "non_operational", amcStatus: "expired", lastService: "2025-11-15" },
];

const statusColors = {
  running: "bg-success/10 text-success",
  under_maintenance: "bg-warning/10 text-warning",
  non_operational: "bg-destructive/10 text-destructive",
};

const amcColors = {
  active: "bg-success/10 text-success",
  expired: "bg-destructive/10 text-destructive pulse-warning",
  not_applicable: "bg-muted text-muted-foreground",
};

const AssetsPage = () => {
  const [search, setSearch] = useState("");
  const filtered = mockAssets.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold font-display text-foreground">Asset Management</h1>
          <p className="text-sm text-muted-foreground">{mockAssets.length} assets registered</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all duration-150">
          <Plus className="w-4 h-4" /> Add Asset
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search assets..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-foreground">ID</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Asset Name</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Category</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Location</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">AMC</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Last Service</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((asset) => (
                <tr key={asset.id} className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{asset.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{asset.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{asset.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">{asset.location}</td>
                  <td className="px-4 py-3">
                    <span className={cn("text-xs font-medium px-2 py-1 rounded-full", statusColors[asset.status])}>
                      {asset.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("text-xs font-medium px-2 py-1 rounded-full", amcColors[asset.amcStatus])}>
                      {asset.amcStatus.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{asset.lastService}</td>
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
    </div>
  );
};

export default AssetsPage;
