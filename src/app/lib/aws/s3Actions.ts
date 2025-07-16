"use server";

import {
  PutObjectCommand,
  ListObjectsV2Command,
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import "../envConfig.ts";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getVideoSignedUrl(fileKey: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
  });

  try {
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 30 });
    return { success: true, url: signedUrl };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function uploadLesson(formData: FormData) {
  const file = formData.get("file") as File | null;
  const course = formData.get("course")?.toString();

  if (!file || !course) return { success: false, message: "Invalid data" };

  const buffer = Buffer.from(await file.arrayBuffer());

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${course}/${file.name}`,
    Body: buffer,
    ContentType: file.type,
  });

  await s3.send(command);

  return { success: true };
}

export async function listCourseFiles(courseSlug: string) {
  const command = new ListObjectsV2Command({
    Bucket: process.env.AWS_BUCKET_NAME,
    Prefix: `${courseSlug}/`,
  });

  const response = await s3.send(command);
  return response.Contents?.map(item => item.Key) || [];
}

export async function getCourseVideoUrl(courseSlug: string, fileName: string) {
  const key = `${courseSlug}/${fileName}`;
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  try {
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 }); // 1 хвилина
    return { success: true, url: signedUrl };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
