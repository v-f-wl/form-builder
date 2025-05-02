import { db } from "@/db";
import { formsTable, usersTable, formHashtags } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, inArray, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const {userId}  = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Missing user" }, { status: 400 });
    }
    const results = await db
      .select({
        id: formsTable.id,
        title: formsTable.title,
        description: formsTable.description,
        createdAt: formsTable.createdAt,
        category: formsTable.category,
      })
      .from(formsTable)
      .leftJoin(usersTable, eq(formsTable.userId, usersTable.clerkId))
      .where(eq(formsTable.userId, userId))

    return NextResponse.json({ results }, { status: 200 });
  }catch(error){
    return NextResponse.json({ error: "problem" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const {userId}  = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { ids } = body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "Missing or invalid ids" }, { status: 400 });
    }

    await db
      .delete(formHashtags)
      .where(
        inArray(formHashtags.formId, ids.map(Number))
      );
    await db
      .delete(formsTable)
      .where(and(
        inArray(formsTable.id, ids),
        eq(formsTable.userId, userId)
      ));

    return NextResponse.json({ message: "Forms deleted" }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}