'use client'
import { useTranslations } from "next-intl";
import PopulatSection from "./_components/popular-section";
import FormsList from "./_components/forms-list";

 
export default function Form() {
  return (
    <div className="">
      <PopulatSection/>
      <FormsList/>
    </div>
  );
}

