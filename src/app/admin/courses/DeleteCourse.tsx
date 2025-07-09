"use client";

import { useState } from "react";
import { deleteCourseById } from "../../lib/deleteActions";
import ConfirmDeletePopup from "../../components/ConfirmDeletePopup";
import styles from "./courses.module.css";
import { CiTrash } from "react-icons/ci";

export default function DeleteCourse({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const handleDelete = async () => {
    await deleteCourseById(id);
    setShowConfirm(false);
  };

  return (
    <>
      <button
        className={`${styles.iconButton} ${styles.delete}`}
        title="Видалити"
        onClick={event => {
          event.stopPropagation();
          setShowConfirm(true);
        }}
      >
        <CiTrash size={20} />
      </button>

      {showConfirm && (
        <ConfirmDeletePopup
          courseTitle={title}
          onConfirm={handleDelete}
          onCancel={() => {
            setShowConfirm(false);
          }}
        />
      )}
    </>
  );
}
