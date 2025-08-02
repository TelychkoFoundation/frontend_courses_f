"use client";

import styles from "./index.module.css";
import { MdOpenInNew } from "react-icons/md";
import { useState } from "react";

interface IProps {
  index: number;
  title: string;
  description: string;
  isVideoInfoHovered: boolean;
}

export default function Title({
  index,
  title,
  description,
  isVideoInfoHovered,
}: IProps) {
  const [isTitleHovered, setTitleHovered] = useState<boolean>(false);

  return (
    <section
      onMouseEnter={() => setTitleHovered(true)}
      onMouseLeave={() => setTitleHovered(false)}
      className={styles.titleContainer}
    >
      <h4
        className={`${styles.title} ${
          isTitleHovered ? styles.hidden : styles.visible
        }`}
      >
        <strong>{index + 1}. Вступ:</strong> {title}
      </h4>

      <p
        className={`${styles.description} ${
          isTitleHovered ? styles.visible : styles.hidden
        }`}
      >
        {description}
      </p>
      <MdOpenInNew
        className={`${styles.reference} ${isVideoInfoHovered ? styles.hovered : ""}`}
        size={18}
      />
    </section>
  );
}
