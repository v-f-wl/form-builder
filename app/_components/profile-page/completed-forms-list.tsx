'use client'

import { useLocale } from "@/app/context/locale-context";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { format } from 'date-fns'
import Link from "next/link";
import { useTranslations } from "next-intl";

type CompletedFormsType = {
  formId: string,
  formTitle: string,
  authorName: string,
  submittedAt: Date
}
const CompletedFormsList = () => {
  const locale = useLocale()
  const t = useTranslations()
  const [isLoading, setIsLoading] = useState(true)
  const [completedForms, setCompletedForms] = useState<CompletedFormsType[]>([])

  useEffect(() => {
    if(!isLoading) return
    const getCompletedForms = async() => {
      try{
        const response = await axios.get(`/${locale}/api/forms/get-form-submissions`)
        setCompletedForms(prev => response.data.submissions)
      }catch(error){
        console.log(error)
      }finally{
        setIsLoading(false)
      }
    }
    getCompletedForms()
  },[])

  if(isLoading){
    return(
      <div className="container">
        <Loading/>
      </div>
    )
  }
  if(completedForms.length == 0){
    return(
      <div className="container mt-4">
        {t('ui.noCompletedForms')}
      </div>
    )
  }
  return ( 
    <div className="mt-4 container grid-2">
      {completedForms.map(item => (
        <div 
          key={item.formId}
          className="card p-3 shadow-sm rounded"
        >
          <h5 className="mb-2 text-truncate">
            <Link href={`/form/${item.formId}`}>
              {item.formTitle}
            </Link>
          </h5>
          <div className="text-muted small d-flex justify-content-between">
            <span>Автор: {item.authorName}</span>
            <span>Пройдено: {format(new Date(item.submittedAt), 'dd.MM.yyyy')}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
 
export default CompletedFormsList;