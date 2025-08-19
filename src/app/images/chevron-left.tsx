export default function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="18"
      viewBox="0 0 11 18"
      fill="none"
    >
      <path
        d="M0.445312 9.25L1.25391 8.47656L8.00391 1.72656L8.8125 0.917969L10.3945 2.5L9.58594 3.30859L3.64453 9.25L9.58594 15.2266L10.3945 16L8.8125 17.6172L8.00391 16.8086L1.25391 10.0586L0.445312 9.25Z"
        className={className}
      />
    </svg>
  );
}
