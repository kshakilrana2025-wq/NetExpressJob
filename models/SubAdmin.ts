import mongoose, { Schema, Document } from 'mongoose';

export interface ISubAdmin extends Document {
  userId: mongoose.Types.ObjectId; // reference to User
  role: string; // senior_team_leader, team_leader, trainer, etc.
  managedUsers: mongoose.Types.ObjectId[];
  commissionRate: number; // 100, 75, 50 etc.
  totalEarnings: number;
  createdAt: Date;
}

const SubAdminSchema = new Schema<ISubAdmin>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, required: true },
  managedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  commissionRate: { type: Number, default: 0 },
  totalEarnings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.SubAdmin || mongoose.model<ISubAdmin>('SubAdmin', SubAdminSchema);
