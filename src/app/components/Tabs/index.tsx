"use client";

import { ReactElement, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./tabs.module.css";
import { ModalType } from "../../typings/modals";
import { useQuery } from "../../hooks/useQuery";

interface Props {
  values: { id: "all" | "my"; name: string }[];
}

export default function Tabs({ values }: Props) {
  const searchParams = useSearchParams();
  const { addQueryString } = useQuery();

  useEffect(() => {
    if (!searchParams.get(ModalType.CoursesFilter)) {
      addQueryString(ModalType.CoursesFilter, "all");
    }
  }, []);

  const handleTabClick = (tab: "all" | "my") => {
    addQueryString(ModalType.CoursesFilter, tab);
  };

  return (
    <div className={styles.tabs}>
      {values.map(
        ({ id, name }): ReactElement => (
          <div
            key={id}
            className={`${styles.tab} ${id === searchParams.get(ModalType.CoursesFilter) ? styles.active : ""}`}
            onClick={() => handleTabClick(id)}
          >
            {name}
          </div>
        ),
      )}
    </div>
  );
}
