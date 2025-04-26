// lib/getUserRole.ts
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { useAuth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

export async function getUserRole() {
  const { userId, } = useAuth()
  if(!userId) return 'user'
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerkId, userId))
    .limit(1)
    .then((res) => res[0]);

  return user?.permission ?? "user";
}
