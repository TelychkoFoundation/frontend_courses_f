"use client";

import styles from "./page.module.css";
import { useQuery } from "@/hooks";
import { QueryType } from "@/typings";

export const NoCourses = () => {
  const { addQueryString } = useQuery();

  const redirectToAllCourses = () => {
    addQueryString(QueryType.CoursesFilter, "all");
  };

  return (
    <div className={styles.noDataContainer}>
      <p>Ви поки не розпочали навчання ...</p>
      <button className="button" onClick={redirectToAllCourses}>
        Розпочати
      </button>
    </div>
  );
};
