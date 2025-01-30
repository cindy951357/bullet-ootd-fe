import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <header id="header" className="bg-primary text-white p-4 flex relative justify-end">
      <h1 id="website-title" className=" w-full absolute text-xl font-bold text-center text-on-primary">{t('WebTitle')}</h1>
      <div className="flex">
        {isLoggedIn ? (
          <button onClick={() => setIsLoggedIn(false)}
            className="mr-2 p-2"
          >{t('Logout')}</button>
        ) : (
          <>
            <Link to="/login" className="mr-2 p-2">{t('Login')}</Link>
            <Link to="/register" className="p-2">{t('Register')}</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
