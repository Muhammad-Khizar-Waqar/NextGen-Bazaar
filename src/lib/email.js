import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOrderConfirmation(email, orderId) {
  const mailOptions = {
    from: `"Desert Drift Gems" <orders@desertdriftgems.com>`,
    to: email,
    subject: `Order #${orderId} Confirmed - Your Gems Are On The Way!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(to bottom, #F4E4BC, #D4AF37);">
        <h1 style="color: #D4AF37; text-align: center;">Thank You for Your Purchase!</h1>
        <p style="text-align: center;">Order ID: <strong>${orderId}</strong></p>
        <p style="text-align: center;">Your desert treasures have been dispatched. Expect delivery within 5-7 days.</p>
        <p style="text-align: center;">If you have questions, reply to this email.</p>
        <img src="https://via.placeholder.com/600x200/D4AF37/FFFFFF?text=Desert+Gems+Banner" alt="Desert Gems" style="width: 100%; height: auto; border-radius: 8px;" />
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}