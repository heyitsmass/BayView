export type HTTPResponse<T> =
  | {
      ok: true;
      data: T;
    }
  | (T extends Error
      ? {
          error: true;
          message: string;
        }
      : {
          ok: false;
          data: T;
        });
