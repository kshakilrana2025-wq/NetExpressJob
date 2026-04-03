'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { showToast } from '@/components/ui/Toast';

export default function TaskSubmitPage() {
  const { id } = useParams();
  const router = useRouter();
  const [task, setTask] = useState<any>(null);
  const [proof, setProof] = useState<File | null>(null);
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/tasks/${id}`).then(res => res.json()).then(setTask);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;
    setLoading(true);
    const formData = new FormData();
    if (task.proofRequired === 'screenshot' && proof) {
      formData.append('proof', proof);
    } else if (task.proofRequired === 'link') {
      formData.append('proof', link);
      formData.append('link', link);
    } else {
      showToast.error('Please provide proof');
      setLoading(false);
      return;
    }
    const res = await fetch(`/api/tasks/${id}/submit`, { method: 'POST', body: formData });
    if (res.ok) {
      showToast.success('Task submitted for review');
      router.push('/tasks');
    } else {
      const data = await res.json();
      showToast.error(data.error || 'Submission failed');
    }
    setLoading(false);
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
      <p className="text-gray-600 mb-4">{task.description}</p>
      <p className="text-green-600 font-bold mb-6">Reward: {task.reward} BDT</p>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
        {task.proofRequired === 'screenshot' && (
          <div>
            <label className="block font-medium mb-1">Screenshot Proof</label>
            <input type="file" accept="image/*" onChange={e => setProof(e.target.files?.[0] || null)} required className="w-full border rounded-lg p-2" />
          </div>
        )}
        {task.proofRequired === 'link' && (
          <div>
            <label className="block font-medium mb-1">Link to your work</label>
            <input type="url" placeholder="https://..." value={link} onChange={e => setLink(e.target.value)} required className="w-full border rounded-lg p-2" />
          </div>
        )}
        <button type="submit" disabled={loading} className="w-full bg-purple-600 text-white py-2 rounded-full">
          {loading ? 'Submitting...' : 'Submit for Review'}
        </button>
      </form>
    </div>
  );
}
