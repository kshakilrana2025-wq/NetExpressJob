'use client';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';

export default function SubadminEarnings() {
  const [earnings, setEarnings] = useState({ total: 0, list: [] });
  useEffect(() => {
    fetch('/api/subadmin/earnings').then(res => res.json()).then(setEarnings);
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Earnings</h1>
      <Card className="mb-6">Total Earned: {earnings.total} BDT</Card>
      <Card>
        <table className="w-full">
          <thead><tr><th>Referred User</th><th>Commission</th><th>Date</th></tr></thead>
          <tbody>
            {earnings.list.map((e: any) => (
              <tr key={e._id}><td>{e.referred?.email}</td><td>{e.commissionAmount} BDT</td><td>{new Date(e.createdAt).toLocaleDateString()}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
