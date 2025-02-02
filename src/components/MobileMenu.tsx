import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MENUS } from "../constant";

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

// 只有在窄版才顯示的漢堡選單，包括登出入相關選單
const MobileMenu = ({ isMobileMenuOpen, setIsMobileMenuOpen, isLoggedIn, setIsLoggedIn }: MobileMenuProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedMobileMenu, setSelectedMobileMenu] = useState<string | null>(null);
  const menuRefs = useRef<HTMLDivElement[]>([]);

  const onMenuItemClick = (menu: { title: any; subMenu: any; path: any; }) => {
    setSelectedMobileMenu(selectedMobileMenu === menu.title ? null : menu.title);
    if(menu.subMenu.length === 0) {
        setIsMobileMenuOpen(false);
        navigate(menu.path);
    }
  };

  return (
    isMobileMenuOpen && (
      <div id="mobile-menu" className="absolute top-full left-0 w-full bg-white shadow-lg z-50 p-4 md:hidden">
        {MENUS.map((menu, index) => (
          <div ref={(el) => (menuRefs.current[index] = el!)}
            key={menu.title}            
            className="mobile-menu-item relative"
          >
            {/* Menu Item */}
            <div 
              className="parent-menu-item cursor-pointer px-4 py-3 text-gray-400 text-lg font-bold relative
              flex justify-between items-center border-b hover:text-gray-600              
              "
              onClick={() => {
                onMenuItemClick(menu);
            }}
            >
              {menu.title}
            </div>

            {/* Submenu (在 Menu Item 下方) */}
            {selectedMobileMenu === menu.title && menu.subMenu.length > 0 && (
              <div className="bg-gray-100 transition-all duration-300">
                {menu.subMenu.map((sub, idx) => (
                  <Link
                    key={idx}
                    to={sub.path}
                    className="block px-6 py-2 text-gray-700 hover:bg-primary"
                    onClick={() => {
                        setActiveMenu(menu.title);
                        setIsMobileMenuOpen(false);
                    }} // 點擊後關閉選單
                  >
                    {sub.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* 登入/註冊/登出選單 */}
        <div className="flex flex-col gap-2 mt-4">
          {isLoggedIn ? (
            <button
              id="btn-logout"
              onClick={() => {
                setIsLoggedIn(false);
                setIsMobileMenuOpen(false);
              }}
              className="btn-header w-full text-left"
            >
              {t('Logout')}
            </button>
          ) : (
            <>
              <Link to="/login" className="btn-header w-full text-left" onClick={() => setIsMobileMenuOpen(false)}>
                {t('Login')}
              </Link>
              <Link to="/register" className="btn-header w-full text-left" onClick={() => setIsMobileMenuOpen(false)}>
                {t('Register')}
              </Link>
            </>
          )}
        </div>
      </div>
    ));
};

export default MobileMenu;
