import { StatusResponse, TestMap } from "@/types/discord";
import { client } from "@/utils/BayLoader.mjs";
import { NextResponse } from "next/server";

export async function GET() {
  const { ws } = client;

  return NextResponse.json({
    ok: true,
    data: {
      code: ws.status,
      status: TestMap[ws.status]
    }
  } as StatusResponse);
}
