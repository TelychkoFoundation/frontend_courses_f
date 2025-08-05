"use client";

import styles from "./index.module.css";
import { useEffect, useRef, useTransition } from "react";
import { createPaymentForLesson, getVideoSignedUrl } from "@/actions";
import { ILesson } from "@/typings";

interface IVideoContainerProps {
  lesson: ILesson;
  isPaid: boolean;
}

export default function VideoContainer({
  lesson,
  isPaid,
}: IVideoContainerProps) {
  const [isPending, startTransition] = useTransition();

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && isPaid && lesson.video_key) {
      const getVideoSignedUrlHandler = async () => {
        const { success, url } = await getVideoSignedUrl(
          lesson.video_key as string,
        );

        if (!success) {
          return null;
        }

        if (videoRef.current) {
          videoRef.current.src = url as string;
        }
      };

      getVideoSignedUrlHandler();
    }
  }, [isPaid, lesson.video_key]);

  const payForLesson = async () => {
    startTransition(() => createPaymentForLesson(lesson, window.location.href));
  };

  if (!lesson.video_key) {
    return null;
  }

  return (
    <div className={styles.videoContainer}>
      <video
        ref={videoRef}
        controls
        className={styles.video}
        preload="none"
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        onContextMenu={e => e.preventDefault()}
      />
      {!isPaid ? (
        <div className={styles.overlay}>
          <div className={styles.lockIcon}>🔒</div>
          <button className={styles.buyButton} onClick={payForLesson}>
            {isPending ? "Очікуємо..." : "46 грн."}
          </button>
        </div>
      ) : null}
    </div>
  );
}
