'use client'
import Title from "@/app/_components/UI/title";
import FormCard from "./form-card";
import useSWR from "swr";
import { ResponseFormData } from "@/types";
import Axios from "axios";
import Loading from "@/app/_components/loading";
import CrashMessage from "@/app/_components/crash-message";
import { useLocale } from "@/app/context/locale-context";
import { useTranslations } from "next-intl";

const fetcher = (url: string) => Axios.get(url).then(res => res.data.result)

const FormsList = () => {
  const locale = useLocale()
  const t = useTranslations()

  const { data, error, isLoading } = useSWR<ResponseFormData[]>(`/${locale}/api/forms/all-forms`, fetcher, {
    errorRetryCount: 3,    
    errorRetryInterval: 1000
  });
  if(isLoading) return (
    <div className="container">
      <Loading/>
    </div>
  )
  if(!data) return null
  if(error) return <CrashMessage onClick={() => {}}/>
  return ( 
    <div className="mt-4 container">
      <Title label={t('homePage.allForms')}/>
      <div className="grid-container mt-4">
        {isLoading && (<Loading/>)}
        {data?.map((item, index) => (
          <FormCard 
            key={`formsCard-${index}`}
            id={item.id}
            title={item.title}
            description={item.description} 
            author="vsdfvds"
            previewUrl="https://cdn.dribbble.com/userupload/21207141/file/original-af25d78fac8dc71b312d8b0bef78c93b.jpg"
          />

        ))}
      </div> 
    </div>
  )
}
 
export default FormsList;