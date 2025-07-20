"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "../utils";
import { QueryParamsKeyType, QueryParamsValueType } from "@/typings";

export const useQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const addQueryString = (
    key: QueryParamsKeyType,
    value: QueryParamsValueType,
  ) => {
    const newQuery = createQueryString(key, value, searchParams.toString());
    router.push(pathname + "?" + newQuery);
  };

  const removeQueryString = (key: QueryParamsKeyType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.push(pathname + (params.toString() ? "?" + params.toString() : ""));
  };

  const getQueryString = (key: QueryParamsKeyType) => {
    return searchParams.get(key);
  };

  return {
    addQueryString,
    removeQueryString,
    getQueryString,
  };
};
