import { Button, ButtonType } from "@/components";
import styles from "./index.module.css";

export default function DeleteAccount() {
  return (
    <div className={styles.deleteAccountInner}>
      <h5>Видалити мій акаунт</h5>
      <Button type={ButtonType.OUTLINE} className={styles.deleteBtn}>
        Видалити
      </Button>
    </div>
  );
}
