import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const identifier = body.identifier || body.email || body.username;
    const password = body.password;

    if (!identifier) {
      return NextResponse.json(
        { error: "Either username or email is required" },
        { status: 400 }
      );
    }
    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }
    await connectToDatabase();
    const user = await User.findOne({
      $or: [{ email :identifier}, { username :identifier}],
    });
    if (!user) {
      return NextResponse.json({ error: "Wrong credentials" }, { status: 401 });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "User logged in successfully", isAdmin: user.isAdmin },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to login user" },
      { status: 500 }
    );
  }
}
