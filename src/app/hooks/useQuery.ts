"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@/utils";

export const useQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const addQueryString = (key: any, value: any) => {
    const newQuery = createQueryString(key, value, searchParams.toString());
    router.push(pathname + "?" + newQuery);
  };

  const removeQueryString = (key: any) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.push(pathname + (params.toString() ? "?" + params.toString() : ""));
  };

  const getQueryString = (key: any) => {
    return searchParams.get(key);
  };

  return {
    addQueryString,
    removeQueryString,
    getQueryString,
  };
};
