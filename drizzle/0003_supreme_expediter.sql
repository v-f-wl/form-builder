ALTER TABLE "post_hashtags" RENAME TO "form_hashtags";--> statement-breakpoint
ALTER TABLE "form_hashtags" DROP CONSTRAINT "post_hashtags_form_id_forms_form_id_fk";
--> statement-breakpoint
ALTER TABLE "form_hashtags" DROP CONSTRAINT "post_hashtags_hashtag_id_hashtags_id_fk";
--> statement-breakpoint
ALTER TABLE "form_hashtags" ADD CONSTRAINT "form_hashtags_form_id_forms_form_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("form_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_hashtags" ADD CONSTRAINT "form_hashtags_hashtag_id_hashtags_id_fk" FOREIGN KEY ("hashtag_id") REFERENCES "public"."hashtags"("id") ON DELETE no action ON UPDATE no action;