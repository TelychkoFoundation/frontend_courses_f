"use client";

import Link from "next/link";
import { Button } from "@/components";
import { AUTH_BOT_LINK } from "@/constants";
import styles from "./index.module.css";

export default function CtaContent() {
  return (
    <section className={styles.container} id="cta" key="cta">
      <p>
        Lorem ipsum dolor sit amet consectetur. Aliquam tincidunt purus et eu
        viverra cursus lectus. Cursus ullamcorper enim sagittis ut.
      </p>
      <Link href={AUTH_BOT_LINK} target="_blank">
        <Button className={styles.button}>Почати навчання</Button>
      </Link>
    </section>
  );
}
