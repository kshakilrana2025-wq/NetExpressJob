import mongoose, { Schema, Document } from 'mongoose';

export interface ITaskSubmission extends Document {
  task: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  proofUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNote?: string;
  submittedAt: Date;
  reviewedAt?: Date;
}

const TaskSubmissionSchema = new Schema<ITaskSubmission>({
  task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  proofUrl: { type: String, required: true },
  status: { type: String, default: 'pending' },
  adminNote: String,
  submittedAt: { type: Date, default: Date.now },
  reviewedAt: Date
});

export default mongoose.models.TaskSubmission || mongoose.model<ITaskSubmission>('TaskSubmission', TaskSubmissionSchema);
