"use client";
import { useHomepage } from "@/hooks";
import { handleNotifierCall } from "@/lib/notifier/Handler";

export default function Page() {
  const ctx = useHomepage();

  const { user } = ctx!;

  /** delay in seconds */

  const { _id } = user;

  return (
    <>
      <div>
        <h2>Get notified!</h2>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={async (e) => {
              e.preventDefault();
              await handleNotifierCall({
                _id,
                type: "email",
                delay: 10,
                mode: "create",
              });
            }}
          >
            {" "}
            Get Notified in 10 seconds!{" "}
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={async (e) => {
              e.preventDefault();
              await handleNotifierCall({
                _id,
                type: "email",
                mode: "cancel",
              });
            }}
          >
            Cancel the timer!
          </button>
        </div>
      </div>
    </>
  );
}
