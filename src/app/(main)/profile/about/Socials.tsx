import { Button, Input } from "@/components";
import { FormEvent } from "react";
import styles from "./index.module.css";

export default function Socials() {
  const saveSocials = (event: FormEvent) => {
    event.preventDefault();
    console.log("Boo");
  };

  return (
    <div className={styles.socialsInner}>
      <h5>Соцмережі</h5>
      <form className={styles.socialsForm} onSubmit={saveSocials}>
        <Input type="text" name="linkedin" labelText="LinkedIn" />
        <Input type="text" name="github" labelText="GitHub" />
        <Button defaultType="submit">Зберегти</Button>
      </form>
    </div>
  );
}
