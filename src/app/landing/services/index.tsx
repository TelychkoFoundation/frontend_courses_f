import { services } from "@/constants";
import { IService } from "@/typings";
import Link from "next/link";
import { Button, ButtonType } from "@/components";
import styles from "./index.module.css";

export default function Services() {
  return (
    <section className={styles.container}>
      <div className={styles.ellipse} />
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Послуги</h2>
        <p className={styles.description}>
          Навчання та менторство з урахуванням ваших цілей, рівня та темпу. Ви -
          у центрі процесу.
        </p>
      </div>
      <div className={styles.services}>
        {services.map((service: IService) => (
          <div key={service.id} className={styles.service}>
            <div className={styles.serviceHeader}>
              <h2 className={styles.serviceTitle}>{service.title}</h2>
              <p className={styles.serviceShort}>{service.short}</p>
            </div>
            <p className={styles.serviceDescription}>{service.description}</p>
            <div className={styles.footer}>
              <p className={styles.price}>{service.price}</p>
              <Link href={service.cta.href}>
                <Button type={ButtonType.SECONDARY}>{service.cta.label}</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
