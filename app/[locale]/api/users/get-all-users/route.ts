import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      const [user] = await db
        .select({
          permission: usersTable.permission,
        })
        .from(usersTable)
        .where(eq(usersTable.clerkId, userId))
        .limit(1);

      if (!user || user.permission !== "admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      const searchParams = request.nextUrl.searchParams;
      const offset = searchParams.get("offset");
      const limit = 40;

      const query = db
        .select({
          id: usersTable.id,
          name: usersTable.name,
          email: usersTable.email,
          isBlocked: usersTable.isBlocked,
          permission: usersTable.permission,
          createdAt: usersTable.createdAt,
        })
        .from(usersTable)
        .limit(limit)
        .offset(Number(offset)) 

      const users = await query;

      const nextOffset = users.length === limit ? users[users.length - 1].id : null;

      return NextResponse.json({ users, nextOffset }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }catch(error){
    console.log(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
