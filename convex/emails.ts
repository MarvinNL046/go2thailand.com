import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const subscribe = mutation({
  args: {
    email: v.string(),
    site: v.string(),
    locale: v.string(),
  },
  returns: v.object({
    success: v.boolean(),
    message: v.string(),
  }),
  handler: async (ctx, { email, site, locale }) => {
    // Check for existing subscription
    const existing = await ctx.db
      .query("emails")
      .withIndex("by_email_site", (q) => q.eq("email", email).eq("site", site))
      .first();

    if (existing) {
      return { success: true, message: "Already subscribed" };
    }

    await ctx.db.insert("emails", {
      email,
      site,
      locale,
      subscribedAt: new Date().toISOString().split("T")[0],
    });

    return { success: true, message: "Subscribed successfully" };
  },
});

export const unsubscribe = mutation({
  args: {
    email: v.string(),
    site: v.string(),
  },
  returns: v.object({
    success: v.boolean(),
    message: v.string(),
  }),
  handler: async (ctx, { email, site }) => {
    const existing = await ctx.db
      .query("emails")
      .withIndex("by_email_site", (q) => q.eq("email", email).eq("site", site))
      .first();

    if (!existing) {
      return { success: false, message: "Not found" };
    }

    await ctx.db.delete(existing._id);
    return { success: true, message: "Unsubscribed" };
  },
});

export const listBySite = query({
  args: {
    site: v.string(),
  },
  handler: async (ctx, { site }) => {
    return await ctx.db
      .query("emails")
      .withIndex("by_site", (q) => q.eq("site", site))
      .collect();
  },
});

export const count = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("emails").collect();
    // Group by site
    const counts: Record<string, number> = {};
    for (const entry of all) {
      counts[entry.site] = (counts[entry.site] || 0) + 1;
    }
    return counts;
  },
});
