import React, { useState } from 'react';
import { generateOTP, verifyOTP } from '../services/otpService';

const TestOTPSystem: React.FC = () => {
  const [step, setStep] = useState<'generate' | 'verify'>('generate');
  const [otpRecord, setOtpRecord] = useState<any>(null);
  const [otpCode, setOtpCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const mockUserId = '550e8400-e29b-41d4-a716-446655440000'; // Mock UUID
  const mockTxnId = '660e8400-e29b-41d4-a716-446655440111'; // Mock UUID

  const handleGenerateOTP = async () => {
    setLoading(true);
    try {
      const result = await generateOTP({
        transactionId: mockTxnId,
        userId: mockUserId,
        purpose: 'delivery_confirmation',
      });
      setOtpRecord(result);
      setStep('verify');
      setVerificationResult(null);
    } catch (error) {
      console.error('OTP generation error:', error);
      setOtpRecord({ error: String(error) });
    }
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    if (!otpCode.trim()) return;
    setLoading(true);
    try {
      const result = await verifyOTP({
        otpRecordId: otpRecord.otpRecordId,
        otpCode: otpCode,
      });
      setVerificationResult(result);
    } catch (error) {
      console.error('OTP verification error:', error);
      setVerificationResult({ error: String(error) });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🔐 OTP System Test
          </h1>
          <p className="text-gray-600">
            Test OTP generation, verification, and management
          </p>
        </div>

        {/* Step 1: Generate OTP */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Step 1: Generate OTP
          </h2>

          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Mock Transaction ID:</span> {mockTxnId}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Mock User ID:</span> {mockUserId}
            </p>
          </div>

          <button
            onClick={handleGenerateOTP}
            disabled={loading || step !== 'generate'}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            {loading ? 'Generating...' : 'Generate OTP'}
          </button>

          {otpRecord && !otpRecord.error && (
            <div className="mt-6 p-6 bg-green-50 rounded-lg border-2 border-green-300">
              <h3 className="text-xl font-bold text-green-900 mb-3">✅ OTP Generated!</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold text-gray-700">OTP Record ID:</span>
                  <span className="ml-2 font-mono text-gray-600">{otpRecord.otpRecordId}</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Purpose:</span>
                  <span className="ml-2 text-gray-600">Delivery Confirmation</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Expires In:</span>
                  <span className="ml-2 text-gray-600">{otpRecord.expiresInMinutes} minutes</span>
                </p>
                <p className="mt-3 p-3 bg-yellow-100 border border-yellow-400 rounded text-yellow-900">
                  <span className="font-bold">For Testing:</span> Check browser console for OTP code
                </p>
              </div>
            </div>
          )}

          {otpRecord?.error && (
            <div className="mt-6 p-6 bg-red-50 rounded-lg border-2 border-red-300">
              <p className="text-red-900 font-semibold">Error generating OTP:</p>
              <p className="text-red-700">{otpRecord.error}</p>
            </div>
          )}
        </div>

        {/* Step 2: Verify OTP */}
        {step === 'verify' && otpRecord && !otpRecord.error && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Step 2: Verify OTP
            </h2>

            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Enter OTP Code (Check Console)
              </label>
              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.slice(0, 6))}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="w-full p-4 text-center text-3xl tracking-widest border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 font-mono"
              />
            </div>

            <button
              onClick={handleVerifyOTP}
              disabled={loading || otpCode.length !== 6}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            {verificationResult && (
              <div className={`mt-6 p-6 rounded-lg border-2 ${
                verificationResult.success
                  ? 'bg-green-50 border-green-300'
                  : 'bg-red-50 border-red-300'
              }`}>
                <h3 className={`text-xl font-bold mb-2 ${
                  verificationResult.success ? 'text-green-900' : 'text-red-900'
                }`}>
                  {verificationResult.success ? '✅ Verified!' : '❌ Verification Failed'}
                </h3>
                <p className={verificationResult.success ? 'text-green-700' : 'text-red-700'}>
                  {verificationResult.message || verificationResult.error}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Info Box */}
        <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded">
          <h3 className="font-bold text-green-900 mb-2">ℹ️ OTP Features</h3>
          <ul className="text-green-800 text-sm space-y-1">
            <li>✓ 6-digit random OTP generation</li>
            <li>✓ Configurable expiry (default 10 minutes)</li>
            <li>✓ Attempt tracking (max 3 attempts)</li>
            <li>✓ Multi-channel support (SMS, Email, WhatsApp)</li>
            <li>✓ 4 purposes: delivery, payment, dispute, resolution</li>
            <li>✓ Device fingerprinting & IP logging</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestOTPSystem;
