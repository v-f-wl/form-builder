import QuestionsContainer from "../../../_components/fill-form/questions-container";

export default async function FillForm({
  params,
}: {
  params: Promise<{ formId: string }>
}) {
  const { formId } = await params
  return(
    <div className="container">
      <div className="w-50 mx-auto">
        <QuestionsContainer formId={formId}/>
      </div>
    </div>
  )
}