import styles from "../index.module.css";
import { TfiLayoutLineSolid } from "react-icons/tfi";

export default function CourseCrumb({ title }: { title: string }) {
  return (
    <>
      <TfiLayoutLineSolid />
      <p className={styles.lastSegment}>{title}</p>
    </>
  );
}
