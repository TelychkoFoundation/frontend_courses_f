import React, { useState } from "react";
import { CiStar } from "react-icons/ci";
import styles from "./index.module.css";

interface StarRatingProps {
  max?: number;
  onRate?: (rating: number) => void;
}

export default function StarRating({ max = 5, onRate }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number>(0);

  const handleClick = (value: number) => {
    setSelected(value);
    onRate?.(value);
  };

  return (
    <div className={styles.starContainer}>
      {Array.from({ length: max }).map((_, index) => {
        const value = index + 1;
        const isFilled = hovered ? value <= hovered : value <= selected;

        return (
          <CiStar
            key={value}
            className={`${styles.star} ${isFilled ? styles.filled : ""}`}
            onMouseEnter={() => setHovered(value)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(value)}
          />
        );
      })}
    </div>
  );
}
