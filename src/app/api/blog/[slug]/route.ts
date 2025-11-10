import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/lib/course-models/Blog";

const allowedOrigin = "https://admin.exameets.in";


export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params; // ✅ new


  const headers = {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  try {
    await dbConnect();

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404, headers }
      );
    }

    return NextResponse.json(
      { success: true, blog },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Fetch single blog error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
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
