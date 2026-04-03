import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

export async function sendOTPEmail(to: string, otp: string) {
  await transporter.sendMail({
    from: `"NetExpressJob" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Email Verification OTP',
    html: `<p>Your OTP: <b>${otp}</b>. Valid for 10 minutes.</p>`
  });
}
