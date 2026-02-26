import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/Landing/ThemeProvider";
import ScrollToTop from "@/components/Landing/ScrollToTop";
import { useAuth } from '@/hooks/use-auth';
import { UserModeProvider } from '@/components/UserModeContext';

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
import Payment from "./pages/Payment";
import Listings from "./pages/Listings";
import Dispute from "./pages/Dispute";

const queryClient = new QueryClient();

const AppContent = () => {
  const { initialize } = useAuth();

  useEffect(() => {
    initialize();
    // Silently repair the broken contract_audit_trigger on startup
    supabase.functions.invoke('fix-contract-trigger').catch(() => {
      // ignore — edge function may not be deployed yet
    });
  }, [initialize]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Landing Pages Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
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
        <Route path="/app/contract/:contractId" element={<ContractDetail />} />
        <Route path="/app/agreement-sent" element={<AgreementSent />} />
        <Route path="/app/agreement-received" element={<AgreementReceived />} />
        <Route path="/app/onboarding" element={<OnboardingPage />} />
        <Route path="/app/notifications" element={<Notifications />} />
        <Route path="/app/help" element={<Help />} />
        <Route path="/app/index" element={<Index />} />
        <Route path="/app/payment" element={<Payment />} />
        <Route path="/app/listings" element={<Listings />} />
        <Route path="/app/raise-dispute/:id" element={<Dispute />} />
        <Route path="/app/dispute-resolution/:id" element={<DisputeResolution />} />

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
        <Route path="/raise-dispute/:id" element={<Dispute />} />
        <Route path="/dispute-resolution/:id" element={<DisputeResolution />} />
        <Route path="/contracts" element={<Contracts />} />
        <Route path="/contract/:contractId" element={<ContractDetail />} />
        <Route path="/agreement-sent" element={<AgreementSent />} />
        <Route path="/agreement-received" element={<AgreementReceived />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/help" element={<Help />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/listings" element={<Listings />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <UserModeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </UserModeProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
