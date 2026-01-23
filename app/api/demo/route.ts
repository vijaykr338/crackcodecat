import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import DemoStudent from "@/models/demostudents";
import { sendMail } from "@/utils/mailer";


export async function POST(req: NextRequest) {
  try {
    await connect();

    const { name, email, mobile } = await req.json();

    // ✅ Input validation
    if (!name || !email || !mobile) {
      return NextResponse.json(
        { message: "All fields (name, email, mobile) are required.", success: false },
        { status: 400 }
      );
    }

    // ✅ Prevent duplicate booking
    const existingStudent = await DemoStudent.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingStudent) {
      return NextResponse.json(
        {
          message: "Call is already booked with this email or mobile number.",
          success: false,
        },
        { status: 409 }
      );
    }

    let student;

    // ✅ Create student record safely
    try {
      student = await DemoStudent.create({ name, email, mobile });
    } catch (err: any) {
      return NextResponse.json(
        {
          message: `Failed to create student record: ${err.message}`,
          success: false,
        },
        { status: 500 }
      );
    }

    // ✅ Try sending confirmation email separately
    try {
      const SUBJECT = "CONSULTATION CALL BOOKING SUCCESSFUL";
      const BODY =
        "You have booked a free consultation call with our mentor, we will contact you soon.";
      await sendMail(email, BODY, SUBJECT);
      await sendMail("crackcodecatclasses@gmail.com",`${name} has booked a consultation call\n Contact him at ${email} or no: ${mobile}`,`Consultation call from ${name}`)
      return NextResponse.json(
        {
          message: "Call booked successfully and email sent!",
          success: true,
          student,
        },
        { status: 201 }
      );
    } catch (err: any) {
      // Email failed but booking was successful
      return NextResponse.json(
        {
          message:
            "Call booked successfully, but confirmation email could not be sent.",
          success: true,
          student,
          emailError: err.message,
        },
        { status: 201 } // Still 201 since booking was successful
      );
    }
  } catch (error: any) {
    // Any other unexpected errors
    return NextResponse.json(
      {
        message: `Internal Server Error: ${error.message}`,
        success: false,
      },
      { status: 500 }
    );
  }
}

