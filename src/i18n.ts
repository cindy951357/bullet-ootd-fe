import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 匯入語言 JSON 檔案
import en from "./locales/en.json";
import zhTW from "./locales/zh-TW.json";
import fr from "./locales/fr.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      "zh-TW": { translation: zhTW },
      fr: { translation: fr },
    },
    lng: "en", // 預設語言
    fallbackLng: "en", // 如果找不到語言時，使用的預設語言
    interpolation: {
      escapeValue: false, // React 已經具備 XSS 防護，無需 escape
    },
    debug: true, // 啟用 i18n 除錯模式
  });

export default i18n;
