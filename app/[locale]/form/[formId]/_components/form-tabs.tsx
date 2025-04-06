'use client'

import { FormTabsType } from "@/types";
const FormTabs = ({
  changeTab,
  activeTab
}:{
  changeTab:(value: FormTabsType) => void
  activeTab: FormTabsType
}) => {
  return (  
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <button 
          onClick={() =>changeTab('preview')}
          className={`
            ${activeTab === 'preview' ? 'text-primary active' : 'text-body-secondary'}
            nav-link 
          `}
        >
          Preview
        </button>
      </li>
      <li className="nav-item">
        <button 
          onClick={() =>changeTab('settings')}
          className={`
            ${activeTab === 'settings' ? 'text-primary active' : 'text-body-secondary'}
            nav-link 
          `}
        >
          Settings
        </button>
      </li>
      <li className="nav-item">
        <button 
          onClick={() =>changeTab('statistics')}
          className={`
            ${activeTab === 'statistics' ? 'text-primary active' : 'text-body-secondary'}
            nav-link 
          `}
        >
          Statistics
        </button>
      </li>
    </ul>
  );
}
 
export default FormTabs;