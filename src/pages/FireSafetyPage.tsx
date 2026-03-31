import { Flame, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const fireChecklists = [
  { name: "Fire Panel Alarm Check", frequency: "Daily", items: 8, lastDone: "Today", status: "completed" },
  { name: "Sprinkler System Check", frequency: "15 Days", items: 11, lastDone: "3 days ago", status: "completed" },
  { name: "Hose Reel Inspection", frequency: "Monthly", items: 6, lastDone: "2 weeks ago", status: "pending" },
  { name: "Pump House Inspection", frequency: "15 Days", items: 11, lastDone: "5 days ago", status: "completed" },
  { name: "Fire Extinguisher Check", frequency: "Monthly", items: 10, lastDone: "1 month ago", status: "overdue" },
  { name: "Hydrant Pump Check", frequency: "15 Days", items: 11, lastDone: "10 days ago", status: "completed" },
];

const FireSafetyPage = () => (
  <div className="p-6">
    <div className="mb-6">
      <h1 className="text-xl font-bold font-display text-foreground">Fire & Safety Checklists</h1>
      <p className="text-sm text-muted-foreground">Fire protection systems inspection</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {fireChecklists.map((item) => (
        <div key={item.name} className="bg-card rounded-xl border border-border shadow-sm p-4 hover:border-primary/30 transition-all duration-150 cursor-pointer group">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                item.status === "overdue" ? "bg-destructive/10" : item.status === "pending" ? "bg-warning/10" : "bg-success/10"
              )}>
                <Flame className={cn("w-5 h-5",
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
                item.status === "overdue" ? "bg-destructive/10 text-destructive pulse-warning" :
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

export default FireSafetyPage;
