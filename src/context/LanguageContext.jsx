import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";


const LanguageContext =
  createContext(null);


export function LanguageProvider({
  children,
}) {
  const [
    language,
    setLanguage,
  ] =
    useState(
      () =>
        localStorage.getItem(
          "nikola-portfolio-language"
        ) ||
        "en"
    );


  function changeLanguage(
    nextLanguage
  ) {
    if (
      ![
        "en",
        "sr",
      ].includes(
        nextLanguage
      )
    ) {
      return;
    }


    setLanguage(
      nextLanguage
    );


    localStorage.setItem(
      "nikola-portfolio-language",
      nextLanguage
    );
  }


  const value =
    useMemo(
      () => ({
        language,
        setLanguage:
          changeLanguage,
      }),
      [
        language,
      ]
    );


  return (
    <LanguageContext.Provider
      value={
        value
      }
    >
      {children}
    </LanguageContext.Provider>
  );
}


export function useLanguage() {
  const context =
    useContext(
      LanguageContext
    );


  if (
    !context
  ) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider."
    );
  }


  return context;
}