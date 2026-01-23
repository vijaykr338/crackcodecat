import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOtpMail(to: string, otp: string) {
  await transporter.sendMail({
    from: `"CrackCodeCat" <${process.env.SMTP_USER}>`,
    to,
    subject: "Your OTP for CrackCodeCat Signup",
    text: `Your OTP is: ${otp}`,
    html: `<p>Your OTP is: <b>${otp}</b></p>`,
  });
}

export async function sendMail(to:string,body: string,subject:string){
  
    await transporter.sendMail({
      from : `"CrackCodeCat" <${process.env.SMTP_USER}>`,
      to : to,
      subject : subject,
      text : body
    })
    
}