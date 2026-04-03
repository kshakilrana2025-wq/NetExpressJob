'use client';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { showToast } from '@/components/ui/Toast';

export default function AdminSubadmins() {
  const [subadmins, setSubadmins] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'trainer', phone: '', commissionRate: 50 });
  useEffect(() => {
    fetch('/api/admin/subadmins').then(res => res.json()).then(setSubadmins);
  }, []);
  const createSubadmin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/subadmins', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) { showToast.success('Subadmin created'); setForm({ name: '', email: '', password: '', role: 'trainer', phone: '', commissionRate: 50 }); location.reload(); }
    else showToast.error('Failed');
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Subadmins</h1>
      <Card className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Subadmin</h2>
        <form onSubmit={createSubadmin} className="grid md:grid-cols-2 gap-4">
          <input placeholder="Name" className="border p-2 rounded" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <input placeholder="Email" type="email" className="border p-2 rounded" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input placeholder="Password" type="password" className="border p-2 rounded" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          <input placeholder="Phone" className="border p-2 rounded" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          <select className="border p-2 rounded" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
            <option value="trainer">Trainer</option>
            <option value="team_leader">Team Leader</option>
            <option value="senior_team_leader">Senior Team Leader</option>
          </select>
          <input type="number" placeholder="Commission Rate (BDT)" className="border p-2 rounded" value={form.commissionRate} onChange={e => setForm({ ...form, commissionRate: parseInt(e.target.value) })} />
          <button type="submit" className="bg-purple-600 text-white py-2 rounded">Create</button>
        </form>
      </Card>
      <Card>
        <table className="w-full"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Commission</th></tr></thead>
        <tbody>{subadmins.map((s: any) => <tr key={s._id}><td>{s.userId?.name}</td><td>{s.userId?.email}</td><td>{s.role}</td><td>{s.commissionRate} BDT</td></tr>)}</tbody></table>
      </Card>
    </div>
  );
}
