'use client'
import { useLocale } from "@/app/context/locale-context";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Button from "./button";
import { useAuth } from "@clerk/nextjs";

const HeaderCreateFormBtn = () => {
  const t = useTranslations()
  const locale = useLocale()
  const route = useRouter()
  const pathname = usePathname()
  const { userId } = useAuth()
  if(!userId || pathname === `/${locale}/create-form`) return
  return ( 
    <Button label={t('formBuilder.createForm')} onClick={() => route.push('/create-form')} style='primary'/>
  )
}
 
export default HeaderCreateFormBtn;