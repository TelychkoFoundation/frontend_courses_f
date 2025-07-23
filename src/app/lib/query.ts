export const serverQueryHandler = (
  currentSearchParams: QueryParams,
  pathname: string,
) => {
  const addQueryString = (key: string, value: string): string => {
    const params = new URLSearchParams(
      currentSearchParams as Record<string, string>,
    );
    params.set(key, value);
    return `${pathname}?${params.toString()}`;
  };

  const removeQueryString = (key: string): string => {
    const params = new URLSearchParams(
      currentSearchParams as Record<string, string>,
    );
    params.delete(key);
    return params.toString() ? `${pathname}?${params.toString()}` : pathname;
  };

  const getQueryString = (key: string): string | undefined => {
    return currentSearchParams[key];
  };

  return {
    addQueryString,
    removeQueryString,
    getQueryString,
  };
};

export type QueryParams = Record<string, string | undefined>;
