'use client'
import CrashMessage from "@/app/_components/crash-message";
import Loading from "@/app/_components/loading";
import { useLocale } from "@/app/context/locale-context";
import { ResponseFormData } from "@/types";
import Axios  from "axios";
import { useTranslations } from "next-intl";
import { format } from 'date-fns'
import Link from "next/link";
import { useEffect } from "react";
import useSWR from "swr";

interface FormPreviewProps{
  formId: string
}

const fetcher = (url: string) => Axios.get(url).then(res => res.data.form)
const FormPreview = ({formId}: FormPreviewProps) => {
  const t = useTranslations()
  const locale = useLocale()
  const { data, error, isLoading } = useSWR<ResponseFormData>(`/${locale}/api/forms/form-preview?formId=${formId}`, fetcher, {
    errorRetryCount: 3,    
    errorRetryInterval: 1000
  });
  useEffect(() => {console.log(data)},[data])
  if(isLoading) return <Loading/>
  if(error) return <CrashMessage onClick={() => {}}/>
  if(!data) return <div className="">Test doesnt exist</div>
  return ( 
    <div className="mt-4 row">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title">{data.title}</h2>
          <p className="card-text text-muted">{data.description}</p>
          <div className="w-50 d-flex flex-wrap gap-2">
            {data.hashtags.length > 0 && data.hashtags.map(item => (
              <div key={item} className="badge text-bg-primary">#{item}</div>
            ))}
          </div>
          <small className="mt-2 d-block">{t(`formCategories.${data.category}`, { defaultValue: 'Unknown category' })}</small>
          <div className="mt-2 d-flex justify-content-between">
            <small className="text-muted">Создано: {format(new Date(data.createdAt), 'dd.MM.yyyy')}</small>
            <small className="text-muted">Пользователь: {data.userName}</small>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Link className="btn btn-lg btn-primary text-white" href={`/${locale}/fill-form/${data.id}`}>{t('ui.start')}</Link>

      </div>
    </div>
  )
}
 
export default FormPreview;