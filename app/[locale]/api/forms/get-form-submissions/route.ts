import { db } from '@/db';
import { formSubmissionsTable, formsTable, usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server'; 
import { NextResponse } from 'next/server';

export async function GET() {
  try{
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  
    const submissions = await db
      .select({
        formId: formsTable.id,
        formTitle: formsTable.title,
        authorName: usersTable.name,
        submittedAt: formSubmissionsTable.submittedAt,
      })
      .from(formSubmissionsTable)
      .innerJoin(formsTable, eq(formSubmissionsTable.formId, formsTable.id))
      .innerJoin(usersTable, eq(formsTable.userId, usersTable.clerkId))
      .where(eq(formSubmissionsTable.userId, userId))
      .orderBy(formSubmissionsTable.submittedAt);
    return NextResponse.json({ submissions }, { status: 200 });
  }catch(error){
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
