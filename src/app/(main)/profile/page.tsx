"use client";

import ProfileNavigation from "./ProfileNavigation";
import ProfileContent from "./ProfileContent";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.profileContainer}>
      <ProfileNavigation />
      <ProfileContent />
    </div>
  );
}
