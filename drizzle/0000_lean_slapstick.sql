CREATE TABLE "answers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "answers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"submission_id" integer NOT NULL,
	"form_id" integer NOT NULL,
	"question_id" integer NOT NULL,
	"clerk_id" varchar(255) NOT NULL,
	"answer_text" text NOT NULL,
	"submitted_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "form_comments" (
	"formCommentId" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "form_comments_formCommentId_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"form_id" integer NOT NULL,
	"clerk_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "post_hashtags" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "post_hashtags_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"post_id" integer,
	"hashtag_id" integer
);
--> statement-breakpoint
CREATE TABLE "form_permissions" (
	"form_id" integer NOT NULL,
	"clerk_id" varchar(255) NOT NULL,
	CONSTRAINT "form_permissions_form_id_clerk_id_pk" PRIMARY KEY("form_id","clerk_id")
);
--> statement-breakpoint
CREATE TABLE "form_submissions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "form_submissions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"form_id" integer NOT NULL,
	"clerk_id" varchar(255) NOT NULL,
	"submitted_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "forms" (
	"form_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "forms_form_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"description" text NOT NULL,
	"clerk_id" varchar(255) NOT NULL,
	"views" integer DEFAULT 0,
	"images" text DEFAULT '',
	"category" varchar(255) DEFAULT '',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "hashtags" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"count" integer DEFAULT 1,
	CONSTRAINT "hashtags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "question_options" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "question_options_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"question_id" integer NOT NULL,
	"value" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "questions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"form_id" integer NOT NULL,
	"title" varchar(500) NOT NULL,
	"is_required" boolean DEFAULT false,
	"type" text NOT NULL,
	"user_image" text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_name" text,
	"is_blocked" boolean DEFAULT false,
	"clerkId" varchar(255),
	"user_email" varchar(255) NOT NULL,
	"user_permission" varchar(50) DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "users_clerkId_unique" UNIQUE("clerkId"),
	CONSTRAINT "users_user_email_unique" UNIQUE("user_email")
);
--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_submission_id_form_submissions_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_form_id_forms_form_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("form_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_clerk_id_users_clerkId_fk" FOREIGN KEY ("clerk_id") REFERENCES "public"."users"("clerkId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_comments" ADD CONSTRAINT "form_comments_form_id_forms_form_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("form_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_comments" ADD CONSTRAINT "form_comments_clerk_id_users_clerkId_fk" FOREIGN KEY ("clerk_id") REFERENCES "public"."users"("clerkId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_hashtags" ADD CONSTRAINT "post_hashtags_post_id_forms_form_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."forms"("form_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_hashtags" ADD CONSTRAINT "post_hashtags_hashtag_id_hashtags_id_fk" FOREIGN KEY ("hashtag_id") REFERENCES "public"."hashtags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_permissions" ADD CONSTRAINT "form_permissions_form_id_forms_form_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("form_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_permissions" ADD CONSTRAINT "form_permissions_clerk_id_users_clerkId_fk" FOREIGN KEY ("clerk_id") REFERENCES "public"."users"("clerkId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_form_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("form_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_clerk_id_users_clerkId_fk" FOREIGN KEY ("clerk_id") REFERENCES "public"."users"("clerkId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms" ADD CONSTRAINT "forms_clerk_id_users_clerkId_fk" FOREIGN KEY ("clerk_id") REFERENCES "public"."users"("clerkId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question_options" ADD CONSTRAINT "question_options_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_form_id_forms_form_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("form_id") ON DELETE cascade ON UPDATE no action;