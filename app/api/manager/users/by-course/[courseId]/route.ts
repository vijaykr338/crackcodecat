import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import User from "@/models/user";
import { Types } from "mongoose";

// The custom 'Context' interface has been removed.

export async function GET(
  req: NextRequest,
  {params} : {params : Promise<{courseId : string}>}
  // Type the context parameter inline like this:
) {
  try {
    await connect();

    const { courseId } = await params;
   // console.log("courseId is", courseId);

    if (!Types.ObjectId.isValid(courseId)) {
      return NextResponse.json(
        { success: false, message: "Invalid course ID" },
        { status: 400 }
      );
    }

    const users = await User.find({
      coursesRegistered: courseId,
    }).populate("coursesRegistered");

    return NextResponse.json({
      success: true,
      // No need for a ternary operator if both outcomes are the same.
      users: users,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}