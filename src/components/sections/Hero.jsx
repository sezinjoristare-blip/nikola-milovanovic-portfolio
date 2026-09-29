import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useAnimate,
  useReducedMotion,
} from "motion/react";

import OptimizedVideo
  from "../ui/OptimizedVideo";

import translations
  from "../../data/translations";

import {
  useLanguage,
} from "../../context/LanguageContext";

import {
  useIntro,
} from "../../context/IntroContext";

import "../../styles/sections/Hero.css";

import "../../styles/sections/HeroMobile.css";


const HERO_VIDEO_SRC =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";


const HERO_MOBILE_VIDEO_SRC =
  "";


const HERO_POSTER_SRC =
  "";


const TOP_PAIR_SCALE =
  0.78;


function wait(
  milliseconds
) {
  return new Promise(
    (
      resolve
    ) => {
      window.setTimeout(
        resolve,
        milliseconds
      );
    }
  );
}


function nextPaint() {
  return new Promise(
    (
      resolve
    ) => {
      window.requestAnimationFrame(
        () => {
          window.requestAnimationFrame(
            resolve
          );
        }
      );
    }
  );
}


function getCenter(
  rect
) {
  return {
    x:
      rect.left +
      rect.width /
        2,

    y:
      rect.top +
      rect.height /
        2,
  };
}


function Hero() {
  const {
    language,
  } =
    useLanguage();


  const text =
    translations[
      language
    ].hero;


  const navigationText =
    translations[
      language
    ].navigation;


  const {
  headerLogoTargetRef,

  headerContactTargetRef,

  setHeaderNavVisible,

  setHeaderFinalVisible,

  videoVisible,
  setVideoVisible,

  copyVisible,
  setCopyVisible,

  introComplete,
  setIntroComplete,

  shouldPlayIntro,
} =
  useIntro();


  const reducedMotion =
    useReducedMotion();


 const [
  introGone,
  setIntroGone,
] =
  useState(
    () =>
      !shouldPlayIntro ||
      introComplete
  );


const [
  videoShouldPlay,
  setVideoShouldPlay,
] =
  useState(
    () =>
      !shouldPlayIntro ||
      introComplete
  );


  const [
    scope,
    animate,
  ] =
    useAnimate();


  /*
   * ================================================
   * IDENTITY
   * ================================================
   */

  const pairRef =
    useRef(null);


  const identityRef =
    useRef(null);


  const nikolaWordRef =
    useRef(null);


  const milovanovicWordRef =
    useRef(null);


  const nikolaTailRef =
    useRef(null);


  const milovanovicTailRef =
    useRef(null);


  /*
   * ================================================
   * REC / CONTACT
   * ================================================
   */

  const introRecRef =
    useRef(null);


  const recSurfaceRef =
    useRef(null);


  const recTextRef =
    useRef(null);


  const contactTextRef =
    useRef(null);


  const recDotRef =
    useRef(null);


  /*
   * ================================================
   * VIDEO
   * ================================================
   */

  const videoReadyRef =
    useRef(false);


  const videoReadyResolverRef =
    useRef(null);


  function handleVideoReady() {
    videoReadyRef.current =
      true;


    if (
      videoReadyResolverRef
        .current
    ) {
      videoReadyResolverRef
        .current();


      videoReadyResolverRef.current =
        null;
    }
  }


  function waitForVideo() {
    if (
      videoReadyRef.current
    ) {
      return Promise.resolve();
    }


    return new Promise(
      (
        resolve
      ) => {
        let finished =
          false;


        function finish() {
          if (
            finished
          ) {
            return;
          }


          finished =
            true;


          resolve();
        }


        videoReadyResolverRef.current =
          finish;


        /*
         * Ovo sada kreće veoma rano.
         *
         * Zato kasnije ne pravimo
         * novu pauzu čekajući video.
         */

        window.setTimeout(
          finish,
          2600
        );
      }
    );
  }


  useEffect(
    () => {
      let cancelled =
        false;

            /*
     * ================================================
     * INTRO JE VEĆ ODIGRAN
     * ILI APLIKACIJA NIJE UČITANA NA HOME-U
     * ================================================
     */

    if (
      !shouldPlayIntro ||
      introComplete
    ) {
      setHeaderNavVisible(
        true
      );


      setHeaderFinalVisible(
        true
      );


      setVideoShouldPlay(
        true
      );


      setVideoVisible(
        true
      );


      setCopyVisible(
        true
      );


      setIntroGone(
        true
      );


      if (
        !introComplete
      ) {
        setIntroComplete(
          true
        );
      }


      return undefined;
    }

      /*
       * ================================================
       * VIDEO ENTRANCE
       * ================================================
       */

      async function runVideoEntrance(
        readyPromise
      ) {
        await readyPromise;


        if (
          cancelled
        ) {
          return;
        }


        /*
         * Video prvo stvarno krene.
         */

        setVideoShouldPlay(
          true
        );


        /*
         * Samo nekoliko frameova
         * kasnije otvaramo platno.
         */

        await wait(
          55
        );


        if (
          cancelled
        ) {
          return;
        }


        setVideoVisible(
          true
        );


        /*
         * Video dobije trenutak
         * pre tipografije.
         */

        await wait(
          420
        );


        if (
          cancelled
        ) {
          return;
        }


        setCopyVisible(
          true
        );
      }


      async function runIntro() {
        await nextPaint();


        if (
          cancelled
        ) {
          return;
        }


        /*
         * Video počinjemo da čekamo
         * ODMAH.
         *
         * Ne tek kada stignemo do
         * kraja introa.
         */

        const videoReadyPromise =
          waitForVideo();


        /*
         * ================================================
         * REDUCED MOTION
         * ================================================
         */

        if (
          reducedMotion
        ) {
          setHeaderNavVisible(
            true
          );


          setHeaderFinalVisible(
            true
          );


          setIntroGone(
            true
          );


          await videoReadyPromise;


          setVideoShouldPlay(
            true
          );


          setVideoVisible(
            true
          );


          setCopyVisible(
            true
          );


          setIntroComplete(
            true
          );


          return;
        }


        const identity =
          identityRef.current;


        const nikolaWord =
          nikolaWordRef.current;


        const milovanovicWord =
          milovanovicWordRef.current;


        const nikolaTail =
          nikolaTailRef.current;


        const milovanovicTail =
          milovanovicTailRef.current;


        const pair =
          pairRef.current;


        const introRec =
          introRecRef.current;


        const recSurface =
          recSurfaceRef.current;


        const logoTarget =
          headerLogoTargetRef.current;


        const contactTarget =
          headerContactTargetRef.current;


        if (
          !identity ||
          !nikolaWord ||
          !milovanovicWord ||
          !nikolaTail ||
          !milovanovicTail ||
          !pair ||
          !introRec ||
          !recSurface ||
          !logoTarget ||
          !contactTarget
        ) {
          return;
        }


        /*
         * ================================================
         * 01 — IME
         *
         * Nikola dolazi odozgo.
         * Milovanovic odozdo.
         *
         * Nema pravog zaustavljanja.
         * Ime se pred kraj samo veoma
         * nežno uspori, dovoljno da se
         * lepo pročita, a zatim se
         * sledeća faza već preklapa.
         * ================================================
         */

        await wait(
          110
        );


        if (
          cancelled
        ) {
          return;
        }


        /*
         * Širine spremamo PRE
         * vidljive animacije.
         *
         * Tako između imena i
         * collapse-a nema dodatnog
         * merenja ni nextPaint pauze.
         */

        const nikolaTailWidth =
          nikolaTail
            .getBoundingClientRect()
            .width;


        const milovanovicTailWidth =
          milovanovicTail
            .getBoundingClientRect()
            .width;


        nikolaTail.style.width =
          `${nikolaTailWidth}px`;


        milovanovicTail.style.width =
          `${milovanovicTailWidth}px`;


           const nameDuration =
          1.07;


        /*
         * Jedan potpuno gladak potez.
         *
         * Motion uzima trenutnu CSS
         * poziciju Nikole i Milovanovica
         * i vodi ih direktno do centra.
         *
         * Nema međuključnih tačaka,
         * nema promene brzine usred puta.
         */

        const nikolaEntrance =
          animate(
            nikolaWord,
            {
              opacity:
                1,

              y:
                0,
            },
            {
              duration:
                nameDuration,

              ease:
                [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
            }
          );


        const milovanovicEntrance =
          animate(
            milovanovicWord,
            {
              opacity:
                1,

              y:
                0,
            },
            {
              duration:
                nameDuration,

              ease:
                [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
            }
          );


        /*
         * Ne koristimo više ručni
         * wait(1070).
         *
         * Čekamo stvarni kraj oba
         * pokreta i odmah nastavljamo.
         */

        await Promise.all([
          nikolaEntrance,
          milovanovicEntrance,
        ]);


        if (
          cancelled
        ) {
          return;
        }

        /*
         * ================================================
         * 02 — NIKOLA MILOVANOVIC → NM
         * ================================================
         */

        const tailsDuration =
          0.64;


        const collapseAnimation =
          Promise.all([
            animate(
              nikolaTail,
              {
                width:
                  0,

                x: [
                  0,
                  -3,
                  -9,
                ],

                opacity: [
                  1,
                  0.96,
                  0,
                ],
              },
              {
                duration:
                  tailsDuration,

                times: [
                  0,
                  0.72,
                  1,
                ],

                ease:
                  [
                    0.2,
                    0.8,
                    0.2,
                    1,
                  ],
              }
            ),


            animate(
              milovanovicTail,
              {
                width:
                  0,

                x: [
                  0,
                  -4,
                  -10,
                ],

                opacity: [
                  1,
                  0.96,
                  0,
                ],
              },
              {
                duration:
                  tailsDuration,

                times: [
                  0,
                  0.72,
                  1,
                ],

                ease:
                  [
                    0.2,
                    0.8,
                    0.2,
                    1,
                  ],
              }
            ),


            animate(
              identity,
              {
                columnGap:
                  "3px",
              },
              {
                duration:
                  tailsDuration,

                ease:
                  [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
              }
            ),
          ]);


        /*
         * ================================================
         * 03 — REC POČINJE PRE KRAJA COLLAPSE-A
         *
         * Još jedno preklapanje.
         *
         * Dok se poslednja mala slova
         * povlače, REC već nastaje.
         * ================================================
         */

        await wait(
          390
        );


        if (
          cancelled
        ) {
          return;
        }


        const recEntrance =
          Promise.all([
            animate(
              introRec,
              {
                opacity: [
                  0,
                  1,
                ],

                x: [
                  -7,
                  0,
                ],
              },
              {
                duration:
                  0.36,

                ease:
                  [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
              }
            ),


            animate(
              recDotRef.current,
              {
                scale: [
                  0.78,
                  1.1,
                  1,
                ],

                opacity: [
                  0,
                  1,
                  1,
                ],
              },
              {
                duration:
                  0.36,

                times: [
                  0,
                  0.7,
                  1,
                ],

                ease:
                  [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
              }
            ),
          ]);


        /*
         * Sve tri faze zajedno
         * završavaju.
         *
         * Tek tada nam treba konačna
         * geometrija za put ka headeru.
         */

        await Promise.all([
          nikolaEntrance,
          milovanovicEntrance,
          collapseAnimation,
          recEntrance,
        ]);


        if (
          cancelled
        ) {
          return;
        }


        /*
         * ================================================
         * 04 — MERENJE
         *
         * Nema dodatnog wait-a.
         *
         * NM + REC su formirani
         * i ODMAH nastavljaju.
         * ================================================
         */

        const pairRect =
          pair
            .getBoundingClientRect();


        const identityRect =
          identity
            .getBoundingClientRect();


        const recRect =
          introRec
            .getBoundingClientRect();


        const logoTargetRect =
          logoTarget
            .getBoundingClientRect();


        const contactTargetRect =
          contactTarget
            .getBoundingClientRect();


        const pairCenter =
          getCenter(
            pairRect
          );


        const identityCenter =
          getCenter(
            identityRect
          );


        const recCenter =
          getCenter(
            recRect
          );


        const logoTargetCenter =
          getCenter(
            logoTargetRect
          );


        const contactTargetCenter =
          getCenter(
            contactTargetRect
          );


        const headerRowY =
          (
            logoTargetCenter.y +
            contactTargetCenter.y
          ) /
          2;


        const verticalTravel =
          headerRowY -
          pairCenter.y;


        const projectedIdentityCenter = {
          x:
            pairCenter.x +
            (
              identityCenter.x -
              pairCenter.x
            ) *
              TOP_PAIR_SCALE,

          y:
            pairCenter.y +
            verticalTravel +
            (
              identityCenter.y -
              pairCenter.y
            ) *
              TOP_PAIR_SCALE,
        };


        const projectedRecCenter = {
          x:
            pairCenter.x +
            (
              recCenter.x -
              pairCenter.x
            ) *
              TOP_PAIR_SCALE,

          y:
            pairCenter.y +
            verticalTravel +
            (
              recCenter.y -
              pairCenter.y
            ) *
              TOP_PAIR_SCALE,
        };


        const logoX =
          (
            logoTargetCenter.x -
            projectedIdentityCenter.x
          ) /
          TOP_PAIR_SCALE;


        const logoY =
          (
            logoTargetCenter.y -
            projectedIdentityCenter.y
          ) /
          TOP_PAIR_SCALE;


        const recX =
          (
            contactTargetCenter.x -
            projectedRecCenter.x
          ) /
          TOP_PAIR_SCALE;


        const recY =
          (
            contactTargetCenter.y -
            projectedRecCenter.y
          ) /
          TOP_PAIR_SCALE;


        const projectedLogoWidth =
          identityRect.width *
          TOP_PAIR_SCALE;


        const logoFinalScale =
          logoTargetRect.width /
          projectedLogoWidth;


        const projectedRecWidth =
          recRect.width *
          TOP_PAIR_SCALE;


        const projectedRecHeight =
          recRect.height *
          TOP_PAIR_SCALE;


        const contactScaleX =
          contactTargetRect.width /
          projectedRecWidth;


        const contactScaleY =
          contactTargetRect.height /
          projectedRecHeight;


        /*
         * ================================================
         * 05 — NM + REC ZAJEDNO GORE
         * ================================================
         */

        const riseAnimation =
          animate(
            pair,
            {
              y:
                verticalTravel,

              scale:
                TOP_PAIR_SCALE,
            },
            {
              duration:
                1.3,

              ease:
                [
                  0.2,
                  0.82,
                  0.22,
                  1,
                ],
            }
          );


        /*
         * Opet ne čekamo kraj.
         *
         * Pred sam vrh počinjemo
         * razdvajanje.
         */

        await wait(
          1040
        );


        if (
          cancelled
        ) {
          return;
        }


        /*
         * ================================================
         * 06 — RAZDVAJANJE
         * ================================================
         */

        const splitDuration =
          1.12;


        const logoTravel =
          animate(
            identity,
            {
              x:
                logoX,

              y:
                logoY,

              scale:
                logoFinalScale,
            },
            {
              duration:
                splitDuration,

              ease:
                [
                  0.19,
                  1,
                  0.22,
                  1,
                ],
            }
          );


        const recTravel =
          animate(
            introRec,
            {
              x:
                recX,

              y:
                recY,
            },
            {
              duration:
                splitDuration,

              ease:
                [
                  0.19,
                  1,
                  0.22,
                  1,
                ],
            }
          );


        /*
         * Header počinje skoro odmah
         * nakon otvaranja prostora.
         */

        await wait(
          150
        );


        if (
          cancelled
        ) {
          return;
        }


        setHeaderNavVisible(
          true
        );


        /*
         * ================================================
         * 07 — REC → CONTACT
         * ================================================
         */

        await wait(
          275
        );


        if (
          cancelled
        ) {
          return;
        }


        const recMorph =
          Promise.all([
            animate(
              recSurface,
              {
                scaleX:
                  contactScaleX,

                scaleY:
                  contactScaleY,

                backgroundColor:
                  "#111111",

                opacity:
                  1,
              },
              {
                duration:
                  0.45,

                ease:
                  [
                    0.19,
                    1,
                    0.22,
                    1,
                  ],
              }
            ),


            animate(
              recTextRef.current,
              {
                opacity:
                  0,

                scale:
                  0.94,
              },
              {
                duration:
                  0.24,

                ease:
                  "easeOut",
              }
            ),


            animate(
              recDotRef.current,
              {
                opacity:
                  0,

                scale:
                  0.58,
              },
              {
                duration:
                  0.22,

                ease:
                  "easeOut",
              }
            ),


            animate(
              contactTextRef.current,
              {
                opacity: [
                  0,
                  0,
                  1,
                ],

                scale: [
                  0.97,
                  0.97,
                  1,
                ],
              },
              {
                duration:
                  0.45,

                times: [
                  0,
                  0.3,
                  1,
                ],

                ease:
                  [
                    0.19,
                    1,
                    0.22,
                    1,
                  ],
              }
            ),
          ]);


        /*
         * ================================================
         * 08 — VIDEO PRE FINALNOG LANDINGA
         * ================================================
         */

        await wait(
          195
        );


        if (
          cancelled
        ) {
          return;
        }


        const videoEntrance =
          runVideoEntrance(
            videoReadyPromise
          );


        /*
         * Čekamo stvarne animacije,
         * ne veštačke pauze.
         */

        await Promise.all([
          riseAnimation,
          logoTravel,
          recTravel,
          recMorph,
        ]);


        if (
          cancelled
        ) {
          return;
        }


        /*
         * ================================================
         * 09 — HEADER HANDOFF
         * ================================================
         */

        setHeaderFinalVisible(
          true
        );


        await nextPaint();


        await Promise.all([
          animate(
            identity,
            {
              opacity:
                0,
            },
            {
              duration:
                0.18,

              ease:
                "linear",
            }
          ),


          animate(
            introRec,
            {
              opacity:
                0,
            },
            {
              duration:
                0.18,

              ease:
                "linear",
            }
          ),
        ]);


        setIntroGone(
          true
        );


        await videoEntrance;


        if (
          cancelled
        ) {
          return;
        }


        /*
         * Nema potrebe za velikim
         * završnim zastojem.
         */

        await wait(
          100
        );


        if (
          cancelled
        ) {
          return;
        }


        setIntroComplete(
          true
        );
      }


      runIntro();


      return () => {
        cancelled =
          true;
      };
    },
    [
  animate,
  headerContactTargetRef,
  headerLogoTargetRef,
  introComplete,
  reducedMotion,
  setCopyVisible,
  setHeaderFinalVisible,
  setHeaderNavVisible,
  setIntroComplete,
  setVideoVisible,
  shouldPlayIntro,
]
  );


  return (
    <section
      className={
        [
          "hero",

          videoVisible
            ? "hero--video-visible"
            : "",

          copyVisible
            ? "hero--copy-visible"
            : "",
        ]
          .filter(
            Boolean
          )
          .join(
            " "
          )
      }
      id="top"
    >

      {/* =================================================
          VIDEO
          ================================================= */}

      <div className="hero__canvas">

        <div className="hero__video-stage">
          <OptimizedVideo
            src={
              HERO_VIDEO_SRC
            }
            mobileSrc={
              HERO_MOBILE_VIDEO_SRC
            }
            poster={
              HERO_POSTER_SRC
            }
            alt="NM Visual showreel"
            eager
            controlledPlayback
            playing={
              videoShouldPlay
            }
            restartOnPlay
            onReady={
              handleVideoReady
            }
          />
        </div>


        {/* =================================================
            COPY
            ================================================= */}

        <div
          className="hero__copy"
          key={
            language
          }
        >
          <h1>

            <span className="hero__title-line">
              {
                text.firstBefore
              }

              {
                text.firstBefore
                  ? " "
                  : ""
              }

              <em>
                {
                  text.firstAccent
                }
              </em>
            </span>


            <span className="hero__title-line">
              {
                text.secondBefore
              }

              {" "}

              <em>
                {
                  text.secondAccent
                }
              </em>
            </span>

          </h1>


          <div className="hero__subtitle">
            <p>
              {text.services}
            </p>

            <span>
              {text.location}
            </span>
          </div>

        </div>

      </div>


      {/* =================================================
          INTRO
          ================================================= */}

      {!introGone ? (
        <div
          ref={
            scope
          }
          className="hero-intro"
        >

          <div
            ref={
              pairRef
            }
            className="hero-intro__pair"
          >

            {/* =============================================
                NIKOLA MILOVANOVIC → NM
                ============================================= */}

            <div
              ref={
                identityRef
              }
              className="hero-intro__identity"
            >

              <span
                ref={
                  nikolaWordRef
                }
                className="hero-intro__word hero-intro__word--nikola"
              >

                <span className="hero-intro__initial">
                  N
                </span>


                <span
                  ref={
                    nikolaTailRef
                  }
                  className="hero-intro__tail"
                >
                  ikola
                </span>

              </span>


              <span
                ref={
                  milovanovicWordRef
                }
                className="hero-intro__word hero-intro__word--milovanovic"
              >

                <span className="hero-intro__initial">
                  M
                </span>


                <span
                  ref={
                    milovanovicTailRef
                  }
                  className="hero-intro__tail"
                >
                  ilovanovic
                </span>

              </span>

            </div>


            {/* =============================================
                REC
                ============================================= */}

            <div className="hero-intro__rec-anchor">

              <div
                ref={
                  introRecRef
                }
                className="hero-intro__rec"
              >

                <span
                  ref={
                    recSurfaceRef
                  }
                  className="hero-intro__rec-surface"
                />


                <span
                  ref={
                    recTextRef
                  }
                  className="hero-intro__rec-label"
                >
                  <i
                    ref={
                      recDotRef
                    }
                  />

                  REC
                </span>


                <span
                  ref={
                    contactTextRef
                  }
                  className="hero-intro__contact-label"
                >
                  {
                    navigationText
                      .contact
                  }
                </span>

              </div>

            </div>

          </div>

        </div>
      ) : null}

    </section>
  );
}


export default Hero;