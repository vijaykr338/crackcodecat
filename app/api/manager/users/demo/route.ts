import { connect } from "@/lib/db";
import DemoStudent from "@/models/demostudents";
import { NextResponse } from "next/server";

export async function GET(){
  try{
    await connect();
    const students = await DemoStudent.find({});
   
     
    return NextResponse.json(
      { success: true, students },
      { status: 200 }
    );
    
  }
  catch(e){
  
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve students. Please try again later.",
      },
      { status: 500 }
    );
  }
}