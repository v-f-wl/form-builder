'use client'
import { useLocale } from "@/app/context/locale-context";
import { useMemo, useState } from "react";
import FormPreview from "./form-preview";
import FormSettings from "./form-settings";
import FormTabs from "./form-tabs";
import { usePermission } from "@/hooks/user/usePermission";
import Loading from "../loading";
import FormResultViewer from "./form-statistics";
import { useIsAuthor } from "@/hooks/user/useIsAuthor";

const FormContainer = ({formId}: {formId: string}) => {
  const locale = useLocale()

  if(!locale) {
    return(
      <div className="">Locale not found, please reload page</div>
    )
  }
  if(!formId) return
  const [activeTab, setActiveTab] = useState('preview')
  const { userPermission, isLoadedPermission } = usePermission()
  const { isAuthor, isLoaded: isLoadedAuthor, error } = useIsAuthor(formId)
  const handleChangeActiveTab = (value: string) => {
    setActiveTab(prev => value)
  } 

  const ActiveTab = useMemo(() => {
    switch (activeTab) {
      case "preview":
        return <FormPreview formId={formId}/>
      case "settings":
        return <FormSettings formId={formId}/>
      case "statistics":
      default:
        return <FormResultViewer/>
  }},[activeTab])

  const tabsList = useMemo(() => {
    const tabs = ["preview"] as string[]
    if (userPermission == "admin" || isAuthor) {
      tabs.push("settings")
      tabs.push("statistics")
    }
    return tabs
  }, [userPermission, isAuthor])

  

  const isReady = isLoadedPermission && isLoadedAuthor
  if (!isReady) {
    return (
      <div className="container mt-4">
        <Loading />
      </div>
    )
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