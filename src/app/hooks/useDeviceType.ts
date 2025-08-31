"use client";

import { useState, useEffect } from "react";

export type DeviceType = "mobile" | "tablet" | "desktop" | null;

export enum DeviceTypes {
  mobile = "mobile",
  tablet = "tablet",
  desktop = "desktop",
}

export const useDeviceType = (): DeviceType | null => {
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 767) {
        setDeviceType(DeviceTypes.mobile);
      } else if (width >= 768 && width <= 1024) {
        setDeviceType(DeviceTypes.tablet);
      } else {
        setDeviceType(DeviceTypes.desktop);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
};
