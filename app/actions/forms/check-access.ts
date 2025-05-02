'use server'

import { db } from "@/db"
import { formsTable, formSubmissionsTable } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm"

type AccessResult = 
  | { status: 'error'; reason: 'form_not_found' }
  | { status: 'readonly'; reason: 'author_cannot_fill' | 'guest_cannot_fill' | 'already_submitted' | 'form_not_found'}
  | { status: 'editable', reason: '' }

export async function checkFormAccess(formId: string): Promise<AccessResult> {
  const { userId } = await auth();

  const form = await db.select()
    .from(formsTable)
    .where(eq(formsTable.id, Number(formId)))
    .then(res => res[0]);

  if (!form) {
    return { status: 'error', reason: 'form_not_found' }
  }

  if (userId === form.userId) {
    return { status: 'readonly', reason: 'author_cannot_fill' }
  }

  if (!userId) {
    return { status: 'readonly', reason: 'guest_cannot_fill' }
  }

  const submission = await db.select()
    .from(formSubmissionsTable)
    .where(
      and(
        eq(formSubmissionsTable.formId, Number(formId)),
        eq(formSubmissionsTable.userId, userId)
      )
    );

  if (submission.length > 0) {
    return { status: 'readonly', reason: 'already_submitted' }
  }

  return { status: 'editable', reason:'' }
}
