"use client";
import { useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const useSearchFilterParam = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const getParamValues = useCallback(
    (key: string) => {
      return searchParams.get(key)?.split(",") || [];
    },
    [searchParams],
  );

  const updateURLParams = useCallback(
    (key: string, values: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (values.length) {
        params.set(key, values.join(","));
      } else {
        params.delete(key);
      }
      const queryString = `?${params.toString()}`;
      router.replace(queryString);
    },
    [searchParams, router],
  );

  const handleItemChange = useCallback(
    (key: string, value: string) => {
      const currentValues = getParamValues(key);
      const newValues = currentValues.includes(value) ? currentValues.filter((item) => item !== value) : [...currentValues, value];
      updateURLParams(key, newValues);
    },
    [getParamValues, updateURLParams],
  );

  const clearAllParams = useCallback(() => {
    router.replace("?");
  }, [router]);

  return {
    getParamValues,
    handleItemChange,
    clearAllParams,
  };
};

export default useSearchFilterParam;
