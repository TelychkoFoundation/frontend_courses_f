import styles from "./page.module.css";
import Link from "next/link";
import { getCookieToken } from "@/lib";
import { services } from "@/constants";
import { VscFilePdf } from "react-icons/vsc";

export default async function ServicesPage() {
  const token = await getCookieToken();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Послуги</h1>
      <div className={styles.headerRow}>
        <p className={styles.subheading}>
          Виберіть те, що відповідає вашому рівню, цілям та формату навчання.
        </p>

        <Link href="/courses" className={styles.backButton}>
          До курсів
        </Link>
      </div>

      <div className={styles.grid}>
        {services.map(service => (
          <div key={service.id} className={styles.card}>
            <h2>{service.title}</h2>
            <p className={styles.short}>{service.short}</p>
            <p className={styles.description}>{service.description}</p>
            {service.price && (
              <div className={styles.price}>{service.price}</div>
            )}
            <div className={styles.cta}>
              {service.cta.authAlternative ? (
                <Link
                  href={
                    token
                      ? service.cta.authAlternative.loggedIn.href
                      : service.cta.authAlternative.guest.href
                  }
                  className={styles.link}
                >
                  {token
                    ? service.cta.authAlternative.loggedIn.label
                    : service.cta.authAlternative.guest.label}
                </Link>
              ) : (
                <div className={styles.bottomLink}>
                  <Link href={service.cta.href} className={styles.link}>
                    {service.cta.label}
                  </Link>
                  {service.id === "skill-check" ? (
                    <VscFilePdf size={24} className={styles.pdf} />
                  ) : null}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
