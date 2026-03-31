import { AlertTriangle, FileText, Upload, Calendar, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AMCContract {
  id: string;
  vendor: string;
  equipment: string;
  startDate: string;
  endDate: string;
  value: string;
  status: "active" | "expiring_soon" | "expired";
  daysLeft: number;
}

const mockContracts: AMCContract[] = [
  { id: "AMC-001", vendor: "ThyssenKrupp", equipment: "Passenger Lift #1", startDate: "2025-04-15", endDate: "2026-04-15", value: "₹3,50,000", status: "active", daysLeft: 32 },
  { id: "AMC-002", vendor: "Kirloskar", equipment: "DG Set 500 KVA", startDate: "2025-03-28", endDate: "2026-03-28", value: "₹1,80,000", status: "expiring_soon", daysLeft: 14 },
  { id: "AMC-003", vendor: "Daikin India", equipment: "All HVAC Units", startDate: "2025-06-01", endDate: "2026-06-01", value: "₹5,20,000", status: "active", daysLeft: 79 },
  { id: "AMC-004", vendor: "Grundfos", equipment: "Fire Pumps", startDate: "2025-01-01", endDate: "2026-01-01", value: "₹95,000", status: "expired", daysLeft: -73 },
  { id: "AMC-005", vendor: "KONE", equipment: "Service Lift", startDate: "2025-05-01", endDate: "2026-05-01", value: "₹2,80,000", status: "active", daysLeft: 48 },
];

const statusStyles = {
  active: "bg-success/10 text-success border-success/20",
  expiring_soon: "bg-warning/10 text-warning border-warning/20",
  expired: "bg-destructive/10 text-destructive border-destructive/20",
};

const AMCPage = () => (
  <div className="p-6">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-bold font-display text-foreground">AMC Tracking</h1>
        <p className="text-sm text-muted-foreground">Annual Maintenance Contracts</p>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all duration-150">
        <Upload className="w-4 h-4" /> Add Contract
      </button>
    </div>

    <div className="space-y-3">
      {mockContracts.map((contract) => (
        <div key={contract.id} className={cn("bg-card rounded-xl border shadow-sm p-4", statusStyles[contract.status])}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-muted-foreground">{contract.id}</span>
                <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full",
                  contract.status === "active" ? "bg-success/10 text-success" :
                  contract.status === "expiring_soon" ? "bg-warning/10 text-warning pulse-warning" :
                  "bg-destructive/10 text-destructive"
                )}>
                  {contract.status.replace("_", " ")}
                </span>
              </div>
              <p className="text-sm font-semibold text-foreground">{contract.equipment}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                <Building2 className="w-3 h-3 inline mr-1" />{contract.vendor}
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span><Calendar className="w-3 h-3 inline mr-1" />{contract.startDate} → {contract.endDate}</span>
                <span><FileText className="w-3 h-3 inline mr-1" />{contract.value}</span>
              </div>
            </div>
            <div className={cn("text-right",
              contract.daysLeft <= 0 ? "text-destructive" :
              contract.daysLeft <= 15 ? "text-warning" : "text-success"
            )}>
              <p className="text-2xl font-bold font-display">
                {contract.daysLeft <= 0 ? "Expired" : `${contract.daysLeft}d`}
              </p>
              <p className="text-xs">remaining</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AMCPage;
