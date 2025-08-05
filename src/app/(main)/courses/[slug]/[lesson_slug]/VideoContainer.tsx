"use client";

import styles from "./page.module.css";
import { LuPanelRightOpen } from "react-icons/lu";

interface VideoContainerProps {
  url: string;
  isLessonPaid: boolean;
  setShowDetailsAction: (status: boolean) => void;
  showDetails: boolean;
}

export default function VideoContainer({
  url,
  isLessonPaid,
  setShowDetailsAction,
  showDetails,
}: VideoContainerProps) {
  return (
    <div className={styles.videoContainer}>
      <video
        // ref={videoRef}
        controls
        className={styles.currentVideo}
        // preload="none"
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        onContextMenu={e => e.preventDefault()}
      >
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4#t=260"
          type="video/mp4"
        />
      </video>
      <div
        className={`${styles.showDetailsButton} ${!showDetails ? styles.visible : ""}`}
      >
        <LuPanelRightOpen
          size={30}
          color="white"
          onClick={() => setShowDetailsAction(!showDetails)}
        />
      </div>
    </div>
  );
}
