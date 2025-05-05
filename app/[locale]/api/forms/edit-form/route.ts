import { db } from "@/db";
import { formsTable, questionsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

type IncomingQuestion = {
  id: number;
  title: string;
  required: boolean;
};

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { formId, title, description, questions } = body as {
      formId: number;
      title: string;
      description: string;
      questions: IncomingQuestion[];
    };

    await db
      .update(formsTable)
      .set({ title, description })
      .where(eq(formsTable.id, formId));

    for (const question of questions) {
      await db
        .update(questionsTable)
        .set({
          title: question.title,
          isRequired: question.required,
        })
        .where(eq(questionsTable.id, question.id));
    }

    return NextResponse.json({ formId: formId }, {status: 200})
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
