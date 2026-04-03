'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubAdminDashboard() {
  const [stats, setStats] = useState({ managedUsers: 0, totalEarnings: 0, pendingWithdrawals: 0 });
  useEffect(() => {
    fetch('/api/subadmin/me').then(res => res.json()).then(data => setStats(data));
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Subadmin Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">Managed Users: {stats.managedUsers}</div>
        <div className="bg-white p-6 rounded-xl shadow">Total Earnings: {stats.totalEarnings} BDT</div>
        <div className="bg-white p-6 rounded-xl shadow">Pending Withdrawals: {stats.pendingWithdrawals}</div>
      </div>
    </div>
  );
}
