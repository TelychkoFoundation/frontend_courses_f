import Link from "next/link";
import { verifySession } from "@/lib";
import { services } from "@/constants";
import { VscFilePdf } from "react-icons/vsc";
import styles from "./page.module.css";

export default async function ServicesPage() {
  const { isAuth } = await verifySession();

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.heading}>Послуги</h1>
          <p className={styles.subheading}>
            Виберіть те, що відповідає вашому рівню, цілям та формату навчання.
          </p>
        </div>

        <Link href="/courses" className="button">
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
                    isAuth
                      ? service.cta.authAlternative.loggedIn.href
                      : service.cta.authAlternative.guest.href
                  }
                  className={styles.link}
                >
                  {isAuth
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
