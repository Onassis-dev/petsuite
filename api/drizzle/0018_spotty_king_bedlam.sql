ALTER TABLE "websites" ADD CONSTRAINT "websites_url_unique" UNIQUE("url");--> statement-breakpoint
ALTER TABLE "websites" ADD CONSTRAINT "websites_organizationId_unique" UNIQUE("organizationId");