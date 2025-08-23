import { Button } from "@/components";
import Price from "./Price";
import { CheckIcon } from "@/images";
import { useCourses } from "@/hooks";
import { useTransition } from "react";
import { createPaymentForCourse } from "@/actions";
import styles from "./index.module.css";
import { useSession } from "next-auth/react";

interface ICourseNotPaidProps {
  currentCourseDetailsVisibility: boolean;
}

export default function CourseNotPaid({
  currentCourseDetailsVisibility,
}: ICourseNotPaidProps) {
  const { currentCourse } = useCourses();
  const { data } = useSession();
  const [isPending, startTransition] = useTransition();

  const payForCourse = async () => {
    if (!currentCourse) {
      return;
    }

    if (!data) {
      return;
    }

    startTransition(() =>
      createPaymentForCourse(
        data?.user?.id as string,
        currentCourse,
        window.location.href,
      ),
    );
  };

  const renderButtonText = () => {
    if (currentCourseDetailsVisibility) {
      return "Придбати курс";
    }

    return (
      <Price currentCourseDetailsVisibility={currentCourseDetailsVisibility} />
    );
  };

  const renderPrice = () => {
    if (!currentCourseDetailsVisibility) {
      return null;
    }

    return (
      <Price currentCourseDetailsVisibility={currentCourseDetailsVisibility} />
    );
  };

  const renderAvailableOptions = () => {
    if (!currentCourseDetailsVisibility) {
      return null;
    }

    const test: string[] = [
      "Bсі 26 уроків курсу",
      "Бонусний урок",
      "Сертифікат по завершенню",
    ];

    return (
      <ul className={styles.optionsList}>
        {test.map((v: string, i: number) => (
          <li key={i}>
            <CheckIcon />
            {v}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      {renderAvailableOptions()}
      {renderPrice()}
      <Button loading={isPending} onClick={payForCourse}>
        {renderButtonText()}
      </Button>
    </>
  );
}
