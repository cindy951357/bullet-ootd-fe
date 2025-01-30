import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <header className="bg-primary text-white p-4 flex relative justify-end">
      <h1 className=" w-full absolute text-xl font-bold text-center text-on-primary">{t('WebTitle')}</h1>
      <div className="flex">
        {isLoggedIn ? (
          <button onClick={() => setIsLoggedIn(false)}
            className="mr-2 hover:bg-primary-hovered p-2"
          >{t('Logout')}</button>
        ) : (
          <>
            <Link to="/login" className="mr-2 hover:bg-primary-hovered p-2 text-on-primary">{t('Login')}</Link>
            <Link to="/register" className="hover:bg-primary-hovered p-2 text-on-primary">{t('Register')}</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
