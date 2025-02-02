import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MENUS } from "../constant";

const MenuWithSubMenu = () => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState("Home");
    const [openSubMenu, setOpenSubMenu] = useState("");
    const [hoverMenu, setHoverMenu] = useState("");
    const [underlineStyle, setUnderlineStyle] = useState({
      left: 0,
      width: 0,
    });
    const menuRefs = useRef<HTMLDivElement[]>([]);
  
    // 計算下劃線的位置
  useEffect(() => {
      const targetMenu = hoverMenu || activeMenu;
      const targetIndex = MENUS.findIndex((menu) => menu.title === targetMenu);

      if (targetIndex !== -1 && menuRefs.current[targetIndex]) {
        const targetElement = menuRefs.current[targetIndex];
        const { offsetLeft, offsetWidth } = targetElement;
        setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
      }
    }, [hoverMenu, activeMenu]);

    return (
      <div id="main-menu" className="relative flex items-center justify-between bg-primary">
        {MENUS.map((menu, index) => (
          <div
            key={index}
            ref={(el) => (menuRefs.current[index] = el!)}
            className="relative group"
            onMouseEnter={() => setHoverMenu(menu.title)}
            onMouseLeave={() => setHoverMenu("")}
          >
            <div
              className={`menu-item cursor-pointer px-4 py-2 text-primary text-lg font-bold ${
                activeMenu === menu.title
                  ? "text-on-primary border-b-2 border-primary"
                  : "text-gray-700"
              } hover:text-on-primary-hover`}
              onClick={() => {
                setActiveMenu(menu.title);
                if(menu.subMenu.length === 0) {
                  navigate(menu.path);
                  setOpenSubMenu("");
                } else {
                  setOpenSubMenu(menu.title);
                }
              }}
            >
              {menu.title}
            </div>
  
            {/* enu.subMenu.length > 0: 只有在有子選單時，才需要渲染子選單的下拉列表 */}
            {menu.subMenu.length > 0 && openSubMenu === menu.title && (
              <div
                id={`submenu-${menu.title}`}
                className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
                {menu.subMenu.map((sub, idx) => (
                  <div
                    key={idx}
                    className="submenu-item px-4 py-2 cursor-pointer text-gray-300 hover:bg-primary-hovered hover:text-on-primary-hovered"
                    onClick={() => {
                      setActiveMenu(menu.title);
                      setOpenSubMenu("");
                      navigate(sub.path);
                    }}
                  >
                    {sub.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* 底部線段平移動畫效果；在 DOM tree 上可獨立撰寫*/}
        <div
          id="animatable-underline"
          className="absolute bottom-0 h-[2px] bg-on-primary transition-all duration-300"
          style={{ left: underlineStyle.left, width: underlineStyle.width }}
        ></div>
      </div>
    );
  };
  
  export default MenuWithSubMenu;
  