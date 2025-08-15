"use client";

import { ReactElement, useState } from "react";
import { ICourse } from "@/typings";
import { useRouter } from "next/navigation";
import { BadgeType, Badge, LinearProgressBar } from "@/components";
import { NewCourseShadow } from "@/images";
import { isNewCourse } from "@/utils";
import { Logo } from "./Logo";
import styles from "./page.module.css";

interface ICourseProps {
  course: ICourse;
}

export default function Course({
  course: { is_published, courseKey, updatedAt, title, short_description },
}: ICourseProps) {
  const [courseHovered, setCourseHovered] = useState<boolean>(false);

  const router = useRouter();

  const setCourseHoveredHandler = () => {
    if (!is_published) {
      return;
    }

    setCourseHovered(!courseHovered);
  };

  const navigateToLessons = () => {
    if (!is_published) {
      return;
    }

    router.push(`/courses/${courseKey}`);
  };

  const renderBadge = (): ReactElement | null => {
    if (!is_published) {
      return <Badge type={BadgeType.InDev}>в розробці</Badge>;
    }

    if (isNewCourse(updatedAt)) {
      return <Badge type={BadgeType.New}>новий</Badge>;
    }

    return null;
  };

  const renderShadow = (): ReactElement | null => {
    if (isNewCourse(updatedAt)) {
      return <NewCourseShadow className={styles.newCourseShadow} />;
    }

    return null;
  };

  const renderFooter = (): ReactElement | string | null => {
    if (!is_published) {
      return "Старт 14 жовтня";
    }

    return <LinearProgressBar />;
  };

  return (
    <div
      className={`${styles.course} ${courseHovered ? styles.courseHovered : ""}  ${!is_published ? styles.courseDisabled : ""}`}
      onClick={navigateToLessons}
      onMouseEnter={setCourseHoveredHandler}
      onMouseLeave={setCourseHoveredHandler}
      key={courseKey}
    >
      {renderShadow()}
      <div className={styles.badge}>{renderBadge()}</div>
      <Logo courseKey={courseKey} courseHovered={courseHovered} />
      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{short_description}</p>
      </div>
      <div className={styles.footer}>{renderFooter()}</div>
    </div>
  );
}
