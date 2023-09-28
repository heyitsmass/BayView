import { StatusResponse, TestMap } from "@/types/discord";
import { BayView } from "@/utils/BayLoader";
import { NextResponse } from "next/server";

export async function GET() {
  const { client } = BayView.init();

  return NextResponse.json({
    ok: true,
    data: {
      code: client.ws.status,
      status: TestMap[client.ws.status]
    }
  } as StatusResponse);
}
