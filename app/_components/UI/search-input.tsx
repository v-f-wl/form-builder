import { useTranslations } from "next-intl";

const SearchInput = () => {
  const t  = useTranslations()

  return ( 
    <div className="input-group">
      <input type="text" className="form-control" placeholder={t('header.searchInputPlaceholder')} aria-label={t('header.searchInputPlaceholder')} aria-describedby="button-addon2"/>
      <button className="btn btn-outline-secondary" type="button" id="button-addon2">{t('ui.search')}</button>
    </div>
   );
}
 
export default SearchInput;