"use server";

import { delay } from "./wrapPromise";

export async function fetcher<R>(url: string) {
  try {
    if (url.includes("google")) {
      url = url += "&key=" + process.env.GOOGLE_MAPS_API_KEY;
    }
    const res = await fetch(url);
    const data = (await res.json()) as R;
    await delay(2000);
    return data;
  } catch (e) {
    throw e;
  }
}
