import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fa from "./fa/index";
import en from "./en";

i18n.use(initReactI18next).init({
  resources: {
    fa: {
      translation: fa,
    },
    en: {
      translation: en,
    },
  },
  lng: "fa",
  fallbackLng: "en",
});
