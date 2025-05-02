'use client'
import { useLocale } from "@/app/context/locale-context";
import { useEffect, useMemo, useState } from "react";
import FormPreview from "./form-preview";
import FormSettings from "./form-settings";
import FormTabs from "./form-tabs";
import Loading from "../loading";
import FormResultViewer from "./form-submissions-viewer";
import { useIsAuthor } from "@/hooks/user/useIsAuthor";
import { usePermission } from "@/app/context/permission-context";
import FormSubmissionsViewer from "./form-submissions-viewer";

const FormContainer = ({formId}: {formId: string}) => {
  const locale = useLocale()

  if(!locale) {
    return(
      <div className="">Locale not found, please reload page</div>
    )
  }
  if(!formId) return
  const [activeTab, setActiveTab] = useState('preview')
  const { userPermission, isLoadingPermission } = usePermission()
  const { isAuthor, isLoaded: isLoadedAuthor } = useIsAuthor(formId)

  const ActiveTab = useMemo(() => {
    switch (activeTab) {
      case "preview":
        return <FormPreview formId={formId}/>
      case "settings":
        return <FormSettings formId={formId}/>
      case "statistics":
      default:
        return <FormSubmissionsViewer formId={formId}/>
  }},[activeTab])

  const tabsList = useMemo(() => {
    if (userPermission !== 'admin' && !isAuthor) return ['preview']
    const tabs = ["preview"] as string[];
    if (userPermission === "admin" || isAuthor) {
      tabs.push("settings");
      tabs.push("statistics");
    }
    return tabs;
  }, [ userPermission, isLoadingPermission, isLoadedAuthor, isAuthor]);

  const handleChangeActiveTab = (value: string) => {
    setActiveTab(prev => value)
  } 
  if (!userPermission || !isLoadedAuthor) {
    return (
      <div className="container mt-4">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <FormTabs
        changeTab={handleChangeActiveTab}
        activeTab={activeTab}
        tabsList={tabsList}
      />
      {ActiveTab}
    </div>
  );
}
export default FormContainer;