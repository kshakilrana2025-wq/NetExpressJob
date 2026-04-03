import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'subadmin';
  subadminRole?: string;
  emailVerified: boolean;
  referralCode: string;
  referredBy?: mongoose.Types.ObjectId;
  wallet: { available: number; pending: number; totalEarned: number };
  activationStatus: 'pending' | 'active' | 'rejected';
  activationTransactionId?: string;
  studentId: string;
  phone: string;
  otp?: string;
  otpExpires?: Date;
  createdAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'subadmin'], default: 'user' },
  subadminRole: { type: String },
  emailVerified: { type: Boolean, default: false },
  referralCode: { type: String, unique: true, required: true },
  referredBy: { type: Schema.Types.ObjectId, ref: 'User' },
  wallet: {
    available: { type: Number, default: 0 },
    pending: { type: Number, default: 0 },
    totalEarned: { type: Number, default: 0 }
  },
  activationStatus: { type: String, enum: ['pending', 'active', 'rejected'], default: 'pending' },
  activationTransactionId: { type: String },
  studentId: { type: String, unique: true, required: true },
  phone: { type: String },
  otp: { type: String },
  otpExpires: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
UserSchema.methods.comparePassword = async function(candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
