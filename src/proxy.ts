import { NextRequest, NextResponse } from "next/server";

async function proxy(request: NextRequest): Promise<NextResponse> {
  return NextResponse.next({ request });
}

export default proxy;
