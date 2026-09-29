import OptimizedVideo
  from "../ui/OptimizedVideo";

import "../../styles/sections/Statement.css";


function Statement() {
  return (
    <section className="statement">
      <div className="statement__media">
        <OptimizedVideo
          src=""
          mobileSrc=""
          poster=""
          alt="Photography showreel"
        />


        <div className="statement__overlay" />
      </div>


      <div className="statement__content site-shell">
        <p className="statement__label">
          A MOMENT
          <span>
            BECOMES A MEMORY
          </span>
        </p>


        <h2>
          Not just
          <span>
            how it looked.
          </span>

          <strong>
            How it felt.
          </strong>
        </h2>


        <span className="statement__index">
          (03)
        </span>
      </div>
    </section>
  );
}


export default Statement;