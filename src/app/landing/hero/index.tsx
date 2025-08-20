"use client";

import { Badge, BadgeType, Button, ButtonType } from "@/components";
import { HeroBackground } from "@/images";
// import Link from "next/link";
// import TelegramLogin from "../TelegramLogin";
import styles from "./index.module.css";

export default function Hero() {
  return (
    <section className={styles.container} id="home" key="home">
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

          {/*<TelegramLogin callbackRoute="/courses">*/}
          {/*<Link*/}
          {/*  href="https://t.me/telychko_frontend_courses_bot?start=login"*/}
          {/*  target={"_blank"}*/}
          {/*>*/}
          <Button className={styles.startButton}>Почати навчання</Button>
          {/*</Link>*/}
          {/*</TelegramLogin>*/}
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
