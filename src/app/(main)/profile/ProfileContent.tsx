import { profileContents, profileTitles } from "@/constants";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export default function ProfileContent() {
  const searchParams = useSearchParams();
  const searchParamsValue: string | null = searchParams.get("section");

  return (
    <div className={styles.contentContainer}>
      <h4 className={styles.title}>
        {searchParamsValue && profileTitles[searchParamsValue]}
      </h4>
      {searchParamsValue && profileContents[searchParamsValue]}
    </div>
  );
}
