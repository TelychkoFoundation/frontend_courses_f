import styles from "./page.module.css";
import { dropdownLinks } from "@/constants";
import { ProfileDropdownLink } from "@/typings";
import Link from "next/link";

export default function ProfileContent() {
  return (
    <div className={styles.contentContainer}>
      <h4 className={styles.title}>Про мене</h4>
    </div>
  );
}
