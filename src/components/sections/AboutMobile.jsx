import {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";

import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

import "../../styles/sections/AboutMobile.css";


gsap.registerPlugin(
  ScrollTrigger
);


function AboutMobileFrame() {
  return (
    <div
      className="about-mobile__portrait-frame"
      aria-hidden="true"
    >
      <span
        className="
          about-mobile__frame-line
          about-mobile__frame-line--top
        "
        data-about-mobile-frame-line="top"
      />

      <span
        className="
          about-mobile__frame-line
          about-mobile__frame-line--right
        "
        data-about-mobile-frame-line="right"
      />

      <span
        className="
          about-mobile__frame-line
          about-mobile__frame-line--bottom
        "
        data-about-mobile-frame-line="bottom"
      />

      <span
        className="
          about-mobile__frame-line
          about-mobile__frame-line--left
        "
        data-about-mobile-frame-line="left"
      />
    </div>
  );
}


function AboutMobile({
  text,
  language,
}) {
  const rootRef =
    useRef(null);


  const panelRef =
    useRef(null);


  useLayoutEffect(
    () => {
      const root =
        rootRef.current;

      const panel =
        panelRef.current;


      if (
        !root ||
        !panel
      ) {
        return undefined;
      }


      const section =
        root.closest(
          ".about"
        );


      if (
        !section
      ) {
        return undefined;
      }


      const mediaQuery =
        gsap.matchMedia();


      mediaQuery.add(
        "(max-width: 760px) and (prefers-reduced-motion: no-preference)",
        () => {
          const title =
            root.querySelector(
              "[data-about-mobile-title]"
            );


          const portrait =
            root.querySelector(
              "[data-about-mobile-portrait]"
            );


          const rows =
            Array.from(
              root.querySelectorAll(
                "[data-about-mobile-row]"
              )
            );


          const rowLines =
            rows.map(
              (
                row
              ) =>
                row.querySelector(
                  "[data-about-mobile-row-line]"
                )
            );


          const rowTexts =
            rows.map(
              (
                row
              ) =>
                row.querySelector(
                  "[data-about-mobile-row-text]"
                )
            );


          const topLine =
            root.querySelector(
              '[data-about-mobile-frame-line="top"]'
            );


          const rightLine =
            root.querySelector(
              '[data-about-mobile-frame-line="right"]'
            );


          const bottomLine =
            root.querySelector(
              '[data-about-mobile-frame-line="bottom"]'
            );


          const leftLine =
            root.querySelector(
              '[data-about-mobile-frame-line="left"]'
            );


          const cta =
            root.querySelector(
              "[data-about-mobile-cta]"
            );


          const context =
            gsap.context(
              () => {
                /*
                 * SERVICES → ABOUT
                 * takeover
                 */

                gsap.set(
                  section,
                  {
                    "--about-takeover-opacity":
                      0,
                  }
                );


                const takeoverTimeline =
                  gsap.timeline({
                    defaults: {
                      ease:
                        "none",
                    },

                    scrollTrigger: {
                      id:
                        "about-mobile-takeover",

                      trigger:
                        section,

                      start:
                        "top bottom",

                      end:
                        "top top",

                      scrub:
                        0.45,

                      invalidateOnRefresh:
                        true,
                    },
                  });


                takeoverTimeline.to(
                  section,
                  {
                    "--about-takeover-opacity":
                      1,

                    duration:
                      0.16,
                  }
                );


                takeoverTimeline.to(
                  {},
                  {
                    duration:
                      0.66,
                  }
                );


                takeoverTimeline.to(
                  section,
                  {
                    "--about-takeover-opacity":
                      0,

                    duration:
                      0.18,
                  }
                );


                /*
                 * INITIAL PREMIUM STATE
                 */

                gsap.set(
                  title,
                  {
                    opacity:
                      0,

                    y:
                      16,
                  }
                );


                gsap.set(
                  topLine,
                  {
                    scaleX:
                      0,

                    transformOrigin:
                      "0% 50%",
                  }
                );


                gsap.set(
                  rightLine,
                  {
                    scaleY:
                      0,

                    transformOrigin:
                      "50% 0%",
                  }
                );


                gsap.set(
                  bottomLine,
                  {
                    scaleX:
                      0,

                    transformOrigin:
                      "100% 50%",
                  }
                );


                gsap.set(
                  leftLine,
                  {
                    scaleY:
                      0,

                    transformOrigin:
                      "50% 100%",
                  }
                );


                gsap.set(
                  portrait,
                  {
                    opacity:
                      0,

                    scale:
                      0.985,
                  }
                );


                gsap.set(
                  rowLines,
                  {
                    scaleX:
                      0,

                    transformOrigin:
                      "0% 50%",
                  }
                );


                gsap.set(
                  rowTexts,
                  {
                    opacity:
                      0,

                    y:
                      12,
                  }
                );


                gsap.set(
                  cta,
                  {
                    opacity:
                      0,

                    y:
                      10,
                  }
                );


                /*
                 * About je sada potpuno
                 * preko Services-a.
                 *
                 * Odavde počinje unutrašnja
                 * mobile scena.
                 */

                const timeline =
                  gsap.timeline({
                    defaults: {
                      ease:
                        "none",
                    },

                    scrollTrigger: {
                      id:
                        "about-mobile-premium",

                      trigger:
                        section,

                      start:
                        "top top",

                      end:
                        "bottom bottom",

                      scrub:
                        0.78,

                      invalidateOnRefresh:
                        true,
                    },
                  });


                /*
                 * TITLE
                 */

                timeline.to(
                  title,
                  {
                    opacity:
                      1,

                    y:
                      0,

                    duration:
                      0.52,

                    ease:
                      "power2.out",
                  },
                  0.08
                );


                /*
                 * PORTRAIT FRAME
                 */

                timeline.to(
                  topLine,
                  {
                    scaleX:
                      1,

                    duration:
                      0.7,

                    ease:
                      "power2.inOut",
                  },
                  0.48
                );


                timeline.to(
                  rightLine,
                  {
                    scaleY:
                      1,

                    duration:
                      0.7,

                    ease:
                      "power2.inOut",
                  },
                  0.62
                );


                timeline.to(
                  leftLine,
                  {
                    scaleY:
                      1,

                    duration:
                      0.7,

                    ease:
                      "power2.inOut",
                  },
                  0.72
                );


                timeline.to(
                  bottomLine,
                  {
                    scaleX:
                      1,

                    duration:
                      0.72,

                    ease:
                      "power2.inOut",
                  },
                  0.82
                );


                /*
                 * PORTRAIT
                 */

                timeline.to(
                  portrait,
                  {
                    opacity:
                      1,

                    scale:
                      1,

                    duration:
                      0.72,

                    ease:
                      "power2.out",
                  },
                  1.03
                );


                /*
                 * TEXT ROWS
                 */

                rowLines.forEach(
                  (
                    line,
                    index
                  ) => {
                    const start =
                      1.42 +
                      index *
                        0.48;


                    timeline.to(
                      line,
                      {
                        scaleX:
                          1,

                        duration:
                          0.62,

                        ease:
                          "power2.inOut",
                      },
                      start
                    );


                    timeline.to(
                      rowTexts[
                        index
                      ],
                      {
                        opacity:
                          1,

                        y:
                          0,

                        duration:
                          0.52,

                        ease:
                          "power2.out",
                      },
                      start +
                        0.16
                    );
                  }
                );


                /*
                 * READ MORE
                 */

                timeline.to(
                  cta,
                  {
                    opacity:
                      1,

                    y:
                      0,

                    duration:
                      0.52,

                    ease:
                      "power2.out",
                  },
                  2.94
                );


                timeline.to(
                  {},
                  {
                    duration:
                      0.6,
                  },
                  3.38
                );
              },
              root
            );


          const refreshFrame =
            requestAnimationFrame(
              () => {
                ScrollTrigger.refresh();
              }
            );


          return () => {
            cancelAnimationFrame(
              refreshFrame
            );


            context.revert();
          };
        }
      );


      return () => {
        mediaQuery.revert();
      };
    },
    [
      language,
    ]
  );


  return (
    <div
      ref={
        rootRef
      }
      className="about-mobile"
    >
      <div
        ref={
          panelRef
        }
        className="about-mobile__panel"
      >
        <div className="about-mobile__shell">

          <h2
            className="about-mobile__title"
            data-about-mobile-title
          >
            {text.title}
          </h2>


          <div className="about-mobile__content">

            <div className="about-mobile__portrait">
              <AboutMobileFrame />


              <div
                className="about-mobile__portrait-media"
                data-about-mobile-portrait
              >
                <span>
                  NIKOLA PORTRAIT
                </span>
              </div>
            </div>


            <div className="about-mobile__copy">

              <div className="about-mobile__copy-list">
                {text.paragraphs.map(
                  (
                    paragraph,
                    index
                  ) => (
                    <div
                      key={`${language}-${index}`}
                      className="about-mobile__copy-row"
                      data-about-mobile-row
                    >
                      <span
                        className="about-mobile__copy-line"
                        data-about-mobile-row-line
                        aria-hidden="true"
                      />

                      <p
                        data-about-mobile-row-text
                      >
                        {paragraph}
                      </p>
                    </div>
                  )
                )}
              </div>


              <a
                href="/about"
                className="about-mobile__read-more"
                data-about-mobile-cta
              >
                <span>
                  {text.readMore}
                </span>

                <span
                  aria-hidden="true"
                >
                  →
                </span>
              </a>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}


export default AboutMobile;