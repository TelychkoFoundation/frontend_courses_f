import { memo } from "react";
import { PracticeIcon, LockIcon, LockIconSize } from "@/images";
import styles from "./index.module.css";

interface IPracticeProps {
  isActive: boolean;
  isCurrentLessonPaid: boolean;
}

export default memo(function Practice({
  isActive,
  isCurrentLessonPaid,
}: IPracticeProps) {
  return (
    <>
      <section className={styles.collapsedSection}>
        <p className={styles.collapsedTitle}>Практичне завдання</p>
        {isCurrentLessonPaid ? (
          <PracticeIcon className={styles.practiceIcon} />
        ) : (
          <LockIcon size={LockIconSize.Large} className={styles.lockIcon} />
        )}
      </section>
      {isActive ? (
        <p className={styles.practiceContent}>
          Lorem ipsum dolor sit amet consectetur. Hac quam augue nibh etiam
          felis vestibulum elementum malesuada etiam. Proin eget auctor sapien
          faucibus tortor tempus feugiat purus. Sed augue aliquam cursus semper
          viverra non scelerisque elit nulla. Egestas maecenas cursus id neque
          maecenas justo enim lacus nunc. Pharetra ut ultricies sem sit cras
          pharetra rhoncus. Congue a elementum id aliquet velit pellentesque
          cursus quisque. Cursus non arcu arcu morbi ut pellentesque. Sit
          pulvinar sapien sed natoque in nisl auctor enim.
        </p>
      ) : null}
    </>
  );
});
