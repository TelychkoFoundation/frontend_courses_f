import ContentItem from "./ContentItem";
import { ICategoryStructure, ILesson } from "@/typings";
import styles from "./index.module.css";

interface IContentsProps {
  allLessons: ICategoryStructure[];
}

export default function Contents({ allLessons }: IContentsProps) {
  return (
    <div className={styles.contentsContainer}>
      <h5 className={styles.title}>Зміст</h5>
      <div className={styles.contentsList}>
        {allLessons.map(
          (
            { category, lessons }: ICategoryStructure,
            categoryIndex: number,
          ) => (
            <div key={categoryIndex}>
              <p className={styles.category}>{category}</p>
              <ol>
                {lessons?.map(({ _id, title }: ILesson) => (
                  <ContentItem key={_id as string} id={_id as string}>
                    {title}
                  </ContentItem>
                ))}
              </ol>
              {allLessons.length - 1 !== categoryIndex ? (
                <div className={styles.divider}>
                  <hr className={styles.line} />
                </div>
              ) : null}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
