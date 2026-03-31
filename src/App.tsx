import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import ChecklistsPage from "@/pages/ChecklistsPage";
import ServiceRequestsPage from "@/pages/ServiceRequestsPage";
import AssetsPage from "@/pages/AssetsPage";
import AMCPage from "@/pages/AMCPage";
import LogbooksPage from "@/pages/LogbooksPage";
import MeterReadingsPage from "@/pages/MeterReadingsPage";
import FireSafetyPage from "@/pages/FireSafetyPage";
import HousekeepingPage from "@/pages/HousekeepingPage";
import SOPPage from "@/pages/SOPPage";
import ReportsPage from "@/pages/ReportsPage";
import UserManagementPage from "@/pages/UserManagementPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Technicians go to checklists by default
  const defaultRoute = user?.role === "technician" ? "/checklists" : "/dashboard";

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to={defaultRoute} replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="checklists" element={<ChecklistsPage />} />
        <Route path="logbooks" element={<LogbooksPage />} />
        <Route path="service-requests" element={<ServiceRequestsPage />} />
        <Route path="assets" element={<AssetsPage />} />
        <Route path="amc" element={<AMCPage />} />
        <Route path="meters" element={<MeterReadingsPage />} />
        <Route path="fire-safety" element={<FireSafetyPage />} />
        <Route path="housekeeping" element={<HousekeepingPage />} />
        <Route path="sop" element={<SOPPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/*" element={<ProtectedRoutes />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
