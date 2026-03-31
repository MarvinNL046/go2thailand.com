import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

// Allowed origins — all go2* sites
const ALLOWED_ORIGINS = [
  "https://go2-thailand.com",
  "https://www.go2-thailand.com",
  "https://go2-bali.com",
  "https://www.go2-bali.com",
  "https://go2-japan.com",
  "https://www.go2-japan.com",
  "https://go2-vietnam.com",
  "https://www.go2-vietnam.com",
  "https://go2-greece.com",
  "https://www.go2-greece.com",
  "https://go2-portugal.com",
  "https://www.go2-portugal.com",
  "https://go2-spain.com",
  "https://www.go2-spain.com",
  "https://go2-turkey.com",
  "https://www.go2-turkey.com",
  "https://go2-morocco.com",
  "https://www.go2-morocco.com",
  "https://go2-croatia.com",
  "https://www.go2-croatia.com",
  "https://go2-italy.com",
  "https://www.go2-italy.com",
];

function getCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("Origin") || "";
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "origin",
  };
}

// POST /subscribe — email subscription from any go2* site
http.route({
  path: "/subscribe",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    const { email, site, locale } = body;

    if (!email || !site) {
      return new Response(
        JSON.stringify({ success: false, message: "email and site are required" }),
        { status: 400, headers: { ...getCorsHeaders(request), "Content-Type": "application/json" } }
      );
    }

    const result = await ctx.runMutation(api.emails.subscribe, {
      email,
      site,
      locale: locale || "en",
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...getCorsHeaders(request), "Content-Type": "application/json" },
    });
  }),
});

// OPTIONS /subscribe — CORS pre-flight
http.route({
  path: "/subscribe",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => {
    return new Response(null, {
      status: 204,
      headers: getCorsHeaders(request),
    });
  }),
});

// POST /unsubscribe
http.route({
  path: "/unsubscribe",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    const { email, site } = body;

    if (!email || !site) {
      return new Response(
        JSON.stringify({ success: false, message: "email and site are required" }),
        { status: 400, headers: { ...getCorsHeaders(request), "Content-Type": "application/json" } }
      );
    }

    const result = await ctx.runMutation(api.emails.unsubscribe, { email, site });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...getCorsHeaders(request), "Content-Type": "application/json" },
    });
  }),
});

// OPTIONS /unsubscribe — CORS pre-flight
http.route({
  path: "/unsubscribe",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => {
    return new Response(null, {
      status: 204,
      headers: getCorsHeaders(request),
    });
  }),
});

export default http;
