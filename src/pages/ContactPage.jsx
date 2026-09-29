import {
  useLanguage,
} from "../context/LanguageContext";

import "../styles/pages/Contact.css";
import "../styles/sections/FAQ.css";


const copy = {
  en: {
    title:
      "GOT A PROJECT ON YOUR MIND?",

    intro:
      "Feel free to contact me and talk about it.",

    form:
      "PROJECT FORM",

    name:
      "NAME",

    email:
      "EMAIL",

    projectType:
      "PROJECT TYPE",

    projectPlaceholder:
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
    title:
      "IMAŠ PROJEKAT NA UMU?",

    intro:
      "Slobodno mi se javi da popričamo o njemu.",

    form:
      "FORMULAR",

    name:
      "IME",

    email:
      "EMAIL",

    projectType:
      "TIP PROJEKTA",

    projectPlaceholder:
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


function FormFrame() {
  return (
    <div
      className="faq__form-frame"
      aria-hidden="true"
    >
      <span
        className="
          faq__form-frame-line
          faq__form-frame-line--top
        "
      />

      <span
        className="
          faq__form-frame-line
          faq__form-frame-line--right
        "
      />

      <span
        className="
          faq__form-frame-line
          faq__form-frame-line--bottom
        "
      />

      <span
        className="
          faq__form-frame-line
          faq__form-frame-line--left
        "
      />
    </div>
  );
}


function ContactPage() {
  const {
    language,
  } =
    useLanguage();


  const text =
    copy[
      language
    ] ??
    copy.en;


  function handleSubmit(
    event
  ) {
    event.preventDefault();
  }


  return (
    <div className="contact-page">
      <div className="contact-page__shell site-shell">

        <header className="contact-page__intro">
          <h1>
            {text.title}
          </h1>

          <p>
            {text.intro}
          </p>
        </header>


        <div className="contact-page__form-column">

          <p className="faq__column-label">
            {text.form}
          </p>


          <div className="faq__form-shell">
            <FormFrame />


            <form
              className="faq__form"
              onSubmit={
                handleSubmit
              }
            >
              <label className="faq__field">
                <span>
                  {text.name}
                </span>

                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                />
              </label>


              <label className="faq__field">
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


              <label className="faq__field">
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
                    {text.projectPlaceholder}
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


              <label
                className="
                  faq__field
                  faq__field--message
                "
              >
                <span>
                  {text.message}
                </span>

                <textarea
                  name="message"
                  rows="4"
                  required
                />
              </label>


              <button
                type="submit"
                className="faq__submit"
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
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}


export default ContactPage;