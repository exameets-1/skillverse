import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/course-models/User";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const {
      name,
      email,
      phone,
      educationLevel,
      address,
      location,
      guardianName,
      guardianPhone,
      password,
    } = await req.json();

    // ✅ Validate required fields
    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { error: "Name, email, phone and password are required" },
        { status: 400 }
      );
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // ✅ Create user (force role = student)
    const newUser = await User.create({
      name,
      email,
      phone,
      educationLevel: educationLevel || "",
      address: address || "",
      location: location || { state: "", district: "" },
      guardianName: guardianName || "",
      guardianPhone: guardianPhone || "",
      password, // will be auto-hashed by pre-save
      role: "student", // ✅ override any role sent in body
    });

    return NextResponse.json(
      {
        message: "Registration successful. Please login.",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
