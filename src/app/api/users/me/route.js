import connectDB from "@/db/dbconnect";
import { tokenExtractor } from "@/utils/tokenExtractor.js";
import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request) {
  try {
    const decodedToken = await tokenExtractor(request);
    const user = await User.findOne({ _id: decodedToken.id }).select(
      "-password -__v -isAdmin -isVerified"
    );
    console.log(
      NextResponse.json({ message: "User Found", user, status: 200 })
    );
    return NextResponse.json({ message: "User Found", user, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
