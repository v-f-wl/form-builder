import { useTranslations } from "next-intl";
import Link from "next/link";

const CompletedForm = () => {
  const t =useTranslations()
  return ( 
    <div className="container d-flex flex-column justify-content-center align-items-center py-5">
      <h1 className="text-center mb-2">{t('ui.answerAccepted')}</h1>
      <p className="text-center text-muted mb-4">
        {t('ui.thankYou')}
      </p>
      <div className="d-flex gap-3">
        <Link href="/" className="btn btn-primary text-light">
          {t('ui.goHome')}
        </Link>
        <Link href="/profile" className="btn btn-outline-secondary">
          {t('ui.goToProfile')}
        </Link>
      </div>
    </div>
  )

}
 
export default CompletedForm;