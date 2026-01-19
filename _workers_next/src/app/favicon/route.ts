import { NextResponse } from "next/server";
import { getSetting } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  let target = "/icon.svg";
  try {
    const logo = await getSetting("shop_logo");
    if (logo?.trim()) {
      target = logo.trim();
    }
  } catch {
    // best effort
  }

  const url = target.startsWith("http://") || target.startsWith("https://")
    ? target
    : new URL(target, request.url).toString();

  return NextResponse.redirect(url, {
    status: 302,
    headers: {
      "Cache-Control": "public, max-age=300",
    },
  });
}
