import {
  useLanguage,
} from "../../context/LanguageContext";

import site
  from "../../data/site";

import "../../styles/layout/Footer.css";


const copy = {
  en: {
    navigation:
      "NAVIGATION",

    contact:
      "CONTACT",

    location:
      "BASED IN",

    work:
      "WORKS",

    about:
      "ABOUT",

    services:
      "SERVICES",

    contactLink:
      "CONTACT",

    email:
      "EMAIL",

    instagram:
      "INSTAGRAM",

    place:
      "BELGRADE, SERBIA",

    top:
      "BACK TO TOP",
  },

  sr: {
    navigation:
      "NAVIGACIJA",

    contact:
      "KONTAKT",

    location:
      "LOKACIJA",

    work:
      "RADOVI",

    about:
      "O MENI",

    services:
      "USLUGE",

    contactLink:
      "KONTAKT",

    email:
      "EMAIL",

    instagram:
      "INSTAGRAM",

    place:
      "BEOGRAD, SRBIJA",

    top:
      "NA VRH",
  },
};


function FooterLine({
  className = "",
}) {
  return (
    <span
      className={`
        site-footer__line
        ${className}
      `}
      aria-hidden="true"
    />
  );
}


function Footer() {
  const {
    language,
  } =
    useLanguage();

  const text =
    copy[
      language
    ] ??
    copy.en;

  const year =
    new Date()
      .getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner site-shell">

        <div
          className="site-footer__frame"
          aria-hidden="true"
        >
          <FooterLine
            className="site-footer__line--top"
          />

          <FooterLine
            className="site-footer__line--vertical-one"
          />

          <FooterLine
            className="site-footer__line--vertical-two"
          />

          <FooterLine
            className="site-footer__line--bottom-left"
          />

          <FooterLine
            className="site-footer__line--bottom-right"
          />
        </div>

        <div className="site-footer__content">

          <div className="site-footer__identity">
            <strong>
              {site.name}
            </strong>

            <span>
              {site.profession}
            </span>
          </div>

          <nav
            className="site-footer__group"
            aria-label={
              text.navigation
            }
          >
            <span className="site-footer__label">
              {text.navigation}
            </span>

            <div className="site-footer__links">
              <a href="/works">
                {text.work}
              </a>

              <a href="/about">
                {text.about}
              </a>

              <a href="/services">
                {text.services}
              </a>

              <a href="/contact">
                {text.contactLink}
              </a>
            </div>
          </nav>

          <div className="site-footer__group">
            <span className="site-footer__label">
              {text.contact}
            </span>

            <div className="site-footer__links">
              <a
                href={
                  `mailto:${site.email}`
                }
              >
                {text.email}

                <span
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>

              <a
                href={
                  site.instagram
                }
                target="_blank"
                rel="noreferrer"
              >
                {text.instagram}

                <span
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            </div>
          </div>

          <div className="site-footer__group site-footer__location">
            <span className="site-footer__label">
              {text.location}
            </span>

            <strong>
              {text.place}
            </strong>
          </div>

        </div>

        <div className="site-footer__bottom">
          <small>
            © {year} {site.name}
          </small>

          <a
            href="#main-content"
            className="site-footer__top"
          >
            <span>
              {text.top}
            </span>

            <span
              aria-hidden="true"
            >
              ↑
            </span>
          </a>
        </div>

      </div>
    </footer>
  );
}


export default Footer;