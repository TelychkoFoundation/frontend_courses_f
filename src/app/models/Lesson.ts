import mongoose, { Schema, model } from "mongoose";

const ReviewSchema: Schema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: false,
    maxlength: 2000,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const LessonSchema: Schema = new Schema(
  {
    course_id: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 255,
    },
    description: {
      type: String,
      required: false,
      maxlength: 2000,
    },
    video_key: {
      type: String,
      required: true,
    },
    is_free: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: false,
      default: 0,
    },
    transcript_url: {
      type: String,
      required: false,
    },
    presentation_url: {
      type: String,
      required: false,
    },
    xp_reward: {
      type: Number,
      default: 50,
    },
    tags: {
      type: [String],
      required: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: false,
    },
    related_lessons: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    video_duration: {
      type: Number,
      required: false,
      default: 0,
    },
    reviews: [ReviewSchema],

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Lesson = mongoose.models.Lesson || model("Lesson", LessonSchema);

export default Lesson;
