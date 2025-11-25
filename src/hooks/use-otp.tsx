import { create } from 'zustand';
import { toast } from 'sonner';

// Backend API URL
const API_BASE_URL = 'http://localhost:3001';
// Frontend is on 8080, but we need backend on 5000

interface OTPStore {
  phoneNumber: string;
  otpSent: boolean;
  isLoading: boolean;
  isVerifying: boolean;
  attemptsRemaining: number;
  expiresIn: number;
  verified: boolean;
  
  sendOTP: (phoneNumber: string) => Promise<boolean>;
  verifyOTP: (otp: string) => Promise<boolean>;
  checkOTPStatus: (phoneNumber: string) => Promise<void>;
  reset: () => void;
}

export const useOTP = create<OTPStore>((set, get) => {
  let expiryTimer: NodeJS.Timeout | null = null;
  
  return {
    phoneNumber: '',
    otpSent: false,
    isLoading: false,
    isVerifying: false,
    attemptsRemaining: 3,
    expiresIn: 0,
    verified: false,

    sendOTP: async (phoneNumber: string) => {
      // Validate phone number format
      const phoneRegex = /^\+\d{10,}$/;
      if (!phoneRegex.test(phoneNumber)) {
        toast.error('Please enter a valid phone number (e.g., +1234567890)');
        return false;
      }

      set({ isLoading: true });
      try {
        const response = await fetch(`${API_BASE_URL}/api/otp/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone_number: phoneNumber })
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.error || 'Failed to send OTP');
          return false;
        }

        set({
          phoneNumber,
          otpSent: true,
          expiresIn: data.expiresIn || 600,
          attemptsRemaining: 3
        });

        toast.success('OTP sent successfully!');

        // If OTP code is in response (dev mode), show it
        if (data.otp_code) {
          console.log(`📱 [DEV MODE] Your OTP Code: ${data.otp_code}`);
          toast.success(`📱 OTP Code (DEV): ${data.otp_code}`, {
            duration: 10000,
            description: 'This is shown only in development mode for testing'
          });
        }

        // Start expiry countdown
        if (expiryTimer) clearInterval(expiryTimer);
        expiryTimer = setInterval(() => {
          set((state) => {
            const newExpiresIn = state.expiresIn - 1;
            if (newExpiresIn <= 0) {
              if (expiryTimer) clearInterval(expiryTimer);
              return { expiresIn: 0, otpSent: false };
            }
            return { expiresIn: newExpiresIn };
          });
        }, 1000);

        return true;
      } catch (error) {
        console.error('OTP send error:', error);
        toast.error('Failed to send OTP. Please try again.');
        return false;
      } finally {
        set({ isLoading: false });
      }
    },

    verifyOTP: async (otp: string) => {
      const { phoneNumber } = get();

      if (!phoneNumber) {
        toast.error('Please send OTP first');
        return false;
      }

      if (!otp || otp.length !== 6) {
        toast.error('Please enter a 6-digit OTP');
        return false;
      }

      set({ isVerifying: true });
      try {
        const response = await fetch(`${API_BASE_URL}/api/otp/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone_number: phoneNumber,
            otp_code: otp
          })
        });

        const data = await response.json();

        if (!response.ok) {
          set({ attemptsRemaining: data.attemptsRemaining || 3 });
          toast.error(data.error || 'Invalid OTP');
          return false;
        }

        set({ verified: true, otpSent: false });
        if (expiryTimer) clearInterval(expiryTimer);
        
        toast.success('Phone number verified successfully!');
        return true;
      } catch (error) {
        console.error('OTP verify error:', error);
        toast.error('Failed to verify OTP. Please try again.');
        return false;
      } finally {
        set({ isVerifying: false });
      }
    },

    checkOTPStatus: async (phoneNumber: string) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/otp/status/${encodeURIComponent(phoneNumber)}`);
        const data = await response.json();

        if (data.verified) {
          set({ verified: true, phoneNumber });
        }
      } catch (error) {
        console.error('OTP status check error:', error);
      }
    },

    reset: () => {
      if (expiryTimer) clearInterval(expiryTimer);
      set({
        phoneNumber: '',
        otpSent: false,
        isLoading: false,
        isVerifying: false,
        attemptsRemaining: 3,
        expiresIn: 0,
        verified: false
      });
    }
  };
});
