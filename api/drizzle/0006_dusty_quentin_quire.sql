CREATE TYPE "public"."sexes" AS ENUM('male', 'female', 'unknown');--> statement-breakpoint
CREATE TYPE "public"."species" AS ENUM('dog', 'cat', 'other');--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "species" "species" NOT NULL;--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "sex" "sexes" NOT NULL;