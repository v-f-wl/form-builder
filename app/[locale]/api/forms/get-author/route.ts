import { auth } from "@clerk/nextjs/server"; // Импортируем Clerk auth
import { db } from "@/db";
import { formsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ isAuthor: false }, { status: 200 });
  }

  const searchParams = request.nextUrl.searchParams;
  const formId = Number(searchParams.get("formId"));

  if (isNaN(formId)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const [form] = await db
      .select({ userId: formsTable.userId })
      .from(formsTable)
      .where(eq(formsTable.id, formId))
      .limit(1);

    if (!form) {
      return NextResponse.json({ isAuthor: false }, { status: 404 });
    }
    const isAuthor = form.userId === userId
    return NextResponse.json({ isAuthor  }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
