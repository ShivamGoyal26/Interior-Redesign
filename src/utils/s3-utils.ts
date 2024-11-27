import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import axios from "axios";

const S3_BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET_NAME!;
const S3_REGION = process.env.NEXT_PUBLIC_S3_REGION!;
const s3Client = new S3Client({
  region: S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_ACCESS_SECRET_KEY!,
  },
});

// Upload file buffer to S3
export async function uploadFileBufferToS3(
  file: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  const objectKey = `${fileName}-${Date.now()}`;
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: objectKey,
    Body: file,
    ContentType: contentType,
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return `https://${S3_BUCKET_NAME}.s3.${S3_REGION}.amazonaws.com/${objectKey}`;
}

// Upload image from a URL to S3
export async function uploadImageFromUrlToS3(
  imageUrl: string,
  fileName: string
): Promise<string> {
  const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const buffer = Buffer.from(response.data);

  return await uploadFileBufferToS3(
    buffer,
    fileName,
    response.headers["content-type"] || "image/jpg"
  );
}
