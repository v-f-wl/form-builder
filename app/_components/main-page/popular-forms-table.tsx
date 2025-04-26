'use client'
import useSWR from 'swr'
import CrashMessage from "@/app/_components/crash-message";
import Axios  from "axios";
import Link from "next/link";
import Loading from '@/app/_components/loading';
import { format } from 'date-fns'
import { ResponseFormData } from '@/types';
import Skeleton from '@/app/_components/UI/skeleton';
import { useTranslations } from 'next-intl';

const fetcher = (url: string) => Axios.get(url).then(res => res.data.result)
const PopularFormsData = () => {
  const t = useTranslations()
  const { data, error, isLoading } = useSWR<ResponseFormData[]>(`api/forms/popular-forms`, fetcher, {
    errorRetryCount: 3,    
    errorRetryInterval: 1000
  });
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
          <div className="">{index + 1}</div>
          <div className="">{form.user?.name}</div>
          <div className="">{form.title}</div>
          <div className="">
            {t(`formCategories.${form.category}`, { defaultValue: 'Unknown category' })}
          </div>
          <div className="">tags</div>
          <div className="">
            {format(new Date(form.createdAt), 'dd.MM.yyyy')}
          </div>
        </Link>
      ))}
    </div>
  );
}
 
export default PopularFormsData;