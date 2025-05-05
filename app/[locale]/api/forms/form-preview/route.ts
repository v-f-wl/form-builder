import { db } from "@/db";
import { formHashtags, formsTable, hashtags, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const formId = searchParams.get("formId");

    if (!formId) {
      return NextResponse.json({ error: "Missing formId" }, { status: 400 });
    }

    const result = await db
      .select({
        form: formsTable,
        userName: usersTable.name,
        userEmail: usersTable.email,
        hashtagName: hashtags.name,
      })
      .from(formsTable)
      .leftJoin(usersTable, eq(formsTable.userId, usersTable.clerkId))
      .leftJoin(formHashtags, eq(formsTable.id, formHashtags.formId))
      .leftJoin(hashtags, eq(formHashtags.hashtagId, hashtags.id))
      .where(eq(formsTable.id, Number(formId)));

    if (result.length === 0) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    const formBase = result[0].form;
    const resolvedUserName = result[0].userName?.trim() || result[0].userEmail;

    const hashtagsArray = result
      .map(row => row.hashtagName)
      .filter((tag): tag is string => !!tag);

    const formWithUserNameAndHashtags = {
      ...formBase,
      userName: resolvedUserName,
      hashtags: hashtagsArray,
    };


    return NextResponse.json({ form: formWithUserNameAndHashtags }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
