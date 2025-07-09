import { Schema, model, models, Types } from "mongoose";

export interface IUserCourseStatus {
  userId: Types.ObjectId;
  status: "in_progress" | "completed";
  updatedAt: Date;
}

export interface ICourseBase {
  title: string;
  description: string;
  lessons: Types.ObjectId[];
  recommended_order: Types.ObjectId[];
  price: number;
  is_free: boolean;
  is_published: boolean;
  difficulty?: "beginner" | "intermediate" | "advanced";
  category?: string;
  prerequisites?: string;
  outcomes?: string[];
  thumbnail?: string;
  user_statuses: IUserCourseStatus[];
  createdAt: Date;
  updatedAt: Date;
  isNew?: boolean;
  id: string;
}

export interface ICourse extends ICourseBase {
  _id: Types.ObjectId;
}

// ====== Mongoose схема ======

const CourseSchema = new Schema<ICourseBase>(
  {
    title: { type: String, required: true, index: "text" },
    description: { type: String, required: true, index: "text" },

    lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson", required: true }],
    recommended_order: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],

    price: { type: Number, required: true },
    is_free: { type: Boolean, default: false },
    is_published: { type: Boolean, default: false },

    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
    },
    category: { type: String },
    prerequisites: { type: String },
    outcomes: [{ type: String }],
    thumbnail: { type: String },

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

// Повнотекстовий індекс
CourseSchema.index({ title: "text", description: "text" });

const Course = models.Course || model<ICourseBase>("Course", CourseSchema);

export default Course;
