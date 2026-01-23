import { NextRequest, NextResponse } from "next/server";
import { sendOtpMail } from "@/utils/mailer";
import Otp from "@/models/otp";
import { connect } from "@/lib/db";

const OTP_EXPIRY_MINUTES = 10;

export async function POST(req: NextRequest) {
  await connect();
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  // Remove old OTP for the same email
  await Otp.deleteMany({ email });

  // Save new OTP
  await Otp.create({
    email,
    otp,
    expiresAt,
  });

  // Send email
  await sendOtpMail(email, otp);

  return NextResponse.json({ message: "OTP sent to email" });
}
