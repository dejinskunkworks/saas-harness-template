import { type NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";
import { TRACE_HEADER, newTraceId } from "@/lib/trace-id";

export async function middleware(request: NextRequest) {
  // Assign or reuse a trace id for every request. Threaded to server code
  // via the request header and echoed on the response for client correlation.
  const traceId = request.headers.get(TRACE_HEADER) ?? newTraceId();
  request.headers.set(TRACE_HEADER, traceId);

  const response = await updateSession(request);
  response.headers.set(TRACE_HEADER, traceId);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
