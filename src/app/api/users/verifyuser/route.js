import connectDB from "@/db/dbconnect.js";
import { User } from "@/models/user.models.js";
import { NextResponse, NextRequest } from "next/server";
import { sendEmail } from "@/utils/mailer.js";

connectDB();

export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body);
    const { email } = body;
    console.log(email);
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        error: "User with the following email does not exist",
        status: 400,
      });
    }
    await sendEmail({ email, emailType: "FORGOTPASSWORD", userId: user._id });
    return NextResponse.json({
      message: "Forgot Password email sent successfully",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
