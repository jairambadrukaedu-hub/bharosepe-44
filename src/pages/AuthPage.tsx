import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Github, MapPin, FileText, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';

const AuthPage = () => {
  const { user, loading, signUp, signIn, signInWithOAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  if (user && !loading) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const pincode = formData.get('pincode') as string;
    const panNumber = formData.get('panNumber') as string;
    const gstNumber = formData.get('gstNumber') as string;
    const businessName = formData.get('businessName') as string;
    const businessType = formData.get('businessType') as string;

    // Format phone number (add +91 for India if only 10 digits)
    let formattedPhone = phone;
    if (formattedPhone.length === 10) {
      formattedPhone = '+91' + formattedPhone;
    } else if (!formattedPhone.startsWith('+')) {
      formattedPhone = '+' + formattedPhone;
    }

    // Complete the signup
    await signUp(email, password, {
      full_name: fullName,
      phone: formattedPhone,
      email,
      address,
      city,
      state,
      pincode,
      pan_number: panNumber,
      gst_number: gstNumber,
      business_name: businessName,
      business_type: businessType,
    });
    
    setIsLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    await signIn(email, password);
    
    setIsLoading(false);
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github' | 'twitter') => {
    setIsLoading(true);
    await signInWithOAuth(provider);
    setIsLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black light">
      <div className="flex flex-col justify-center items-center min-h-screen px-4 py-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm sm:max-w-md"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Welcome to Bharose Pe</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Secure transactions you can trust
            </p>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger value="signin" className="text-sm">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="text-sm">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4 mt-6">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 h-12 text-base"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10 h-12 text-base"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      const email = (document.querySelector('input[name="email"]') as HTMLInputElement)?.value;
                      if (email) {
                        alert(`Password reset link will be sent to ${email}\n\nCheck your email for the reset instructions.`);
                      } else {
                        alert('Please enter your email first.');
                      }
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <Button type="submit" className="w-full h-12 text-base font-medium" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing In...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-6">
              <form onSubmit={handleSignUp} className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                {/* REQUIRED BASIC INFO SECTION */}
                <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                  <p className="text-xs font-bold text-primary mb-3">✓ REQUIRED INFORMATION</p>
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-sm font-semibold">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                        <Input
                          id="signup-name"
                          name="fullName"
                          placeholder="Enter your full name"
                          className="pl-10 h-11 text-base font-medium border-primary/30"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-sm font-semibold">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                        <Input
                          id="signup-email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="pl-10 h-11 text-base font-medium border-primary/30"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-phone" className="text-sm font-semibold">
                        Phone Number (10 digits) <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                        <Input
                          id="signup-phone"
                          name="phone"
                          type="tel"
                          placeholder="9876543210"
                          className="pl-10 h-11 text-base font-medium border-primary/30"
                          required
                          minLength={10}
                          maxLength={10}
                          pattern="[0-9]{10}"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-sm font-semibold">
                        Password (min 6 characters) <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                        <Input
                          id="signup-password"
                          name="password"
                          type="password"
                          placeholder="Create a strong password"
                          className="pl-10 h-11 text-base font-medium border-primary/30"
                          required
                          minLength={6}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ADDRESS SECTION - REQUIRED */}
                <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-3">📍 ADDRESS DETAILS (Required)</p>
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="signup-address" className="text-sm font-semibold">
                        Street Address <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600" />
                        <Input
                          id="signup-address"
                          name="address"
                          placeholder="123 Main Street, Apartment 4B"
                          className="pl-10 h-11 text-base border-blue-200"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="signup-city" className="text-sm font-semibold">
                          City <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="signup-city"
                          name="city"
                          placeholder="Mumbai"
                          className="h-10 text-sm border-blue-200"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-state" className="text-sm font-semibold">
                          State <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="signup-state"
                          name="state"
                          placeholder="Maharashtra"
                          className="h-10 text-sm border-blue-200"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-pincode" className="text-sm font-semibold">
                        Pincode (6 digits) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="signup-pincode"
                        name="pincode"
                        placeholder="400001"
                        className="h-10 text-sm border-blue-200"
                        maxLength={6}
                        minLength={6}
                        pattern="[0-9]{6}"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* TAX & BUSINESS SECTION - PAN, BUSINESS NAME & TYPE REQUIRED; GST OPTIONAL */}
                <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-3">💼 TAX & BUSINESS INFO (PAN & Business required, GST optional)</p>
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="signup-pan" className="text-sm font-semibold">
                        PAN Number (10 chars) <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-600" />
                        <Input
                          id="signup-pan"
                          name="panNumber"
                          placeholder="ABCDE1234F"
                          className="pl-10 h-10 text-sm uppercase border-amber-200"
                          maxLength={10}
                          minLength={10}
                          pattern="[A-Z0-9]{10}"
                          required
                        />
                      </div>
                      <p className="text-xs text-gray-500">Format: 5 letters + 4 digits + 1 letter (e.g., ABCDE1234F)</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-gst" className="text-sm font-semibold">
                        GST Number (15 chars) <span className="text-amber-600">Optional</span>
                      </Label>
                      <Input
                        id="signup-gst"
                        name="gstNumber"
                        placeholder="27AABCT1234A1Z0 (optional)"
                        className="h-10 text-sm uppercase border-amber-200"
                        maxLength={15}
                        pattern="[0-9A-Z]{15}"
                      />
                      <p className="text-xs text-gray-500">Format: 2 digits + 10 alphanumeric + 1 letter + 1 digit + 1 letter (leave blank if not applicable)</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-business-type" className="text-sm font-semibold">
                        Business Type <span className="text-red-500">*</span>
                      </Label>
                      <Select name="businessType" required>
                        <SelectTrigger className="h-10 text-sm border-amber-200">
                          <SelectValue placeholder="Select your business type" />
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
                      <Label htmlFor="signup-business-name" className="text-sm font-semibold">
                        Business Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-600" />
                        <Input
                          id="signup-business-name"
                          name="businessName"
                          placeholder="Your Business Name"
                          className="pl-10 h-10 text-sm border-amber-200"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/10 p-3 rounded-lg">
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    ℹ️ PAN, Business Name and Type are required for contract generation. GST Number is optional and can be added later in your profile.
                  </p>
                </div>

                <Button type="submit" className="w-full h-12 text-base font-semibold mt-4" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    '✓ Create Account with All Details'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-3 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => handleOAuthSignIn('google')}
                disabled={isLoading}
                className="h-12 text-sm"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>

              <Button
                variant="outline"
                onClick={() => handleOAuthSignIn('github')}
                disabled={isLoading}
                className="h-12 text-sm"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-6 text-center px-2">
            By continuing, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;