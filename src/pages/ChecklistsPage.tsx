import { useState } from "react";
import { CheckCircle2, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistItem {
  id: number;
  title: string;
  answerType: "choice" | "number" | "text";
  options?: string[];
  min?: number;
  max?: number;
}

interface ChecklistTemplate {
  id: string;
  name: string;
  frequency: string;
  items: ChecklistItem[];
}

const checklistTemplates: ChecklistTemplate[] = [
  {
    id: "dg",
    name: "DG Checklist",
    frequency: "Daily",
    items: [
      { id: 1, title: "Check the Engine oil Level", answerType: "number" },
      { id: 2, title: "Check the Radiator Condition", answerType: "choice", options: ["Ok", "Not Ok"] },
      { id: 3, title: "Check the V-Belt Condition", answerType: "choice", options: ["Normal", "Abnormal"] },
      { id: 4, title: "Check the Self Motor Condition", answerType: "choice", options: ["Ok", "Not Ok"] },
      { id: 5, title: "Check the Charger Alternator Condition", answerType: "choice", options: ["Ok", "Not Ok"] },
      { id: 6, title: "Note Down Battery Voltage", answerType: "number" },
      { id: 7, title: "Check the Radiator Coolant Level", answerType: "choice", options: ["High", "Medium", "Low"] },
      { id: 8, title: "Check the Fuel Level", answerType: "number" },
      { id: 9, title: "Check the Voltage (V1)", answerType: "number" },
      { id: 10, title: "Check the Voltage (V2)", answerType: "number" },
      { id: 11, title: "Check the Voltage (V3)", answerType: "number" },
      { id: 12, title: "Check the Filter Condition", answerType: "choice", options: ["Ok", "Not Ok"] },
      { id: 13, title: "Check the Proper Cleaning", answerType: "choice", options: ["Clean", "Not Clean"] },
      { id: 14, title: "Check the Oil Temperature", answerType: "number" },
      { id: 15, title: "Comments", answerType: "text" },
    ],
  },
  {
    id: "transformer",
    name: "Transformer Checklist",
    frequency: "Weekly",
    items: [
      { id: 1, title: "Check HT Fuse's", answerType: "choice", options: ["Ok", "Not Ok"] },
      { id: 2, title: "Check CT/PT Working Condition", answerType: "choice", options: ["Ok", "Not Ok"] },
      { id: 3, title: "Clean the panel with Air-Blower & Duster", answerType: "choice", options: ["Clean", "Not Clean"] },
      { id: 4, title: "Check Silicon Gel Colour", answerType: "choice", options: ["Blue", "Pink"] },
      { id: 5, title: "Check Main Neutral and Earth Connections", answerType: "choice", options: ["Ok", "Not Ok"] },
      { id: 6, title: "Comments", answerType: "text" },
    ],
  },
  {
    id: "lift",
    name: "Lift Daily Checklist",
    frequency: "Daily",
    items: [
      { id: 1, title: "Check the cleaning of the Car", answerType: "choice", options: ["Clean", "Not Clean"] },
      { id: 2, title: "Check Lift Car Emergency Light", answerType: "choice", options: ["Working", "Not Working"] },
      { id: 3, title: "Check Car COP button & Landing call button", answerType: "choice", options: ["Working", "Not Working"] },
      { id: 4, title: "Check Car Door status", answerType: "choice", options: ["Ok", "Not Ok"] },
      { id: 5, title: "Check Car Fan", answerType: "choice", options: ["Working", "Not Working"] },
      { id: 6, title: "Check Door sensor", answerType: "choice", options: ["Working", "Not Working"] },
      { id: 7, title: "Check Rope condition", answerType: "choice", options: ["Ok", "Not Ok"] },
      { id: 8, title: "Check Noise & vibration", answerType: "choice", options: ["Normal", "Abnormal"] },
      { id: 9, title: "Check Main control panel", answerType: "choice", options: ["Ok", "Not Ok"] },
      { id: 10, title: "Check Room cleaning", answerType: "choice", options: ["Clean", "Not Clean"] },
      { id: 11, title: "Air conditioning system", answerType: "choice", options: ["Working", "Not Working"] },
      { id: 12, title: "Comments", answerType: "text" },
    ],
  },
  {
    id: "ups",
    name: "UPS Daily Checklist",
    frequency: "Daily",
    items: [
      { id: 1, title: "Volts In", answerType: "number" },
      { id: 2, title: "Volts Out", answerType: "number" },
      { id: 3, title: "Amps In", answerType: "number" },
      { id: 4, title: "Amps Out", answerType: "number" },
      { id: 5, title: "Frequency In", answerType: "number" },
      { id: 6, title: "Frequency Out", answerType: "number" },
      { id: 7, title: "Battery Voltage", answerType: "number" },
      { id: 8, title: "Battery Charge AMPS", answerType: "number" },
      { id: 9, title: "Status", answerType: "choice", options: ["Working", "Not Working"] },
      { id: 10, title: "Remarks", answerType: "text" },
    ],
  },
  {
    id: "ro-plant",
    name: "RO Plant Checklist",
    frequency: "Daily",
    items: [
      { id: 1, title: "Sand Filter Backwash Start Time", answerType: "number" },
      { id: 2, title: "Sand Filter Backwash End Time", answerType: "number" },
      { id: 3, title: "Antiscalant Dosing Pump Condition", answerType: "choice", options: ["Ok", "Not Ok"] },
      { id: 4, title: "Replace Antiscalant Chemical in every 2 days", answerType: "choice", options: ["Done", "Not Done"] },
      { id: 5, title: "Check the cleaning of the Room", answerType: "choice", options: ["Clean", "Not Clean"] },
      { id: 6, title: "Hardness", answerType: "number" },
      { id: 7, title: "TDS", answerType: "number" },
      { id: 8, title: "PH", answerType: "number" },
      { id: 9, title: "Conductivity", answerType: "number" },
      { id: 10, title: "Inlet Pressure", answerType: "number" },
      { id: 11, title: "Remarks", answerType: "text" },
    ],
  },
  {
    id: "split-ac",
    name: "Split AC Checklist",
    frequency: "Fortnightly",
    items: [
      { id: 1, title: "Check Bush bearing of Split AC", answerType: "choice", options: ["Ok", "Not Ok"] },
      { id: 2, title: "Clean fan motor with duster", answerType: "choice", options: ["Clean", "Not Clean"] },
      { id: 3, title: "Check all speeds of motor continuity", answerType: "choice", options: ["Ok", "Not Ok"] },
      { id: 4, title: "Check Compressor for any overheating", answerType: "choice", options: ["No", "Yes"] },
      { id: 5, title: "Check Air Swing Motor", answerType: "choice", options: ["Working", "Not Working"] },
      { id: 6, title: "Remarks", answerType: "text" },
    ],
  },
];

const ChecklistsPage = () => {
  const [selectedChecklist, setSelectedChecklist] = useState<ChecklistTemplate | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (itemId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [itemId]: value }));
  };

  const completedCount = selectedChecklist
    ? selectedChecklist.items.filter((item) => answers[item.id]).length
    : 0;

  const handleSubmit = () => {
    alert("Checklist submitted successfully! (Demo mode)");
    setAnswers({});
    setSelectedChecklist(null);
  };

  if (selectedChecklist) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <button
          onClick={() => { setSelectedChecklist(null); setAnswers({}); }}
          className="text-sm text-primary hover:underline mb-4 inline-block"
        >
          ← Back to Checklists
        </button>

        <div className="bg-card rounded-xl border border-border shadow-sm p-4 mb-4">
          <h1 className="text-lg font-bold font-display text-foreground">{selectedChecklist.name}</h1>
          <p className="text-xs text-muted-foreground">{selectedChecklist.frequency} · {completedCount}/{selectedChecklist.items.length} completed</p>
          <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-success rounded-full transition-all duration-150"
              style={{ width: `${(completedCount / selectedChecklist.items.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {selectedChecklist.items.map((item) => (
            <div
              key={item.id}
              className={cn(
                "bg-card rounded-xl border shadow-sm p-4 transition-all duration-150",
                answers[item.id] ? "border-success/30" : "border-border"
              )}
            >
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold text-muted-foreground bg-muted w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {item.id}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground mb-2">{item.title}</p>

                  {item.answerType === "choice" && item.options && (
                    <div className="flex flex-wrap gap-2">
                      {item.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleAnswer(item.id, opt)}
                          className={cn(
                            "px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-150",
                            answers[item.id] === opt
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background text-foreground border-border hover:border-primary/30"
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {item.answerType === "number" && (
                    <input
                      type="number"
                      value={answers[item.id] || ""}
                      onChange={(e) => handleAnswer(item.id, e.target.value)}
                      placeholder="Enter value"
                      className="w-full max-w-xs px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  )}

                  {item.answerType === "text" && (
                    <textarea
                      value={answers[item.id] || ""}
                      onChange={(e) => handleAnswer(item.id, e.target.value)}
                      placeholder="Enter comments..."
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                    />
                  )}
                </div>
                {answers[item.id] && (
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={completedCount < selectedChecklist.items.length - 1}
          className={cn(
            "w-full mt-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150",
            completedCount >= selectedChecklist.items.length - 1
              ? "bg-primary text-primary-foreground hover:opacity-90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          Submit Checklist
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold font-display text-foreground">MEP Checklists</h1>
        <p className="text-sm text-muted-foreground">Select a checklist to fill</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {checklistTemplates.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => setSelectedChecklist(tpl)}
            className="bg-card rounded-xl border border-border shadow-sm p-4 text-left hover:border-primary/30 transition-all duration-150 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">{tpl.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{tpl.frequency} · {tpl.items.length} items</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChecklistsPage;
