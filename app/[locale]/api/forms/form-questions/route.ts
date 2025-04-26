import { db } from "@/db";
import { formsTable, questionOptionsTable, questionsTable } from "@/db/schema";
import { QuestionFormType, QuestionType } from "@/types";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
) {
  try{
    const searchParams = request.nextUrl.searchParams
    const formId = searchParams.get('formId')

    const raw = await db
      .select({
        id: questionsTable.id,
        title: questionsTable.title,
        type: questionsTable.type,
        isRequired: questionsTable.isRequired,
        optionId: questionOptionsTable.id,
        optionValue: questionOptionsTable.value
      })
      .from(questionsTable)
      .leftJoin(
        questionOptionsTable,
        eq(questionsTable.id, questionOptionsTable.questionId)
      )
      .where(eq(questionsTable.formId, Number(formId)));
  
    const questionMap = new Map<number, QuestionFormType>();
  
    for (const row of raw) {
      const questionId = row.id;
  
      if (!questionMap.has(questionId)) {
        questionMap.set(questionId, {
          id: String(questionId),
          title: row.title,
          typeOfAnswer: row.type as QuestionType,
          required: row.isRequired ?? false,
          answersList:[]
        });
      }
  
      if (row.optionId && row.optionValue) {
        questionMap.get(questionId)!.answersList.push({
          id: String(row.optionId),
          value: row.optionValue
        });
      }
    }
  
    const questions = Array.from(questionMap.values());
    return NextResponse.json({ questions: questions }, { status: 200 });
  }catch(error){
    // todo: добавить ошибку 
  }
}