"use client";

import { usePathname } from "next/navigation";
import TabsContainer from "./TabsContainer";
import Breadcrumbs from "./Breadcrumbs";
import { PROFILE_ROUTE, SERVICES_ROUTE, COURSES_ROUTE } from "@/constants";

export default function Header() {
  const pathname = usePathname();

  if (pathname === COURSES_ROUTE || pathname === SERVICES_ROUTE) {
    return <TabsContainer />;
  }

  if (pathname === PROFILE_ROUTE) {
    return;
  }

  return <Breadcrumbs />;
}
