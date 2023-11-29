import React from "react";

export const PrettyPrint = (obj: any) => {
  return (
    <div>
      <pre>{JSON.stringify(obj, null, 2)}</pre>
    </div>
  );
};
