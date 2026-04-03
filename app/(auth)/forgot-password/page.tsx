'use client';
import { useState } from 'react';
import { showToast } from '@/components/ui/Toast';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');

  const sendOtp = async () => {
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (res.ok) {
      setStep('otp');
      showToast.success('OTP sent to your email');
    } else {
      showToast.error('Email not found');
    }
  };

  const verifyOtp = async () => {
    const res = await fetch('/api/auth/verify-reset-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });
    if (res.ok) {
      setStep('reset');
      showToast.success('OTP verified');
    } else {
      showToast.error('Invalid OTP');
    }
  };

  const resetPassword = async () => {
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword })
    });
    if (res.ok) {
      showToast.success('Password reset. Please login.');
      window.location.href = '/login';
    } else {
      showToast.error('Reset failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      {step === 'email' && (
        <>
          <input type="email" placeholder="Your email" className="w-full border rounded-lg px-4 py-2 mb-4" value={email} onChange={e => setEmail(e.target.value)} />
          <button onClick={sendOtp} className="w-full bg-purple-600 text-white py-2 rounded-full">Send OTP</button>
        </>
      )}
      {step === 'otp' && (
        <>
          <input type="text" placeholder="6-digit OTP" className="w-full border rounded-lg px-4 py-2 mb-4" value={otp} onChange={e => setOtp(e.target.value)} />
          <button onClick={verifyOtp} className="w-full bg-purple-600 text-white py-2 rounded-full">Verify OTP</button>
        </>
      )}
      {step === 'reset' && (
        <>
          <input type="password" placeholder="New password" className="w-full border rounded-lg px-4 py-2 mb-4" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          <button onClick={resetPassword} className="w-full bg-purple-600 text-white py-2 rounded-full">Reset Password</button>
        </>
      )}
      <p className="text-center text-sm mt-4">
        <Link href="/login" className="text-purple-600">Back to Login</Link>
      </p>
    </div>
  );
}
