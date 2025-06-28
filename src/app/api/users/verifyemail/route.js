import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/dbconnect.js";
import { User } from "@/models/user.models.js";

connectDB();

export async function POST(request) {
  try {
    const body = await request.json();
    const { token } = body;

    const user = await User.findOne({
      verifyToken: decodeURIComponent(token),
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token", status: 400 });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
