import { Droplets, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const hkChecklists = [
  { name: "Cafeteria Checklist", frequency: "Daily", items: 12, lastDone: "Today", status: "completed" },
  { name: "Washroom Checklist", frequency: "3x Daily", items: 8, lastDone: "2 hrs ago", status: "completed" },
  { name: "Lawn & Garden Checklist", frequency: "Daily", items: 6, lastDone: "Today", status: "pending" },
  { name: "Common Area Checklist", frequency: "Daily", items: 10, lastDone: "Yesterday", status: "overdue" },
];

const HousekeepingPage = () => (
  <div className="p-6">
    <div className="mb-6">
      <h1 className="text-xl font-bold font-display text-foreground">Housekeeping Checklists</h1>
      <p className="text-sm text-muted-foreground">Cleaning & maintenance inspections</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {hkChecklists.map((item) => (
        <div key={item.name} className="bg-card rounded-xl border border-border shadow-sm p-4 hover:border-primary/30 transition-all duration-150 cursor-pointer group">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                item.status === "overdue" ? "bg-destructive/10" : item.status === "pending" ? "bg-warning/10" : "bg-success/10"
              )}>
                <Droplets className={cn("w-5 h-5",
                  item.status === "overdue" ? "text-destructive" : item.status === "pending" ? "text-warning" : "text-success"
                )} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.frequency} · {item.items} items</p>
                <p className="text-xs text-muted-foreground mt-0.5">Last done: {item.lastDone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn("text-xs font-medium px-2 py-1 rounded-full",
                item.status === "overdue" ? "bg-destructive/10 text-destructive" :
                item.status === "pending" ? "bg-warning/10 text-warning" :
                "bg-success/10 text-success"
              )}>
                {item.status}
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default HousekeepingPage;
