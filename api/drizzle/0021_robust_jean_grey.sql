CREATE TYPE "public"."contactOptions" AS ENUM('whatsapp', 'email');--> statement-breakpoint
ALTER TABLE "websites" ADD COLUMN "city" varchar;--> statement-breakpoint
ALTER TABLE "websites" ADD COLUMN "instagram" varchar;--> statement-breakpoint
ALTER TABLE "websites" ADD COLUMN "facebook" varchar;--> statement-breakpoint
ALTER TABLE "websites" ADD COLUMN "youtube" varchar;--> statement-breakpoint
ALTER TABLE "websites" ADD COLUMN "email" varchar;--> statement-breakpoint
ALTER TABLE "websites" ADD COLUMN "website" varchar;--> statement-breakpoint
ALTER TABLE "websites" ADD COLUMN "phone" varchar;--> statement-breakpoint
ALTER TABLE "websites" ADD COLUMN "countryCode" varchar;--> statement-breakpoint
ALTER TABLE "websites" ADD COLUMN "contactOption" "contactOptions";