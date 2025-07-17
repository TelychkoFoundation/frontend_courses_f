"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ICourse } from "../../models/Course";
import { CoursesIcon } from "./coursesIcon";
import { CourseStatus } from "./coursesStatus";
import { CoursesInfo } from "./coursesInfo";
import { CoursesUserStatus } from "./coursesUserStatus";
import styles from "./page.module.css";

export default function CoursesListItem({ data }: { data: ICourse }) {
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
      onClick={handleClick}
      onTouchStart={handleClick}
    >
      <CourseStatus
        is_published={data.is_published}
        updatedAt={data.updatedAt}
      />
      <div className={styles.courseContent}>
        <div className={styles.icons}>
          <CoursesIcon courseKey={data.courseKey} />
        </div>
        <h2 className={styles.title}>{data.title}</h2>
        <p className={styles.subtitle}>{data.short_description}</p>
      </div>
      <CoursesInfo
        is_published={data.is_published}
        courseKey={data.courseKey}
      />
      <div className={styles.done}>
        <CoursesUserStatus is_published={data.is_published} />
      </div>
    </div>
  );
}
