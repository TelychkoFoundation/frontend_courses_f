import { Schema, model, models } from "mongoose";
import { CourseDifficultyType, CourseKeyTypes, ICourseBase } from "@/typings";

const CourseSchema = new Schema<ICourseBase>(
  {
    title: {
      type: String,
      required: true,
      index: "text",
    },
    courseKey: {
      type: String,
      enum: Object.values(CourseKeyTypes),
      required: true,
    },
    short_description: {
      type: String,
    },
    description: {
      type: String,
      index: "text",
    },
    categories: {
      base: [{ type: String }],
      levelTopics: [{ type: String }],
      practical: [{ type: String }],
      professional: [{ type: String }],
      audience: [{ type: String }],
      tags: [{ type: String }],
    },
    prerequisites: { type: String },
    outcomes: { type: String },

    lessons: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lesson",
        required: true,
      },
    ],

    price: {
      type: Number,
      required: true,
    },
    is_free: {
      type: Boolean,
      default: false,
    },
    is_published: {
      type: Boolean,
      default: false,
    },

    difficulty: {
      type: String,
      enum: Object.values(CourseDifficultyType),
    },

    user_statuses: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        status: {
          type: String,
          enum: ["in_progress", "completed"],
          default: "in_progress",
        },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

CourseSchema.index({ title: "text", description: "text" });

const Course = models.Course || model<ICourseBase>("Course", CourseSchema);

export default Course;
