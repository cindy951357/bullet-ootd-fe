export const MENUS = [
    { title: "Home", subMenu: [], path: "/" },
    { 
      title: "OOTD", 
      subMenu: [
        { title: "Calendar", path: "/" },
        { title: "Add Outfit", path: "/add-outfit" },
        { title: "Analytics", path: "/ootd-analytics" }
      ],
      path: "/ootd"
    },
    { 
      title: "Items", 
      subMenu: [
        { title: "Add Item", path: "/add-item" },
        { title: "Manage Items", path: "/manage-items" }
      ],
      path: "/items"
    },
    { 
      title: "Preferences", 
      subMenu: [
        { title: "Notifications", path: "/preferences/notifications" },
        { title: "Appearance", path: "/preferences/appearance" },
        { title: "Account Settings", path: "/preferences/account-settings" }
      ],
      path: "/preferences"
    }
  ];
  
export const MAX_IMAGES = 20;
export const MIN_PLACEHOLDERS = 5;