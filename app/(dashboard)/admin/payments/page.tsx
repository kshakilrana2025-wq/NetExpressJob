'use client';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { showToast } from '@/components/ui/Toast';

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    fetch('/api/admin/payments').then(res => res.json()).then(setPayments);
  }, []);
  const verifyPayment = async (id: string, action: string) => {
    const res = await fetch('/api/admin/payments', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ transactionId: id, action }) });
    if (res.ok) { showToast.success(`Payment ${action}d`); setPayments(payments.filter((p: any) => p._id !== id)); }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Pending Activations</h1>
      <Card>
        <table className="w-full"><thead><tr><th>User</th><th>Method</th><th>Transaction ID</th><th>Screenshot</th><th>Actions</th></tr></thead>
        <tbody>{payments.map((p: any) => <tr key={p._id}><td>{p.user?.email}</td><td>{p.method}</td><td>{p.transactionId}</td><td><a href={p.screenshotUrl} target="_blank">View</a></td><td><button onClick={() => verifyPayment(p._id, 'approve')} className="bg-green-600 text-white px-2 py-1 rounded mr-2">Approve</button><button onClick={() => verifyPayment(p._id, 'reject')} className="bg-red-600 text-white px-2 py-1 rounded">Reject</button></td></tr>)}</tbody></table>
      </Card>
    </div>
  );
}
