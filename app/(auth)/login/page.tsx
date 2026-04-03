'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { showToast } from '@/components/ui/Toast';

export default function LoginPage() {
  const router = useRouter();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginId, password })
    });
    const data = await res.json();
    if (res.ok) {
      showToast.success('Login successful');
      router.push('/dashboard');
    } else {
      showToast.error(data.error || 'Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
        <div className="flex justify-center mb-4">
          <img src="https://i.ibb.co.com/bjcsBPvg/Logo.png" alt="Logo" className="h-12" />
          <span className="text-2xl font-bold text-purple-600 ml-2">NetExpressJob</span>
        </div>
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <p className="text-center text-gray-500 text-sm mt-1">
          New user? <Link href="/register" className="text-purple-600 font-semibold">Create an Account</Link>
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Student ID or Phone</label>
            <input type="text" className="mt-1 w-full border rounded-lg px-4 py-2" placeholder="Type your student id or phone" value={loginId} onChange={e => setLoginId(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} className="mt-1 w-full border rounded-lg px-4 py-2 pr-20" value={password} onChange={e => setPassword(e.target.value)} required />
              <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-purple-600" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'hide' : 'show'}</button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-purple-600 text-white py-2 rounded-full">{loading ? 'Signing in...' : 'Sign In'}</button>
        </form>
      </div>
    </div>
  );
}
