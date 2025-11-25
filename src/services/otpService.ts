/**
 * OTP SERVICE FOR BHAROSE PE
 * Generates and manages OTP for:
 * - Delivery confirmation
 * - Payment authorization
 * - Dispute resolution
 */

import { supabase } from '@/integrations/supabase/client';

export interface OTPGenerationRequest {
  transactionId: string;
  userId: string;
  purpose: 'delivery_confirmation' | 'payment_authorization' | 'dispute_initiation' | 'dispute_resolution_acceptance';
  expiryMinutes?: number;
}

export interface OTPVerificationRequest {
  otpRecordId: string;
  otpCode: string;
}

/**
 * Generate a random 6-digit OTP
 */
function generateOTPCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Generate OTP and store in database
 */
export async function generateOTP(request: OTPGenerationRequest) {
  try {
    const otpCode = generateOTPCode();
    const expiryMinutes = request.expiryMinutes || 10;
    const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from('otp_records')
      .insert({
        transaction_id: request.transactionId,
        user_id: request.userId,
        otp_code: otpCode,
        purpose: request.purpose,
        expires_at: expiresAt,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error generating OTP:', error);
      throw error;
    }

    // In production, send OTP via SMS/Email
    // For now, log for testing
    console.log(`OTP Generated for ${request.purpose}: ${otpCode} (Expires: ${expiryMinutes} min)`);

    return {
      success: true,
      otpId: data.id,
      expiresAt: data.expires_at,
      message: `OTP sent successfully. Valid for ${expiryMinutes} minutes.`
    };
  } catch (error) {
    console.error('OTP generation failed:', error);
    throw error;
  }
}

/**
 * Verify OTP code
 */
export async function verifyOTP(request: OTPVerificationRequest) {
  try {
    // Fetch OTP record
    const { data: otpRecord, error: fetchError } = await supabase
      .from('otp_records')
      .select('*')
      .eq('id', request.otpRecordId)
      .single();

    if (fetchError || !otpRecord) {
      return {
        success: false,
        message: 'OTP record not found'
      };
    }

    // Check if OTP has expired
    const now = new Date();
    const expiryTime = new Date(otpRecord.expires_at);

    if (now > expiryTime) {
      return {
        success: false,
        message: 'OTP has expired. Request a new one.'
      };
    }

    // Check max attempts
    if (otpRecord.attempt_count >= otpRecord.max_attempts) {
      return {
        success: false,
        message: `Max attempts exceeded. Request a new OTP.`
      };
    }

    // Verify OTP code
    if (otpRecord.otp_code !== request.otpCode) {
      // Increment attempt count
      const { error: updateError } = await supabase
        .from('otp_records')
        .update({
          attempt_count: otpRecord.attempt_count + 1
        })
        .eq('id', request.otpRecordId);

      if (updateError) console.error('Error updating attempt count:', updateError);

      const attemptsLeft = otpRecord.max_attempts - otpRecord.attempt_count - 1;
      return {
        success: false,
        message: `Incorrect OTP. ${attemptsLeft} attempts remaining.`,
        attemptsLeft
      };
    }

    // OTP is correct - mark as verified
    const { error: verifyError } = await supabase
      .from('otp_records')
      .update({
        is_verified: true,
        verified_at: new Date().toISOString()
      })
      .eq('id', request.otpRecordId);

    if (verifyError) {
      console.error('Error verifying OTP:', verifyError);
      throw verifyError;
    }

    return {
      success: true,
      message: 'OTP verified successfully',
      otpRecord
    };
  } catch (error) {
    console.error('OTP verification error:', error);
    throw error;
  }
}

/**
 * Check if OTP is already verified
 */
export async function isOTPVerified(otpRecordId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('otp_records')
      .select('is_verified')
      .eq('id', otpRecordId)
      .single();

    if (error) {
      console.error('Error checking OTP verification:', error);
      return false;
    }

    return data?.is_verified || false;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

/**
 * Get OTP record by transaction and purpose
 */
export async function getOTPByTransaction(
  transactionId: string,
  purpose: 'delivery_confirmation' | 'payment_authorization' | 'dispute_initiation' | 'dispute_resolution_acceptance'
) {
  try {
    const { data, error } = await supabase
      .from('otp_records')
      .select('*')
      .eq('transaction_id', transactionId)
      .eq('purpose', purpose)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned
      console.error('Error fetching OTP:', error);
    }

    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

/**
 * Resend OTP (invalidate old, generate new)
 */
export async function resendOTP(
  transactionId: string,
  userId: string,
  purpose: 'delivery_confirmation' | 'payment_authorization' | 'dispute_initiation' | 'dispute_resolution_acceptance'
) {
  try {
    // Invalidate old OTP records for this transaction+purpose
    const { error: deleteError } = await supabase
      .from('otp_records')
      .update({
        expires_at: new Date().toISOString() // Set to past date to invalidate
      })
      .eq('transaction_id', transactionId)
      .eq('purpose', purpose)
      .eq('is_verified', false);

    if (deleteError) {
      console.error('Error invalidating old OTP:', deleteError);
    }

    // Generate new OTP
    return generateOTP({
      transactionId,
      userId,
      purpose,
      expiryMinutes: 10
    });
  } catch (error) {
    console.error('Error in resend OTP:', error);
    throw error;
  }
}

/**
 * Test OTP functionality
 */
export async function testOTPSystem() {
  console.log('=== OTP System Test ===\n');

  // Example: Generate OTP for delivery confirmation
  const testRequest: OTPGenerationRequest = {
    transactionId: 'test-txn-123',
    userId: 'test-user-456',
    purpose: 'delivery_confirmation',
    expiryMinutes: 15
  };

  console.log('Generating OTP...');
  try {
    const result = await generateOTP(testRequest);
    console.log('OTP Generated:', result);
    console.log('✓ OTP generation successful\n');

    // Note: In real testing, you would verify the OTP with the code shown in logs
    // verifyOTP({ otpRecordId: result.otpId, otpCode: '123456' })
  } catch (error) {
    console.error('✗ OTP generation failed:', error);
  }
}

/**
 * OTP DELIVERY METHODS (To be implemented with SMS/Email services)
 */

/**
 * Send OTP via SMS (Twilio/AWS SNS)
 */
export async function sendOTPViaSMS(phoneNumber: string, otpCode: string): Promise<boolean> {
  try {
    // TODO: Integrate with SMS service (Twilio, AWS SNS, etc.)
    console.log(`SMS OTP sent to ${phoneNumber}: ${otpCode}`);
    return true;
  } catch (error) {
    console.error('Failed to send SMS OTP:', error);
    return false;
  }
}

/**
 * Send OTP via Email
 */
export async function sendOTPViaEmail(email: string, otpCode: string): Promise<boolean> {
  try {
    // TODO: Integrate with email service (SendGrid, AWS SES, etc.)
    console.log(`Email OTP sent to ${email}: ${otpCode}`);
    return true;
  } catch (error) {
    console.error('Failed to send Email OTP:', error);
    return false;
  }
}

/**
 * Send OTP via WhatsApp (Twilio/MessageBird)
 */
export async function sendOTPViaWhatsApp(phoneNumber: string, otpCode: string): Promise<boolean> {
  try {
    // TODO: Integrate with WhatsApp service
    console.log(`WhatsApp OTP sent to ${phoneNumber}: ${otpCode}`);
    return true;
  } catch (error) {
    console.error('Failed to send WhatsApp OTP:', error);
    return false;
  }
}

/**
 * MULTI-CHANNEL OTP SENDING
 */
export async function sendOTPMultiChannel(
  userId: string,
  phoneNumber: string,
  email: string,
  otpCode: string,
  channels: ('sms' | 'email' | 'whatsapp')[] = ['sms', 'email']
): Promise<{ success: boolean; channels: Record<string, boolean> }> {
  const results: Record<string, boolean> = {};

  for (const channel of channels) {
    switch (channel) {
      case 'sms':
        results.sms = await sendOTPViaSMS(phoneNumber, otpCode);
        break;
      case 'email':
        results.email = await sendOTPViaEmail(email, otpCode);
        break;
      case 'whatsapp':
        results.whatsapp = await sendOTPViaWhatsApp(phoneNumber, otpCode);
        break;
    }
  }

  const success = Object.values(results).some(result => result);
  return { success, channels: results };
}
