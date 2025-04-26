import { db } from "@/db";
import { formsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const formId = Number(searchParams.get("formId"))
  if (isNaN(formId)) {
    return NextResponse.json({ error: "Invalid formId" }, { status: 400 });
  }

  try {
    const [row] = await db
      .select({ userId: formsTable.userId })
      .from(formsTable)
      .where(eq(formsTable.id, formId))
      .limit(1);

    if (!row) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }
    return NextResponse.json({ authorId: row.userId }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
