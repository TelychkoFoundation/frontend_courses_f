"use client";

import { ReactNode, useEffect } from "react";
import { useEscape, useDrawer } from "@/hooks";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { QueryParamsKeyType } from "@/typings";
import { useSearchParams } from "next/navigation";
import styles from "./index.module.css";

interface IDrawerProps {
  title: string;
  drawerID: QueryParamsKeyType;
  children: ReactNode;
}

export default function Drawer(props: IDrawerProps) {
  const {
    isDrawerOpen,
    closeDrawerWithQueryString,
    openDrawerWithQueryString,
  } = useDrawer();
  const searchParams = useSearchParams();

  useEffect(() => {
    const paramValue = searchParams.get(props.drawerID);

    if (paramValue) {
      openDrawerWithQueryString(props.drawerID, paramValue);
    } else {
      closeDrawerWithQueryString(props.drawerID);
    }
  }, []);

  const onClose = () => {
    closeDrawerWithQueryString(props.drawerID);
  };

  useEscape(onClose);

  if (!isDrawerOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{props.title}</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            <IoMdCloseCircleOutline />
          </button>
        </div>
        {props.children}
      </div>
    </div>
  );
}
