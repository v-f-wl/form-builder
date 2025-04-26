import { db } from "@/db";
import { answersTable, formSubmissionsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    if (!body || !Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const formId = body[0]?.formId;
    if (!formId) {
      return NextResponse.json({ error: "Form ID missing" }, { status: 400 });
    }

    const [submission] = await db.insert(formSubmissionsTable)
      .values({
        formId,
        userId,
      })
      .returning({ id: formSubmissionsTable.id });

    const formattedAnswers = body.map((ans) => ({
      submissionId: submission.id,
      questionId: Number(ans.id),
      userId: userId,
      answerText: ans.value,
      formId: formId,
    }));

    await db.insert(answersTable).values(formattedAnswers);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting answers:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
