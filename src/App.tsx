
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { UserModeProvider } from '@/components/UserModeContext';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/hooks/use-auth';
import LoadingSpinner from '@/components/LoadingSpinner';

// Critical pages (loaded immediately)
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import AuthPage from '@/pages/AuthPage';
import SplashScreen from '@/pages/SplashScreen';

// Lazy loaded pages (loaded when needed)
const KycVerification = React.lazy(() => import('@/pages/KycVerification'));
const TransactionSetup = React.lazy(() => import('@/pages/TransactionSetup'));
const InitiateTransaction = React.lazy(() => import('@/pages/InitiateTransaction'));
const Payment = React.lazy(() => import('@/pages/Payment'));
const TransactionStatus = React.lazy(() => import('@/pages/TransactionStatus'));
const Transactions = React.lazy(() => import('@/pages/Transactions'));
const Notifications = React.lazy(() => import('@/pages/Notifications'));
const AgreementSent = React.lazy(() => import('@/pages/AgreementSent'));
const AgreementReceived = React.lazy(() => import('@/pages/AgreementReceived'));
const AiAgreementGeneration = React.lazy(() => import('@/pages/AiAgreementGeneration'));
const Profile = React.lazy(() => import('@/pages/Profile'));
const Help = React.lazy(() => import('@/pages/Help'));
const Listings = React.lazy(() => import('@/pages/Listings'));
const ListingDetails = React.lazy(() => import('@/pages/ListingDetails'));
const Dispute = React.lazy(() => import('@/pages/Dispute'));
const Disputes = React.lazy(() => import('@/pages/Disputes'));
const DisputeResolution = React.lazy(() => import('@/pages/DisputeResolution'));
const OnboardingPage = React.lazy(() => import('@/pages/OnboardingPage'));
const ProfileSetup = React.lazy(() => import('@/pages/ProfileSetup'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));
const Contracts = React.lazy(() => import('@/pages/Contracts'));
const ContractDetail = React.lazy(() => import('@/pages/ContractDetail'));
const DebugTransaction = React.lazy(() => import('@/pages/DebugTransaction'));


import './App.css';

const queryClient = new QueryClient();

function App() {
  const { theme } = useTheme();
  const { initialize } = useAuth();

  // Initialize auth on app start
  React.useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserModeProvider>
        <div className={`app ${theme}`}>
          <Router>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/splash" element={<SplashScreen />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/kyc-verification" element={<KycVerification />} />
                <Route path="/profile-setup" element={<ProfileSetup />} />
                <Route path="/transaction-setup" element={<TransactionSetup />} />
                <Route path="/initiate-transaction" element={<InitiateTransaction />} />
                <Route path="/ai-agreement-generation" element={<AiAgreementGeneration />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/transaction-status/:id" element={<TransactionStatus />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/contracts" element={<Contracts />} />
                <Route path="/contract/:contractId" element={<ContractDetail />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/agreement-sent" element={<AgreementSent />} />
                <Route path="/agreement/:id" element={<AgreementReceived />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/help" element={<Help />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/listing/:id" element={<ListingDetails />} />
                <Route path="/dispute/:id" element={<Dispute />} />
                <Route path="/disputes" element={<Disputes />} />
                <Route path="/dispute-resolution/:id" element={<DisputeResolution />} />
                <Route path="/debug-transaction" element={<DebugTransaction />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Router>
          <Toaster />
        </div>
      </UserModeProvider>
    </QueryClientProvider>
  );
}

export default App;
