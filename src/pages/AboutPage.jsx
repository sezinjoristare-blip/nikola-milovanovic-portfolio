import {
  useState,
} from "react";

import {
  useLanguage,
} from "../context/LanguageContext";

import ClientMarquee
  from "../components/sections/ClientMarquee";

import "../styles/pages/AboutPage.css";


const copy = {
  en: {
    pageLabel:
      "ABOUT",

    name:
      "NIKOLA MILOVANOVIĆ",

    role:
      "PHOTOGRAPHER / VIDEOGRAPHER",

    intro:
      "Young visual creator and camera enthusiast based in Belgrade, focused on photography, video and editing.",

    paragraphs: [
      "Nikola approaches every project through people, movement and atmosphere. The goal is not only to create a polished image, but to capture something that feels natural and belongs to the moment.",

      "His work moves between portraits, events, commercial projects and content for brands, adapting the visual approach to the character of each project.",

      "This is only the beginning of his story. More about his background, process and experience will be added here as the portfolio continues to grow.",
    ],

    formLabel:
      "LET'S WORK TOGETHER",

    formIntro:
      "Have a project in mind? Send a few details and let's start from there.",

    nameField:
      "NAME",

    email:
      "EMAIL",

    projectType:
      "PROJECT TYPE",

    select:
      "SELECT A SERVICE",

    photography:
      "PHOTOGRAPHY",

    filming:
      "FILMING",

    editing:
      "EDITING",

    other:
      "OTHER",

    message:
      "MESSAGE",

    send:
      "SEND",
  },


  sr: {
    pageLabel:
      "O MENI",

    name:
      "NIKOLA MILOVANOVIĆ",

    role:
      "FOTOGRAF / VIDEOGRAF",

    intro:
      "Mladi vizuelni stvaralac i zaljubljenik u kameru iz Beograda, fokusiran na fotografiju, video i montažu.",

    paragraphs: [
      "Nikola svakom projektu pristupa kroz ljude, pokret i atmosferu. Cilj nije samo napraviti doteranu sliku, već zabeležiti nešto što deluje prirodno i pripada trenutku.",

      "Njegov rad se kreće između portreta, proslava, komercijalnih projekata i sadržaja za brendove, uz prilagođavanje vizuelnog pristupa karakteru svakog projekta.",

      "Ovo je za sada samo osnova njegove priče. Više o iskustvu, procesu i njegovom putu dodaćemo kada Nikola definiše konačan tekst.",
    ],

    formLabel:
      "HAJDE DA RADIMO ZAJEDNO",

    formIntro:
      "Imaš projekat na umu? Pošalji nekoliko detalja i možemo da krenemo odatle.",

    nameField:
      "IME",

    email:
      "EMAIL",

    projectType:
      "TIP PROJEKTA",

    select:
      "IZABERI USLUGU",

    photography:
      "FOTKANJE",

    filming:
      "SNIMANJE",

    editing:
      "EDITOVANJE",

    other:
      "DRUGO",

    message:
      "PORUKA",

    send:
      "POŠALJI",
  },
};


function PortraitFrame() {
  return (
    <div
      className="about-page__portrait-frame"
      aria-hidden="true"
    >
      <span className="about-page__frame-line about-page__frame-line--top" />

      <span className="about-page__frame-line about-page__frame-line--right" />

      <span className="about-page__frame-line about-page__frame-line--bottom" />

      <span className="about-page__frame-line about-page__frame-line--left" />
    </div>
  );
}


function FormFrame() {
  return (
    <div
      className="about-page__form-frame"
      aria-hidden="true"
    >
      <span className="about-page__form-frame-line about-page__form-frame-line--top" />

      <span className="about-page__form-frame-line about-page__form-frame-line--right" />

      <span className="about-page__form-frame-line about-page__form-frame-line--bottom" />

      <span className="about-page__form-frame-line about-page__form-frame-line--left" />
    </div>
  );
}


function AboutPage() {
  const {
    language,
  } =
    useLanguage();


  const text =
    copy[
      language
    ] ??
    copy.en;


  const [
    submitted,
    setSubmitted,
  ] =
    useState(false);


  function handleSubmit(
    event
  ) {
    event.preventDefault();

    setSubmitted(
      true
    );
  }


  return (
    <section className="about-page">
      <div className="about-page__shell site-shell">

        <header className="about-page__header">
          <span>
            (01)
          </span>

          <h1>
            {text.pageLabel}
          </h1>
        </header>


        <div className="about-page__story">

          <div className="about-page__portrait">
            <PortraitFrame />

            <div className="about-page__portrait-media">
              <span>
                NIKOLA PORTRAIT
              </span>
            </div>
          </div>


          <div className="about-page__copy">

            <div className="about-page__identity">
              <span>
                {text.role}
              </span>

              <h2>
                {text.name}
              </h2>
            </div>


            <p className="about-page__intro">
              {text.intro}
            </p>


            <div className="about-page__text">
              {text.paragraphs.map(
                (
                  paragraph,
                  index
                ) => (
                  <div
                    className="about-page__text-row"
                    key={
                      index
                    }
                  >
                    <span
                      aria-hidden="true"
                    />

                    <p>
                      {paragraph}
                    </p>
                  </div>
                )
              )}
            </div>

          </div>

        </div>
      </div>


      <ClientMarquee />


      <div className="about-page__shell site-shell">

        <section
          className="about-page__contact"
          id="contact"
        >
          <div className="about-page__contact-copy">
            <span>
              (02)
            </span>

            <h2>
              {text.formLabel}
            </h2>

            <p>
              {text.formIntro}
            </p>
          </div>


          <div className="about-page__form-shell">
            <FormFrame />

            <form
              className="about-page__form"
              onSubmit={
                handleSubmit
              }
            >
              <label className="about-page__field">
                <span>
                  {text.nameField}
                </span>

                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                />
              </label>


              <label className="about-page__field">
                <span>
                  {text.email}
                </span>

                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                />
              </label>


              <label className="about-page__field">
                <span>
                  {text.projectType}
                </span>

                <select
                  name="projectType"
                  defaultValue=""
                  required
                >
                  <option
                    value=""
                    disabled
                  >
                    {text.select}
                  </option>

                  <option value="photography">
                    {text.photography}
                  </option>

                  <option value="filming">
                    {text.filming}
                  </option>

                  <option value="editing">
                    {text.editing}
                  </option>

                  <option value="other">
                    {text.other}
                  </option>
                </select>
              </label>


              <label className="about-page__field about-page__field--message">
                <span>
                  {text.message}
                </span>

                <textarea
                  name="message"
                  rows="5"
                  required
                />
              </label>


              <button
                type="submit"
                className="about-page__submit"
              >
                <span>
                  {text.send}
                </span>

                <span
                  aria-hidden="true"
                >
                  →
                </span>
              </button>


              {submitted ? (
                <span className="about-page__form-note">
                  FORM BACKEND — COMING SOON
                </span>
              ) : null}
            </form>
          </div>
        </section>

      </div>
    </section>
  );
}


export default AboutPage;