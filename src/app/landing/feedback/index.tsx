import { feedbacks } from "@/constants";
import { IFeedback } from "@/typings";
import Link from "next/link";
import { Badge, BadgeType } from "@/components";
import { StarIcon } from "@/images";
import styles from "./index.module.css";

export default function Feedback() {
  return (
    <section className={styles.container}>
      <div className={styles.ellipse} />
      <h2 className={styles.title}>Відгуки</h2>
      <section className={styles.feedbacks}>
        {feedbacks.map((feedback: IFeedback) => (
          <div key={feedback.id} className={styles.feedback}>
            <div className={styles.feedbackHeader}>
              <h2 className={styles.feedbackTitle}>{feedback.name}</h2>
              <Link
                href={feedback.link}
                target="_blank"
                className={styles.feedbackShort}
              >
                {feedback.link}
              </Link>
            </div>
            <div className={styles.feedbackStars}>
              {Array.from({ length: 5 }).map((_, i: number) => (
                <StarIcon
                  key={i}
                  filled={feedback.stars > i}
                  className={styles.feedbackStar}
                  stroke={styles.stroke}
                />
              ))}
            </div>
            <p className={styles.feedbackDescription}>{feedback.message}</p>
            <div className={styles.courses}>
              {feedback.courses.map((course: string) => (
                <Badge key={course} type={BadgeType.Tag}>
                  {course}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
