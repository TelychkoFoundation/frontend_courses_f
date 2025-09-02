import { useState } from "react";
import ContentItem from "./ContentItem";
import { ListIcon } from "@/images";
import { DeviceType, DeviceTypes, useDeviceType } from "@/hooks";
import { ICategoryStructure, ILesson } from "@/typings";
import styles from "./index.module.css";

interface IContentsProps {
  allLessons: ICategoryStructure[];
}

export default function Contents({ allLessons }: IContentsProps) {
  const [contentsVisible, setContentsVisible] = useState<boolean>(false);
  const deviceType: DeviceType = useDeviceType();

  if (deviceType === DeviceTypes.mobile) {
    return (
      <div
        className={styles.contentsContainer}
        onClick={event => {
          event.stopPropagation();
          setContentsVisible(!contentsVisible);
        }}
      >
        <div className={styles.preview}>
          <h5 className={styles.title}>Зміст</h5>
          <ListIcon className={styles.listIcon} />
        </div>
        {contentsVisible && (
          <div className={styles.contentsList}>
            {allLessons.map(
              (
                { category, lessons }: ICategoryStructure,
                categoryIndex: number,
              ) => (
                <div key={categoryIndex}>
                  <p className={styles.category}>{category}</p>
                  <ol>
                    {lessons?.map(
                      ({ _id, title, course_id, video_duration }: ILesson) => (
                        <ContentItem
                          key={_id as string}
                          lessonId={_id as string}
                          courseId={course_id as string}
                          videoDuration={video_duration || 0}
                        >
                          {title}
                        </ContentItem>
                      ),
                    )}
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
        )}
      </div>
    );
  }

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
                {lessons?.map(
                  ({ _id, title, course_id, video_duration }: ILesson) => (
                    <ContentItem
                      key={_id as string}
                      lessonId={_id as string}
                      courseId={course_id as string}
                      videoDuration={video_duration || 0}
                    >
                      {title}
                    </ContentItem>
                  ),
                )}
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
