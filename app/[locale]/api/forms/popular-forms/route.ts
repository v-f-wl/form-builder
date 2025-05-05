import { db } from "@/db";
import { formHashtags, formsTable, formSubmissionsTable, hashtags, usersTable } from "@/db/schema";
import { desc, eq, inArray, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const topForms = await db
      .select({
        formId: formsTable.id,
        submissionCount: sql<number>`COUNT(${formSubmissionsTable.id})`.as("submissionCount"),
      })
      .from(formsTable)
      .innerJoin(formSubmissionsTable, eq(formsTable.id, formSubmissionsTable.formId))
      .groupBy(formsTable.id)
      .orderBy(desc(sql<number>`COUNT(${formSubmissionsTable.id})`))
      .limit(5);

    const topFormIds = topForms.map((f) => f.formId);

    if (topFormIds.length === 0) {
      return NextResponse.json({ result: [] }, { status: 200 });
    }

    const rawResult = await db
      .select({
        id: formsTable.id,
        title: formsTable.title,
        description: formsTable.description,
        createdAt: formsTable.createdAt,
        category: formsTable.category,
        user: {
          name: usersTable.name,
        },
        hashtagName: hashtags.name,
      })
      .from(formsTable)
      .innerJoin(usersTable, eq(formsTable.userId, usersTable.clerkId))
      .leftJoin(formHashtags, eq(formsTable.id, formHashtags.formId))
      .leftJoin(hashtags, eq(formHashtags.hashtagId, hashtags.id))
      .where(inArray(formsTable.id, topFormIds));

    const formsMap = new Map<number, any>();

    for (const row of rawResult) {
      const formId = row.id;

      if (!formsMap.has(formId)) {
        formsMap.set(formId, {
          id: formId,
          title: row.title,
          description: row.description,
          createdAt: row.createdAt,
          category: row.category,
          user: {
            name: row.user.name,
          },
          hashtags: [],
        });
      }

      if (row.hashtagName && !formsMap.get(formId).hashtags.includes(row.hashtagName)) {
        formsMap.get(formId).hashtags.push(row.hashtagName);
      }
    }

    const result = Array.from(formsMap.values());

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
