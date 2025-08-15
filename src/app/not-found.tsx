import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components";
import { NotFoundImage } from "@/images";
import styles from "./not-found.module.css";

export default async function NotFound() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Отакої! Ця сторінка втекла, спробуй повернутися на головну
      </h2>
      <Link href="/courses" className="button">
        <Button>На головну</Button>
      </Link>
      <Image src={NotFoundImage} alt="Not found image" />
    </div>
  );
}
