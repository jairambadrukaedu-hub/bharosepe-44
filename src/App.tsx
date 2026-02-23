import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/Landing/ThemeProvider";
import ScrollToTop from "@/components/Landing/ScrollToTop";
import { useAuth } from '@/hooks/use-auth';

// Landing Pages
import Layout from "@/components/Landing/Layout";
import Home from "./pages/Landing/Home";
import HowItWorks from "./pages/Landing/HowItWorks";
import Buyers from "./pages/Landing/Buyers";
import Sellers from "./pages/Landing/Sellers";
import Contact from "./pages/Landing/Contact";
import NotFound from "./pages/Landing/NotFound";

// Application Pages
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import Profile from "./pages/Profile";
import TransactionSetup from "./pages/TransactionSetup";
import Transactions from "./pages/Transactions";
import TransactionStatus from "./pages/TransactionStatus";
import Disputes from "./pages/Disputes";
import DisputeResolution from "./pages/DisputeResolution";
import Contracts from "./pages/Contracts";
import ContractDetail from "./pages/ContractDetail";
import AgreementSent from "./pages/AgreementSent";
import AgreementReceived from "./pages/AgreementReceived";
import OnboardingPage from "./pages/OnboardingPage";
import Notifications from "./pages/Notifications";
import Help from "./pages/Help";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const AppContent = () => {
  const { initialize } = useAuth();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Previous Home Page (restored) */}
        <Route path="/" element={<Index />} />

        {/* Landing Pages Routes */}
        <Route element={<Layout />}>
          <Route path="/landing" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/buyers" element={<Buyers />} />
          <Route path="/sellers" element={<Sellers />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Application Routes (under /app prefix) */}
        <Route path="/app" element={<Dashboard />} />
        <Route path="/app/auth" element={<AuthPage />} />
        <Route path="/app/dashboard" element={<Dashboard />} />
        <Route path="/app/profile" element={<Profile />} />
        <Route path="/app/setup-transaction" element={<TransactionSetup />} />
        <Route path="/app/transactions" element={<Transactions />} />
        <Route path="/app/transaction/:id" element={<TransactionStatus />} />
        <Route path="/app/disputes" element={<Disputes />} />
        <Route path="/app/dispute/:id" element={<DisputeResolution />} />
        <Route path="/app/contracts" element={<Contracts />} />
        <Route path="/app/contract/:id" element={<ContractDetail />} />
        <Route path="/app/agreement-sent" element={<AgreementSent />} />
        <Route path="/app/agreement-received" element={<AgreementReceived />} />
        <Route path="/app/onboarding" element={<OnboardingPage />} />
        <Route path="/app/notifications" element={<Notifications />} />
        <Route path="/app/help" element={<Help />} />
        <Route path="/app/index" element={<Index />} />

        {/* Application Routes (without /app prefix — used by internal navigation) */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/transaction-setup" element={<TransactionSetup />} />
        <Route path="/setup-transaction" element={<TransactionSetup />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transaction/:id" element={<TransactionStatus />} />
        <Route path="/transaction-status/:id" element={<TransactionStatus />} />
        <Route path="/disputes" element={<Disputes />} />
        <Route path="/dispute/:id" element={<DisputeResolution />} />
        <Route path="/contracts" element={<Contracts />} />
        <Route path="/contract/:id" element={<ContractDetail />} />
        <Route path="/agreement-sent" element={<AgreementSent />} />
        <Route path="/agreement-received" element={<AgreementReceived />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/help" element={<Help />} />
        <Route path="/payment" element={<TransactionSetup />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
