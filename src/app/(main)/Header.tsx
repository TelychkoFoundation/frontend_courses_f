"use client";

import { usePathname } from "next/navigation";
import TabsContainer from "./TabsContainer";
import Breadcrumbs from "./Breadcrumbs";

export default function Header() {
  const pathname = usePathname();

  if (pathname === "/courses" || pathname === "/services") {
    return <TabsContainer />;
  }

  return <Breadcrumbs />;
}
