"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useQueryParam = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [params, setParams] = useState(
    () => new URLSearchParams(searchParams.toString())
  );

  useEffect(() => {
    setParams(new URLSearchParams(searchParams.toString()));
  }, [searchParams]);

  const getQuery = (key: string): string | undefined => {
    return params.get(key) ?? undefined;
  };

  const setQuery = (queries: { key: string; value: any }[]) => {
    const newParams = new URLSearchParams(params.toString());
    queries.forEach((item) => {
      newParams.set(item.key, `${item.value}`);
    });
    router.replace(`${pathname}?${newParams.toString()}`);
  };

  const deleteQuery = (keys: string[]) => {
    const newParams = new URLSearchParams(params.toString());
    keys.forEach((key) => newParams.delete(key));
    router.replace(`${pathname}?${newParams.toString()}`);
  };

  return { getQuery, setQuery, deleteQuery };
};

export default useQueryParam;
