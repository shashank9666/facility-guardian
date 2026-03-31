import { BookOpen, ChevronRight } from "lucide-react";

const logbooks = [
  { id: "dg-running", name: "DG Running Log", description: "Record DG start/stop times, fuel consumption, load readings", lastEntry: "Today, 08:30 AM" },
  { id: "fire-diesel", name: "Fire Diesel Engine Log", description: "Fire pump diesel engine running records", lastEntry: "Yesterday, 10:00 AM" },
  { id: "water-supply", name: "Water Supply Log", description: "Daily water tank levels and supply records", lastEntry: "Today, 07:00 AM" },
];

const LogbooksPage = () => (
  <div className="p-6">
    <div className="mb-6">
      <h1 className="text-xl font-bold font-display text-foreground">Logbooks</h1>
      <p className="text-sm text-muted-foreground">MEP equipment running logs</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {logbooks.map((log) => (
        <div key={log.id} className="bg-card rounded-xl border border-border shadow-sm p-4 hover:border-primary/30 transition-all duration-150 cursor-pointer group">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{log.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{log.description}</p>
                <p className="text-xs text-primary mt-2">Last entry: {log.lastEntry}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default LogbooksPage;
