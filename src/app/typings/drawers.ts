import { CourseKeyTypes } from "./course";

export enum QueryDrawerType {
  CourseDetailsDrawer = "courseDetailsDrawer",
  CourseTopicsDrawer = "courseContentsDrawer",
}

export enum QueryType {
  CoursesFilter = "filter",
  TutorialStep = "step",
}

export type QueryParamsKeyType = QueryDrawerType | QueryType;
export type QueryParamsValueType = CourseKeyTypes | string;
