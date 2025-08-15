import Link from "next/link";
import Image from "next/image";
import { services } from "@/constants";
import { Button } from "@/components";
import { GoalImage, KeyboardImage } from "@/images";
import { IService } from "@/typings";
import styles from "./page.module.css";

export default async function ServicesPage() {
  const renderBackgroundImage = (id: string) => {
    if (id === "project-help") {
      return (
        <Image
          src={GoalImage}
          width={300}
          height={300}
          alt="Goal image"
          className={styles.backgroundImage}
        />
      );
    }

    if (id === "individual-lessons") {
      return (
        <Image
          src={KeyboardImage}
          width={600}
          height={340}
          alt="Keyboard image"
          className={styles.backgroundImage}
        />
      );
    }

    return null;
  };

  return (
    <div className={styles.services}>
      {services.map((service: IService) => (
        <div key={service.id} className={styles.service}>
          {renderBackgroundImage(service.id)}
          <div className={styles.serviceHeader}>
            <h2 className={styles.title}>{service.title}</h2>
            <p className={styles.short}>{service.short}</p>
          </div>
          <p className={styles.description}>{service.description}</p>
          <div className={styles.footer}>
            <p className={styles.price}>{service.price}</p>
            <Link href={service.cta.href}>
              <Button>{service.cta.label}</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
