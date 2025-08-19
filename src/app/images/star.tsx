interface IStarProps {
  filled: boolean;
  className?: string;
  stroke?: string;
}

export default function Star({ filled, className, stroke }: IStarProps) {
  if (filled) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <g clipPath="url(#clip0_40_1469)">
          <path
            d="M7.99999 1.33325L10.06 5.50659L14.6667 6.17992L11.3333 9.42659L12.12 14.0133L7.99999 11.8466L3.87999 14.0133L4.66666 9.42659L1.33333 6.17992L5.93999 5.50659L7.99999 1.33325Z"
            className={className}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_40_1469">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M7.99999 1.33325L10.06 5.50659L14.6667 6.17992L11.3333 9.42659L12.12 14.0133L7.99999 11.8466L3.87999 14.0133L4.66666 9.42659L1.33333 6.17992L5.93999 5.50659L7.99999 1.33325Z"
        className={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
