import { IS_SHARE_ENABLED, shareVideo, ShareVideoParams } from "@/lib/share";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  if (!IS_SHARE_ENABLED) {
    return NextResponse.json({ error: "Sharing is disabled" }, { status: 503 });
  }
  const payload: ShareVideoParams = await req.json();
  const id = await shareVideo({
    ...payload,
    createdAt: Date.now(),
  });
  return NextResponse.json({
    id,
    params: payload,
  });
};
