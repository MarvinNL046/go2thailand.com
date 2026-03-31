import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  emails: defineTable({
    email: v.string(),
    site: v.string(),       // e.g. "go2thailand", "go2bali", "go2japan"
    locale: v.string(),     // e.g. "en", "nl", "de"
    subscribedAt: v.string(), // ISO date string
  })
    .index("by_email_site", ["email", "site"])
    .index("by_site", ["site"]),
});
