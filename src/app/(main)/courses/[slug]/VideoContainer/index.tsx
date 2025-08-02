"use client";

import styles from "./index.module.css";
import { useEffect, useRef } from "react";
import { getVideoSignedUrl } from "@/actions";

interface IVideoContainerProps {
  videoKey: string;
  isPaid: boolean;
}

export default function VideoContainer({
  videoKey,
  isPaid,
}: IVideoContainerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && isPaid && videoKey) {
      const getVideoSignedUrlHandler = async () => {
        const { success, url } = await getVideoSignedUrl(videoKey as string);

        if (!success) {
          return null;
        }

        if (videoRef.current) {
          videoRef.current.src = url as string;
        }
      };

      getVideoSignedUrlHandler();
    }
  }, [isPaid, videoKey]);

  if (!videoKey) {
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
          <button className={styles.buyButton}>46 грн.</button>
        </div>
      ) : null}
    </div>
  );
}
