"use client";

import { ReactElement, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import styles from "./tabs.module.css";

interface Props {
  values: { id: "all" | "my"; name: string }[];
}

export default function Tabs({ values }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    if (!searchParams.get("filter")) {
      router.push(pathname + "?" + createQueryString("filter", "all"));
    }
  }, []);

  const handleTabClick = (tab: "all" | "my") => {
    router.push(pathname + "?" + createQueryString("filter", tab));
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
