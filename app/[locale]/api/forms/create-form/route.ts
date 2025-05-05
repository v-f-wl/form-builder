import { db } from "@/db";
import { formsTable, questionOptionsTable, questionsTable, hashtags, formHashtags } from "@/db/schema";
import {  QuestionType } from "@/types";
import { eq } from "drizzle-orm";

type IncomingQuestion = {
  id: string;
  title: string;
  typeOfAnswer: QuestionType; 
  answersList: { id: string; value: string }[];
  required: boolean;
};


export async function POST(req: Request) {
  // todo: добавить try catch
  const body = await req.json()
  const { title, description, questions, userId, formCategory, hashtagsArray } = body as {
    title: string;
    description: string;
    questions: IncomingQuestion[];
    userId: string;
    formCategory: string;
    hashtagsArray: Array<string>
  };

  const [form] = await db
    .insert(formsTable)
    .values({ title, description, userId, category: formCategory })
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
  for (const tagName of hashtagsArray) {
    const [existingTag] = await db
      .select()
      .from(hashtags)
      .where(eq(hashtags.name, tagName))
      .limit(1);
  
    let hashtagId: number;
  
    if (existingTag) {
      hashtagId = existingTag.id;
      await db
        .update(hashtags)
        .set({ count: (existingTag.count ?? 0) + 1 })
        .where(eq(hashtags.id, existingTag.id))
    } else {
      const [newTag] = await db
        .insert(hashtags)
        .values({ name: tagName })
        .returning({ id: hashtags.id });
  
      hashtagId = newTag.id;
    }
    await db.insert(formHashtags).values({
      formId,
      hashtagId,
    });
  }
  
  return new Response(JSON.stringify({ message: "Form created", formId }), {
    status: 201,
  });

}