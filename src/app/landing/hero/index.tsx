"use client";

import { Badge, BadgeType, Button, ButtonType } from "@/components";
import { HeroBackground } from "@/images";
import Link from "next/link";
import { AUTH_BOT_LINK } from "@/constants";
import { signIn } from "next-auth/react";
import styles from "./index.module.css";

export default function Hero() {
  return (
    <section className={styles.container}>
      <HeroBackground
        className={styles.heroBackground}
        stroke={styles.heroStroke}
      />
      <div className={styles.main}>
        <div className={styles.leftSection}>
          <div className={styles.titleSection}>
            <Badge type={BadgeType.Professional}>
              Індивідуальний підхід ментора
            </Badge>
            <h1 className={styles.title}>Курси фронтенд</h1>
            <p className={styles.description}>
              Отримай необхідні навички від досвідченного фахівця для першої
              роботи у фронтенд розробці
            </p>
          </div>
          {/*<Link href={AUTH_BOT_LINK} target="_blank">*/}
          <Button
            className={styles.startButton}
            onClick={() => signIn("google")}
          >
            Почати навчання
          </Button>
          {/*</Link>*/}
        </div>
        <div className={styles.videoContainer}>
          <div className={styles.ellipse1}>
            <div className={styles.ellipse2} />
          </div>
          <div className={styles.video}>
            <Button type={ButtonType.PLAY} className={styles.playButton} />
          </div>
        </div>
      </div>
    </section>
  );
}
