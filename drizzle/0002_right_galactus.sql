ALTER TABLE "post_hashtags" RENAME COLUMN "post_id" TO "form_id";--> statement-breakpoint
ALTER TABLE "post_hashtags" DROP CONSTRAINT "post_hashtags_post_id_forms_form_id_fk";
--> statement-breakpoint
ALTER TABLE "post_hashtags" ADD CONSTRAINT "post_hashtags_form_id_forms_form_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("form_id") ON DELETE no action ON UPDATE no action;