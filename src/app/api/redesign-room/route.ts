import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { description, roomType, designType, originalImage } =
    await request.json();
  try {
    // Convert image to AI Image
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message, isSuccess: false },
      { status: 500 }
    );
  }
}
