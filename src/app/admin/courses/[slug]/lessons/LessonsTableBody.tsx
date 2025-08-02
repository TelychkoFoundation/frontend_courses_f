"use client";

import styles from "./index.module.css";
import { useRouter } from "next/navigation";
import { ILesson } from "@/typings";
import { useParams } from "next/navigation";

interface IProps {
  lessons: ILesson[];
}

export default function LessonsTableBody({ lessons }: IProps) {
  const router = useRouter();
  const params = useParams();

  const handleActiveLesson = (lessonID: string) => {
    router.push(`/admin/courses/${params.slug}/lessons/${lessonID}`);
  };

  return (
    <tbody>
      {lessons.map(
        (
          {
            title,
            price,
            is_free,
            createdAt,
            xp_reward,
            views,
            _id: id,
          }: ILesson,
          index: number,
        ) => (
          <tr
            key={id as string}
            onClick={() => handleActiveLesson(id as string)}
            className={styles.row}
          >
            <td>{index + 1}</td>
            <td title={title}>{title}</td>
            <td title={String(price)}>
              {is_free ? "Безкоштовний" : `${price}₴`}
            </td>
            <td>{views}</td>
            <td>{xp_reward}</td>
            <td>{new Date(createdAt as Date).toLocaleDateString("uk-UA")}</td>
          </tr>
        ),
      )}
    </tbody>
  );
}
