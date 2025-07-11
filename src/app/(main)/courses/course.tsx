"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ICourse } from "../../models/Course";
import styles from "./page.module.css";

export default function Course({ data }: { data: ICourse }) {
  const [shakeIndex, setShakeIndex] = useState<number | null>(null);

  const router = useRouter();

  const handleClick = () => {
    // if (blocks[index].status === ContentStatusEnum.IN_PROGRESS || disabled) {
    //   setShakeIndex(index);
    //   setTimeout(() => setShakeIndex(null), 1000);
    // } else {
    //   navigate(`/${blocks[index].content}`);
    // }

    router.push(`/courses/${data.id}`);
  };

  return (
    <div
      className={`${styles.courseContainer}`}
      // className={`${styles.tile} ${shakeIndex === index ? styles.shake : ""} ${block.status === ContentStatusEnum.IN_PROGRESS || disabled ? classes.disabled : ""}`}
      // style={{
      //   background:
      //     block.status === ContentStatusEnum.IN_PROGRESS || disabled
      //       ? "#d3d3d3"
      //       : block.background,
      // }}
      // initial={directionVariants[block.direction]}
      // animate={directionVariants.visible}
      // transition={{
      //   duration: 0.4,
      //   type: "spring",
      // }}
      onClick={handleClick}
      onTouchStart={handleClick}
    >
      {/*{block.status === ContentStatusEnum.IN_PROGRESS && (*/}
      {/*  <span className={classes.badge}>У процесі</span>*/}
      {/*)}*/}
      {/*<div className={styles.icon}>{block.icon}</div>*/}
      <span className={styles.badge}>У процесі</span>
      <h2 className={styles.title}>{data.title}</h2>
      <p className={styles.subtitle}>{data.description}</p>
    </div>
  );
}
