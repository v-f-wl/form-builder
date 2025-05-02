'use client'
import useSWR from 'swr'
import CrashMessage from "@/app/_components/crash-message";
import Axios  from "axios";
import Link from "next/link";
import { format } from 'date-fns'
import { ResponseFormData } from '@/types';
import Skeleton from '@/app/_components/UI/skeleton';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

const fetcher = (url: string) => Axios.get(url).then(res => res.data.result)
const PopularFormsData = () => {
  const t = useTranslations()
  const { data, error, isLoading } = useSWR<ResponseFormData[]>(`api/forms/popular-forms`, fetcher, {
    errorRetryCount: 3,    
    errorRetryInterval: 1000
  });
  useEffect(() => {console.log(data)},[data])
  if(isLoading){
    return <Skeleton count={5}/>
  }
  if(!data){
    return null
  }
  if(error){
    return <CrashMessage onClick={() => {}}/>
  }
  return (  
    <div className="">
    {data.map((form, index) => (
      <Link key={`popularForms-${form.id}`} href={`/form/${form.id}`} className="grid-table">
        <div>{index + 1}</div>
        <div>{form.user?.name}</div>
        <div>{form.title}</div>
        
        {/* Категория – скроется на sm */}
        <div className="d-none d-sm-block">
          {t(`formCategories.${form.category}`, { defaultValue: 'Unknown category' })}
        </div>
  
        {/* Теги – скроются на md */}
        <div className="d-none d-md-block">tag</div>
  
        <div>{format(new Date(form.createdAt), 'dd.MM.yyyy')}</div>
      </Link>
    ))}
  </div>
  
  );
}
 
export default PopularFormsData;