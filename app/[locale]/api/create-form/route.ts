import { db } from "@/db";
import { formsTable, questionOptionsTable, questionsTable } from "@/db/schema";
import {  QuestionType } from "@/types";

type IncomingQuestion = {
  id: string;
  title: string;
  typeOfAnswer: QuestionType; 
  answersList: { id: string; value: string }[];
  required: boolean;
};


export async function POST(req: Request) {
  const body = await req.json()
  const { title, description, questions, userId } = body as {
    title: string;
    description: string;
    questions: IncomingQuestion[];
    userId: string;
  };

  const [form] = await db
    .insert(formsTable)
    .values({ title, description, userId })
    .returning({ id: formsTable.id });

  const formId = form.id;

  for (const question of questions) {
    const [questionRecord] = await db
      .insert(questionsTable)
      .values({
        formId,
        title: question.title,
        isRequired: question.required,
        type: question.typeOfAnswer as QuestionType,
      })
      .returning({ id: questionsTable.id });

    const questionId = questionRecord.id;

    if (question.typeOfAnswer === 'select_one') {
      const optionsToInsert = question.answersList.map((answer) => ({
        questionId,
        value: answer.value,
      }));
      await db.insert(questionOptionsTable).values(optionsToInsert);
    }
  }

  return new Response(JSON.stringify({ message: "Form created", formId }), {
    status: 201,
  });

}