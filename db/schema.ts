import { boolean, integer, pgEnum, pgTable, primaryKey, text, timestamp, varchar } from "drizzle-orm/pg-core"


export const questionTypeEnum = pgEnum("question_type", [
  "short_text",
  "paragraph",
  "select_one",
  "number",
])

export const usersTable = pgTable("users", {
  id: integer('user_id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('user_name').notNull(),
  isBlocked: boolean("is_blocked").default(false),
  clerkId: varchar({length: 255}),
  email: varchar('user_email', { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
})

export const formsTable = pgTable("forms", {
  id: integer("form_id").primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(), 
  description: text().notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  views: integer("views").default(0),
  createdAt: timestamp("created_at").defaultNow(),
})

export const formPermissionsTable = pgTable("formPermissions", {
  formId: integer('form_id').notNull().references(() => formsTable.id, {onDelete:'cascade'}),
  userId: integer('user_id').notNull().references(() => usersTable.id,  {onDelete:'cascade'}),
}, (table) =>  [
  primaryKey({ columns: [table.formId, table.userId] })
]);

export const formCommentsTable = pgTable("formComments", {
  formCommentId: integer().primaryKey().generatedAlwaysAsIdentity(),
  formId: integer('form_id').notNull().references(() => formsTable.id, {onDelete:'cascade'}),
  userId: integer('user_id').notNull().references(() => usersTable.id,  {onDelete:'cascade'}),
  createdAt: timestamp("created_at").defaultNow(),
})

export const tagsTable = pgTable("tags", {
  id: integer("tag_id").primaryKey().generatedAlwaysAsIdentity(),
  label: varchar("label", { length: 255 }).notNull(), //todo: validation on client
})

export const formTagsTable = pgTable("form_tags", {
  formId: integer("form_id").notNull()
    .references(() => formsTable.id, { onDelete: "cascade" }),
  tagId: integer("tag_id").notNull()
    .references(() => tagsTable.id, { onDelete: "cascade" }),
}, (table) => [
  primaryKey({ columns: [table.formId, table.tagId] })
])


export const questionsTable = pgTable("questions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  formId: integer("form_id").notNull()
    .references(() => formsTable.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 500 }).notNull(),
  isRequired: boolean("is_required").default(false),
  type: questionTypeEnum("type").notNull(),
})

export const questionOptionsTable = pgTable("question_options", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  questionId: integer("question_id").notNull()
    .references(() => questionsTable.id, { onDelete: "cascade" }),
  value: varchar("value", { length: 255 }).notNull(),
});

export const answersTable = pgTable("answers", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  questionId: integer("question_id").notNull()
    .references(() => questionsTable.id, { onDelete: "cascade" }),
  userId: integer("user_id").notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  answerText: text("answer_text").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow(),
})

export const formSubmissionsTable = pgTable("form_submissions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  formId: integer("form_id").notNull().references(() => formsTable.id, { onDelete: "cascade" }),
  userId: integer("user_id").references(() => usersTable.id),
  submittedAt: timestamp("submitted_at").defaultNow(),
})