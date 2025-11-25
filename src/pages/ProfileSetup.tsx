
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, Mail, Phone, MapPin, FileText, Building2, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';
import { useProfile } from '@/hooks/use-profile';
import { testSupabaseConnection } from '@/debug/supabase-test';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, updateProfile, createProfile } = useProfile();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    panNumber: '',
    gstNumber: '',
    businessName: '',
    businessType: 'individual' as string
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('ProfileSetup - Component mounted');
    console.log('ProfileSetup - User:', user);
    console.log('ProfileSetup - Profile:', profile);
    
    // Test Supabase connection on component mount
    testSupabaseConnection();
    
    if (user && profile) {
      setFormData({
        fullName: profile.full_name || user.user_metadata?.full_name || '',
        email: user.email || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        pincode: profile.pincode || '',
        panNumber: profile.pan_number || '',
        gstNumber: profile.gst_number || '',
        businessName: profile.business_name || '',
        businessType: profile.business_type || 'individual'
      });
    }
  }, [user, profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, businessType: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.fullName?.trim()) {
      toast.error('Full name is required');
      return false;
    }
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error('Valid email is required');
      return false;
    }
    if (!formData.phone?.trim() || formData.phone.replace(/\D/g, '').length !== 10) {
      toast.error('Valid 10-digit phone number is required');
      return false;
    }
    if (!formData.address?.trim()) {
      toast.error('Street address is required');
      return false;
    }
    if (!formData.city?.trim()) {
      toast.error('City is required');
      return false;
    }
    if (!formData.state?.trim()) {
      toast.error('State is required');
      return false;
    }
    if (!formData.pincode?.trim() || formData.pincode.length !== 6) {
      toast.error('Valid 6-digit pincode is required');
      return false;
    }
    if (!formData.panNumber?.trim() || formData.panNumber.length !== 10) {
      toast.error('Valid 10-character PAN number is required');
      return false;
    }
    // GST is now optional - only validate if provided
    if (formData.gstNumber?.trim() && formData.gstNumber.length !== 15) {
      toast.error('GST number must be exactly 15 characters if provided');
      return false;
    }
    if (!formData.businessType?.trim()) {
      toast.error('Business type is required');
      return false;
    }
    if (!formData.businessName?.trim()) {
      toast.error('Business name is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    console.log('ProfileSetup - Starting form submission');
    console.log('ProfileSetup - Form data:', formData);
    
    if (!user) {
      toast.error('You must be logged in to create a profile');
      return;
    }
    
    setLoading(true);
    
    try {
      const profileData = {
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.replace(/\D/g, ''),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        pan_number: formData.panNumber.toUpperCase().trim(),
        gst_number: formData.gstNumber.toUpperCase().trim(),
        business_name: formData.businessName.trim(),
        business_type: formData.businessType
      };

      console.log('ProfileSetup - Profile data to save:', profileData);

      let success = false;
      let result;

      // If profile exists, try to update it first
      if (profile) {
        try {
          console.log('ProfileSetup - Profile exists, attempting to update');
          result = await updateProfile(profileData);
          success = true;
          console.log('ProfileSetup - Profile updated successfully:', result);
        } catch (updateError) {
          console.error('ProfileSetup - Profile update failed:', updateError);
        }
      }
      
      // If update failed or no profile exists, create new profile
      if (!success) {
        try {
          console.log('ProfileSetup - Creating new profile');
          result = await createProfile(profileData);
          success = true;
          console.log('ProfileSetup - Profile created successfully:', result);
        } catch (createError) {
          console.error('ProfileSetup - Profile creation failed:', createError);
          throw createError;
        }
      }
      
      if (success) {
        toast.success('Profile saved successfully!');
        console.log('ProfileSetup - Navigating to dashboard');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('ProfileSetup - Profile setup error:', error);
      toast.error('Failed to save profile. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bharose-container">
      <Header title="Complete Your Profile" showBack />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex flex-col mt-6 max-w-2xl mx-auto"
      >
        <div className="mb-6">
          <h1 className="bharose-heading">Complete Your Profile</h1>
          <p className="bharose-subheading mt-1">All information is required for legal contracts and verification</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Required Info Banner */}
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-800 dark:text-red-300">
              <p className="font-semibold">Most fields are mandatory</p>
              <p className="text-xs mt-1">Complete profile information is required for contract generation and legal compliance. GST Number is optional.</p>
            </div>
          </div>

          {/* SECTION 1: Basic Information */}
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <p className="text-sm font-bold text-primary mb-4">👤 BASIC INFORMATION</p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-semibold">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="pl-10 h-11 font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="pl-10 h-11 font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold">
                  Phone Number (10 digits) <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="pl-10 h-11 font-medium"
                    minLength={10}
                    maxLength={10}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Address Details */}
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm font-bold text-blue-700 dark:text-blue-400 mb-4">📍 ADDRESS DETAILS</p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-semibold">
                  Street Address <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600" />
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-semibold">
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Mumbai"
                    className="h-10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-semibold">
                    State <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Maharashtra"
                    className="h-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode" className="text-sm font-semibold">
                  Pincode (6 digits) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="400001"
                  className="h-10"
                  maxLength={6}
                  minLength={6}
                  required
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: Tax & Business Information */}
          <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-4">💼 TAX & BUSINESS INFORMATION</p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="panNumber" className="text-sm font-semibold">
                  PAN Number (10 chars) <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-600" />
                  <Input
                    id="panNumber"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleChange}
                    placeholder="ABCDE1234F"
                    className="pl-10 h-10 uppercase"
                    maxLength={10}
                    minLength={10}
                    required
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Format: 5 letters + 4 digits + 1 letter</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gstNumber" className="text-sm font-semibold">
                  GST Number (15 chars) <span className="text-amber-600">Optional</span>
                </Label>
                <Input
                  id="gstNumber"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  placeholder="27AABCT1234A1Z0 (optional)"
                  className="h-10 uppercase"
                  maxLength={15}
                />
                <p className="text-xs text-gray-600 dark:text-gray-400">Format: 15 alphanumeric characters (optional)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType" className="text-sm font-semibold">
                  Business Type <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.businessType} onValueChange={handleSelectChange}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual/Proprietor</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="llc">LLC</SelectItem>
                    <SelectItem value="pvt_ltd">Private Limited</SelectItem>
                    <SelectItem value="public_ltd">Public Limited</SelectItem>
                    <SelectItem value="ngo">NGO/Trust</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-sm font-semibold">
                  Business Name <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-600" />
                  <Input
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Your Business Name"
                    className="pl-10 h-10"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-base font-semibold"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Saving Profile...
              </span>
            ) : (
              '✓ Complete Profile Setup'
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfileSetup;
