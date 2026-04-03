'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { showToast } from '@/components/ui/Toast';

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });
    if (res.ok) {
      showToast.success('Email verified! Please login.');
      router.push('/login');
    } else {
      const data = await res.json();
      showToast.error(data.error || 'Verification failed');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Verify Email</h2>
      <p className="text-gray-600 mb-4">Enter the OTP sent to {email}</p>
      <form onSubmit={handleVerify} className="space-y-4">
        <input
          type="text"
          placeholder="6-digit OTP"
          className="w-full border rounded-lg px-4 py-2"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          required
        />
        <button type="submit" disabled={loading} className="w-full bg-purple-600 text-white py-2 rounded-full">
          {loading ? 'Verifying...' : 'Verify Email'}
        </button>
      </form>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailForm />
    </Suspense>
  );
}
