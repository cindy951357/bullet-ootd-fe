import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MenuWithSubMenu from "./MenuWithSubMenu";

function Header() {
  const { t } = useTranslation();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <header id="header" className="bg-primary text-white p-4 flex relative justify-between">
      <h1 id="website-title" className="flex justify-center items-center font-primary text-xl sm:text-lg
        font-bold text-center text-on-primary">
        <img src="/icon-hanger.svg" className="w-10"></img>
        {t('WebTitle')}
        <img src="/icon-hanger.svg" className="w-10"></img>
      </h1>

      <MenuWithSubMenu />

      <div id="btn-group-header" className="h-full">
        {isLoggedIn ? (
          <button id="btn-logout" onClick={() => setIsLoggedIn(false)}
            className="btn-header"
          >{t('Logout')}</button>
        ) : (
          <div id="btns-is-logged-out" className="flex h-full items-center">
            <Link to="/login" className="btn-header mr-2 p-2">{t('Login')}</Link>
            <Link to="/register" className="btn-header p-2">{t('Register')}</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
