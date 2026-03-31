import { FileText, Upload, Download, Eye } from "lucide-react";

const sops = [
  { name: "DG Operation SOP", uploadedBy: "Admin", date: "2026-02-01", type: "SOP" },
  { name: "Fire Emergency Procedure", uploadedBy: "Admin", date: "2026-01-15", type: "SOP" },
  { name: "Lift Rescue Protocol", uploadedBy: "Admin", date: "2025-12-20", type: "SOP" },
  { name: "Water Treatment Guidelines", uploadedBy: "Admin", date: "2026-01-10", type: "SOP" },
  { name: "Electrical Safety Manual", uploadedBy: "Admin", date: "2025-11-05", type: "SOP" },
];

const certificates = [
  { name: "Fire NOC Certificate", uploadedBy: "Admin", date: "2026-01-20", expiry: "2027-01-20", type: "Certificate" },
  { name: "Electrical Audit Report", uploadedBy: "Admin", date: "2025-09-15", expiry: "2026-03-20", type: "Certificate" },
  { name: "Lift Safety Certificate", uploadedBy: "Admin", date: "2025-10-01", expiry: "2026-10-01", type: "Certificate" },
  { name: "Pollution Control Board NOC", uploadedBy: "Admin", date: "2025-08-01", expiry: "2026-08-01", type: "Certificate" },
  { name: "Building Stability Certificate", uploadedBy: "Admin", date: "2025-06-15", expiry: "2027-06-15", type: "Certificate" },
];

const SOPPage = () => (
  <div className="p-6">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-bold font-display text-foreground">SOP & Certificates</h1>
        <p className="text-sm text-muted-foreground">Standard Operating Procedures & compliance documents</p>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all duration-150">
        <Upload className="w-4 h-4" /> Upload Document
      </button>
    </div>

    <h2 className="text-sm font-semibold text-foreground mb-3">Standard Operating Procedures</h2>
    <div className="space-y-2 mb-6">
      {sops.map((doc) => (
        <div key={doc.name} className="bg-card rounded-xl border border-border shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{doc.name}</p>
              <p className="text-xs text-muted-foreground">Uploaded: {doc.date} by {doc.uploadedBy}</p>
            </div>
          </div>
          <div className="flex gap-1">
            <button className="p-2 rounded-lg hover:bg-accent transition-colors"><Eye className="w-4 h-4 text-muted-foreground" /></button>
            <button className="p-2 rounded-lg hover:bg-accent transition-colors"><Download className="w-4 h-4 text-muted-foreground" /></button>
          </div>
        </div>
      ))}
    </div>

    <h2 className="text-sm font-semibold text-foreground mb-3">Certificates</h2>
    <div className="space-y-2">
      {certificates.map((doc) => (
        <div key={doc.name} className="bg-card rounded-xl border border-border shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{doc.name}</p>
              <p className="text-xs text-muted-foreground">Uploaded: {doc.date} · Expires: {doc.expiry}</p>
            </div>
          </div>
          <div className="flex gap-1">
            <button className="p-2 rounded-lg hover:bg-accent transition-colors"><Eye className="w-4 h-4 text-muted-foreground" /></button>
            <button className="p-2 rounded-lg hover:bg-accent transition-colors"><Download className="w-4 h-4 text-muted-foreground" /></button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SOPPage;
