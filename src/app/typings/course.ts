import { Types } from "mongoose";

export interface IUserCourseStatus {
  userId: Types.ObjectId;
  status: "in_progress" | "completed";
  updatedAt: Date;
}

export enum CourseKeyTypes {
  HTML5Basics = "HTML5Basics",
  HTML5Advanced = "HTML5Advanced",
  CSS3Basics = "CSS3Basics",
  CSS3Advanced = "CSS3Advanced",
  JSBasics = "JSBasics",
  JSAdvanced = "JSAdvanced",
  JSProfessional = "JSProfessional",
  Typescript = "Typescript",
  React = "React",
  ReactInDepth = "ReactInDepth",
}

export enum CourseDifficultyType {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
}

export interface ICourseCategories {
  base?: string[];
  levelTopics?: string[];
  practical?: string[];
  professional?: string[];
  audience?: string[];
  tags?: string[];
}

export interface ICourseAdminStatic {
  title: string;
  courseKey: CourseKeyTypes;
  short_description: string;
  description: string;
  difficulty: CourseDifficultyType;
  categories: ICourseCategories;
  prerequisites: string;
  outcomes: string;
}

export interface ICourseBase extends ICourseBasePayload {
  user_statuses: IUserCourseStatus[];
  createdAt: Date;
  updatedAt: Date;
  isNew?: boolean;
  id: string;
}

export interface ICourse extends ICourseBase {
  _id: Types.ObjectId | string;
}

export interface ICourseBasePayload {
  title: string;
  courseKey: CourseKeyTypes;
  short_description: string;
  description: string;
  lessons: Types.ObjectId[];
  price: number;
  is_free: boolean;
  is_published: boolean;
  difficulty?: CourseDifficultyType;
  categories?: ICourseCategories;
  prerequisites?: string;
  outcomes?: string;
}

export type CoursesFilterType = "all" | "my";
