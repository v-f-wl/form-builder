import { db } from "@/db";
import { formsTable, usersTable } from "@/db/schema";
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
        user: {
          name: usersTable.name,
        },
      })
      .from(formsTable)
      .leftJoin(usersTable, eq(formsTable.userId, usersTable.clerkId))
      .where(eq(formsTable.id, Number(formId)))
      .limit(1);

    const item = result[0];

    if (!item) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    const resolvedUserName =
      item.userName && item.userName.trim() !== "" ? item.userName : item.userEmail;

    const formWithUserName = {
      ...item.form,
      userName: resolvedUserName,
    };

    return NextResponse.json({ form: formWithUserName }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
