"use client";

import { ReactElement } from "react";
import styles from "./index.module.css";

interface ITabsProps {
  data: { id: string; name: string }[];
  onSelectAction: (route: string) => void;
  selected: string;
}

export default function Tabs({ data, onSelectAction, selected }: ITabsProps) {
  return (
    <div className={styles.tabs}>
      {data.map(
        ({ id, name }): ReactElement => (
          <div
            key={id}
            className={`${styles.tab} ${selected.startsWith(id) ? styles.active : ""}`}
            onClick={() => onSelectAction(id)}
          >
            {name}
          </div>
        ),
      )}
    </div>
  );
}
