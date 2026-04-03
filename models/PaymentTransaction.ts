import mongoose, { Schema, Document } from 'mongoose';

export interface IPaymentTransaction extends Document {
  user: mongoose.Types.ObjectId;
  method: 'bKash' | 'Nagad' | 'Rocket';
  transactionId: string;
  screenshotUrl: string;
  amount: number;
  status: 'pending' | 'verified' | 'rejected';
  adminNote?: string;
  createdAt: Date;
  verifiedAt?: Date;
}

const PaymentTransactionSchema = new Schema<IPaymentTransaction>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  method: { type: String, enum: ['bKash', 'Nagad', 'Rocket'], required: true },
  transactionId: { type: String, required: true },
  screenshotUrl: { type: String, required: true },
  amount: { type: Number, required: true, default: 500 },
  status: { type: String, default: 'pending' },
  adminNote: String,
  createdAt: { type: Date, default: Date.now },
  verifiedAt: Date
});

export default mongoose.models.PaymentTransaction || mongoose.model<IPaymentTransaction>('PaymentTransaction', PaymentTransactionSchema);
