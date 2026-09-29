import {
  useState,
} from "react";

import faq
  from "../../data/faq";

import {
  useLanguage,
} from "../../context/LanguageContext";

import "../../styles/sections/FAQ.css";


const copy = {
  en: {
    title:
      "BEFORE WE SHOOT",

    questions:
      "QUESTIONS",

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
      "PRE SNIMANJA",

    questions:
      "PITANJA",

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


function FAQ() {
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
    openId,
    setOpenId,
  ] =
    useState(
      faq[0]?.id ??
      null
    );


  function toggleItem(
    id
  ) {
    setOpenId(
      (
        current
      ) =>
        current ===
        id
          ? null
          : id
    );
  }


  function handleSubmit(
    event
  ) {
    event.preventDefault();
  }


  return (
    <section
      className="faq"
      id="faq"
    >
      <div className="faq__shell site-shell">

        <header className="faq__heading">
          <span className="faq__section-number">
            (05)
          </span>

          <h2>
            {text.title}
          </h2>
        </header>


        <div className="faq__layout">

          <div className="faq__questions">
            <p className="faq__column-label">
              {text.questions}
            </p>


            <div className="faq__list">
              {faq.map(
                (
                  item,
                  index
                ) => {
                  const isOpen =
                    openId ===
                    item.id;


                  const question =
                    language ===
                    "sr"
                      ? item.questionSr
                      : item.question;


                  const answer =
                    language ===
                    "sr"
                      ? item.answerSr
                      : item.answer;


                  return (
                    <article
                      className={
                        [
                          "faq__item",
                          isOpen
                            ? "faq__item--open"
                            : "",
                        ]
                          .filter(
                            Boolean
                          )
                          .join(
                            " "
                          )
                      }
                      key={
                        item.id
                      }
                    >
                      <button
                        type="button"
                        className="faq__question"
                        onClick={
                          () =>
                            toggleItem(
                              item.id
                            )
                        }
                        aria-expanded={
                          isOpen
                        }
                      >
                        <span className="faq__number">
                          {String(
                            index +
                            1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>


                        <span className="faq__question-text">
                          {question}
                        </span>


                        <span
                          className="faq__icon"
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </button>


                      <div className="faq__answer-wrap">
                        <div className="faq__answer">
                          <p>
                            {answer}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          </div>


          <div
            className="faq__form-column"
            id="contact"
          >
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
    </section>
  );
}


export default FAQ;