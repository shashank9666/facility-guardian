import { Gauge, Plus } from "lucide-react";

const meterTypes = [
  { name: "Water Meter", readings: [{ date: "2026-03-14", value: "2450 KL", by: "Ravi K." }, { date: "2026-03-13", value: "2438 KL", by: "Ravi K." }] },
  { name: "HT Meter", readings: [{ date: "2026-03-14", value: "15,230 kWh", by: "Suresh B." }, { date: "2026-03-13", value: "15,180 kWh", by: "Suresh B." }] },
  { name: "STP Meter", readings: [{ date: "2026-03-14", value: "85 KLD", by: "Ravi K." }, { date: "2026-03-13", value: "82 KLD", by: "Ravi K." }] },
];

const MeterReadingsPage = () => (
  <div className="p-6">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-bold font-display text-foreground">Meter Readings</h1>
        <p className="text-sm text-muted-foreground">Daily utility meter records</p>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all duration-150">
        <Plus className="w-4 h-4" /> Add Reading
      </button>
    </div>
    <div className="space-y-4">
      {meterTypes.map((meter) => (
        <div key={meter.name} className="bg-card rounded-xl border border-border shadow-sm p-4">
          <div className="flex items-center gap-2 mb-3">
            <Gauge className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">{meter.name}</h2>
          </div>
          <div className="space-y-2">
            {meter.readings.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">{r.value}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
                <p className="text-xs text-muted-foreground">{r.by}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MeterReadingsPage;
