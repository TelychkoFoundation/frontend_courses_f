import { DeviceTypes, useDeviceType } from "@/hooks";

export default function Hero({
  className,
  stroke,
}: {
  className: string;
  stroke: string;
}) {
  const deviceType = useDeviceType();

  if (deviceType === DeviceTypes.mobile) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="430"
        height="236"
        viewBox="0 0 430 236"
        fill="none"
        className={className}
        style={{ top: "-29%" }}
      >
        <path
          d="M-80 97.3154C27.3111 32.0782 289.693 -32.7281 172.017 62.5541C54.3404 157.836 28.8646 147.908 109.622 69.339C190.379 -9.22993 171.728 128.442 288.945 128.288C406.162 128.134 438.584 96.6231 403.499 157.59C368.415 218.558 450.393 186.645 520.566 165.643C590.739 144.642 588.901 214.682 532.311 220.678C475.721 226.673 412.499 151.932 461.93 103.448C511.361 54.9643 588.975 197.761 705.231 198.949C764.274 199.552 801.047 168.49 811.443 151.342"
          className={stroke}
          strokeWidth="28.6465"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1440"
      height="392"
      viewBox="0 0 1440 392"
      fill="none"
      className={className}
    >
      <path
        d="M-110.897 202.193C77.0699 73.2092 546.14 -70.5177 342.395 113.959C138.649 298.436 91.4816 282.991 229.985 132.503C368.489 -17.9856 348.469 233.407 560.905 221.393C773.341 209.379 828.949 149.021 771.464 263.035C713.978 377.048 859.365 311 984.449 265.91C1109.53 220.821 1113.21 347.951 1011.25 364.482C909.279 381.014 787.208 251.877 871.947 159.054C956.685 66.23 1111.65 317.274 1322.48 307.788C1429.56 302.97 1493.1 242.991 1510.22 210.869"
        className={stroke}
        strokeWidth="52"
        strokeLinecap="round"
      />
    </svg>
  );
}
