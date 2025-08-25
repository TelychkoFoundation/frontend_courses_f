import { Types } from "mongoose";
import { CourseKeyTypes } from "./course";

export interface ILesson {
  _id: Types.ObjectId | string;
  course_id: Types.ObjectId | string;
  order: number;
  title: string;
  description?: string;
  video_key: string;
  is_free: boolean;
  price?: number;
  transcript_url?: string;
  presentation_url?: string;
  xp_reward: number;
  tags?: string[];
  views: number;
  difficulty?: "beginner" | "intermediate" | "advanced";
  related_lessons?: Types.ObjectId[];
  reviews?: ILessonReview[];
  createdAt?: Date;
  updatedAt?: Date;
  video_duration: number;
}

export interface ILessonReview {
  user_id: Types.ObjectId | string;
  rating: number;
  comment: string;
}

export interface ICreateLessonData {
  course_id: string;
  order: number;
  title: string;
  description?: string;
  video_key?: string;
  is_free?: boolean;
  price?: number;
  transcript_url?: string;
  presentation_url?: string;
  xp_reward?: number;
  tags?: string[];
  difficulty?: "beginner" | "intermediate" | "advanced";
}

export interface IUploadLessonFilePayload {
  file: File;
  course: CourseKeyTypes;
  title: string;
}

export interface ICategoryStructure {
  category: string;
  lessons: ILesson[];
}

export interface ICategoryLesson {
  category: string;
  lesson: ILesson;
}
