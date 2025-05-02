'use client'
import Logo from "./UI/logo";
import SearchInput from "./UI/search-input";
import LanguageSwitch from "./UI/language-switch";
import { ThemeSwitcher } from "./UI/theme-switch";
import HeaderCreateFormBtn from "./UI/header-create-form-btn";
import AuthButtons from "./UI/auth-buttons";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-md  px-4 py-3">
      <Logo />
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse mt-2 mt-md-0 ms-3" id="navbarContent">
        <div className="d-md-none mb-2">
          {/* <SearchInput /> */}
        </div>

        <ul className="navbar-nav me-auto d-none d-md-flex w-50">
          <li className="nav-item w-100">
            {/* <SearchInput /> */}
          </li>
        </ul>

        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-2 ms-md-auto">
          <LanguageSwitch />
          <ThemeSwitcher />
          <HeaderCreateFormBtn />
          <AuthButtons />
        </div>
      </div>
    </nav>
  );
};
 
export default Header;