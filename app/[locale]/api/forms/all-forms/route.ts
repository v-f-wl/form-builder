import { db } from "@/db";
import { formsTable, usersTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try{
    const result = await db.select({
      id: formsTable.id,
      title: formsTable.title,
      description: formsTable.description,
      createdAt: formsTable.createdAt,
      user: {
        name: usersTable.name,
      },
    })
    .from(formsTable)
    .innerJoin(usersTable, eq(formsTable.userId, usersTable.clerkId))
    .orderBy(desc(formsTable.createdAt))
    .limit(40)
    .offset(0)
    return NextResponse.json({ result }, { status: 200 })
  }catch(error){
    return NextResponse.json({ error }, { status: 500 });
  }
}