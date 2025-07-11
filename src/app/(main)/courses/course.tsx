"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ICourse } from "../../models/Course";
import styles from "./page.module.css";
// import { FaHtml5 } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";

export default function Course({ data }: { data: ICourse }) {
  const [shakeIndex, setShakeIndex] = useState<string | null>(null);

  const router = useRouter();

  const handleClick = () => {
    if (!data.is_published) {
      setShakeIndex(data.id);
      setTimeout(() => setShakeIndex(null), 1000);
    } else {
      router.push(`/courses/${data.id}`);
    }
  };

  const courseStatus = () => {
    if (!data.is_published) {
      return (
        <span className={`${styles.badge} ${styles.isInProgress}`}>
          У процесі
        </span>
      );
    }

    return (
      <span className={`${styles.badge} ${styles.isAvailable}`}>Доступний</span>
    );
  };

  return (
    <div
      className={`${styles.courseContainer} ${shakeIndex === data.id ? styles.shake : ""} ${!data.is_published ? styles.disabled : ""}`}
      // initial={directionVariants[block.direction]}
      // animate={directionVariants.visible}
      // transition={{
      //   duration: 0.4,
      //   type: "spring",
      // }}
      onClick={handleClick}
      onTouchStart={handleClick}
    >
      {courseStatus()}
      <div className={styles.icon}>
        <SiTypescript />
      </div>
      <h2 className={styles.title}>{data.title}</h2>
      <p className={styles.subtitle}>{data.description}</p>
    </div>
  );
}
