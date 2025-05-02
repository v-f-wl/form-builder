import { useTranslations } from "next-intl";

const FormRules = () => {
  const t = useTranslations('formCreationNotice');
  return ( 
    <div className="mb-4 alert alert-warning" role="alert">
      <h5 className="alert-heading">{t('heading')}</h5>
      <ul className="mb-0">
        <li>{t('requirements.titleAndDescription') }</li>
        <li>{t('requirements.requiredQuestion') }</li>
        <li>{t('requirements.untitledQuestions') }</li>
        <li>{t('requirements.selectOneOptions') }</li>
        <li>{t('requirements.emptyOptionsRemoved') }</li>
      </ul>
    </div>
  );
}
export default FormRules;