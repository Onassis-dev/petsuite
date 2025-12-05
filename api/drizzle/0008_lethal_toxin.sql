CREATE TYPE "public"."size" AS ENUM('small', 'medium', 'large', 'extraLarge');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('available', 'adopted', 'deceased', 'intake');--> statement-breakpoint
ALTER TABLE "pets" ALTER COLUMN "admissionDate" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "status" "status" NOT NULL;--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "size" "size";--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "weigth" numeric;--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "measurement" "size";--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "comments" varchar;--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "publicDescription" varchar;--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "bornDate" date;