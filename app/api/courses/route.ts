import { connect } from "@/lib/db";
import Course from "@/models/course"
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const courses = await Course.find({});
    return NextResponse.json({ success: true, courses }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message}`, success: false },
      { status: 500 }
    );
  }
}
