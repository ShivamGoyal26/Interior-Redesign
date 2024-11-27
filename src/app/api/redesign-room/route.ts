import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { imagesTable } from "@/db/schema";
import { uploadImageFromUrlToS3 } from "@/utils/s3-utils";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

export async function POST(request: NextRequest) {
  try {
    const { prompt, roomType, designType, originalImage, userEmail, credits } =
      await request.json();

    const aiPrompt = `A ${roomType} with a ${designType} style interior ${prompt}`;
    const aiGeneratedImage = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input: { image: originalImage, prompt: aiPrompt } }
    );

    if (!aiGeneratedImage || typeof aiGeneratedImage !== "string") {
      throw new Error("Invalid output received from Replicate");
    }

    const fileName = `ai-generated-${roomType}-${designType}`;
    const s3Url = await uploadImageFromUrlToS3(aiGeneratedImage, fileName);

    const dbResult = await db
      .insert(imagesTable)
      .values({
        userEmail,
        roomType,
        designType,
        prompt,
        aiGeneratedImage: s3Url,
        originalImage,
      })
      .returning();

    if (!dbResult[0]) {
      return NextResponse.json(
        { isSuccess: false, error: "Database insertion failed." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { isSuccess: true, data: { aiGeneratedImage: s3Url, originalImage } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { isSuccess: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
