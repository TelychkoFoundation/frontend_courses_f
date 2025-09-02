"use client";

import { dropdownLinks } from "@/constants";
import { ProfileDropdownLink } from "@/typings";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Logout from "../../components/Header/Logout";
import { ChevronRightBoldIcon } from "@/images";
import styles from "./page.module.css";

export default function ProfileNavigation() {
  const searchParams = useSearchParams();
  const queryParamsValue: string | null = searchParams.get("section");

  return (
    <nav className={styles.nav}>
      <ul>
        {dropdownLinks.map(({ id, name, icon, query }: ProfileDropdownLink) => (
          <li key={id}>
            <Link
              href={`/profile?section=${query}`}
              className={`${styles.dropdownItem} ${queryParamsValue && query.includes(queryParamsValue) ? styles.active : ""}`}
            >
              {icon}
              <span className={styles.dropdownItemName}>{name}</span>
              <div className={styles.rightIconContainer}>
                <ChevronRightBoldIcon className={styles.rightIcon} />
              </div>
            </Link>
          </li>
        ))}
        <Logout
          icon={
            <div className={styles.rightIconContainer}>
              <ChevronRightBoldIcon className={styles.rightIcon} />
            </div>
          }
        />
      </ul>
    </nav>
  );
}
