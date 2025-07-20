import Link from "next/link";
import { Stepper } from "./stepper";
import { Buttons } from "./buttons";
import TutorialContent from "./content";
import { tutorialMainHeaders, tutorialSteps } from "@/constants";
import styles from "./page.module.css";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { step } = await searchParams;
  const tutorialStepParamAsNumber = Number(step);

  if (
    !step ||
    tutorialStepParamAsNumber > tutorialSteps.length ||
    tutorialStepParamAsNumber <= 0
  ) {
    return null;
  }

  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <h1 className={styles.title}>{tutorialMainHeaders.title}</h1>
        <p className={styles.subtitle}>{tutorialMainHeaders.subTitle}</p>

        <Stepper step={tutorialStepParamAsNumber} />

        <TutorialContent step={tutorialStepParamAsNumber} />

        <Buttons step={tutorialStepParamAsNumber} />
      </section>
      <Link href="/services">Послуги</Link>
    </div>
  );
}
