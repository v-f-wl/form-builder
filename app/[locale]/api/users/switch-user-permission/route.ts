import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { userId } = await auth()

    const { userIds, permission } = body as {
      userIds: number[];
      permission: "admin" | "user";
    }

    if(!userId) return NextResponse.json({ user: 'viewer' }, { status: 200 })

    if (!userIds || userIds.length === 0 || !["admin", "user"].includes(permission)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const currentUser = await db
      .select({
        permission: usersTable.permission
      })
      .from(usersTable)
      .where(eq(usersTable.clerkId, userId))
      .limit(1)

    const userPermission = currentUser[0]
    const isAdmin = userPermission.permission === 'admin'

    if(!isAdmin){
      return NextResponse.json({ error: "You have no access" }, { status: 400 });
    }
    await db
      .update(usersTable)
      .set({ permission })
      .where(inArray(usersTable.id, userIds))

    const allUsers = await db.select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      permission: usersTable.permission,
      createdAt: usersTable.createdAt,
    }).from(usersTable)

    const [currentUserAfter] = await db
      .select({ permission: usersTable.permission })
      .from(usersTable)
      .where(eq(usersTable.clerkId, userId))
      .limit(1);

    const isAdminAfter = currentUserAfter?.permission === "admin";

    return NextResponse.json({ 
      message: "Permissions updated", 
      usersList: allUsers,
      isAdmin: isAdminAfter
    }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
