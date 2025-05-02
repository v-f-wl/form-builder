import { boolean, integer, pgTable, primaryKey, text, timestamp, varchar } from "drizzle-orm/pg-core"

export const usersTable = pgTable("users", {
  id: integer('user_id').primaryKey().generatedAlwaysAsIdentity().unique(),
  name: text('user_name').default(''),
  isBlocked: boolean("is_blocked").default(false),
  clerkId: varchar({length: 255}).unique(),
  email: varchar('user_email', { length: 255 }).notNull().unique(),
  permission: varchar('user_permission', {length: 50}).notNull().default('user'),
  createdAt: timestamp("created_at").defaultNow(),
})

export const formsTable = pgTable("forms", {
  id: integer("form_id").primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(), 
  description: text().notNull(),
  userId: varchar('clerk_id', { length: 255 })
  .notNull()
  .references(() => usersTable.clerkId,  { onDelete: "cascade" }),
  views: integer("views").default(0),
  images: text("images").default(""),
  category: varchar('category', { length: 255 }).default(""),
  createdAt: timestamp("created_at").defaultNow(),
})

export const formPermissionsTable = pgTable("form_permissions", {
  formId: integer('form_id').notNull().references(() => formsTable.id, {onDelete:'cascade'}),
  userId: varchar('clerk_id', { length: 255 })
  .notNull()
  .references(() => usersTable.clerkId,  {onDelete:'cascade'}),
}, (table) =>  [
  primaryKey({ columns: [table.formId, table.userId] })
]);

export const formCommentsTable = pgTable("form_comments", {
  formCommentId: integer().primaryKey().generatedAlwaysAsIdentity(),
  formId: integer('form_id').notNull().references(() => formsTable.id, {onDelete:'cascade'}),
  userId: varchar('clerk_id', { length: 255 })
  .notNull()
  .references(() => usersTable.clerkId,   {onDelete:'cascade'}),
  createdAt: timestamp("created_at").defaultNow(),
})


export const questionsTable = pgTable("questions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  formId: integer("form_id").notNull()
    .references(() => formsTable.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 500 }).notNull(),
  isRequired: boolean("is_required").default(false),
  type: text("type").notNull(),
  image: text('user_image').default(''),
})

export const questionOptionsTable = pgTable("question_options", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  questionId: integer("question_id").notNull()
    .references(() => questionsTable.id, { onDelete: "cascade" }),
  value: varchar("value", { length: 255 }).notNull(),
});

export const answersTable = pgTable("answers", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  submissionId: integer("submission_id")
    .notNull()
    .references(() => formSubmissionsTable.id, { onDelete: "cascade" }), 
  formId: integer("form_id")
    .notNull()
    .references(() => formsTable.id, { onDelete: "cascade" }),
  questionId: integer("question_id").notNull()
    .references(() => questionsTable.id, { onDelete: "cascade" }),
  userId: varchar('clerk_id', { length: 255 })
    .notNull()
    .references(() => usersTable.clerkId,  { onDelete: "cascade" }),
  answerText: text("answer_text").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow(),
})

export const formSubmissionsTable = pgTable("form_submissions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  formId: integer("form_id").notNull().references(() => formsTable.id, { onDelete: "cascade" }),
  userId: varchar("clerk_id", {length: 255}).notNull().references(() => usersTable.clerkId),
  submittedAt: timestamp("submitted_at").defaultNow(),
})

export const hashtags = pgTable('hashtags', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', {length: 255}).unique(),
  count: integer('count').default(1),
});

export const formHashtags = pgTable('form_hashtags', {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  formId: integer('form_id').references(() => formsTable.id),
  hashtagId: integer('hashtag_id').references(() => hashtags.id),
});