'use client'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Logo from "./UI/logo";
import SearchInput from "./UI/search-input";
import LanguageSwitch from "./UI/language-switch";
import { useTranslations } from "next-intl";
import { ThemeSwitcher } from "./UI/theme-switch";
import IProfile from "./icons/profile-icon";
import HeaderCreateFormBtn from "./UI/header-create-form-btn";

const Haeader = () => {
  const t = useTranslations()
  return ( 
    <div className="container mt-4">
      <div className="row align-items-center">
        <div className="col-2">
          <Logo/>
        </div>
        <div className="col d-flex">
          <SearchInput/>
        </div>
        <div className="col d-flex justify-content-end gap-3">
          <LanguageSwitch/>
          <ThemeSwitcher/>
          <HeaderCreateFormBtn/>
          <div className="d-flex gap-3 align-items-center justify-content-end">
            <SignedOut>
              <SignInButton>
                <button className="btn btn-primary">
                  {t('header.signIn')}
                </button>
              </SignInButton>
              <SignUpButton>
              <button className="btn btn-outline-primary">
                  {t('header.signUp')}
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Link
                  label='Profile'
                  labelIcon={<IProfile />}
                  href="/profile"
                />
              </UserButton.MenuItems>
            </UserButton>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  )
}
 
export default Haeader;