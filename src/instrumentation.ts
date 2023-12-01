import mongoose from "mongoose";

const envTypes = ["production", "development", "preview"] as const;

const dbNames = ["bayview", "bayview-dev", "bayview-dev"] as const;

type NEXT_VERCEL_ENV = (typeof envTypes)[number];

type MONGODB_COLLECTIONS = (typeof dbNames)[number];

export async function register() {
  const dbMap = {
    production: "bayview",
    development: "bayview-dev",
    preview: "bayview-dev"
  } as Record<NEXT_VERCEL_ENV, MONGODB_COLLECTIONS>;

  const ENV = process.env.NEXT_PUBLIC_VERCEL_ENV || "production";

  const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost:27017";

  try {
    console.log(
      `Connecting to ${
        ENV === "production" ? "production" : "development"
      } database...`
    );

    await mongoose.connect(
      `${MONGODB_URI}/${dbMap[ENV]}?retryWrites=true&w=majority`
    );

    const { name, port } = mongoose.connection;

    if (ENV !== "production") {
      console.log("\n*********** MongoDB ***********\n");
      console.log(`  Name: ${name}`);
      console.log(`  Port: ${port}`);
      console.log("\n********** Connected **********\n");
    }
  } catch (err) {
    const { message } = err as Error;
    console.log(message);
  }
}
