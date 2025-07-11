"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ICourse } from "../../models/Course";
import styles from "./page.module.css";
// import { FaHtml5 } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { MdOutlineInfo } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { RiProgress3Fill } from "react-icons/ri";

export default function Course({ data }: { data: ICourse }) {
  const [shakeIndex, setShakeIndex] = useState<string | null>(null);

  console.log(data, "DATA");

  const router = useRouter();

  const handleClick = () => {
    if (!data.is_published) {
      setShakeIndex(data.id);
      setTimeout(() => setShakeIndex(null), 1000);
    } else {
      router.push(`/courses/${data.id}`);
    }
  };

  const isNew = (updatedAt: string | Date) => {
    const updated = new Date(updatedAt);
    const now = new Date();
    const diffInMs = now.getTime() - updated.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays < 14;
  };

  const courseStatus = () => {
    if (!data.is_published) {
      return (
        <span className={`${styles.badge} ${styles.isInProgress}`}>
          У процесі
        </span>
      );
    }

    if (isNew(data.updatedAt)) {
      return <span className={`${styles.badge} ${styles.isNew}`}>Новий</span>;
    }

    return (
      <span className={`${styles.badge} ${styles.isAvailable}`}>Доступний</span>
    );
  };

  const showCourseInfo = (event: any) => {
    event.stopPropagation();
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
      <MdOutlineInfo
        size={20}
        className={styles.info}
        onClick={showCourseInfo}
      />
      {data.is_published ? (
        <IoCheckmarkDoneCircleSharp
          color="green"
          size={24}
          className={styles.done}
        />
      ) : null}
      {/*<RiProgress3Fill color="#ff5300" size={24} className={styles.progress} />*/}
    </div>
  );
}
