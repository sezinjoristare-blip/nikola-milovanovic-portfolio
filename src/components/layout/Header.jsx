import {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
} from "react-router-dom";

import NMLogo
  from "../brand/NMLogo";

import translations
  from "../../data/translations";

import {
  useLanguage,
} from "../../context/LanguageContext";

import {
  useIntro,
} from "../../context/IntroContext";

import "../../styles/layout/Header.css";


function Header() {
  const {
    language,
    setLanguage,
  } =
    useLanguage();


  const {
    headerLogoTargetRef,

    headerContactTargetRef,

    headerNavVisible,

    headerFinalVisible,

    introComplete,
  } =
    useIntro();


  const {
    pathname,
  } =
    useLocation();


  const [
    menuOpen,
    setMenuOpen,
  ] =
    useState(false);


  const text =
    translations[
      language
    ].navigation;


  const isHomePage =
    pathname === "/";


  const navVisible =
    isHomePage
      ? headerNavVisible
      : true;


  const finalVisible =
    isHomePage
      ? headerFinalVisible
      : true;


  const interactive =
    isHomePage
      ? introComplete
      : true;


  useEffect(
    () => {
      if (
        !menuOpen
      ) {
        return undefined;
      }


      function handleEscape(
        event
      ) {
        if (
          event.key ===
          "Escape"
        ) {
          setMenuOpen(
            false
          );
        }
      }


      window.addEventListener(
        "keydown",
        handleEscape
      );


      return () => {
        window.removeEventListener(
          "keydown",
          handleEscape
        );
      };
    },
    [
      menuOpen,
    ]
  );


  useEffect(
    () => {
      setMenuOpen(
        false
      );
    },
    [
      pathname,
    ]
  );


  function closeMenu() {
    setMenuOpen(
      false
    );
  }


  const headerClassName =
    [
      "site-header",

      navVisible
        ? "site-header--nav-visible"
        : "",

      finalVisible
        ? "site-header--final-visible"
        : "",

      interactive
        ? "site-header--interactive"
        : "",
    ]
      .filter(
        Boolean
      )
      .join(
        " "
      );


  return (
    <>
      <header
        className={
          headerClassName
        }
      >
        <div className="site-header__inner">

          <a
            ref={
              headerLogoTargetRef
            }
            className="site-header__brand"
            href={
              isHomePage
                ? "#top"
                : "/"
            }
            aria-label="NM Visual"
            onClick={
              closeMenu
            }
          >
            <NMLogo
              className="site-header__logo"
            />
          </a>


          <nav
            className="site-header__nav"
            aria-label="Main navigation"
          >
            <a href="/works">
              {text.work}
            </a>

            <a href="/about">
              {text.about}
            </a>

            <a href="/services">
              {text.services}
            </a>
          </nav>


          <div className="site-header__right">

            <div className="site-header__language">
              <button
                type="button"
                className={
                  language ===
                  "sr"
                    ? "is-active"
                    : ""
                }
                onClick={
                  () =>
                    setLanguage(
                      "sr"
                    )
                }
              >
                SR
              </button>

              <span>
                /
              </span>

              <button
                type="button"
                className={
                  language ===
                  "en"
                    ? "is-active"
                    : ""
                }
                onClick={
                  () =>
                    setLanguage(
                      "en"
                    )
                }
              >
                EN
              </button>
            </div>


            <a
              ref={
                headerContactTargetRef
              }
              className="site-header__contact"
              href="/contact"
            >
              {text.contact}
            </a>


            <button
              className={
                [
                  "site-header__menu-button",

                  menuOpen
                    ? "is-open"
                    : "",
                ]
                  .filter(
                    Boolean
                  )
                  .join(
                    " "
                  )
              }
              type="button"
              aria-label="Menu"
              aria-expanded={
                menuOpen
              }
              disabled={
                !interactive
              }
              onClick={
                () =>
                  setMenuOpen(
                    (
                      current
                    ) =>
                      !current
                  )
              }
            >
              <span />
              <span />
            </button>

          </div>
        </div>
      </header>


      <div
        className={
          [
            "mobile-menu",

            menuOpen
              ? "mobile-menu--open"
              : "",
          ]
            .filter(
              Boolean
            )
            .join(
              " "
            )
        }
      >
        <nav>
          <a
            href="/works"
            onClick={
              closeMenu
            }
          >
            {text.work}
          </a>

          <a
            href="/about"
            onClick={
              closeMenu
            }
          >
            {text.about}
          </a>

          <a
            href="/services"
            onClick={
              closeMenu
            }
          >
            {text.services}
          </a>

          <a
            href="/contact"
            onClick={
              closeMenu
            }
          >
            {text.contact}
          </a>
        </nav>


        <div className="mobile-menu__language">
          <button
            type="button"
            className={
              language ===
              "sr"
                ? "is-active"
                : ""
            }
            onClick={
              () =>
                setLanguage(
                  "sr"
                )
            }
          >
            SR
          </button>

          <span>
            /
          </span>

          <button
            type="button"
            className={
              language ===
              "en"
                ? "is-active"
                : ""
            }
            onClick={
              () =>
                setLanguage(
                  "en"
                )
            }
          >
            EN
          </button>
        </div>
      </div>
    </>
  );
}


export default Header;