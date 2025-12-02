import { z } from "zod/v4";

export const userImageUploadSchema = z.object({
  file: z.instanceof(File),
});

export const updateOrgSchema = z.object({
  orgId: z.number().int(),
});

export const acceptInvitationSchema = z.object({
  invitation: z.uuid(),
});
