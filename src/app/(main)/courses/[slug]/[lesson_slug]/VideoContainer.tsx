"use client";

import styles from "./page.module.css";

export default function VideoContainer() {
  return (
    <div className={styles.videoContainer}>
      <video
        // ref={videoRef}
        controls
        className={styles.currentVideo}
        preload="none"
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        onContextMenu={e => e.preventDefault()}
      />
    </div>
  );
}
