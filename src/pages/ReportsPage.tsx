import { BarChart3, Download } from "lucide-react";

const ReportsPage = () => (
  <div className="p-6">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-bold font-display text-foreground">Reports</h1>
        <p className="text-sm text-muted-foreground">Performance analytics & downloads</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { name: "Monthly Checklist Compliance", desc: "Completion rates for all MEP checklists" },
        { name: "Service Request Summary", desc: "Open vs closed requests, avg resolution time" },
        { name: "AMC Status Report", desc: "Active, expiring & expired contracts overview" },
        { name: "Technician Performance", desc: "Task completion and response times per technician" },
        { name: "Energy Consumption", desc: "DG running hours, HT meter trends" },
        { name: "Fire & Safety Audit", desc: "Compliance status of all fire systems" },
      ].map((report) => (
        <div key={report.name} className="bg-card rounded-xl border border-border shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{report.name}</p>
              <p className="text-xs text-muted-foreground">{report.desc}</p>
            </div>
          </div>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-accent transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default ReportsPage;
