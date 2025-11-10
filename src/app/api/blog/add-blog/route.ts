import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/lib/course-models/Blog";

const allowedOrigin = "https://admin.exameets.in";

export async function POST(request: Request) {
  const headers = {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  try {
    await dbConnect();

    const body = await request.json();
    const { title, markdownText, tags, author, slug, imageUrl, type , hook } = body;

    // validation
    if (!title || !markdownText || !author || !slug || !imageUrl || !type || !hook) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers }
      );
    }

    // check slug unique
    const existing = await Blog.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { error: "Slug already exists. Use a different slug." },
        { status: 409, headers }
      );
    }

    const blog = await Blog.create({
      title,
      markdownText,
      author,
      tags: tags || [],
      slug,
      imageUrl,
      type,
      hook: body.hook || "",
    });

    return NextResponse.json(
      { success: true, blog },
      { status: 201, headers }
    );
  } catch (error) {
    console.error("Create blog error:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500, headers }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
