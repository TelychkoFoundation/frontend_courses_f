import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CourseKeyTypes } from "../typings/course";
import { createQueryString } from "../utils";
import { ModalType } from "../typings/modals";

export const useQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const addQueryString = (key: ModalType, value: CourseKeyTypes | string) => {
    const newQuery = createQueryString(key, value, searchParams.toString());
    router.push(pathname + "?" + newQuery);
  };

  const removeQueryString = (key: ModalType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.push(pathname + (params.toString() ? "?" + params.toString() : ""));
  };

  return {
    addQueryString,
    removeQueryString,
  };
};
