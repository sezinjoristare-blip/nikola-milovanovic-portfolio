import packages
  from "../../data/packages";

import "../../styles/sections/Packages.css";


function Packages() {
  return (
    <section
      className="packages"
      id="packages"
    >
      <div className="packages__shell site-shell">
        <header className="packages__heading">
          <div className="packages__heading-label">
            <span>
              (06)
            </span>

            <span>
              WORK WITH ME
            </span>
          </div>


          <div className="packages__heading-main">
            <h2>
              Choose
              <span>
                your way
                to work.
              </span>
            </h2>

            <p>
              Every project is
              different. These are
              starting points, not
              rigid packages.
            </p>
          </div>
        </header>


        <div className="packages__grid">
          {packages.map(
            (
              item
            ) => (
              <article
                className="package-card"
                key={
                  item.id
                }
              >
                <div className="package-card__top">
                  <span>
                    {item.number}
                  </span>

                  <span>
                    {item.eyebrow}
                  </span>
                </div>


                <div className="package-card__main">
                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {
                      item.description
                    }
                  </p>
                </div>


                <ul className="package-card__features">
                  {item.features.map(
                    (
                      feature
                    ) => (
                      <li
                        key={
                          feature
                        }
                      >
                        <span>
                          +
                        </span>

                        {feature}
                      </li>
                    )
                  )}
                </ul>


                <a
                  className="package-card__cta"
                  href="#contact"
                >
                  <span>
                    {item.cta}
                  </span>

                  <span
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}


export default Packages;