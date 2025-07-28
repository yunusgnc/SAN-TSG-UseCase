import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { getTranslation } from '../i18n';

interface I18nContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (module: string, key: string) => string;
  availableLocales: string[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

interface I18nProviderProps {
  children: ReactNode;
  defaultLocale?: string;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ 
  children, 
  defaultLocale = 'tr' 
}) => {
  const [locale, setLocaleState] = useState(defaultLocale);

  const availableLocales = ['tr', 'en'];

  const setLocale = (newLocale: string) => {
    if (availableLocales.includes(newLocale)) {
      setLocaleState(newLocale);
      localStorage.setItem('preferred-locale', newLocale);
    }
  };

  const t = (module: string, key: string): string => {
    return getTranslation(locale, module, key);
  };

  const value: I18nContextType = {
    locale,
    setLocale,
    t,
    availableLocales,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}; 