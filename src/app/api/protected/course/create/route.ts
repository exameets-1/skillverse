import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Course from "@/lib/course-models/Course";
import { verifyRole } from "@/lib/auth/authorize"; // ✅ use our helper

const allowedOrigin = "https://admin.exameets.in";

export async function POST(request: NextRequest) {
  const headers = {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  // ✅ Only Admins Can Create Courses
  const { authorized, response, decoded } = verifyRole(request, ["admin"]);
  if (!authorized) return response; // stops here if not admin

  try {
    await dbConnect();

    const {
      title,
      description,
      thumbnail,
      tags,
      modules,
      level
    } = await request.json();

    if (!title) {
      return NextResponse.json({ error: "Course title is required" }, { status: 400, headers });
    }

    const newCourse = await Course.create({
      title,
      description: description || "",
      thumbnail: thumbnail || "",
      tags: Array.isArray(tags) ? tags : [],
      modules: Array.isArray(modules) ? modules : [],
      level: level || "beginner",
      createdBy: decoded!.userId // ✅ use token user id
    });

    return NextResponse.json({
      message: "Course created successfully",
      course: {
        id: newCourse._id,
        title: newCourse.title,
        description: newCourse.description,
        level: newCourse.level,
        createdBy: newCourse.createdBy,
      }
    }, { status: 201, headers });

  } catch (error) {
    console.error("Create Course Error:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500, headers }
    );
  }
}

// CORS prefight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
