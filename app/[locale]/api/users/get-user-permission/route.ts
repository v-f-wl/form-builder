import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try{
    const {userId}  = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: "Missing user" }, { status: 400 });
    }

    if(!userId) return NextResponse.json({ user: 'user' }, { status: 200 })
    const user = await db
      .select({
        permission: usersTable.permission
      })
      .from(usersTable)
      .where(eq(usersTable.clerkId, userId))
      .limit(1)
    const userPermission = user[0]
    return NextResponse.json({ userPermission }, { status: 200 })
  }catch(error){
    console.log(error)
    return NextResponse.json({ error }, { status: 500 });
  }
}