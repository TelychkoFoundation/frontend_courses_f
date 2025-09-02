import styles from "./page.module.css";
import { dropdownLinks } from "@/constants";
import { ProfileDropdownLink } from "@/typings";
import Link from "next/link";
import Logout from "../../components/Header/Logout";
import { ChevronRightBoldIcon } from "@/images";

export default function ProfileNavigation() {
  return (
    <nav className={styles.nav}>
      <ul>
        {dropdownLinks.map(({ id, name, icon, query }: ProfileDropdownLink) => (
          <li key={id}>
            <Link
              href={`/profile?section=${query}`}
              className={styles.dropdownItem}
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
