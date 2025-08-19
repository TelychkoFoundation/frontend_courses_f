import styles from "../components/Header/index.module.css";

export default function ShoppingCart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
    >
      <g clipPath="url(#clip0_383_2992)">
        <path
          d="M8.00033 18.3333C8.46056 18.3333 8.83366 17.9602 8.83366 17.5C8.83366 17.0398 8.46056 16.6667 8.00033 16.6667C7.54009 16.6667 7.16699 17.0398 7.16699 17.5C7.16699 17.9602 7.54009 18.3333 8.00033 18.3333Z"
          className={styles.icon}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.1663 18.3333C17.6266 18.3333 17.9997 17.9602 17.9997 17.5C17.9997 17.0398 17.6266 16.6667 17.1663 16.6667C16.7061 16.6667 16.333 17.0398 16.333 17.5C16.333 17.9602 16.7061 18.3333 17.1663 18.3333Z"
          className={styles.icon}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.33301 0.833344H4.66634L6.89967 11.9917C6.97588 12.3753 7.1846 12.72 7.4893 12.9653C7.79399 13.2105 8.17526 13.3408 8.56634 13.3333H16.6663C17.0574 13.3408 17.4387 13.2105 17.7434 12.9653C18.0481 12.72 18.2568 12.3753 18.333 11.9917L19.6663 5.00001H5.49967"
          className={styles.icon}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_383_2992">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
