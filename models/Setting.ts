import mongoose, { Schema, Document } from 'mongoose';

export interface ISetting extends Document {
  activationFee: number;
  referralCommissionRates: { trainer: number; teamLeader: number; seniorTeamLeader: number };
  defaultTaskReward: number;
  paymentMethods: { bKash: string; Nagad: string; Rocket: string };
  updatedBy: mongoose.Types.ObjectId;
  updatedAt: Date;
}

const SettingSchema = new Schema<ISetting>({
  activationFee: { type: Number, default: 500 },
  referralCommissionRates: {
    trainer: { type: Number, default: 50 },
    teamLeader: { type: Number, default: 75 },
    seniorTeamLeader: { type: Number, default: 100 }
  },
  defaultTaskReward: { type: Number, default: 5 },
  paymentMethods: {
    bKash: { type: String, default: '01700000000' },
    Nagad: { type: String, default: '01700000000' },
    Rocket: { type: String, default: '01700000000' }
  },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Setting || mongoose.model<ISetting>('Setting', SettingSchema);
