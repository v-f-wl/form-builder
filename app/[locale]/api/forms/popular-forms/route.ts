import { db } from "@/db";
import { formsTable, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try{
    const result = await db.select({
      id: formsTable.id,
      title: formsTable.title,
      description: formsTable.description,
      createdAt: formsTable.createdAt,
      category: formsTable.category,
      user: {
        name: usersTable.name,
      },
    })
    .from(formsTable)
    .innerJoin(usersTable, eq(formsTable.userId, usersTable.clerkId))
    .limit(5)
    .offset(0);
    
    return NextResponse.json({ result }, { status: 200 });
  }catch(error){
    return NextResponse.json({ error }, { status: 500 });
  }
}