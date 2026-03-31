import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "warning" | "success" | "destructive";
  pulse?: boolean;
}

const variantStyles = {
  default: "bg-card border-border",
  warning: "bg-card border-warning/30",
  success: "bg-card border-success/30",
  destructive: "bg-card border-destructive/30",
};

const iconStyles = {
  default: "bg-primary/10 text-primary",
  warning: "bg-warning/10 text-warning",
  success: "bg-success/10 text-success",
  destructive: "bg-destructive/10 text-destructive",
};

const KPICard = ({ title, value, subtitle, icon: Icon, variant = "default", pulse }: KPICardProps) => (
  <div className={cn("rounded-xl border p-4 shadow-sm slide-in", variantStyles[variant])}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
        <p className={cn("text-2xl font-bold font-display mt-1 text-foreground", pulse && "pulse-warning")}>{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", iconStyles[variant])}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  </div>
);

export default KPICard;
