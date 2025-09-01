import { useEffect, useRef, useState } from "react";
import { useLessons, useAuth } from "@/hooks";
import { IUpdateProgressPayload } from "@/typings";
import { getVideoSignedUrl, updateUserProgress } from "@/actions";
import styles from "./index.module.css";

export default function Video() {
  const { currentLesson } = useLessons();
  const { user } = useAuth();

  const videoRef = useRef<HTMLVideoElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (currentLesson?.lesson.video_key) {
      const getVideoUrl = async () => {
        setLoading(true);
        const { success, url } = await getVideoSignedUrl(
          currentLesson?.lesson.video_key as string,
        );
        if (success) {
          setUrl(url || "");
        } else {
          // Обробка помилки завантаження відео
          console.error("Failed to get video URL");
        }
        setLoading(false);
      };
      getVideoUrl();
    }
  }, [currentLesson?.lesson.video_key]);

  useEffect(() => {
    if (videoRef.current && currentLesson?.lesson.video_key) {
      const getVideoSignedUrlHandler = async () => {
        const { success, url } = await getVideoSignedUrl(
          currentLesson?.lesson.video_key as string,
        );

        if (!success) {
          return null;
        }

        if (videoRef.current) {
          setUrl(url || "");
          // videoRef.current.src = url as string;
        }
      };

      getVideoSignedUrlHandler();
    }
  }, [currentLesson?.lesson.video_key]);

  // Логіка відстеження прогресу
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !user || !currentLesson) return;

    const lessonId = currentLesson.lesson._id;
    const courseId = currentLesson.lesson.course_id;

    // Встановлюємо прогрес відео з бази даних при завантаженні
    const initialProgress = user.lesson_progress?.find(
      progress => progress.lesson_id === lessonId,
    );

    if (initialProgress) {
      videoElement.currentTime = initialProgress.duration as number;
    }

    // Відправка прогресу на сервер кожні 10 секунд
    const sendProgress = () => {
      const payload: IUpdateProgressPayload = {
        lessonId: lessonId as string,
        courseId: courseId as string,
        watchedDuration: Math.floor(videoElement.currentTime),
        completed: false, // На цьому етапі відео ще не завершено
      };
      // Викликаємо сервер-функцію
      updateUserProgress(user.id, payload);
    };

    // Слухачі подій
    const handlePlay = () => {
      console.log("Відео почало відтворення");
      // Відправка прогресу кожні 10 секунд
      if (progressIntervalRef.current)
        clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = setInterval(sendProgress, 10000); // Відправляти кожні 10 секунд
    };

    const handlePause = () => {
      console.log("Відео на паузі");
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      sendProgress(); // Відправити прогрес негайно при паузі
    };

    const handleEnded = () => {
      console.log("Перегляд відео завершено");
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      // Відправка остаточного прогресу та статусу completed
      const finalPayload: IUpdateProgressPayload = {
        lessonId: lessonId as string,
        courseId: courseId as string,
        watchedDuration: Math.floor(videoElement.duration),
        completed: true,
      };
      updateUserProgress(user.id, finalPayload);
    };

    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("ended", handleEnded);

    return () => {
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
      videoElement.removeEventListener("ended", handleEnded);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [currentLesson, user]);

  if (loading) {
    return null;
  }

  console.log(user, "USER");

  return (
    <video
      key={url}
      ref={videoRef}
      controls
      disablePictureInPicture
      onContextMenu={e => e.preventDefault()}
      className={styles.video}
      preload="metadata"
      src={url}
    />
  );
}
