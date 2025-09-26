
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, Mail, Check, Phone } from 'lucide-react';
import Header from '@/components/Header';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';
import { useProfile } from '@/hooks/use-profile';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile();
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    profileType: 'both' as 'buyer' | 'seller' | 'both'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && profile) {
      setFormData({
        fullName: profile.full_name || user.user_metadata?.full_name || '',
        businessName: '',
        email: user.email || '',
        phone: profile.phone || '',
        profileType: 'both'
      });
    }
  }, [user, profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileTypeChange = (type: 'buyer' | 'seller' | 'both') => {
    setFormData(prev => ({ ...prev, profileType: type }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName) {
      toast.error('Please enter your full name');
      return;
    }
    
    if (!formData.phone) {
      toast.error('Please enter your phone number');
      return;
    }
    
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    
    try {
      await updateProfile({
        full_name: formData.fullName,
        phone: formData.phone,
        role: formData.profileType === 'both' ? 'Buyer' : formData.profileType
      });
      
      toast.success('Profile updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bharose-container">
      <Header title="Set Up Your Profile" showBack />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex flex-col mt-6"
      >
        <div className="mb-6">
          <h1 className="bharose-heading">Complete your profile</h1>
          <p className="bharose-subheading mt-1">Please provide your phone number to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="bharose-input pl-10"
                placeholder="Full Name"
                required
              />
            </div>
            
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bharose-input pl-10"
                placeholder="Phone Number *"
                required
              />
            </div>
            
            <div className="relative">
              <Briefcase className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="bharose-input pl-10"
                placeholder="Business Name (optional)"
              />
            </div>
            
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bharose-input pl-10"
                placeholder="Email Address"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="bharose-subheading block mb-3">I want to use Bharose Pe as:</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'buyer', label: 'Buyer' },
                { id: 'seller', label: 'Seller' },
                { id: 'both', label: 'Both' }
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`p-3 rounded-lg border-2 flex items-center justify-center ${
                    formData.profileType === option.id
                      ? 'border-bharose-primary bg-bharose-light text-bharose-primary'
                      : 'border-border text-muted-foreground'
                  }`}
                  onClick={() => handleProfileTypeChange(option.id as 'buyer' | 'seller' | 'both')}
                >
                  {formData.profileType === option.id && (
                    <Check className="mr-1 h-4 w-4" />
                  )}
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          <button
            type="submit"
            className="bharose-primary-button w-full mt-6"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Setting up...
              </span>
            ) : (
              'Complete Setup'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfileSetup;
