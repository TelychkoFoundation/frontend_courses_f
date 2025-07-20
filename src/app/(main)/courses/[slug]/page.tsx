import CourseHeader from "./header";
import { getCurrentCourse } from "@/lib";
import { Suspense } from "react";
import { QueryDrawerType, CourseKeyTypes } from "@/typings";
import { Drawer } from "@/components";
import CourseTopicsDrawerContent from "./drawerContent";
import styles from "./page.module.css";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: CourseKeyTypes }>;
}) {
  const { slug } = await params;
  const response = await getCurrentCourse(slug);

  if (!response.success) {
    return null;
  }

  const { title } = response.data;

  return (
    <Suspense>
      <CourseHeader title={title} />
      <div className={styles.videos}>
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 23, 34, 45, 56, 67, 86, 756,
          4545, 3434, 23323,
        ].map((k, index) => (
          <div className={styles.videoCard} key={k}>
            <div className={styles.videoContainer}>
              <video controls className={styles.video}>
                <source
                  src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              {k !== 4 ? (
                <div className={styles.overlay}>
                  <div className={styles.lockIcon}>🔒</div>
                  <button className={styles.buyButton}>46 грн.</button>
                </div>
              ) : null}
            </div>
            <div className={styles.videoInfo}>
              <div className={styles.videoDetails}>
                <h3>{index + 1}. Реакт хуки. useEffect</h3>
                <p>Завантаження даних, підписки та очищення.</p>
              </div>
              <div className={styles.videoPrice}></div>
              {/*<div className="contact-teacher">*/}
              {/*    <button className="contact-button">Написати викладачу</button>*/}
              {/*</div>*/}
            </div>
          </div>
        ))}
        <Drawer
          title="Список тем"
          drawerID={QueryDrawerType.CourseTopicsDrawer}
        >
          <CourseTopicsDrawerContent />
        </Drawer>
      </div>
    </Suspense>
  );
}
