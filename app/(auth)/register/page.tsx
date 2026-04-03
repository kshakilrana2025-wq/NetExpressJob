'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { showToast } from '@/components/ui/Toast';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref') || '';
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('+880');
  const [whatsapp, setWhatsapp] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [referral, setReferral] = useState(ref);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return showToast.error('Agree to terms');
    setLoading(true);
    const fullName = `${firstName} ${lastName}`.trim();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: fullName, email, password, ref: referral, phone: `${code}${whatsapp}` })
    });
    const data = await res.json();
    if (res.ok) {
      showToast.success('OTP sent. Verify email.');
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    } else {
      showToast.error(data.error || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
        <div className="flex justify-center mb-4">
          <img src="https://i.ibb.co.com/bjcsBPvg/Logo.png" alt="Logo" className="h-10" />
          <span className="text-xl font-bold text-purple-600 ml-2">NetExpressJob</span>
        </div>
        <h2 className="text-2xl font-bold">Create an Account</h2>
        <p className="text-gray-500 text-sm">Already have an account? <Link href="/login" className="text-purple-600">Sign In</Link></p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div><label>Email *</label><input type="email" className="w-full border rounded-lg px-4 py-2" value={email} onChange={e => setEmail(e.target.value)} required /></div>
          <div className="flex gap-3"><div className="flex-1"><label>Code </label><select className="w-full border rounded-lg px-4 py-2" value={code} onChange={e => setCode(e.target.value)}><option value="+880">+880 (Bangladesh)</option><option value="+91">+91 (India)</option></select></div><div className="flex-2"><label>WhatsApp Number *</label><input type="text" className="w-full border rounded-lg px-4 py-2" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} required /></div></div>
          <div className="flex gap-3"><div className="flex-1"><label>First Name *</label><input type="text" className="w-full border rounded-lg px-4 py-2" value={firstName} onChange={e => setFirstName(e.target.value)} required /></div><div className="flex-1"><label>Last Name *</label><input type="text" className="w-full border rounded-lg px-4 py-2" value={lastName} onChange={e => setLastName(e.target.value)} required /></div></div>
          <div><label>Password *</label><div className="relative"><input type={showPassword ? 'text' : 'password'} className="w-full border rounded-lg px-4 py-2 pr-20" value={password} onChange={e => setPassword(e.target.value)} required /><button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-sm" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'hide' : 'show'}</button></div></div>
          <div><label>Referral code</label><input type="text" className="w-full border rounded-lg px-4 py-2" value={referral} onChange={e => setReferral(e.target.value)} placeholder="Optional" /></div>
          <div className="flex items-start gap-2"><input type="checkbox" id="terms" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} /><label htmlFor="terms" className="text-sm">I agree to Terms and Privacy.</label></div>
          <button type="submit" disabled={loading} className="w-full bg-purple-600 text-white py-2 rounded-full">{loading ? 'Creating...' : 'Sign Up'}</button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-4">After signup you'll get a Student ID (keep it safe).</p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
