import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/lib/course-models/Blog";

const allowedOrigin = "https://admin.exameets.in";

export async function GET(request: Request) {
  const origin = request.headers.get("origin");

  const headers = {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  try {
    await dbConnect();

    const blogs = await Blog.find({}, { 
      title: 1,
      slug: 1,
      tags: 1,
      postedAt: 1,
      hook: 1,
      imageUrl: 1,
      type: 1
    }).sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, blogs },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Fetch blogs error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500, headers }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
