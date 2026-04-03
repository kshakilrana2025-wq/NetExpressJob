'use client';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('/api/admin/users').then(res => res.json()).then(setUsers);
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Users</h1>
      <Card>
        <table className="w-full">
          <thead><tr><th>Name</th><th>Email</th><th>Student ID</th><th>Activation</th><th>Wallet</th><th>Referred By</th></tr></thead>
          <tbody>
            {users.map((u: any) => (
              <tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.studentId}</td><td>{u.activationStatus}</td><td>{u.wallet?.available} BDT</td><td>{u.referredBy?.referralCode || 'None'}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
