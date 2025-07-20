"use client";

import { Tabs } from "@/components";
import { FaHome } from "react-icons/fa";
import styles from "../layout.module.css";
import Link from "next/link";
import { useEffect } from "react";
import { QueryType, CoursesFilterType } from "@/typings";
import { useQuery } from "@/hooks";

export default function CoursesHeader() {
  const { addQueryString, getQueryString } = useQuery();
  const filterParam: string | null = getQueryString(QueryType.CoursesFilter);

  useEffect(() => {
    if (!filterParam) {
      addQueryString(QueryType.CoursesFilter, "all");
    }
  }, []);

  const onSelect = (tab: CoursesFilterType) => {
    addQueryString(QueryType.CoursesFilter, tab);
  };

  return (
    <header className={styles.header}>
      <div className={styles.breadcrumbs}>
        <Link href="/courses?filter=all">
          <FaHome size={28} />
        </Link>
      </div>
      <Tabs
        data={[
          { id: "all", name: "Всі курси" },
          { id: "my", name: "Мої курси" },
        ]}
        onSelect={onSelect}
        param={filterParam}
      />
    </header>
  );
}
