import { StatusResponse, TestMap } from '@/types/discord';
import { __BayView } from '@/utils/BayLoader';
import { NextResponse } from 'next/server';

export async function GET() {
  const { ws } = __BayView.init().client;

  return NextResponse.json({
    ok: true,
    data: {
      code: ws.status,
      status: TestMap[ws.status]
    }
  } as StatusResponse);
}
