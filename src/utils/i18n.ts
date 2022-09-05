import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import translation from '@assets/localization/en.json';

const localizationResources = {
  en: {
    translation
  }
};

i18n.use(initReactI18next).init({
  resources: localizationResources,
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  keySeparator: false
});
