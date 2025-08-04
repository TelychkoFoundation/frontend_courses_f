"use client";

import { useAdmin, useToast } from "@/hooks";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./index.module.css";
import { useRouter } from "next/navigation";
import { ICreateLessonData, IUploadLessonFilePayload } from "@/typings";
import { updateLesson, uploadLessonFileToS3 } from "@/actions";

export default function LessonPage() {
  const {
    loading,
    fetchLesson,
    currentLesson,
    currentCourse,
    fetchCourse,
    deleteLesson,
  } = useAdmin();
  const { showToast } = useToast();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState<
    Omit<ICreateLessonData, "course_id">
  >({
    order: 0,
    title: "",
    description: "",
    video_key: "",
    transcript_url: "",
    presentation_url: "",
    xp_reward: 0,
    difficulty: "beginner",
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [transcriptFile, setTranscriptFile] = useState<File | null>(null);

  useEffect(() => {
    fetchLesson();
    if (!currentCourse) {
      fetchCourse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCourse]);

  useEffect(() => {
    if (currentLesson) {
      setFormValues({
        order: currentLesson.order,
        title: currentLesson.title,
        description: currentLesson.description || "",
        video_key: currentLesson.video_key,
        transcript_url: currentLesson.transcript_url || "",
        presentation_url: currentLesson.presentation_url || "",
        xp_reward: currentLesson.xp_reward,
        difficulty: currentLesson.difficulty || "beginner",
      });
    }
  }, [currentLesson]);

  const isFormValid =
    formValues.title &&
    formValues.description &&
    (formValues.video_key || videoFile) &&
    currentCourse;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;

    if (name === "video_key") {
      setVideoFile(files[0]);
    } else if (name === "transcript_url") {
      setTranscriptFile(files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!currentLesson || !currentCourse) {
      showToast("Немає даних для оновлення.", "error");
      return;
    }

    setIsSubmitting(true);

    const payload: ICreateLessonData = {
      ...formValues,
      course_id: currentCourse.id,
    };

    try {
      if (videoFile) {
        const uploadPayload: IUploadLessonFilePayload = {
          file: videoFile,
          course: currentCourse.courseKey,
          title: formValues.title,
        };
        const { success, data } = await uploadLessonFileToS3(uploadPayload);
        if (!success) {
          showToast("Помилка при завантаженні відео", "error");
          return;
        }
        payload.video_key = data;
      }

      if (transcriptFile) {
        const uploadPayload: IUploadLessonFilePayload = {
          file: transcriptFile,
          course: currentCourse.courseKey,
          title: formValues.title,
        };
        const { success, data } = await uploadLessonFileToS3(uploadPayload);
        if (!success) {
          showToast("Помилка при завантаженні транскрипту", "error");
          return;
        }
        payload.transcript_url = data;
      }

      const res = await updateLesson(currentLesson._id as string, payload);
      if (res.success) {
        showToast("Урок оновлено!", "success");
        router.back();
      } else {
        showToast(res.error || "Помилка при оновленні уроку.", "error");
      }
    } catch {
      showToast("Сталася помилка", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p className={styles.nonDataMessage}>Завантаження...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        Порядок уроку
        <input
          name="order"
          type="number"
          placeholder="0"
          value={formValues.order}
          min="1"
          readOnly
        />
      </label>

      <label>
        Назва уроку
        <input
          name="title"
          type="text"
          value={formValues.title}
          required
          onChange={handleInputChange}
        />
      </label>

      <label>
        Опис уроку
        <textarea
          name="description"
          value={formValues.description}
          required
          onChange={handleInputChange}
        />
      </label>

      <label>
        Відео файл
        <input
          name="video_key"
          type="file"
          accept="video/*"
          onChange={handleFileChange}
        />
        {formValues.video_key && <p>Збережено: {formValues.video_key}</p>}
      </label>

      <label>
        Файл транскрипції
        <input
          name="transcript_url"
          type="file"
          accept=".txt,.pdf"
          onChange={handleFileChange}
        />
        {formValues.transcript_url && (
          <p>Збережено: {formValues.transcript_url}</p>
        )}
      </label>

      <label>
        Презентація
        <input
          name="presentation_url"
          type="text"
          value={formValues.presentation_url}
          onChange={handleInputChange}
        />
      </label>

      <label>
        XP нагорода
        <input
          name="xp_reward"
          type="number"
          min="0"
          value={formValues.xp_reward}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Складність
        <select
          name="difficulty"
          value={formValues.difficulty}
          onChange={handleInputChange}
        >
          <option value="beginner">Початковий</option>
          <option value="intermediate">Середній</option>
          <option value="advanced">Продвинутий</option>
        </select>
      </label>

      <button type="submit" disabled={isSubmitting || !isFormValid}>
        Оновити
      </button>

      <button
        type="button"
        className={styles.danger}
        onClick={deleteLesson}
        disabled={isSubmitting}
      >
        Видалити
      </button>
    </form>
  );
}
