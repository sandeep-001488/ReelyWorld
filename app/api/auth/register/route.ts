import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }
    await connectToDatabase();
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 400 }
      );
    }
    await User.create({
      username,
      email,
      password,
    });
    return NextResponse.json(
      { message: "User is registered successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
