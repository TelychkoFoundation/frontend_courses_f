import styles from "./page.module.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Page() {
  const { user } = useContext(UserContext);

  console.log(user, "user");

  return (
    <div className={styles.page}>
      Courses <button>Logout</button>
    </div>
  );
}
