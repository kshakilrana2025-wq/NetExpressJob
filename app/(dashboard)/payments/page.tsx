'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { showToast } from '@/components/ui/Toast';

export default function PaymentsPage() {
  const router = useRouter();
  const [methods, setMethods] = useState<any>({ bKash: '', Nagad: '', Rocket: '' });
  const [selectedMethod, setSelectedMethod] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/payment/methods').then(res => res.json()).then(setMethods);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod || !transactionId || !screenshot) {
      showToast.error('Please fill all fields');
      return;
    }
    const formData = new FormData();
    formData.append('method', selectedMethod);
    formData.append('transactionId', transactionId);
    formData.append('screenshot', screenshot);
    setLoading(true);
    const res = await fetch('/api/payment/activate', { method: 'POST', body: formData });
    const data = await res.json();
    if (res.ok) {
      showToast.success('Payment submitted for verification');
      router.push('/dashboard');
    } else {
      showToast.error(data.error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Activate Your Account</h1>
      <p className="text-gray-600 mb-6">Pay 500 BDT activation fee to start earning.</p>
      <div className="grid gap-4">
        {Object.entries(methods).map(([name, number]) => (
          <div key={name} className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold">{name}</h3>
            <p className="text-gray-600">Number: {number as string}</p>
            <button onClick={() => setSelectedMethod(name)} className={`mt-2 px-4 py-1 rounded ${selectedMethod === name ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>Select</button>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input type="text" placeholder="Transaction ID" className="w-full border rounded-lg px-4 py-2" value={transactionId} onChange={e => setTransactionId(e.target.value)} required />
        <input type="file" accept="image/*" className="w-full border rounded-lg px-4 py-2" onChange={e => setScreenshot(e.target.files?.[0] || null)} required />
        <button type="submit" disabled={loading} className="w-full bg-purple-600 text-white py-2 rounded-full">{loading ? 'Submitting...' : 'Submit Payment'}</button>
      </form>
    </div>
  );
}
