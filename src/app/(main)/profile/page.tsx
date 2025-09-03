"use client";

import { Suspense } from "react";
import ProfileNavigation from "./ProfileNavigation";
import ProfileContent from "./ProfileContent";
import styles from "./page.module.css";

export default function Page() {
  return (
    <Suspense>
      <div className={styles.profileContainer}>
        <ProfileNavigation />
        <ProfileContent />
      </div>
    </Suspense>
  );
}
