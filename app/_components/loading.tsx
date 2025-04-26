import { useTranslations } from "next-intl";

const Loading = () => {
  const t = useTranslations()
  return ( 
    <div className="mx-auto mt-4">{t('ui.loading')}...</div>
  );
}
 
export default Loading;