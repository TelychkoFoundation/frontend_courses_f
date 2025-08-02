"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import styles from "./index.module.css";
import { useAdmin, useToast } from "@/hooks";
import { createLesson, uploadLessonFileToS3 } from "@/actions";
import { useRouter } from "next/navigation";
import { ICreateLessonData, IUploadLessonFilePayload } from "@/typings";

export default function CreateLesson() {
  const { currentCourse, fetchCourse } = useAdmin();
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!currentCourse) {
      fetchCourse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCourse]);

  const [formValues, setFormValues] = useState({
    order: 0,
    title: "",
    description: "",
    video_key: null as File | null,
    transcript_url: null as File | null,
    presentation_url: "",
    xp_reward: 50,
    difficulty: "beginner",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid =
    formValues.title &&
    formValues.description &&
    formValues.video_key &&
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
    if (files && files.length > 0) {
      setFormValues(prev => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const {
      video_key,
      title,
      description,
      order,
      transcript_url,
      presentation_url,
      difficulty,
      xp_reward,
    } = formValues;

    if (!currentCourse) {
      showToast("Немає даних про курс", "error");
      return;
    }

    if (!title || !description || !video_key) {
      showToast("Будь ласка, заповніть всі обов’язкові поля.", "error");
      return;
    }

    setIsSubmitting(true);

    const createLessonPayload: ICreateLessonData = {
      course_id: currentCourse.id,
      order,
      title,
      description,
      presentation_url,
      xp_reward,
      difficulty: difficulty as "beginner" | "intermediate" | "advanced",
    };

    try {
      // UPLOAD VIDEO
      const uploadLessonPayload: IUploadLessonFilePayload = {
        file: video_key,
        course: currentCourse.courseKey,
        title: title,
      };

      const { success, data } = await uploadLessonFileToS3(uploadLessonPayload);

      if (!success) {
        return;
      }

      createLessonPayload.video_key = data;

      if (transcript_url) {
        // UPLOAD TEXT
        const uploadLessonPayload: IUploadLessonFilePayload = {
          file: transcript_url,
          course: currentCourse.courseKey,
          title: title,
        };

        const { success, data } =
          await uploadLessonFileToS3(uploadLessonPayload);

        if (!success) {
          return;
        }

        createLessonPayload.transcript_url = data;
      }

      if (!createLessonPayload) {
        return null;
      }

      const response = await createLesson(createLessonPayload);
      if (response.success) {
        showToast("Урок успішно створено!", "success");
        router.back();
      }
    } catch {
      showToast(
        "Сталася помилка при створенні уроку. Спробуйте ще раз.",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
          required
          onChange={handleInputChange}
          readOnly
        />
      </label>

      <label>
        Назва уроку
        <input
          name="title"
          type="text"
          placeholder="Введіть назву уроку"
          value={formValues.title}
          required
          onChange={handleInputChange}
        />
      </label>

      <label>
        Опис уроку
        <textarea
          name="description"
          placeholder="Введіть детальний опис уроку"
          value={formValues.description}
          required
          onChange={handleInputChange}
        ></textarea>
      </label>

      <label>
        Відео файл
        <input
          name="video_key"
          type="file"
          required
          accept="video/*"
          onChange={handleFileChange}
        />
      </label>

      <label>
        Файл транскрипції
        <input
          name="transcript_url"
          type="file"
          accept=".txt,.pdf"
          onChange={handleFileChange}
        />
      </label>

      <label>
        Презентація
        <input
          name="presentation_url"
          type="text"
          placeholder="Посилання на презентацію"
          value={formValues.presentation_url}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Нагорода за виконання уроку
        <input
          name="xp_reward"
          type="number"
          placeholder="Введіть кількість XP"
          value={formValues.xp_reward}
          min="0"
          required
          onChange={handleInputChange}
        />
      </label>

      <label>
        Рiвень складності
        <select
          name="difficulty"
          value={formValues.difficulty}
          onChange={handleInputChange}
        >
          <option value="beginner">Початковий (Beginner)</option>
          <option value="intermediate">Середній (Intermediate)</option>
          <option value="advanced">Продвинутий (Advanced)</option>
        </select>
      </label>
      <button
        type="submit"
        className={styles.submit}
        disabled={isSubmitting || !isFormValid}
      >
        Створити урок
      </button>
    </form>
  );
}
