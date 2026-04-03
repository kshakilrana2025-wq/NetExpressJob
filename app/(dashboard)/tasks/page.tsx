'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch('/api/tasks').then(res => res.json()).then(setTasks);
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Daily Tasks</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {tasks.map((task: any) => (
          <Card key={task._id}>
            <h3 className="text-xl font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-green-600 font-bold">Reward: {task.reward} BDT</p>
            <Link href={`/tasks/${task._id}`} className="inline-block mt-4 bg-purple-600 text-white px-4 py-2 rounded">Submit Proof</Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
