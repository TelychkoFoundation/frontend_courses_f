import { Button, ButtonType } from "@/components";
import { signIn } from "next-auth/react";
import styles from "./index.module.css";

export default function Prices() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Ціни</h2>
      <section className={styles.prices}>
        <div className={styles.priceCard}>
          <div className={styles.priceCardTitleSection}>
            <h6>Окремі уроки</h6>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <span className={styles.description}>
            Aliquam tincidunt purus et eu viverra cursus lectus. Cursus
            ullamcorper enim sagittis ut. Neque in viverra iaculis venenatis
            nulla. Lectus enim donec amet faucibus ornare nulla in. Sed
            tincidunt ante amet mi senectus.
          </span>
          <div className={styles.price}>
            <span>від</span>
            <span>46</span>
            <span>грн/урок</span>
          </div>
          <Button
            type={ButtonType.SECONDARY}
            onClick={() => signIn("google", { redirectTo: "/courses" })}
          >
            Обрати урок
          </Button>
        </div>
        <div className={styles.priceCard}>
          <div className={styles.priceCardTitleSection}>
            <h6>Повний курс</h6>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <span className={styles.description}>
            Aliquam tincidunt purus et eu viverra cursus lectus. Cursus
            ullamcorper enim sagittis ut. Neque in viverra iaculis venenatis
            nulla. Lectus enim donec amet faucibus ornare nulla in. Sed
            tincidunt ante amet mi senectus.
          </span>
          <div className={styles.price}>
            <span>від</span>
            <span>299</span>
            <span>грн/курс</span>
          </div>
          <Button
            type={ButtonType.SECONDARY}
            onClick={() => signIn("google", { redirectTo: "/courses" })}
          >
            Обрати курс
          </Button>
        </div>
        <div className={styles.priceCard}>
          <div className={styles.priceCardTitleSection}>
            <h6>Підписка на все</h6>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <span className={styles.description}>
            Aliquam tincidunt purus et eu viverra cursus lectus. Cursus
            ullamcorper enim sagittis ut. Neque in viverra iaculis venenatis
            nulla. Lectus enim donec amet faucibus ornare nulla in. Sed
            tincidunt ante amet mi senectus.
          </span>
          <div className={styles.price}>
            <span />
            <span>499</span>
            <span>грн/міс</span>
          </div>
          <Button type={ButtonType.SECONDARY}>Підписатись</Button>
        </div>
      </section>
    </section>
  );
}
