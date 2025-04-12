import connectDB from "@/db/dbconnect.js";
import { User } from "@/models/user.models.js";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "User does not exist", status: 400 });
    }

    if (!user.isVerified) {
      return NextResponse.json({ error: "Please verify your email", status: 400 });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password", status: 400 });
    }

    const tokenData = {
      id: user._id,
      username: user.username,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "User logged in successfully",
      status: 200,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
