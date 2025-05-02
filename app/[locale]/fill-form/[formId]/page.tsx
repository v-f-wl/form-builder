import { auth } from "@clerk/nextjs/server";
import QuestionsContainer from "../../../_components/fill-form/questions-container";
import { formsTable, usersTable } from "@/db/schema";
import { db } from "@/db";
import { checkFormAccess } from "@/app/actions/forms/check-access";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default async function FillForm({
  params,
}: {
  params: { formId: string }
}) {
  const { formId } = params;
  const { status, reason } = await checkFormAccess(formId)
  return(
    <div className="container my-4">
      <QuestionsContainer formId={formId} status={status} reason={reason}/>
    </div>
  )
}