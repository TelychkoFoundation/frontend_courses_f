"use client";

import { ReactElement, useState } from "react";
import { useRouter } from "next/navigation";
import { ICourse } from "../../models/Course";
import styles from "./page.module.css";
import {
  SiTypescript,
  SiHtml5,
  SiJavascript,
  SiCss3,
  SiReact,
} from "react-icons/si";
import { GiMuscleUp } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { MdOutlineInfo } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { CourseKeyTypes } from "../../typings/course";
// import { RiProgress3Fill } from "react-icons/ri";
import { useGlobal } from "../../hooks/useGlobal";

export default function Course({ data }: { data: ICourse }) {
  const { setActiveCourse } = useGlobal();
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

  const setCourseIcon = (courseKey: CourseKeyTypes): ReactElement => {
    switch (courseKey) {
      case CourseKeyTypes.HTML5Basics:
        return <SiHtml5 />;
      case CourseKeyTypes.HTML5Advanced:
        return (
          <>
            <SiHtml5 />
            <FaPlus size={20} />
          </>
        );
      case CourseKeyTypes.CSS3Basics:
        return <SiCss3 />;
      case CourseKeyTypes.CSS3Advanced:
        return (
          <>
            <SiCss3 />
            <FaPlus size={20} />
          </>
        );
      case CourseKeyTypes.JSBasics:
        return <SiJavascript />;
      case CourseKeyTypes.JSAdvanced:
        return (
          <>
            <SiJavascript />
            <FaPlus size={20} />
          </>
        );
      case CourseKeyTypes.JSProfessional:
        return (
          <>
            <SiJavascript />
            <GiMuscleUp size={20} />
          </>
        );
      case CourseKeyTypes.Typescript:
        return <SiTypescript />;
      case CourseKeyTypes.React:
        return <SiReact />;
      case CourseKeyTypes.ReactInDepth:
        return (
          <>
            <SiReact />
            <GiMuscleUp size={20} />
          </>
        );
      default:
        return <span />;
    }
  };

  const showCourseInfo = (event: any) => {
    event.stopPropagation();
    setActiveCourse(data);
  };

  return (
    <div
      className={`${styles.courseContainer} ${shakeIndex === data.id ? styles.shake : ""} ${!data.is_published ? styles.disabled : ""}`}
      onClick={handleClick}
      onTouchStart={handleClick}
    >
      {courseStatus()}
      <div className={styles.courseContent}>
        <div className={styles.icons}>{setCourseIcon(data.courseKey)}</div>
        <h2 className={styles.title}>{data.title}</h2>
        <p className={styles.subtitle}>{data.short_description}</p>
      </div>
      {data.is_published ? (
        <div onClick={showCourseInfo} className={styles.info}>
          <MdOutlineInfo size={20} />
        </div>
      ) : (
        <p className={styles.waiting}>🕒&nbsp;&nbsp; Старт 20 серпня</p>
      )}
      <div className={styles.done}>
        {data.is_published ? (
          <IoCheckmarkDoneCircleSharp color="green" size={24} />
        ) : // <RiProgress3Fill color="#ff5300" size={24} />
        null}
      </div>
    </div>
  );
}
