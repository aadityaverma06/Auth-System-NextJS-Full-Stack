import connectDB from "@/db/dbconnect.js";
import { User } from "@/models/user.models.js";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/helpers/mailer.js";

connectDB();

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;
    
    const isEmailValid = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!isEmailValid(email)) {
      return NextResponse.json({ error: "Invalid email", status: 400 });
    }

    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return NextResponse.json({ error: "User already exists", status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await User.findById(newUser._id).select("-password -__v -verifyToken -verifyTokenExpiry");
    
    const sendEmailResponse = await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User created successfully",
      status: 201,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
