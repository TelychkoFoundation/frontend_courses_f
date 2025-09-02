import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks";
import { ICategoryLesson, IUpdateProgressPayload } from "@/typings";
import {
  getVideoSignedUrl,
  updateUserProgress,
  updateLessonViews,
  setLessonDuration,
} from "@/actions";
import styles from "./index.module.css";

interface IVideoProps {
  currentLesson: ICategoryLesson | null;
  updateLessonVideoDuration: (duration: number, lessonID: string) => void;
}

export default function Video({
  currentLesson,
  updateLessonVideoDuration,
}: IVideoProps) {
  const { user } = useAuth();

  const videoRef = useRef<HTMLVideoElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoDurationRef = useRef<number | null>(null);

  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!currentLesson?.lesson.video_key) {
      setLoading(false);
      setUrl("");
      return;
    }

    const getVideoUrl = async () => {
      setLoading(true);
      const { success, url } = await getVideoSignedUrl(
        currentLesson.lesson.video_key,
      );
      if (success && url) {
        setUrl(url);
      } else {
        console.error("Failed to get video URL");
        setUrl("");
      }
      setLoading(false);
    };

    getVideoUrl();
  }, [currentLesson?.lesson.video_key]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !user || !currentLesson?.lesson) return;

    const lessonId = currentLesson.lesson._id;
    const courseId = currentLesson.lesson.course_id;

    const handleLoadedMetadata = async () => {
      videoDurationRef.current = videoElement.duration;
      console.log("Video duration loaded:", videoDurationRef.current);

      if (!currentLesson.lesson.video_duration) {
        await setLessonDuration(lessonId as string, videoDurationRef.current);
      }
      const initialProgress = user.lesson_progress?.find(
        progress => progress.lesson_id === lessonId,
      );

      if (initialProgress) {
        videoElement.currentTime = initialProgress.duration as number;
        updateLessonVideoDuration(
          Math.floor(videoElement.currentTime),
          currentLesson.lesson._id as string,
        );
      }
    };

    // Відправка прогресу на сервер кожні 10 секунд
    const sendProgress = () => {
      const payload: IUpdateProgressPayload = {
        lessonId: lessonId as string,
        courseId: courseId as string,
        watchedDuration: Math.floor(videoElement.currentTime),
        completed: false,
      };
      updateUserProgress(user.id, payload);
    };

    const handlePlay = () => {
      console.log("Відео почало відтворення");
      // Оновлюємо лічильник переглядів
      updateLessonViews(lessonId as string);

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      progressIntervalRef.current = setInterval(sendProgress, 2000);
    };

    const handlePause = () => {
      console.log("Відео на паузі");
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      sendProgress();
    };

    const handleTimeUpdate = () => {
      updateLessonVideoDuration(
        Math.floor(videoElement.currentTime),
        currentLesson.lesson._id as string,
      );
    };

    const handleEnded = () => {
      console.log("Перегляд відео завершено");
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      const finalPayload: IUpdateProgressPayload = {
        lessonId: lessonId as string,
        courseId: courseId as string,
        watchedDuration: Math.floor(videoElement.duration),
        completed: true,
      };
      updateUserProgress(user.id, finalPayload);
    };

    // Додаємо слухачів подій до елемента відео
    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("ended", handleEnded);

    return () => {
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("pause", handlePause);
      videoElement.removeEventListener("ended", handleEnded);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [currentLesson, user, url]);

  if (loading) {
    return null;
  }

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
