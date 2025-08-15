export default function DividerVertical({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2"
      height="12"
      viewBox="0 0 2 12"
      fill="none"
    >
      <path d="M1 12V0" className={className} />
    </svg>
  );
}
