ALTER TABLE "pets" ALTER COLUMN "public" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "organizations" DROP COLUMN "subscriptionId";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "image";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "stripeCustomerId";