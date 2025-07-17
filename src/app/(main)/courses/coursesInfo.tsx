import styles from "./page.module.css";
import { MdOutlineInfo } from "react-icons/md";
import { FC, MouseEvent } from "react";
import { useGlobal } from "../../hooks/useGlobal";
import { CourseKeyTypes } from "../../typings/course";
import { ModalType } from "../../typings/modals";
import { useQuery } from "../../hooks/useQuery";

interface CoursesInfoProps {
  is_published: boolean;
  courseKey: CourseKeyTypes;
}

export const CoursesInfo: FC<CoursesInfoProps> = ({
  is_published,
  courseKey,
}) => {
  const { setActiveCourseModalOpen } = useGlobal();
  const { addQueryString } = useQuery();

  const showCourseInfo = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setActiveCourseModalOpen(true);
    addQueryString(ModalType.CourseDetailsModal, courseKey);
  };

  if (is_published) {
    return (
      <div onClick={showCourseInfo} className={styles.info}>
        <MdOutlineInfo size={20} />
      </div>
    );
  }

  return <p className={styles.waiting}>🕒&nbsp;&nbsp; Старт 20 серпня</p>;
};
