import { CourseKeyTypes } from "./course";

export enum QueryDrawerType {
  CourseDetailsDrawer = "courseDetailsDrawer",
  CourseContentsDrawer = "courseContentsDrawer",
}

export enum QueryType {
  CoursesFilter = "filter",
  TutorialStep = "step",
}

export type QueryParamsKeyType = QueryDrawerType | QueryType;
export type QueryParamsValueType = CourseKeyTypes | string;
