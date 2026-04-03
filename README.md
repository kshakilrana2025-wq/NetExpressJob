# NetExpressJob - Complete Earning Platform

## Features
- Multi-role: Admin, Subadmin (Trainer, Team Leader, Senior Team Leader), Student
- Activation payment with bKash/Nagad/Rocket (screenshot upload)
- Referral commission: 50/75/100 BDT based on referrer's role
- Daily tasks (promotion, follow, etc.) with screenshot proof
- Wallet, withdrawals, admin approval
- Full admin panel: manage users, subadmins, tasks, payments, withdrawals
- Email verification, forgot password OTP

## Setup
1. Clone repo
2. `npm install`
3. Copy `.env.example` to `.env` and fill values
4. `npx prisma generate && npx prisma db push`
5. `npm run dev`

## Deploy to Vercel
- Set environment variables in Vercel dashboard
- Deploy from GitHub
