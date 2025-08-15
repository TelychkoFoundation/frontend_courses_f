import { ICategoryStructure, ILesson } from "@/typings";
import { useLessons } from "@/hooks";
import Lesson from "../Lesson";
import styles from "./index.module.css";

export default function RelatedLessons() {
  const { allLessons } = useLessons();

  return (
    <>
      <p className={styles.title}>дотичні теми</p>
      <ul className={styles.grid}>
        {allLessons?.map(({ lessons }: ICategoryStructure) =>
          lessons.map((lesson: ILesson) => (
            <li key={lesson._id as string}>
              <Lesson lesson={lesson} />
            </li>
          )),
        )}
      </ul>
    </>
  );
}
