interface ILockProps {
  positionClassname?: string;
  className?: string;
  size?: LockIconSize;
}

export enum LockIconSize {
  Small = "s",
  Large = "l",
}

export default function LockIcon({
  positionClassname,
  className,
  size = LockIconSize.Small,
}: ILockProps) {
  if (size === LockIconSize.Small) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="16"
        viewBox="0 0 14 16"
        fill="none"
        className={positionClassname}
      >
        <path
          d="M4.5 4.5V6H9.5V4.5C9.5 3.125 8.375 2 7 2C5.59375 2 4.5 3.125 4.5 4.5ZM2.5 6V4.5C2.5 2.03125 4.5 0 7 0C9.46875 0 11.5 2.03125 11.5 4.5V6H14V16H0V6H2.5Z"
          className={className}
        />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="21"
      viewBox="0 0 18 21"
      fill="none"
      className={positionClassname}
    >
      <path
        d="M5.875 6.125V8H12.125V6.125C12.125 4.40625 10.7188 3 9 3C7.24219 3 5.875 4.40625 5.875 6.125ZM3.375 8V6.125C3.375 3.03906 5.875 0.5 9 0.5C12.0859 0.5 14.625 3.03906 14.625 6.125V8H17.75V20.5H0.25V8H3.375Z"
        className={className}
      />
    </svg>
  );
}
