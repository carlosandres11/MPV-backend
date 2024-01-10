import nodemailer from "nodemailer";

export const emailSignUp = async (data) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { name, email, token } = data;

  const sendEmail = transporter.sendMail({
    from: "MPV- Manager Patient Veterinary",
    to: email,
    subject: "Verify your MPV account",
    text: "Verify your MPV account",
    html: `
        <p>Hi ${name}, your account is ready.</p>

        <p>Just check the following link: <a href="${process.env.FRONTEND_URL}/verify-account/${token}">Verify Account</a></p>

        <p>If you have not created this account, you can ignore this message.</p>
    `,
  });

  console.log("Mensaje enviado a: %s", sendEmail.messageId);
};
