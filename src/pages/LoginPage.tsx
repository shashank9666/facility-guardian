import { useAuth, type UserRole } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Shield, Wrench, Eye, Settings, Crown } from "lucide-react";

const roles: { role: UserRole; label: string; icon: React.ReactNode; description: string }[] = [
  { role: "technician", label: "Technician", icon: <Wrench className="w-6 h-6" />, description: "Daily checklists, PPM & logbooks" },
  { role: "supervisor", label: "Supervisor", icon: <Eye className="w-6 h-6" />, description: "Dashboard monitoring & service requests" },
  { role: "admin", label: "Admin", icon: <Settings className="w-6 h-6" />, description: "Assets, AMC, reports & SOPs" },
  { role: "superadmin", label: "Super Admin", icon: <Crown className="w-6 h-6" />, description: "Full system control & analytics" },
];

const LoginPage = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary mb-4">
            <Shield className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold font-display text-foreground">FacilityOps</h1>
          <p className="text-muted-foreground mt-1 text-sm">Facility Operation & Maintenance Suite</p>
        </div>

        <div className="bg-card rounded-xl border border-border shadow-sm p-6">
          <p className="text-sm font-medium text-muted-foreground mb-4">Select your role to continue</p>
          <div className="grid gap-3">
            {roles.map((r, i) => (
              <motion.button
                key={r.role}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.15 }}
                onClick={() => login(r.role)}
                className="flex items-center gap-4 w-full p-4 rounded-lg border border-border bg-background hover:bg-accent hover:border-primary/30 transition-all duration-150 text-left group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-150">
                  {r.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{r.label}</p>
                  <p className="text-xs text-muted-foreground">{r.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
