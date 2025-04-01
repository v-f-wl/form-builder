'use client'

import { FormTabsType } from "@/types";
import { useState } from "react";

const FormTabs = () => {
  const [activeTab, setActiveTab] = useState<FormTabsType>('preview')
  return (  
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <button 
          onClick={() =>setActiveTab('preview')}
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
          onClick={() =>setActiveTab('settings')}
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
          onClick={() =>setActiveTab('statistics')}
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