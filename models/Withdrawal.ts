import mongoose, { Schema, Document } from 'mongoose';

export interface IWithdrawal extends Document {
  user: mongoose.Types.ObjectId;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: Date;
  processedDate?: Date;
}

const WithdrawalSchema = new Schema<IWithdrawal>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  requestDate: { type: Date, default: Date.now },
  processedDate: Date
});

export default mongoose.models.Withdrawal || mongoose.model<IWithdrawal>('Withdrawal', WithdrawalSchema);
