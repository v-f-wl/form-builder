'use client'
import { useLocale } from "@/app/context/locale-context";
import FormTabs from "./form-tabs";
import Link from "next/link";
import FormDetails from "./form-details";
import FormSettings from "./form-settings";

const FormContainer = () => {
  const locale = useLocale()
  if(!locale) {
    return(
      <div className="">Locale not found, please reload page</div>
    )
  }
  return (  
    <div className="container mt-4">
      <FormTabs/>
      {/* <FormDetails locale={locale}/> */}
      <FormSettings/>
    </div>
  );
}
 
export default FormContainer;