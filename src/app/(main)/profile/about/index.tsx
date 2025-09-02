import { useSession } from "next-auth/react";
import Image from "next/image";
import Socials from "./Socials";
import Certificates from "./Certificates";
import DeleteAccount from "./DeleteAccount";
import styles from "./index.module.css";

export default function About() {
  const { data, status } = useSession();

  return (
    <>
      <div className={styles.aboutContainer}>
        <section className={styles.aboutColumn}>
          <article className={styles.aboutInner}>
            <h5>Моє ім’я</h5>
            <p className={status === "loading" ? styles.textSkeleton : ""}>
              {data?.user?.name}
            </p>
          </article>
          <article className={styles.aboutInner}>
            <h5>Пошта</h5>
            <p className={status === "loading" ? styles.textSkeleton : ""}>
              {data?.user?.email}
            </p>
          </article>
        </section>
        <section className={styles.aboutColumn}>
          <article className={styles.aboutInner}>
            <h5>Фото профілю</h5>
            {data?.user?.image ? (
              <Image
                src={data.user.image}
                width={120}
                height={120}
                className={styles.avatar}
                alt="Avatar"
                priority={true}
              />
            ) : (
              <div className={styles.avatarSkeleton} />
            )}
          </article>
        </section>
      </div>
      <Socials />
      <Certificates />
      <DeleteAccount />
    </>
  );
}
