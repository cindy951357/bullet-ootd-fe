import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <header id="header" className="bg-primary text-white p-4 flex relative justify-center">
      <h1 id="website-title" className="font-primary text-xl sm:text-lg font-bold text-center text-on-primary">{t('WebTitle')}</h1>
      <div id="btn-group-header" className="absolute top-0 right-0 h-full">
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
