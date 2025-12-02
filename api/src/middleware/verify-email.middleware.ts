import { createMiddleware } from "hono/factory";
import { db } from "../lib/db";
import { users } from "../db/auth.db";
import { eq } from "drizzle-orm";
import { sendError } from "../lib/errors";

export const requireEmailVerified = createMiddleware(async (c, next) => {
  const userId = c.get("userId");

  if (!userId) return sendError(c, null, 401);

  const [user] = await db
    .select({ emailVerified: users.emailVerified })
    .from(users)
    .where(eq(users.id, userId));

  if (!user?.emailVerified) return sendError(c, "confirmEmail");

  return next();
});
