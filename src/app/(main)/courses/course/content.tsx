import { ICourse } from "@/typings";
import { Logo } from "./logo";
import { CourseStatus } from "./courseStatus";
import { Info } from "./info";
import { UserStatus } from "./userStatus";
import styles from "../page.module.css";

interface IContentProps {
  course: ICourse;
}

export default function Content({ course }: IContentProps) {
  const { is_published, courseKey, updatedAt, short_description, title } =
    course;
  return (
    <>
      <CourseStatus is_published={is_published} updatedAt={updatedAt} />
      <div className={styles.courseContent}>
        <div className={styles.icons}>
          <Logo courseKey={courseKey} />
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{short_description}</p>
      </div>
      <Info is_published={is_published} courseKey={courseKey} />
      <div className={styles.done}>
        <UserStatus is_published={is_published} />
      </div>
    </>
  );
}
