import nodemailer from 'nodemailer';

export default async function sendEmail(email: string, message?: string) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ACC, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
  });

  return await transporter.sendMail({
    from: 'Dev connect', // sender address
    to: email, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: message, // plain text body
    html: `<b>${message}</b>`, // html body
  });
}
