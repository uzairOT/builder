// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your translation files (you can create your own JSON files)
import enTranslation from "./locales/en.json";
import frTranslation from "./locales/fr.json";
import zhTranslation from "./locales/zh.json";
import deTranslation from "./locales/de.json";
import esTranslation from "./locales/es.json";

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation },
      zh: { translation: zhTranslation },
      de: { translation: deTranslation },
      es: { translation: esTranslation },
    },
    lng: "en", // Default language
    fallbackLng: "en", // Language to fall back to if the current language isn't available
    interpolation: {
      escapeValue: false, // React already escapes HTML, no need to escape
    },
  });

export default i18n;
