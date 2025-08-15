"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs } from "@/components";

export default function TabsContainer() {
  const router = useRouter();
  const pathname = usePathname();

  const onSelect = (route: string) => {
    router.push(route);
  };

  return (
    <Tabs
      data={[
        { id: "/courses", name: "Курси" },
        { id: "/services", name: "Послуги" },
      ]}
      onSelectAction={onSelect}
      selected={pathname}
    />
  );
}
