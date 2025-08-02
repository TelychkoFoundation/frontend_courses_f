import styles from "../index.module.css";
import { TfiLayoutLineSolid } from "react-icons/tfi";

export default function NewCourseCrumb() {
  return (
    <>
      <TfiLayoutLineSolid />
      <p className={styles.lastSegment}>Новий</p>
    </>
  );
}
