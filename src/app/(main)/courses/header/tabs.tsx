"use client";

import { useQuery } from "@/hooks";
import { CoursesFilterType, QueryType } from "@/typings";
import { useEffect } from "react";
import { Tabs } from "@/components";

export const TabsWrapper = () => {
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
    <Tabs
      data={[
        { id: "all", name: "Всі курси" },
        { id: "my", name: "Мої курси" },
      ]}
      onSelect={onSelect}
      param={filterParam}
    />
  );
};
