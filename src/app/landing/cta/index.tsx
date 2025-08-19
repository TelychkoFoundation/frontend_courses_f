"use client";

import { Button } from "@/components";
import styles from "./index.module.css";

export default function CtaContent() {
  return (
    <section className={styles.container}>
      <p>
        Lorem ipsum dolor sit amet consectetur. Aliquam tincidunt purus et eu
        viverra cursus lectus. Cursus ullamcorper enim sagittis ut.
      </p>
      <Button
        className={styles.button}
        // onClick={() => mockLogin("/course")}
        // loading={loading}
      >
        Почати навчання
      </Button>
    </section>
  );
}
