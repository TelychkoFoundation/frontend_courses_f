"use client";

// import { useRef, useState } from "react";
import styles from "./courses.module.css";
import { FiRefreshCcw } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import { useAdmin } from "@/hooks";
// import {
//   listCourseFiles,
//   uploadLesson,
//   getVideoSignedUrl,
//   getCourseVideoUrl,
// } from "../../lib/aws/s3Actions";

export default function AdminTableActions() {
  const { fetchCourses, courses } = useAdmin();
  // const formRef = useRef<HTMLFormElement>(null);
  // const [status, setStatus] = useState("");
  // const [url, setUrl] = useState(null);
  //
  // const handleSubmit = async (formData: FormData) => {
  //   setStatus("Завантаження...");
  //   const result = await uploadLesson(formData);
  //   if (result.success) {
  //     setStatus("✅ Завантажено!");
  //     formRef.current?.reset();
  //   } else {
  //     setStatus("❌ Помилка");
  //   }
  // };
  //
  // useEffect(() => {
  //   // document.addEventListener("contextmenu", e => e.preventDefault());
  //
  //   const getCourseContent = async () => {
  //     const response: any[] | undefined =
  //       await listCourseFiles("HTML Advanced");
  //
  //     const res = await getCourseVideoUrl(
  //       "HTML Advanced",
  //       "ForBiggerBlazes.mp4",
  //     );
  //
  //     if (response) {
  //       const urls = await getVideoSignedUrl(response[0]);
  //       console.log(urls, "urls");
  //       if (urls.url) {
  //         setUrl(urls.url);
  //       }
  //     }
  //
  //     console.log(res, 9898);
  //     //
  //     // if (response) {
  //     //   const urls = await getVideoSignedUrl(response[0]);
  //     //   console.log(urls, "urls");
  //     //   if (urls.url) {
  //     //     setUrl(urls.url);
  //     //   }
  //     // }
  //   };
  //
  //   getCourseContent();
  // }, []);

  return (
    <div className={styles.header}>
      <h1>Курси</h1>
      {/*{url ? (*/}
      {/*  <video*/}
      {/*    width={300}*/}
      {/*    height={200}*/}
      {/*    autoPlay*/}
      {/*    controlsList="nodownload"*/}
      {/*    controls*/}
      {/*    onContextMenu={e => e.preventDefault()}*/}
      {/*  >*/}
      {/*    <source src={url} type="video/mp4" />*/}
      {/*  </video>*/}
      {/*) : null}*/}
      {/*<form ref={formRef} action={handleSubmit}>*/}
      {/*  <h2>Завантажити урок</h2>*/}

      {/*  <input type="text" name="course" placeholder="назва курсу" required />*/}
      {/*  <input*/}
      {/*    type="file"*/}
      {/*    name="file"*/}
      {/*    accept="video/*,.doc,.docx,.pdf"*/}
      {/*    required*/}
      {/*  />*/}

      {/*  <button type="submit">Завантажити</button>*/}

      {/*  {status && <p>{status}</p>}*/}
      {/*</form>*/}
      <div className={styles.headerActions}>
        {courses.length ? (
          <button
            className={`${styles.iconButton} ${styles.refresh}`}
            title="Оновити"
            onClick={fetchCourses}
          >
            <FiRefreshCcw size={20} />
          </button>
        ) : null}
        <Link href="/admin/courses/new" className={styles.createBtn}>
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
}
