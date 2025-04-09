
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import ReportHazard from "@/pages/ReportHazard";
import EmergencyAlerts from "@/pages/EmergencyAlerts";
import EvacuationRoutes from "@/pages/EvacuationRoutes";
import Dashboard from "@/pages/Dashboard";
import SafetyGuides from "@/pages/SafetyGuides";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/report-hazard" element={<ReportHazard />} />
              <Route path="/emergency-alerts" element={<EmergencyAlerts />} />
              <Route path="/evacuation-routes" element={<EvacuationRoutes />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/safety-guides" element={<SafetyGuides />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
