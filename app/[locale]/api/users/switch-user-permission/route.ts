import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    console.log(body)
    const { userIds, permission } = body as {
      userIds: number[];
      permission: "admin" | "user";
    };

    if (!userIds || userIds.length === 0 || !["admin", "user"].includes(permission)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await db
      .update(usersTable)
      .set({ permission })
      .where(inArray(usersTable.id, userIds))

    return NextResponse.json({ message: "Permissions updated" }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
