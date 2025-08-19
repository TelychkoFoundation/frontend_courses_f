import {
  Hero,
  Tutorial,
  Cta,
  Services,
  Contacts,
  Courses,
  Feedback,
  Prices,
  About,
  Footer,
} from "./landing";
import styles from "../app/landing/index.module.css";

export default async function Page() {
  return (
    <div className={styles.wrapper}>
      <Hero />
      <Tutorial />
      <Cta />
      <Services />
      <About />
      <Feedback />
      <Courses />
      <Prices />
      <Contacts />
      <Footer />
    </div>
  );
}
