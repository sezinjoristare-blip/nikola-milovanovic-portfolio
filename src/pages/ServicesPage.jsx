import {
  useEffect,
  useMemo,
  useState,
} from "react";

import servicesPage
  from "../data/servicesPage";

import {
  useLanguage,
} from "../context/LanguageContext";

import "../styles/pages/ServicesPage.css";


function ServicesPage() {
  const {
    language,
  } =
    useLanguage();


  const page =
    servicesPage[
      language
    ] ??
    servicesPage.en;


  const [
    activeCategoryId,
    setActiveCategoryId,
  ] =
    useState(
      page.categories[0]?.id ??
      null
    );


  const [
    openItemId,
    setOpenItemId,
  ] =
    useState(null);


  const [
    projectType,
    setProjectType,
  ] =
    useState(
      page.categories[0]?.id ??
      ""
    );


  const activeCategory =
    useMemo(
      () =>
        page.categories.find(
          (
            category
          ) =>
            category.id ===
            activeCategoryId
        ) ??
        page.categories[0] ??
        null,
      [
        activeCategoryId,
        page.categories,
      ]
    );


  useEffect(
    () => {
      const categoryStillExists =
        page.categories.some(
          (
            category
          ) =>
            category.id ===
            activeCategoryId
        );


      if (
        categoryStillExists
      ) {
        return;
      }


      const firstCategoryId =
        page.categories[0]?.id ??
        null;


      setActiveCategoryId(
        firstCategoryId
      );


      setProjectType(
        firstCategoryId ??
        ""
      );


      setOpenItemId(
        null
      );
    },
    [
      activeCategoryId,
      page.categories,
    ]
  );


  function selectCategory(
    categoryId
  ) {
    setActiveCategoryId(
      categoryId
    );


    setProjectType(
      categoryId
    );


    setOpenItemId(
      null
    );
  }


  function toggleItem(
    itemId
  ) {
    setOpenItemId(
      (
        current
      ) =>
        current ===
        itemId
          ? null
          : itemId
    );
  }


  function handleSubmit(
    event
  ) {
    event.preventDefault();
  }


  if (
    !activeCategory
  ) {
    return null;
  }


  return (
    <section className="services-page">
      <div className="services-page__shell">

        <header className="services-page__header">
          <h1>
            {page.title}
          </h1>
        </header>


        <div
          className="services-page__categories"
          role="tablist"
          aria-label={
            page.title
          }
        >
          {page.categories.map(
            (
              category
            ) => {
              const isActive =
                category.id ===
                activeCategory.id;


              return (
                <button
                  key={
                    category.id
                  }
                  type="button"
                  role="tab"
                  aria-selected={
                    isActive
                  }
                  className={
                    [
                      "services-page__category",

                      isActive
                        ? "services-page__category--active"
                        : "",
                    ]
                      .filter(
                        Boolean
                      )
                      .join(
                        " "
                      )
                  }
                  onClick={
                    () =>
                      selectCategory(
                        category.id
                      )
                  }
                >
                  {category.label}
                </button>
              );
            }
          )}
        </div>


        <div className="services-page__list">
          {activeCategory.items.map(
            (
              item
            ) => {
              const isOpen =
                openItemId ===
                item.id;


              return (
                <article
                  key={
                    item.id
                  }
                  className={
                    [
                      "services-page__item",

                      isOpen
                        ? "services-page__item--open"
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
                  <button
                    type="button"
                    className="services-page__item-button"
                    aria-expanded={
                      isOpen
                    }
                    onClick={
                      () =>
                        toggleItem(
                          item.id
                        )
                    }
                  >
                    <span className="services-page__item-number">
                      {item.number}
                    </span>

                    <span className="services-page__item-title">
                      {item.title}
                    </span>
                  </button>


                  <div className="services-page__details">
                    <div className="services-page__details-inner">

                      <div className="services-page__description">
                        <p>
                          {item.description}
                        </p>
                      </div>


                      <div className="services-page__details-grid">

                        <div className="services-page__details-block">
                          <span className="services-page__details-label">
                            {item.includedTitle}
                          </span>

                          <div className="services-page__included">
                            {item.included.map(
                              (
                                includedItem
                              ) => (
                                <p
                                  key={
                                    includedItem
                                  }
                                >
                                  {includedItem}
                                </p>
                              )
                            )}
                          </div>
                        </div>


                        <div className="services-page__details-block">
                          <span className="services-page__details-label">
                            {item.deliveryTitle}
                          </span>

                          <p>
                            {item.delivery}
                          </p>
                        </div>

                      </div>

                    </div>
                  </div>
                </article>
              );
            }
          )}
        </div>


        <div className="services-page__contact">

          <div className="services-page__contact-heading">
            <span>
              04
            </span>

            <h2>
              {page.contact.title}
            </h2>
          </div>


          <form
            className="services-page__form"
            onSubmit={
              handleSubmit
            }
          >

            <label className="services-page__field">
              <span>
                {page.contact.name}
              </span>

              <input
                type="text"
                name="name"
                autoComplete="name"
                required
              />
            </label>


            <label className="services-page__field">
              <span>
                {page.contact.email}
              </span>

              <input
                type="email"
                name="email"
                autoComplete="email"
                required
              />
            </label>


            <label className="services-page__field">
              <span>
                {page.contact.projectType}
              </span>

              <select
                name="projectType"
                value={
                  projectType
                }
                onChange={
                  (
                    event
                  ) =>
                    setProjectType(
                      event.target.value
                    )
                }
                required
              >
                <option
                  value=""
                  disabled
                >
                  {page.contact.select}
                </option>

                {page.categories.map(
                  (
                    category
                  ) => (
                    <option
                      key={
                        category.id
                      }
                      value={
                        category.id
                      }
                    >
                      {category.label}
                    </option>
                  )
                )}
              </select>
            </label>


            <label className="services-page__field">
              <span>
                {page.contact.message}
              </span>

              <textarea
                name="message"
                rows="7"
                required
              />
            </label>


            <button
              type="submit"
              className="services-page__submit"
            >
              <span>
                {page.contact.send}
              </span>

              <span
                aria-hidden="true"
              >
                ↗
              </span>
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}


export default ServicesPage;