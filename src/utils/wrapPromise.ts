export type WrappedPromise<R> = {
  read: () => R;
};

export function wrapPromise<T>(promise: Promise<T>): WrappedPromise<T> {
  let status = "pending";
  let result;
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      //console.log(status);
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}

export const delay = (d) => new Promise((r) => setTimeout(r, d));
