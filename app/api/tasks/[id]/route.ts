import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import Task from '@/models/Task';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const task = await Task.findById(params.id);
  if (!task) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(task);
}
