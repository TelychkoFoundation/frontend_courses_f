import { useState } from "react";
import styles from "./index.module.css";
import StarRating from "./StarRating";

interface LessonFeedbackProps {
  onSubmit: (rating: number, comment: string) => void;
}

export default function LessonFeedback({ onSubmit }: LessonFeedbackProps) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, comment);
      setRating(0);
      setComment("");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>Як тобі урок?</div>
      <StarRating onRate={setRating} />
      <textarea
        className={styles.textarea}
        placeholder="Залиш коментар (необов'язково)"
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <button
        className={styles.button}
        onClick={handleSubmit}
        disabled={rating === 0}
      >
        Надіслати відгук
      </button>
    </div>
  );
}
