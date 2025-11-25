
import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import BottomNavigation from '@/components/BottomNavigation';
import { useAuth } from '@/hooks/use-auth';
import { useProfile } from '@/hooks/use-profile';
import { useTransactions } from '@/hooks/use-transactions';
import { useContracts } from '@/hooks/use-contracts';
import { useUserModeContext } from '@/components/UserModeContext';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import ProfilePerformanceMetrics from '@/components/profile/ProfilePerformanceMetrics';
import ProfileRecentActivity from '@/components/profile/ProfileRecentActivity';
import ProfilePersonalInfo from '@/components/profile/ProfilePersonalInfo';
import ProfilePaymentInfo from '@/components/profile/ProfilePaymentInfo';
import ProfileActivityInfo from '@/components/profile/ProfileActivityInfo';


const Profile = () => {
  const { user } = useAuth();
  const { userMode } = useUserModeContext();
  const { profile, updateProfile, updateEmail, loading: profileLoading } = useProfile();
  const { transactions } = useTransactions(userMode);
  const { contracts, getContractAmount } = useContracts();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    panNumber: '',
    gstNumber: '',
    businessName: '',
    businessType: '',
    accountNumber: '••••••1234',
    ifscCode: '•••••0001',
    upiId: '',
    bio: 'Experienced trader with focus on electronics and services',
    location: 'Mumbai, Maharashtra',
    businessHours: '9 AM - 6 PM'
  });

  const [originalEmail, setOriginalEmail] = useState('');

  // Update form data when profile loads
  useEffect(() => {
    if (profile && user) {
      const currentEmail = user.email || '';
      setFormData({
        name: profile.full_name || user.user_metadata?.full_name || '',
        phone: profile.phone || '',
        email: currentEmail,
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        pincode: profile.pincode || '',
        panNumber: profile.pan_number || '',
        gstNumber: profile.gst_number || '',
        businessName: profile.business_name || '',
        businessType: profile.business_type || '',
        accountNumber: '••••••1234',
        ifscCode: '•••••0001',
        upiId: profile.business_name ? `${profile.business_name.toLowerCase().replace(' ', '')}@upi` : 'user@upi',
        bio: 'Experienced trader with focus on electronics and services',
        location: profile.city && profile.state ? `${profile.city}, ${profile.state}` : 'Not specified',
        businessHours: '9 AM - 6 PM'
      });
      setOriginalEmail(currentEmail);
    }
  }, [profile, user]);
  const userStats = useMemo(() => {
    // Transactions are already filtered by role in the hook
    const userTransactions = transactions;
    
    const completedTransactions = userTransactions.filter(tx => tx.status === 'completed');
    const totalTransactions = userTransactions.length;
    const totalAmount = userTransactions.reduce((sum, tx) => sum + tx.amount, 0);
    const successRate = totalTransactions > 0 ? (completedTransactions.length / totalTransactions) * 100 : 0;
    const avgTransactionValue = totalTransactions > 0 ? totalAmount / totalTransactions : 0;
    
    // Calculate escrow balance for current role using contract amounts
    const escrowBalance = userTransactions
      .filter(tx => tx.status === 'payment_made' || tx.status === 'work_completed')
      .reduce((sum, tx) => {
        // Find the latest accepted contract for this transaction
        const acceptedContract = contracts
          .filter(contract => contract.transaction_id === tx.id)
          .sort((a, b) => {
            const statusPriority = { 
              'accepted_awaiting_payment': 3, 
              'awaiting_acceptance': 2, 
              'draft': 1,
              'rejected': 0,
              'expired': 0
            };
            const priorityDiff = (statusPriority[b.status as keyof typeof statusPriority] || 0) - (statusPriority[a.status as keyof typeof statusPriority] || 0);
            if (priorityDiff !== 0) return priorityDiff;
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          })[0];
        
        const effectiveAmount = acceptedContract ? getContractAmount(acceptedContract) : tx.amount;
        return sum + effectiveAmount;
      }, 0);
    
    return {
      totalTransactions,
      completedTransactions: completedTransactions.length,
      totalAmount,
      successRate,
      avgTransactionValue,
      escrowBalance,
      disputedTransactions: userTransactions.filter(tx => tx.status === 'disputed').length,
      recentTransactions: userTransactions.slice(0, 5).map(tx => ({
        ...tx,
        date: tx.date || 'Unknown',
        counterparty: tx.counterparty || 'Unknown',
        role: tx.role || 'buyer'
      }))
    };
  }, [transactions]);

  // Profile completeness calculation
  const profileCompleteness = useMemo(() => {
    const fields = [
      formData.name,
      formData.phone,
      formData.email,
      formData.bio,
      formData.location,
      formData.businessHours,
      formData.accountNumber !== '••••••1234',
      formData.upiId
    ];
    
    const completedFields = fields.filter(field => field && field !== '').length;
    return Math.round((completedFields / fields.length) * 100);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format phone number to only allow digits
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: digits }));
      }
      return;
    }
    
    // Format pincode to only allow digits
    if (name === 'pincode') {
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 6) {
        setFormData(prev => ({ ...prev, [name]: digits }));
      }
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setIsSaving(true);
    
    try {
      // Validate required fields
      if (!formData.name.trim()) {
        toast.error('Name is required');
        return;
      }

      if (formData.phone && formData.phone.length !== 10) {
        toast.error('Phone number must be exactly 10 digits');
        return;
      }

      if (formData.pincode && formData.pincode.length > 0 && formData.pincode.length !== 6) {
        toast.error('Pincode must be exactly 6 digits');
        return;
      }

      // Validate PAN format if provided
      if (formData.panNumber && formData.panNumber.length > 0) {
        if (formData.panNumber.length !== 10) {
          toast.error('PAN number must be exactly 10 characters');
          return;
        }
      }

      // Validate GST format if provided
      if (formData.gstNumber && formData.gstNumber.length > 0) {
        if (formData.gstNumber.length !== 15) {
          toast.error('GST number must be exactly 15 characters');
          return;
        }
      }

      // Update profile data with all fields
      if (profile) {
        await updateProfile({
          full_name: formData.name.trim(),
          phone: formData.phone || null,
          address: formData.address?.trim() || null,
          city: formData.city?.trim() || null,
          state: formData.state?.trim() || null,
          pincode: formData.pincode?.trim() || null,
          pan_number: formData.panNumber?.toUpperCase().trim() || null,
          gst_number: formData.gstNumber?.toUpperCase().trim() || null,
          business_name: formData.businessName?.trim() || null,
          business_type: formData.businessType || null
        });
      }

      // Update email if it changed
      if (formData.email !== originalEmail && formData.email.trim()) {
        await updateEmail(formData.email.trim());
      }

      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      // Error handling is done in the hooks
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (profileLoading) {
    return (
      <div className="bharose-container pb-20 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-bharose-primary" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bharose-container pb-20">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between py-4">
          <h1 className="text-xl font-semibold">My Profile</h1>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : <Settings size={16} className="mr-1" />}
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>

        {/* Profile Header */}
        <ProfileHeader
          formData={formData}
          profileCompleteness={profileCompleteness}
          isEditing={isEditing}
          getInitials={getInitials}
        />

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <ProfileStats userStats={userStats} />
            <ProfilePerformanceMetrics userStats={userStats} />
            <ProfileRecentActivity userStats={userStats} />
          </TabsContent>
          
          {/* Personal Tab */}
          <TabsContent value="personal" className="space-y-6">
            <ProfilePersonalInfo
              formData={formData}
              isEditing={isEditing}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
            />
          </TabsContent>
          
          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <ProfilePaymentInfo
              formData={formData}
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <ProfileActivityInfo />
          </TabsContent>

          {/* Security Tab */}
        </Tabs>

        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Button 
              className="w-full bg-bharose-primary hover:bg-bharose-primary/90"
              onClick={handleSaveProfile}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </>
              )}
            </Button>
            
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                <AlertCircle size={14} className="inline mr-1" />
                <strong>Note:</strong> If you change your email, you'll need to verify the new email address.
              </p>
            </div>
          </motion.div>
        )}

        <div className="text-center text-sm text-muted-foreground mt-6">
          <p className="flex items-center justify-center">
            <AlertCircle size={14} className="mr-1" />
            Your data is securely stored
          </p>
        </div>
      </motion.div>
      
      <BottomNavigation userMode={userMode} />
    </div>
  );
};

export default Profile;
