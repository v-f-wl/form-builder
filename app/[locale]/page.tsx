'use client'

import { useTranslations } from "next-intl";

 
export default function HomePage() {
  const t = useTranslations('header')
  return (
    <div className="">{t('title')}</div>
  );
}

