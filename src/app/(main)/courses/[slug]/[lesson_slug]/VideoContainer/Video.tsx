import { useEffect, useRef, useState } from "react";
import { useLessons } from "@/hooks";
import { getVideoSignedUrl } from "@/actions";
import styles from "./index.module.css";

export default function Video() {
  const { currentLesson } = useLessons();

  const videoRef = useRef<HTMLVideoElement>(null);

  const [url, setUrl] = useState<string>("");
  const [watchedSeconds, setWatchedSeconds] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<number>(0);

  const updateProgress = async (progress: any) => {
    console.log(progress, "Progress");
    console.log(totalDuration, "Total Duration");
    console.log(watchedSeconds, "Watched Seconds");
    // try {
    //   await fetch("/api/updateLessonProgress", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(progress),
    //   });
    // } catch (error) {
    //   console.error("Failed to update progress:", error);
    // }
  };

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

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    // Відстежуємо події
    const handlePlay = () => {
      console.log("Video started");
    };

    const handlePause = () => {
      console.log("Video paused");
      updateProgress({
        lesson_id: currentLesson?.lesson._id,
        course_id: currentLesson?.lesson.course_id,
        watched_at: new Date(),
        duration: watchedSeconds,
        completed: false, // Спочатку фіксуємо паузу
      });
    };

    const handleTimeUpdate = () => {
      setWatchedSeconds(Math.floor(videoElement.currentTime));
    };

    const handleEnded = () => {
      console.log("Video completed watching");
      updateProgress({
        lesson_id: currentLesson?.lesson._id,
        course_id: currentLesson?.lesson.course_id,
        watched_at: new Date(),
        duration: totalDuration,
        completed: true, // Відео завершене
      });
    };

    const handleLoadedMetadata = () => {
      setTotalDuration(Math.floor(videoElement.duration)); // Загальна тривалість відео
    };

    // Додаємо слухачів подій
    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("ended", handleEnded);
    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);

    // Очищення слухачів подій при демонтажі компонента
    return () => {
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("ended", handleEnded);
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [
    currentLesson?.lesson._id,
    currentLesson?.lesson.course_id,
    watchedSeconds,
    totalDuration,
  ]);

  return (
    <video
      ref={videoRef}
      controls
      disablePictureInPicture
      onContextMenu={e => e.preventDefault()}
      className={styles.video}
      preload="metadata"
    >
      {url ? <source src={url} type="video/mp4" /> : null}
    </video>
  );
}
