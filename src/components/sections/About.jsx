import {

  useLayoutEffect,

  useRef,

} from "react";



import gsap from "gsap";



import {

  ScrollTrigger,

} from "gsap/ScrollTrigger";



import {

  useLanguage,

} from "../../context/LanguageContext";

import AboutMobile
  from "./AboutMobile";



import "../../styles/sections/About.css";





gsap.registerPlugin(

  ScrollTrigger

);





const copy = {

  en: {

    title:

      "ABOUT",



    paragraphs: [

      "Young visual creator and camera enthusiast, driven by curiosity and a love for capturing real moments.",



      "Focused on people, movement and atmosphere, with an instinctive approach to every frame.",



      "Always looking for a stronger image, a better story and a new way to approach each project.",

    ],



    readMore:

      "READ MORE",



    scrollHint:

      "KEEP SCROLLING",

  },





  sr: {

    title:

      "O MENI",



    paragraphs: [

      "Mladi vizuelni stvaralac i zaljubljenik u kameru, vođen radoznalošću i željom da zabeleži stvarne trenutke.",



      "Fokusiran na ljude, pokret i atmosferu, sa prirodnim pristupom svakom kadru.",



      "Uvek u potrazi za snažnijom slikom, boljom pričom i novim načinom da pristupi svakom projektu.",

    ],



    readMore:

      "PROČITAJ VIŠE",



    scrollHint:

      "NASTAVI DA SKROLUJEŠ",

  },

};





function AboutFrame() {

  return (

    <div

      className="about__portrait-frame"

      aria-hidden="true"

    >

      <span

        className="

          about__frame-line

          about__frame-line--top

        "

        data-about-frame-line="top"

      />



      <span

        className="

          about__frame-line

          about__frame-line--right

        "

        data-about-frame-line="right"

      />



      <span

        className="

          about__frame-line

          about__frame-line--bottom

        "

        data-about-frame-line="bottom"

      />



      <span

        className="

          about__frame-line

          about__frame-line--left

        "

        data-about-frame-line="left"

      />

    </div>

  );

}





function About() {

  const {

    language,

  } =

    useLanguage();





  const text =

    copy[

      language

    ] ??

    copy.en;





  const sectionRef =

    useRef(null);





  useLayoutEffect(

    () => {

      const section =

        sectionRef.current;





      if (

        !section

      ) {

        return undefined;

      }





      const isMobile =

        window.matchMedia(

          "(max-width: 760px)"

        ).matches;





      const reducedMotion =

        window.matchMedia(

          "(prefers-reduced-motion: reduce)"

        ).matches;





      if (

        isMobile ||

        reducedMotion

      ) {

        return undefined;

      }





      const context =

        gsap.context(

          () => {

            const title =

              section.querySelector(

                "[data-about-title]"

              );





            const rows =

              Array.from(

                section.querySelectorAll(

                  "[data-about-row]"

                )

              );





            const rowLines =

              rows.map(

                (

                  row

                ) =>

                  row.querySelector(

                    "[data-about-row-line]"

                  )

              );





            const rowTexts =

              rows.map(

                (

                  row

                ) =>

                  row.querySelector(

                    "[data-about-row-text]"

                  )

              );





            const topLine =

              section.querySelector(

                '[data-about-frame-line="top"]'

              );





            const rightLine =

              section.querySelector(

                '[data-about-frame-line="right"]'

              );





            const bottomLine =

              section.querySelector(

                '[data-about-frame-line="bottom"]'

              );





            const leftLine =

              section.querySelector(

                '[data-about-frame-line="left"]'

              );





            const portrait =

              section.querySelector(

                "[data-about-portrait]"

              );





            const cta =

              section.querySelector(

                "[data-about-cta]"

              );





            gsap.set(

              title,

              {

                opacity:

                  0,



                y:

                  18,

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

                  14,

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

              }

            );





            gsap.set(

              cta,

              {

                opacity:

                  0,



                y:

                  12,

              }

            );





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

                    "about-takeover",



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





            const timeline =

              gsap.timeline({

                scrollTrigger: {

                  id:

                    "about-premium",



                  trigger:

                    section,



                  start:

                    "top top",



                  end:

                    () =>

                      `+=${

                        Math.max(

                          1100,

                          window.innerHeight *

                            1.55

                        )

                      }`,



                  scrub:

                    0.85,



                  invalidateOnRefresh:

                    true,

                },

              });





            /*

             * Panel je sada već potpuno

             * preko Services-a.

             *

             * Odavde kreće samo unutrašnja

             * konstrukcija About scene.

             */





            timeline.to(

              title,

              {

                opacity:

                  1,



                y:

                  0,



                duration:

                  0.7,



                ease:

                  "power2.out",

              },

              0.15

            );





            /*

             * Leve tekstualne linije.

             */



            timeline.to(

              rowLines,

              {

                scaleX:

                  1,



                duration:

                  0.95,



                stagger:

                  0.22,



                ease:

                  "power2.inOut",

              },

              0.55

            );





            /*

             * Tekst dolazi malo iza

             * svoje linije.

             */



            timeline.to(

              rowTexts,

              {

                opacity:

                  1,



                y:

                  0,



                duration:

                  0.72,



                stagger:

                  0.22,



                ease:

                  "power2.out",

              },

              0.82

            );





            /*

             * Desno se u isto vreme

             * konstruiše portrait frame.

             */



            timeline.to(

              topLine,

              {

                scaleX:

                  1,



                duration:

                  1,



                ease:

                  "power2.inOut",

              },

              0.62

            );





            timeline.to(

              rightLine,

              {

                scaleY:

                  1,



                duration:

                  0.95,



                ease:

                  "power2.inOut",

              },

              0.82

            );





            timeline.to(

              leftLine,

              {

                scaleY:

                  1,



                duration:

                  0.95,



                ease:

                  "power2.inOut",

              },

              0.96

            );





            timeline.to(

              bottomLine,

              {

                scaleX:

                  1,



                duration:

                  1,



                ease:

                  "power2.inOut",

              },

              1.12

            );





            /*

             * Portret dolazi tek kada je

             * konstrukcija već formirana.

             */



            timeline.to(

              portrait,

              {

                opacity:

                  1,



                duration:

                  0.9,



                ease:

                  "power2.out",

              },

              1.45

            );





            /*

             * READ MORE je poslednja stvar

             * koja ulazi u kadar.

             */



            timeline.to(

              cta,

              {

                opacity:

                  1,



                y:

                  0,



                duration:

                  0.65,



                ease:

                  "power2.out",

              },

              1.78

            );





            /*

             * Mali završni hold unutar

             * same timeline animacije.

             */



            timeline.to(

              {},

              {

                duration:

                  0.55,

              },

              2.43

            );

          },

          section

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

    },

    [

      language,

    ]

  );





  return (

    <section

      ref={

        sectionRef

      }

      className="about"

      id="about"

      data-about-takeover-label={

        text.scrollHint

      }

    >

      <div className="about__panel">

        <div className="about__shell">



          <h2

            className="about__title"

            data-about-title

          >

            {text.title}

          </h2>





          <div className="about__layout">



            <div className="about__copy">



              <div className="about__copy-list">

                {text.paragraphs.map(

                  (

                    paragraph,

                    index

                  ) => (

                    <div

                      key={

                        `${language}-${index}`

                      }

                      className="about__copy-row"

                      data-about-row

                    >

                      <span

                        className="about__copy-line"

                        data-about-row-line

                        aria-hidden="true"

                      />



                      <p

                        data-about-row-text

                      >

                        {paragraph}

                      </p>

                    </div>

                  )

                )}

              </div>





              <a

                href="/about"

                className="about__read-more"

                data-about-cta

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





            <div className="about__portrait">

              <AboutFrame />



              <div

                className="about__portrait-media"

                data-about-portrait

              >

                <span>

                  NIKOLA PORTRAIT

                </span>

              </div>

            </div>



          </div>



        </div>

      </div>

            <AboutMobile
        text={
          text
        }
        language={
          language
        }
      />

    </section>

  );

}





export default About;