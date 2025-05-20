import nodemailer from 'nodemailer';

function getSmtpTransport(region: 'india' | 'global') {
  const prefix = region === 'india' ? 'SMTP_INDIA' : 'SMTP_GLOBAL';

  return nodemailer.createTransport({
    host: process.env[`${prefix}_HOST`]!,
    port: parseInt(process.env[`${prefix}_PORT`]!),
    secure: process.env[`${prefix}_SECURE`] === 'true', // true for 465, false for 587
    auth: {
      user: process.env[`${prefix}_USER`]!,
      pass: process.env[`${prefix}_PASS`]!,
    },
  });
}

export async function sendOtpEmail(region: 'india' | 'global', to: string, otp: string) {
  const prefix = region === 'india' ? 'SMTP_INDIA' : 'SMTP_GLOBAL';
  const from = `"${process.env[`${prefix}_FROM_NAME`]}" <${process.env[`${prefix}_FROM`]}>`;

  const transporter = getSmtpTransport(region);

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject: 'Your OTP Code',
      html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
    });

    console.log(`[SMTP:${region}] OTP email sent: ${info.messageId}`);
  } catch (error) {
    console.error(`[SMTP:${region}] Failed to send OTP:`, error);
    throw new Error('Email sending failed');
  }
}
