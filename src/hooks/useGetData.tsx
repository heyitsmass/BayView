'use client'; 
import { fetcher } from "@/utils/fetcher";
import { WrappedPromise, wrapPromise } from "@/utils/wrapPromise";
import React from "react";

export function useGetData<T>(url: string) {
  const [resource, setResource] = React.useState(
    null as WrappedPromise<T> | null
  );

  React.useEffect(() => {
    const _resource = wrapPromise<T>(fetcher(url));
    setResource(_resource);
  }, [url]);

  return resource?.read();
}
