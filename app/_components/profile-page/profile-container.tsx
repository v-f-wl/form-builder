'use client'
import { useEffect, useMemo, useState } from "react";
import FormTabs from "../form-preview/form-tabs";
import CreatedFormsTable from "./created-forms-table";
import CompletedFormsList from "./completed-forms-list";
import UsersTable from "./users-table";
import { usePermission } from "@/app/context/permission-context";
import { useRouter } from "next/navigation";

const ProfileContainer = () => {
  const [activeTab, setActiveTab] = useState('createdByMe')
  const { userPermission, isLoadingPermission } = usePermission()

  const handleChangeValue = (value: string) => {
    setActiveTab(prev => value)
  }

  const USER_TABS = ['createdByMe', 'сompletedForms']
  const ADMIN_TABS = ['createdByMe', 'сompletedForms', 'users']

  const options = useMemo(() => {
    if (isLoadingPermission) return []
    return userPermission === 'user' ? USER_TABS : ADMIN_TABS
  }, [isLoadingPermission, userPermission])

  const ActiveTab = useMemo(() => {
    switch (activeTab) {
      case "createdByMe":
        return <CreatedFormsTable/>
      case "сompletedForms":
        return <CompletedFormsList/>
      case "users":
        return <UsersTable/>
      default:
        return <div className="text-red-500">Unknown tab:</div>;
  }},[activeTab, userPermission])

  if (isLoadingPermission) {
    return <div className="text-muted">Loading...</div>
  }
  return ( 
    <div className="">
      <FormTabs 
        changeTab={handleChangeValue} 
        activeTab={activeTab} 
        tabsList={options}
      />
      {ActiveTab}
    </div>
  )
}
 
export default ProfileContainer;
