import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; 
import { connectToDatabase } from "@/lib/db"; 
import Video from "@/models/Video"; 

export async function GET() {
  try {
    await connectToDatabase();
    const videos = await Video.find({}).sort({ createdAt: -1 });
    return NextResponse.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      videoUrl,
      thumbnailUrl,
      controls,
      transformations,
    } = body;

    if (!title || !description || !videoUrl || !thumbnailUrl) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: title, description, videoUrl, and thumbnailUrl are required",
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Create video document
    const video = new Video({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      controls: controls || true,
      transformations: transformations || {},
      createdAt: new Date(),
    });

    // Save to database
    const savedVideo = await video.save();

    return NextResponse.json(savedVideo, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 }
    );
  }
}
