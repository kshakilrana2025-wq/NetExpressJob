'use client';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { showToast } from '@/components/ui/Toast';

export default function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', reward: 5, type: 'custom', targetUrl: '', proofRequired: 'screenshot' });
  useEffect(() => {
    fetch('/api/admin/tasks').then(res => res.json()).then(setTasks);
    fetch('/api/admin/tasks/submissions').then(res => res.json()).then(setSubmissions);
  }, []);
  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/tasks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) { showToast.success('Task created'); setForm({ title: '', description: '', reward: 5, type: 'custom', targetUrl: '', proofRequired: 'screenshot' }); location.reload(); }
  };
  const reviewSubmission = async (id: string, action: string) => {
    const res = await fetch('/api/admin/tasks/submissions', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ submissionId: id, action }) });
    if (res.ok) { showToast.success(`Submission ${action}d`); setSubmissions(submissions.filter((s: any) => s._id !== id)); }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Task Management</h1>
      <Card className="mb-8"><h2 className="text-xl font-semibold mb-4">Create Task</h2>
        <form onSubmit={createTask} className="grid md:grid-cols-2 gap-4">
          <input placeholder="Title" className="border p-2 rounded" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <textarea placeholder="Description" className="border p-2 rounded" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
          <input type="number" placeholder="Reward (BDT)" className="border p-2 rounded" value={form.reward} onChange={e => setForm({ ...form, reward: parseInt(e.target.value) })} required />
          <select className="border p-2 rounded" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
            <option value="promotion">Promotion</option><option value="follow">Follow</option><option value="comment">Comment</option><option value="like">Like</option><option value="share">Share</option><option value="custom">Custom</option>
          </select>
          <input placeholder="Target URL (optional)" className="border p-2 rounded" value={form.targetUrl} onChange={e => setForm({ ...form, targetUrl: e.target.value })} />
          <select className="border p-2 rounded" value={form.proofRequired} onChange={e => setForm({ ...form, proofRequired: e.target.value })}>
            <option value="screenshot">Screenshot</option><option value="link">Link</option>
          </select>
          <button type="submit" className="bg-purple-600 text-white py-2 rounded">Create Task</button>
        </form>
      </Card>
      <Card><h2 className="text-xl font-semibold mb-4">Pending Submissions</h2>
        <table className="w-full"><thead><tr><th>Task</th><th>User</th><th>Proof</th><th>Actions</th></tr></thead>
        <tbody>{submissions.map((s: any) => <tr key={s._id}><td>{s.task?.title}</td><td>{s.user?.email}</td><td><a href={s.proofUrl} target="_blank">View</a></td><td><button onClick={() => reviewSubmission(s._id, 'approve')} className="bg-green-600 text-white px-2 py-1 rounded mr-2">Approve</button><button onClick={() => reviewSubmission(s._id, 'reject')} className="bg-red-600 text-white px-2 py-1 rounded">Reject</button></td></tr>)}</tbody></table>
      </Card>
    </div>
  );
}
