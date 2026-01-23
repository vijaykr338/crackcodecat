// /app/api/coupons/verify/route.ts
import { NextRequest, NextResponse } from "next/server";

// --- Define and manage your valid coupons here ---
// The key is the coupon code (in uppercase), and the value is an object with its details.
const validCoupons = new Map([
  ["SAVE2499", { discountAmount: 2499, expiryDate: "2050-12-31", isActive: true }],
]);
// ----------------------------------------------------

export async function POST(req: NextRequest) {
  let payload;
  try {
    payload = await req.json();
    if (!payload?.code) {
      return NextResponse.json({ valid: false, message: "Coupon code is required." }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ valid: false, message: "Invalid JSON payload." }, { status: 400 });
  }
  
  const { code } = payload;
  const coupon = validCoupons.get(code.toUpperCase());

  // --- Validation Logic ---
  if (!coupon) {
    return NextResponse.json({ valid: false, message: "Invalid coupon code." }, { status: 404 });
  }

  if (!coupon.isActive) {
    return NextResponse.json({ valid: false, message: "This coupon is no longer active." }, { status: 400 });
  }

  if (new Date(coupon.expiryDate) < new Date()) {
    return NextResponse.json({ valid: false, message: "This coupon has expired." }, { status: 400 });
  }
  // --- End of Validation ---

  // If all checks pass, return success response
  return NextResponse.json({
    valid: true,
    discount: coupon.discountAmount,
    message: "Coupon applied successfully!",
  });
}
