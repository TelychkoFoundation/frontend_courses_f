import styles from "../components/Header/index.module.css";

export default function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
    >
      <path
        d="M17.1663 17.5V15.8333C17.1663 14.9493 16.8152 14.1014 16.19 13.4763C15.5649 12.8512 14.7171 12.5 13.833 12.5H7.16634C6.28229 12.5 5.43444 12.8512 4.80932 13.4763C4.1842 14.1014 3.83301 14.9493 3.83301 15.8333V17.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.icon}
      />
      <path
        d="M10.5003 9.16667C12.3413 9.16667 13.8337 7.67428 13.8337 5.83333C13.8337 3.99238 12.3413 2.5 10.5003 2.5C8.65938 2.5 7.16699 3.99238 7.16699 5.83333C7.16699 7.67428 8.65938 9.16667 10.5003 9.16667Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.icon}
      />
    </svg>
  );
}
