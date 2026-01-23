import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import Otp from "@/models/otp";
import { connect } from "@/lib/db";

export async function POST(req: NextRequest) {
  await connect();
  const { email, name, password, otp } = await req.json();

  if (!email || !name || !password || !otp) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const otpData = await Otp.findOne({ email, otp });
  if (!otpData || otpData.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
  }

  // Delete OTP after verification
  await Otp.deleteOne({ _id: otpData._id });

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "Email already registered." }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    name,
    password: hashedPassword,
    coursesRegistered: [],
  });

  return NextResponse.json({ message: "Signup successful", userId: user._id }, { status: 201 });
}
