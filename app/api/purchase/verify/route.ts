import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import Payment from "@/models/payment";
import { getInstamojoAccessToken } from "@/lib/insta_token";
import axios from "axios"


async function fetchPaymentStatus(paymentId: string) {
  try{

      const token = await getInstamojoAccessToken();
  
    const {data} = await axios.get(`https://api.instamojo.com/v2/payments/${paymentId}/`,
      {
           headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
      }
    )
    return data;
  }
  catch (err: any) {
    // Axios puts error info in err.response
    const status = err.response?.status || 500;
    const message =
      err.response?.data?.message || "Instamojo API request failed";
    throw new Error(`Instamojo API error (${status}): ${message}`);
  }
}

export async function POST(req: NextRequest) {
  const { payment_id, payment_request_id } = await req.json();

  if (!payment_id || !payment_request_id) {
    return NextResponse.json(
      { success: false, error: "Payment id and request id required" },
      { status: 400 }
    );
  }

  try {
    await connect();

    const instance = await Payment.findOne({ instamojoRequestId: payment_request_id });
    if (!instance) {
      return NextResponse.json({ success: false, error: "Payment not found" }, { status: 404 });
    }

    // If DB already has paymentId, validate match
    if (instance.instamojoPaymentId && instance.instamojoPaymentId !== payment_id) {
      return NextResponse.json(
        { success: false, error: "Payment ID mismatch" },
        { status: 400 }
      );
    }

    // Always verify with Instamojo API
    const paymentData = await fetchPaymentStatus(payment_id);

    // Update DB with latest info
    instance.instamojoPaymentId = payment_id;
    instance.status = paymentData.status === "completed" ? "SUCCESS" : "PENDING";
    await instance.save();

    return NextResponse.json({
      success: instance.status === "SUCCESS",
      payment: {
        id: paymentData.id,
        status: paymentData.status,
        amount: paymentData.amount,
      },
    });
  } catch (err: any) {
    console.error("Verify API error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
