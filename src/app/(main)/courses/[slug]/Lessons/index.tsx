import { ICategoryStructure, ILesson } from "@/typings";
import Lesson from "../Lesson";
import styles from "./index.module.css";

interface ILessonsProps {
  allLessons: ICategoryStructure[];
}

export default function Lessons({ allLessons }: ILessonsProps) {
  return allLessons.map(
    ({ category, lessons }: ICategoryStructure, index: number) => (
      <div key={index} className={styles.lessonsCategoryContainer}>
        <p className={styles.lessonsCategory}>{category}</p>
        <ul className={styles.lessonsContainer}>
          {lessons?.map((lesson: ILesson) => (
            <Lesson key={lesson._id as string} lesson={lesson} />
          ))}
        </ul>
      </div>
    ),
  );
}
