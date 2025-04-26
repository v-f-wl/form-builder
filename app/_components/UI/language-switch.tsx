'use client'
import { useLocale } from "@/app/context/locale-context";
import { usePathname, useRouter } from "next/navigation";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ILanguage from "../icons/language-icon";

const LanguageSwitch = () => {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const switchLocale = (nextLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = nextLocale
    const newPath = segments.join('/')
    router.push(newPath)
  };
  return ( 
    <div className="dropdown">
      <button
        className="btn btn-light dropdown-toggle d-flex align-items-center"
        type="button"
        id="languageDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <ILanguage/>
      </button>

      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
        <li>
          <button className={`dropdown-item ${locale === 'en' ? 'active' : ''}`} onClick={() => switchLocale('en')}>
            English
          </button>
        </li>
        <li>
          <button className={`dropdown-item ${locale === 'ru' ? 'active' : ''}`} onClick={() => switchLocale('ru')}>
            Русский
          </button>
        </li>
      </ul>
    </div>
  )
}
 
export default LanguageSwitch;