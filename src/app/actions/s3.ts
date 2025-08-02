"use server";

import {
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import "../lib/envConfig.ts";
import { s3 } from "@/lib";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { transliterate } from "../utils";
import { IUploadLessonFilePayload } from "@/typings";

export async function uploadLessonFileToS3(payload: IUploadLessonFilePayload) {
  const { file, course, title } = payload;

  if (!file || !course || !title)
    return { success: false, error: "Недостатньо даних" };

  const buffer = Buffer.from(await file.arrayBuffer());

  const lessonSlug = transliterate(title);

  const key = `${course}/${lessonSlug}/${file.name}`;

  try {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    });

    await s3.send(command);
    return { success: true, data: key };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function getVideoSignedUrl(fileKey: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
  });

  try {
    const signedUrl: string = await getSignedUrl(s3, command, {
      expiresIn: 300,
    });
    return { success: true, url: signedUrl };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function listCourseFiles(courseSlug: string) {
  const command = new ListObjectsV2Command({
    Bucket: process.env.AWS_BUCKET_NAME,
    Prefix: `${courseSlug}/`,
  });

  const response = await s3.send(command);
  return response.Contents?.map(item => item.Key) || [];
}

export async function deleteLessonFromS3(prefix: string) {
  const listCommand = new ListObjectsV2Command({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Prefix: prefix,
  });

  const listedObjects = await s3.send(listCommand);

  if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
    return { success: true, message: "Файли відсутні" };
  }

  const deleteCommand = new DeleteObjectsCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Delete: {
      Objects: listedObjects.Contents.map(obj => ({ Key: obj.Key! })),
    },
  });

  await s3.send(deleteCommand);

  return { success: true };
}
