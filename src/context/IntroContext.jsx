import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";


const IntroContext =
  createContext(null);


const INTRO_VIEW_KEY =
  "nm-visual-intro-view-v1";


function getNavigationType() {
  const entries =
    window.performance
      ?.getEntriesByType?.(
        "navigation"
      );


  return (
    entries?.[0]?.type ||
    "navigate"
  );
}


function cameFromSameSite() {
  if (
    !document.referrer
  ) {
    return false;
  }


  try {
    const referrerUrl =
      new URL(
        document.referrer
      );


    return (
      referrerUrl.origin ===
      window.location.origin
    );
  } catch {
    return false;
  }
}


function readSavedView() {
  try {
    const saved =
      window.sessionStorage
        .getItem(
          INTRO_VIEW_KEY
        );


    if (
      !saved
    ) {
      return null;
    }


    return JSON.parse(
      saved
    );
  } catch {
    return null;
  }
}


function getInitialShouldPlayIntro() {
  /*
   * Intro postoji samo na Home-u.
   */

  if (
    window.location.pathname !==
    "/"
  ) {
    return false;
  }


  const navigationType =
    getNavigationType();


  /*
   * Browser Back / Forward nije
   * novi ulazak na sajt.
   */

  if (
    navigationType ===
    "back_forward"
  ) {
    return false;
  }


  /*
   * Kod refresha gledamo gde je korisnik
   * bio neposredno pre refresha.
   *
   * Ako je bio u Hero-u:
   * intro se ponavlja.
   *
   * Ako je bio niže na Home-u:
   * intro se preskače.
   */

  if (
    navigationType ===
    "reload"
  ) {
    const savedView =
      readSavedView();


    if (
      savedView?.pathname ===
      "/"
    ) {
      return (
        savedView.inHero ===
        true
      );
    }


    /*
     * Fallback samo ako još nemamo
     * sačuvanu poziciju.
     */

    return (
      window.scrollY <
      10
    );
  }


  /*
   * Ako smo došli sa druge stranice
   * istog sajta, npr.
   *
   * /works → /
   *
   * to nije novi ulazak na sajt.
   */

  if (
    cameFromSameSite()
  ) {
    return false;
  }


  /*
   * Pravi prvi ulazak na Home.
   */

  return true;
}


function saveCurrentView() {
  const pathname =
    window.location.pathname;


  let inHero =
    false;


  if (
    pathname ===
    "/"
  ) {
    const hero =
      document.getElementById(
        "top"
      );


    if (
      hero
    ) {
      const rect =
        hero.getBoundingClientRect();


      const viewportCenter =
        window.innerHeight /
        2;


      /*
       * Ne gledamo samo da li se vidi
       * jedan piksel Hero-a.
       *
       * Centar viewporta mora stvarno
       * biti unutar Hero sekcije.
       */

      inHero =
        rect.top <=
          viewportCenter &&
        rect.bottom >=
          viewportCenter;
    }
  }


  try {
    window.sessionStorage
      .setItem(
        INTRO_VIEW_KEY,
        JSON.stringify({
          pathname,
          inHero,
        })
      );
  } catch {
    /*
     * Ako storage nije dostupan,
     * sajt nastavlja normalno.
     */
  }
}


export function IntroProvider({
  children,
}) {
  /*
   * Odluku donosimo samo jednom
   * tokom ovog učitavanja aplikacije.
   */

  const shouldPlayIntroRef =
    useRef(null);


  if (
    shouldPlayIntroRef.current ===
    null
  ) {
    shouldPlayIntroRef.current =
      getInitialShouldPlayIntro();
  }


  const shouldPlayIntro =
    shouldPlayIntroRef.current;


  const headerLogoTargetRef =
    useRef(null);


  const headerContactTargetRef =
    useRef(null);


  const [
    headerNavVisible,
    setHeaderNavVisible,
  ] =
    useState(
      !shouldPlayIntro
    );


  const [
    headerFinalVisible,
    setHeaderFinalVisible,
  ] =
    useState(
      !shouldPlayIntro
    );


  const [
    videoVisible,
    setVideoVisible,
  ] =
    useState(
      !shouldPlayIntro
    );


  const [
    copyVisible,
    setCopyVisible,
  ] =
    useState(
      !shouldPlayIntro
    );


  const [
    introComplete,
    setIntroComplete,
  ] =
    useState(
      !shouldPlayIntro
    );


  /*
   * ================================================
   * PAMĆENJE GDE SE KORISNIK NALAZI
   * ================================================
   */

  useEffect(
    () => {
      let frameId =
        null;


      function scheduleSave() {
        if (
          frameId !==
          null
        ) {
          return;
        }


        frameId =
          window
            .requestAnimationFrame(
              () => {
                frameId =
                  null;


                saveCurrentView();
              }
            );
      }


      /*
       * Sačuvamo odmah trenutno stanje.
       */

      scheduleSave();


      window.addEventListener(
        "scroll",
        scheduleSave,
        {
          passive: true,
        }
      );


      window.addEventListener(
        "resize",
        scheduleSave
      );


      /*
       * pagehide se dešava i kod
       * normalnog refresh-a.
       *
       * Ovde još jednom hvatamo
       * precizno poslednju poziciju.
       */

      window.addEventListener(
        "pagehide",
        saveCurrentView
      );


      return () => {
        window.removeEventListener(
          "scroll",
          scheduleSave
        );


        window.removeEventListener(
          "resize",
          scheduleSave
        );


        window.removeEventListener(
          "pagehide",
          saveCurrentView
        );


        if (
          frameId !==
          null
        ) {
          window
            .cancelAnimationFrame(
              frameId
            );
        }
      };
    },
    []
  );


  /*
   * ================================================
   * INTRO SCROLL LOCK
   * ================================================
   */

  useEffect(
    () => {
      const html =
        document.documentElement;


      const body =
        document.body;


      const previousHtmlOverflow =
        html.style.overflow;


      const previousBodyOverflow =
        body.style.overflow;


      if (
        shouldPlayIntro &&
        !introComplete
      ) {
        html.style.overflow =
          "hidden";


        body.style.overflow =
          "hidden";
      }


      return () => {
        html.style.overflow =
          previousHtmlOverflow;


        body.style.overflow =
          previousBodyOverflow;
      };
    },
    [
      introComplete,
      shouldPlayIntro,
    ]
  );


  const value =
    useMemo(
      () => ({
        headerLogoTargetRef,

        headerContactTargetRef,

        headerNavVisible,
        setHeaderNavVisible,

        headerFinalVisible,
        setHeaderFinalVisible,

        videoVisible,
        setVideoVisible,

        copyVisible,
        setCopyVisible,

        introComplete,
        setIntroComplete,

        shouldPlayIntro,
      }),
      [
        headerNavVisible,
        headerFinalVisible,
        videoVisible,
        copyVisible,
        introComplete,
        shouldPlayIntro,
      ]
    );


  return (
    <IntroContext.Provider
      value={
        value
      }
    >
      {children}
    </IntroContext.Provider>
  );
}


export function useIntro() {
  const context =
    useContext(
      IntroContext
    );


  if (
    !context
  ) {
    throw new Error(
      "useIntro must be used inside IntroProvider."
    );
  }


  return context;
}