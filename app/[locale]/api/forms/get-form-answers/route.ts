import { db } from "@/db";
import { usersTable, formSubmissionsTable, answersTable, questionsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const formId = searchParams.get('formId');

  if (!formId) {
    return NextResponse.json({ error: "formId is required" }, { status: 400 });
  }

  try {
    const questions = await db
      .select({
        id: questionsTable.id,
        title: questionsTable.title,
        required: questionsTable.isRequired,
      })
      .from(questionsTable)
      .where(eq(questionsTable.formId, Number(formId)));

    const submissionsRaw = await db
      .select({
        submissionId: formSubmissionsTable.id,
        submittedAt: formSubmissionsTable.submittedAt,
        userName: usersTable.name,
        userEmail: usersTable.email,
        questionId: answersTable.questionId,
        answerText: answersTable.answerText,
      })
      .from(formSubmissionsTable)
      .innerJoin(usersTable, eq(formSubmissionsTable.userId, usersTable.clerkId))
      .innerJoin(answersTable, eq(formSubmissionsTable.id, answersTable.submissionId))
      .where(eq(formSubmissionsTable.formId, Number(formId)));

    const submissionMap = new Map<number, any>();

    for (const row of submissionsRaw) {
      if (!submissionMap.has(row.submissionId)) {
        submissionMap.set(row.submissionId, {
          id: row.submissionId,
          submittedBy: row.userName,
          submittedEmail: row.userEmail,
          submittedAt: row.submittedAt,
          answers: [],
        });
      }

      submissionMap.get(row.submissionId).answers.push({
        questionId: row.questionId,
        answer: row.answerText,
      });
    }
    const submissions = Array.from(submissionMap.values()).map((sub) => {
      return {
        ...sub,
        answers: questions.map((q) => {
          const foundAnswer = sub.answers.find((a: any) => a.questionId === q.id);
          return {
            id: q.id,
            title: q.title,
            required: q.required,
            answer: foundAnswer ? foundAnswer.answer : null,
          };
        }),
      };
    });

    return NextResponse.json({ submissions, questionTemplates: questions }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
