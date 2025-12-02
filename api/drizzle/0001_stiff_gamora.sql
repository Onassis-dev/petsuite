CREATE TABLE "permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"organizationId" integer NOT NULL,
	"users" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "permissionId" integer;--> statement-breakpoint
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_permission" ON "permissions" USING btree ("userId","organizationId");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_permissionId_permissions_id_fk" FOREIGN KEY ("permissionId") REFERENCES "public"."permissions"("id") ON DELETE set null ON UPDATE no action;