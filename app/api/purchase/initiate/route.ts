// /app/api/payment/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { connect } from "@/lib/db";
import Payment from "@/models/payment";
import Course from "@/models/course"
import User from "@/models/user";
import { getInstamojoAccessToken } from "@/lib/insta_token";

const validCoupons = new Map([
  ["SAVE2499", { discountAmount: 2499, expiryDate: "2026-12-31", isActive: true }],
]);
// ---------------------------------------------

export async function POST(req: NextRequest) {
  await connect();

  // Step 1: Input validation
  let payload;
  try {
    payload = await req.json();
    // NEW: Destructure couponCode from the payload
    const { courseId, userId, couponCode } = payload;
    
    if (!courseId || !userId) {
      return NextResponse.json({ success: false, error: "Missing courseId or userId." }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  // Step 2: Get course and validate existance
  const course = await Course.findById(payload.courseId);
  if (!course) {
    return NextResponse.json({ success: false, error: "Course not found." }, { status: 404 });
  }

  // Step 3: Get user and validate existance
  const user = await User.findById(payload.userId);
  if (!user) {
    return NextResponse.json({ success: false, error: "User not found." }, { status: 404 });
  }

  // --- NEW: Step 3.5: Validate Coupon and Calculate Final Price ---
  let finalPrice = course.price;
  let appliedCouponCode: string | null = null;

  if (payload.couponCode) {
    const code = payload.couponCode.toUpperCase();
    const coupon = validCoupons.get(code);

    // Check if coupon exists, is active, and has not expired
    if (coupon && coupon.isActive && new Date() < new Date(coupon.expiryDate)) {
      finalPrice = course.price - coupon.discountAmount;
      // Ensure price doesn't go below zero
      if (finalPrice < 0) {
        finalPrice = 0;
      }
      appliedCouponCode = code;
      console.log(`Coupon '${code}' applied. Original Price: ${course.price}, New Price: ${finalPrice}`);
    } else {
      console.warn(`Invalid, inactive, or expired coupon code received: '${code}'. Proceeding with original price.`);
    }
  }
  // -----------------------------------------------------------------

  const { name, email, phone = "" } = user;

  // Step 4: Get Instamojo Access Token
  let access_token;
  try {
    access_token = await getInstamojoAccessToken();
  } catch (err: any) {
    console.error("Error fetching access token:", err.response?.data || err.message);
    return NextResponse.json({ success: false, error: "Failed to fetch Instamojo access token." }, { status: 502 });
  }

  // Step 5: Create Instamojo payment request
  let paymentData;
  try {
    const paymentRes = await axios.post(
      "https://api.instamojo.com/v2/payment_requests/",
      {
        // UPDATED: Use the calculated finalPrice
        amount: finalPrice,
        purpose: `Purchase of ${course.courseName}`, // Made purpose more specific
        buyer_name: name,
        email,
        buyer_phone: phone,
        redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        webhook: `${process.env.NEXT_PUBLIC_BASE_URL}/api/purchase/webhook/`,
        allow_repeated_payments: false,
        send_email: true
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    paymentData = paymentRes.data;
  } catch (err: any) {
    console.error("Error creating payment request:", err.response?.data || err.message);
    return NextResponse.json({ success: false, error: "Failed to create Instamojo payment request." }, { status: 502 });
  }

  // Step 6: Save payment details to DB
  try {
    await Payment.create({
      courseId: payload.courseId,
      userId: payload.userId,
      // UPDATED: Save the final amount and the coupon used
      amount: finalPrice,
      couponUsed: appliedCouponCode, // Store the coupon code used for this transaction
      instamojo_RequestId: paymentData.id,
    });
  } catch (err: any) {
    console.error("Error saving payment:", err.response?.data || err.message);
    return NextResponse.json({ success: false, error: "Failed to save payment record." }, { status: 500 });
  }

  // Step 7: Send response to frontend
  return NextResponse.json({
    success: true,
    paymentUrl: paymentData.longurl,
  });
}
