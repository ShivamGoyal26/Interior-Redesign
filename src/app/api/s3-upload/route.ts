import { NextRequest, NextResponse } from "next/server";
import { uploadFileBufferToS3 } from "@/utils/s3-utils";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file found", isSuccess: false },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileUrl = await uploadFileBufferToS3(buffer, file.name, "image/jpg");

    return NextResponse.json(
      { isSuccess: true, data: fileUrl },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message, isSuccess: false },
      { status: 500 }
    );
  }
}
