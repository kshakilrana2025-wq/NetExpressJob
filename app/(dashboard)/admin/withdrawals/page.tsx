'use client';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { showToast } from '@/components/ui/Toast';

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState([]);
  useEffect(() => {
    fetch('/api/admin/withdrawals').then(res => res.json()).then(setWithdrawals);
  }, []);
  const handleAction = async (id: string, action: string) => {
    const res = await fetch('/api/admin/withdrawals', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ withdrawalId: id, action }) });
    if (res.ok) { showToast.success(`Withdrawal ${action}d`); setWithdrawals(withdrawals.filter((w: any) => w._id !== id)); }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Withdrawal Requests</h1>
      <Card>
        <table className="w-full"><thead><tr><th>User</th><th>Amount</th><th>Request Date</th><th>Actions</th></tr></thead>
        <tbody>{withdrawals.map((w: any) => <tr key={w._id}><td>{w.user?.email}</td><td>{w.amount} BDT</td><td>{new Date(w.requestDate).toLocaleDateString()}</td><td><button onClick={() => handleAction(w._id, 'approve')} className="bg-green-600 text-white px-2 py-1 rounded mr-2">Approve</button><button onClick={() => handleAction(w._id, 'reject')} className="bg-red-600 text-white px-2 py-1 rounded">Reject</button></td></tr>)}</tbody></table>
      </Card>
    </div>
  );
}
