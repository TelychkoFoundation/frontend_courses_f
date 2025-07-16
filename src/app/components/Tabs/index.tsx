"use client";

import { ReactElement, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import styles from "./tabs.module.css";
import { createQueryString } from "../../utils";

interface Props {
  values: { id: "all" | "my"; name: string }[];
}

export default function Tabs({ values }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("filter")) {
      router.push(
        pathname +
          "?" +
          createQueryString("filter", "all", searchParams.toString()),
      );
    }
  }, []);

  const handleTabClick = (tab: "all" | "my") => {
    router.push(
      pathname +
        "?" +
        createQueryString("filter", tab, searchParams.toString()),
    );
  };

  return (
    <div className={styles.tabs}>
      {values.map(
        ({ id, name }): ReactElement => (
          <div
            key={id}
            className={`${styles.tab} ${id === searchParams.get("filter") ? styles.active : ""}`}
            onClick={() => handleTabClick(id)}
          >
            {name}
          </div>
        ),
      )}
    </div>
  );
}
