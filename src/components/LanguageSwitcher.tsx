import React from 'react';
import { useI18n } from '../contexts/I18nContext';

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale, availableLocales } = useI18n();

  const languageNames = {
    tr: '🇹🇷 TR',
    en: '🇺🇸 EN',
  };

  return (
    <div className="flex items-center space-x-2">
                      <select
                  value={locale}
                  onChange={(e) => setLocale(e.target.value)}
                  className="px-3 py-2 text-sm bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer"
                >
                  {availableLocales.map((lang) => (
                    <option key={lang} value={lang} className="bg-white text-gray-700">
                      {languageNames[lang as keyof typeof languageNames]}
                    </option>
                  ))}
                </select>
    </div>
  );
};

export default LanguageSwitcher; 