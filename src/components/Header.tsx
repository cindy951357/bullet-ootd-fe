import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MenuWithSubMenu from "./MenuWithSubMenu";
import MobileMenu from "./MobileMenu";

function Header() {
  const { t } = useTranslation();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header id="header" className="bg-primary p-4 flex relative justify-between">
      <h1 id="website-title-group" className="flex justify-center items-center font-primary text-xl sm:text-lg
        font-bold text-center text-on-primary">
        <img src="/icon-hanger-gray.svg" className="w-10"></img>
        <span id="website-title" className="flex">{t('WebTitle')}</span>
        <img src="/icon-hanger-gray.svg" className="w-10"></img>
      </h1>

      {/* 電腦版主選單 - 在大螢幕時顯示 */}
      <nav className="hidden md:flex">
        <MenuWithSubMenu />
      </nav>

      {/* 登出入相關按鈕 - 在大螢幕時顯示 */}
      <div id="btn-group-header" className="h-full hidden md:flex">
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
      
      {/* 漢堡選單按鈕 - 只在手機版顯示 */}
      <button
        id="hamburger-btn"
        className="md:hidden flex items-center"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <img src="/icon-hamburger.svg" className="w-8 h-8" alt="Menu" />
      </button>

      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
    </header>
  );
}

export default Header;
