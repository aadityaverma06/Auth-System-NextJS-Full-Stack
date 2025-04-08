import connectDB from "@/db/dbconnect.js";
import { User } from "@/models/user.models.js";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";

connectDB();

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: "User already exists", status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      status: 201,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

