import site
  from "../../data/site";

import "../../styles/sections/Contact.css";


function Contact() {
  return (
    <section
      className="contact site-section"
      id="contact"
    >
      <div className="contact__inner site-shell">
        <p>
          GOT A PROJECT IN MIND?
        </p>

        <h2>
          Let's create
          something together.
        </h2>


        <div className="contact__actions">
          <a
            href={
              `mailto:${site.email}`
            }
          >
            {site.email}
            <span>
              ↗
            </span>
          </a>

          <a
            href={
              site.instagram
            }
          >
            INSTAGRAM
            <span>
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}


export default Contact;