"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ICourse } from "../../models/Course";
import styles from "./page.module.css";
import { FaHtml5 } from "react-icons/fa";

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
      {!data.is_published && <span className={styles.badge}>У процесі</span>}
      <div className={styles.icon}>
        <FaHtml5 />
      </div>
      <h2 className={styles.title}>{data.title}</h2>
      <p className={styles.subtitle}>{data.description}</p>
    </div>
  );
}
