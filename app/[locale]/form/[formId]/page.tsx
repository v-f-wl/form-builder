import FormContainer from "../../../_components/form-preview/form-container";

export default async function HomePage({
  params,
}: {
  params: Promise<{ formId: string }>
}) {
  const { formId } = await params
  return(
    <div className="">
      <FormContainer formId={formId}/>
    </div>
  )
}