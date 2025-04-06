'use client'
import { useLocale } from "@/app/context/locale-context";
import FormTabs from "./form-tabs";
import FormDetails from "./form-details";
import FormSettings from "./form-settings";
import { useMemo, useState } from "react";
import { FormTabsType } from "@/types";

const FormContainer = () => {
  const locale = useLocale()
  if(!locale) {
    return(
      <div className="">Locale not found, please reload page</div>
    )
  }
  const [activeTab, setActiveTab] = useState<FormTabsType>('preview')
  const handleChangeActiveTab = (value: FormTabsType) => {
    setActiveTab(prev => value)
  } 
  const ActiveTab = useMemo(() => {
      switch (activeTab) {
        case "preview":
          return <FormDetails locale={locale}/>
        case "settings":
          return <FormSettings />
        case "statistics":
          // return <CheckboxAnswer id={id}/>
        default:
          return <div className="text-red-500">Unknown tab:</div>;
      }
    },[activeTab])
  return (  
    <div className="container mt-4">
      <FormTabs changeTab={handleChangeActiveTab} activeTab={activeTab}/>
      {ActiveTab}
    </div>
  );
}
 
export default FormContainer;