'use client';
import { useState, useEffect } from 'react';
import { showToast } from '@/components/ui/Toast';
import Card from '@/components/ui/Card';

export default function SubadminWithdraw() {
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    fetch('/api/wallet').then(res => res.json()).then(data => setBalance(data.available));
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (num < 10) return showToast.error('Minimum 10 BDT');
    if (num > balance) return showToast.error('Insufficient balance');
    const res = await fetch('/api/subadmin/withdraw', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: num }) });
    if (res.ok) { showToast.success('Withdrawal request submitted'); setAmount(''); }
    else showToast.error('Failed');
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Withdraw Earnings</h1>
      <Card>
        <p className="text-gray-600 mb-4">Available Balance: {balance} BDT</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="number" placeholder="Amount (BDT)" className="w-full border rounded-lg px-4 py-2" value={amount} onChange={e => setAmount(e.target.value)} required />
          <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-full">Request Withdrawal</button>
        </form>
      </Card>
    </div>
  );
}
