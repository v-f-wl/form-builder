import Title from "@/app/_components/UI/title";
import { useTranslations } from "next-intl";
import PopularFormsData from "./popular-forms-table";

const PopulatSection = () => {
  const t = useTranslations()
  return ( 
    <div className="mt-4  p-3">
      <div className="container">
        <Title label={t('homePage.popularForms')}/>
        <div className="mt-4">
        <PopularFormsData/>
      </div>
      </div>
    </div>
  )
}
 
export default PopulatSection;