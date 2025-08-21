"use client";

// import { useEffect } from "react";
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
// import { useRouter } from "[...nextauth]/navigation";
import styles from "../app/landing/index.module.css";

// const sections = [{ id: "home" }, { id: "tutorial" }, { id: "cta" }];

export default function Page() {
  // const router = useRouter();
  //
  // // Прокрутка до секції при кліці на навігаційний елемент
  // const handleScrollToSection = (id: string) => {
  //   // Оновлюємо хеш в URL
  //   router.push(`#${id}`);
  //
  //   // Прокручування до секції
  //   const section = document.getElementById(id);
  //   if (section) {
  //     section.scrollIntoView({ behavior: "smooth" });
  //   }
  // };
  //
  // useEffect(() => {
  //   const currentHash = window.location.hash;
  //   if (currentHash) {
  //     const sectionId = currentHash.replace("#", "");
  //     const section = document.getElementById(sectionId);
  //     if (section) {
  //       section.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }
  //
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //
  //     for (const section of sections) {
  //       const element = document.getElementById(section.id);
  //       if (element) {
  //         const offsetTop = element.offsetTop;
  //         const offsetHeight = element.offsetHeight;
  //
  //         if (
  //           scrollPosition >= offsetTop - offsetHeight / 2 &&
  //           scrollPosition < offsetTop + offsetHeight / 2
  //         ) {
  //           // Оновлюємо URL з активною секцією
  //           router.replace(`#${section.id}`);
  //         }
  //       }
  //     }
  //   };
  //
  //   window.addEventListener("scroll", handleScroll);
  //
  //   // Видаляємо слухача при демонтажі компонента
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [router]);

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
