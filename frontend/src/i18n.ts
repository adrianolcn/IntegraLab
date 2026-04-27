import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptBR from './locales/pt-BR.json';
import en from './locales/en.json';

const resources = {
  en: { translation: en },
  pt: { translation: ptBR }
};

const savedLocale = localStorage.getItem('integralab_locale');
const defaultLocale = savedLocale ? savedLocale : 'pt';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLocale, // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('integralab_locale', lng);
});

export default i18n;
