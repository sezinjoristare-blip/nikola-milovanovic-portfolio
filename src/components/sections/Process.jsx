import "../../styles/sections/Process.css";


const steps = [
  {
    number:
      "01",

    title:
      "Tell me about it",

    text:
      "Send the idea, date, location and everything you already know about the project.",
  },

  {
    number:
      "02",

    title:
      "We plan",

    text:
      "We define the visual direction, timing and everything needed before the shoot.",
  },

  {
    number:
      "03",

    title:
      "Shoot",

    text:
      "We create the material while leaving enough space for natural moments to happen.",
  },

  {
    number:
      "04",

    title:
      "Delivery",

    text:
      "You receive a carefully selected and edited final collection ready to use.",
  },
];


function Process() {
  return (
    <section
      className="process"
      id="process"
    >
      <div className="process__shell site-shell">
        <header className="process__heading">
          <div className="process__heading-label">
            <span>
              (05)
            </span>

            <span>
              PROCESS
            </span>
          </div>


          <div className="process__heading-main">
            <h2>
              Simple
              <span>
                from start
                to finish.
              </span>
            </h2>

            <p>
              A clear process keeps
              the focus where it
              belongs — on making
              good work.
            </p>
          </div>
        </header>


        <div className="process__list">
          {steps.map(
            (
              step
            ) => (
              <article
                className="process__step"
                key={
                  step.number
                }
              >
                <span className="process__number">
                  {step.number}
                </span>


                <h3>
                  {step.title}
                </h3>


                <p>
                  {step.text}
                </p>


                <span
                  className="process__mark"
                  aria-hidden="true"
                >
                  +
                </span>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}


export default Process;