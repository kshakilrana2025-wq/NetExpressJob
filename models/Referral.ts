import mongoose, { Schema, Document } from 'mongoose';

export interface IReferral extends Document {
  referrer: mongoose.Types.ObjectId;
  referred: mongoose.Types.ObjectId;
  referrerRoleAtTime: string; // trainer, team_leader, senior_team_leader
  commissionAmount: number; // 50, 75, 100
  status: 'pending_activation' | 'paid';
  createdAt: Date;
}

const ReferralSchema = new Schema<IReferral>({
  referrer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  referred: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  referrerRoleAtTime: { type: String, required: true },
  commissionAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending_activation', 'paid'], default: 'pending_activation' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Referral || mongoose.model<IReferral>('Referral', ReferralSchema);
