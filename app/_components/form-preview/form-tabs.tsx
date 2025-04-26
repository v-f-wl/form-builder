'use client'

import { useTranslations } from "next-intl"

const FormTabs = ({
  changeTab,
  activeTab,
  tabsList
}:{
  changeTab:(value: string) => void
  activeTab: string,
  tabsList: Array<string>
}) => {
  const t = useTranslations()
  const tabs = tabsList.map(key => ({
    key,
    title: t(`ui.${key}`),
    label: key,
  }));
  return (  
    <ul className="nav nav-tabs">
      {tabs.map(item => (
        <li key={`formTab-${item.label}`} className="nav-item">
          <button 
            onClick={() =>changeTab(item.label)}
            className={`
              ${activeTab === item.label ? 'text-primary active' : 'text-body-secondary'}
              nav-link 
            `}
          >
            {item.title}
          </button>
        </li>

      ))}
    </ul>
  );
}
 
export default FormTabs;