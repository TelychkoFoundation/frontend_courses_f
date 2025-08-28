"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components";
import { DeviceTypes, useDeviceType } from "@/hooks";
import { NotFoundImage, Sharp, Road, Four } from "@/images";
import styles from "./not-found.module.css";

export default function NotFound() {
  const deviceType = useDeviceType();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Отакої! Ця сторінка втекла, спробуй повернутися на головну
      </h2>
      <Link href="/courses">
        <Button>На головну</Button>
      </Link>
      <section className={styles.images}>
        <Image src={NotFoundImage} alt="404" />
        <Image src={Sharp} alt="Sharp" />
        {deviceType === DeviceTypes.mobile && <Image src={Road} alt="Road" />}
        <Image src={Four} alt="4" />
      </section>
    </div>
  );
}
