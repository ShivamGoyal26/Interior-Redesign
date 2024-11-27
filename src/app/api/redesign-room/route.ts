import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import axios from "axios";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_S3_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_ACCESS_SECRET_KEY!,
  },
});

async function uploadImageFromUrlToS3(imageUrl: string, fileName: string) {
  const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const buffer = Buffer.from(response.data);

  const objectKey = `${fileName}-${Date.now()}`;

  const params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
    Key: objectKey,
    Body: buffer,
    ContentType: response.headers["content-type"],
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  const fileUrl = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${objectKey}`;
  return fileUrl;
}

export async function POST(request: NextRequest) {
  const { prompt, roomType, designType, originalImage } = await request.json();

  try {
    // Convert image to AI Image
    const input = {
      image: originalImage,
      prompt: `A ${roomType} with a ${designType} style interior ${prompt}`,
    };

    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input }
    );

    if (!output || typeof output !== "string") {
      throw new Error("Invalid output received from Replicate");
    }

    // Upload the generated image to S3
    const fileName = `ai-generated-${roomType}-${designType}`;
    const uploadedFileUrl = await uploadImageFromUrlToS3(output, fileName);

    return NextResponse.json(
      { isSuccess: true, data: { outputUrl: output, s3Url: uploadedFileUrl } },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message, isSuccess: false },
      { status: 500 }
    );
  }
}
