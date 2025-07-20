import { ReactElement } from "react";
import styles from "./index.module.css";
import { CoursesFilterType } from "@/typings";

interface ITabsProps {
  data: { id: CoursesFilterType; name: string }[];
  onSelect: (tab: CoursesFilterType) => void;
  param: string | null;
}

export default function Tabs({ data, onSelect, param }: ITabsProps) {
  return (
    <div className={styles.tabs}>
      {data.map(
        ({ id, name }): ReactElement => (
          <div
            key={id}
            className={`${styles.tab} ${id === param ? styles.active : ""}`}
            onClick={() => onSelect(id)}
          >
            {name}
          </div>
        ),
      )}
    </div>
  );
}
