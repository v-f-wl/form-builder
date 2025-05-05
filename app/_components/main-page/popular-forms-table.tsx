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
  if(isLoading){
    return <Skeleton count={5}/>
  }
  if(!data){
    return null
  }
  if(error && !data){
    return <CrashMessage onClick={() => {}}/>
  }
  if(data.length === 0){
    return (
      <div className="">Forms doesnt exist</div>
    )
  }
  return (  
    <div className="">
      {data.map((form, index) => (
        <Link key={`popularForms-${form.id}`} href={`/form/${form.id}`} className="grid-table gap-2 pb-2">
          <div>
            {index + 1}
          </div>
          <div>
            {form.user?.name}
          </div>
          <div>
            {form.title}
          </div>
        
          <div className="d-none d-sm-block">
            {t(`formCategories.${form.category}`, { defaultValue: 'Unknown category' })}
          </div>
    
          <div className="d-none d-md-flex gap-1 w-25">
          {form.hashtags.length > 0 ? (
              <>
                {form.hashtags.slice(0, 3).map((item) => (
                  <div key={item} className="badge text-bg-primary">#{item}</div>
                ))}
                {form.hashtags.length > 3 && (
                  <div
                    className="badge text-bg-secondary"
                    title={form.hashtags.slice(3).join(', ')}
                  >
                    +{form.hashtags.length - 3}
                  </div>
                )}
              </>
            ) : (
              <div>-</div>
            )}
          </div>
    
          <div className='text-end'>{format(new Date(form.createdAt), 'dd.MM.yyyy')}</div>
        </Link>
      ))}
    </div>
  
  );
}
 
export default PopularFormsData;