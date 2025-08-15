"use client";

import { memo } from "react";
import { useCourses } from "@/hooks";
import CourseNotPaid from "./CourseNotPaid";
import CertificatePreview from "./CertificatePreview";
import { Button } from "@/components";
import Image from "next/image";
import { DownloadIcon, CalendarIcon } from "@/images";
import styles from "./index.module.css";

const notPaid = true;
const isFinalExam = false;
const isCertificateReady = false;

export default memo(function CoursePriceCertificate() {
  const { currentCourseDetailsVisibility } = useCourses();

  const renderTitleContent = () => {
    if (notPaid) {
      return "повний доступ до курсу";
    }

    if (isFinalExam) {
      return "Фінальний екзамен";
    }

    return "сертифікат";
  };

  const renderContent = () => {
    if (notPaid) {
      return (
        <CourseNotPaid
          currentCourseDetailsVisibility={currentCourseDetailsVisibility}
        />
      );
    }

    if (isFinalExam) {
      return (
        <>
          {currentCourseDetailsVisibility ? (
            <CertificatePreview
              currentCourseDetailsVisibility={currentCourseDetailsVisibility}
            />
          ) : null}
          <Button>
            <span className={styles.calendarButtonContent}>Оберіть дату</span>
            <Image src={CalendarIcon} alt="Calendar Icon" />
          </Button>
        </>
      );
    }

    if (isCertificateReady) {
      return (
        <>
          {currentCourseDetailsVisibility ? (
            <div className={styles.certificateContainer} />
          ) : null}
          <div className={styles.calendarButtonContainer}>
            <Button>
              <span className={styles.calendarButtonContent}>
                Завантажити [PDF]
              </span>
              <DownloadIcon />
            </Button>
          </div>
        </>
      );
    }

    return (
      <CertificatePreview
        currentCourseDetailsVisibility={currentCourseDetailsVisibility}
      />
    );
  };

  return (
    <div
      className={`${styles.coursePriceCertificateContainer} 
      ${currentCourseDetailsVisibility ? styles.coursePriceCertificateContainerOpen : ""} ${!notPaid ? styles.background : ""}`}
    >
      <p className={styles.coursePriceCertificateMessage}>
        {renderTitleContent()}
      </p>
      {renderContent()}
    </div>
  );
});
