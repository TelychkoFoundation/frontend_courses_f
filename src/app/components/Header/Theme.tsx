"use client";

import Image from "next/image";
import { useTheme } from "@/hooks";
import { LightModeIcon, DarkModeIcon } from "@/images";

export const Theme = () => {
  const { theme, toggleTheme } = useTheme();

  if (theme === "light") {
    return (
      <Image
        src={LightModeIcon}
        alt="Change theme mode icon"
        onClick={toggleTheme}
      />
    );
  }

  return (
    <Image
      src={DarkModeIcon}
      alt="Change theme mode icon"
      onClick={toggleTheme}
    />
  );
};
