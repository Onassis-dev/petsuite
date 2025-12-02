import { createMiddleware } from "hono/factory";
import { auth } from "../lib/auth";
import {
  type Permission,
  permissions,
  users,
  organizations,
} from "../db/auth.db";
import { db } from "../lib/db";
import { eq, getTableColumns } from "drizzle-orm";
import { sendError } from "../lib/errors";

export const checkPermission = (permission?: Permission) =>
  createMiddleware(async (c, next) => {
    const data = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!data) return sendError(c, null, 401);

    const [userPermissions] = await db
      .select({
        plan: organizations.plan,
        lang: users.lang,
        emailVerified: users.emailVerified,
        orgId: organizations.id,
        ...getTableColumns(permissions),
      })
      .from(users)
      .leftJoin(permissions, eq(users.permissionId, permissions.id))
      .leftJoin(organizations, eq(organizations.id, permissions.organizationId))
      .where(eq(users.id, data.user.id));

    c.set("userId", data.user.id);
    c.set("orgId", userPermissions?.orgId || null);
    c.set("lang", userPermissions?.lang || "en");

    if (!permission) return next();
    if (!userPermissions) return sendError(c, "unauthorized", 403, "NO_ORG");

    if (userPermissions[permission]) return next();
    else return sendError(c, null, 403);
  });
