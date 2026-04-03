import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  reward: number;
  type: 'promotion' | 'follow' | 'comment' | 'like' | 'share' | 'custom';
  targetUrl?: string;
  proofRequired: 'screenshot' | 'link';
  status: 'active' | 'inactive';
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  reward: { type: Number, required: true },
  type: { type: String, enum: ['promotion', 'follow', 'comment', 'like', 'share', 'custom'], default: 'custom' },
  targetUrl: String,
  proofRequired: { type: String, enum: ['screenshot', 'link'], default: 'screenshot' },
  status: { type: String, default: 'active' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
