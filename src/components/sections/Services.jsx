import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";

import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

import OptimizedVideo
  from "../ui/OptimizedVideo";

import ServicesMobile
  from "./ServicesMobile";

import services
  from "../../data/services";

import translations
  from "../../data/translations";

import {
  useLanguage,
} from "../../context/LanguageContext";

import "../../styles/sections/Services.css";


gsap.registerPlugin(
  ScrollTrigger
);


function ServicePlaceholder({
  label,
}) {
  return (
    <div className="services__placeholder">
      <span>
        {label}
      </span>
    </div>
  );
}


function ServiceMedia({
  media,
  playing = false,
}) {
  if (
    media.kind ===
    "photo"
  ) {
    const imageSrc =
      media.imageSrc ||
      media.posterSrc ||
      "";

    if (
      !imageSrc
    ) {
      return (
        <ServicePlaceholder
          label={
            media.label ||
            "PHOTO"
          }
        />
      );
    }

    return (
      <img
        src={
          imageSrc
        }
        alt={
          media.alt ||
          "Photography"
        }
        loading="lazy"
        draggable="false"
      />
    );
  }

  if (
    !media.videoSrc
  ) {
    return (
      <ServicePlaceholder
        label={
          media.label ||
          "VIDEO"
        }
      />
    );
  }

  return (
    <OptimizedVideo
      src={
        media.videoSrc
      }
      mobileSrc={
        media.mobileVideoSrc
      }
      poster={
        media.posterSrc
      }
      alt={
        media.alt ||
        "Video"
      }
      controlledPlayback
      playing={
        playing
      }
      restartOnPlay
    />
  );
}


function ServiceFrame() {
  return (
    <div
      className="services__frame"
      aria-hidden="true"
    >
      <span
        className="
          services__frame-line
          services__frame-line--top
        "
        data-services-line="top"
      />

      <span
        className="
          services__frame-line
          services__frame-line--right
        "
        data-services-line="right"
      />

      <span
        className="
          services__frame-line
          services__frame-line--bottom
        "
        data-services-line="bottom"
      />

      <span
        className="
          services__frame-line
          services__frame-line--left
        "
        data-services-line="left"
      />
    </div>
  );
}


function DesktopMediaCard({
  media,
  playing,
}) {
  return (
    <div
      className={`
        services__media-card
        services__media-card--${media.kind}
      `}
      data-services-media-card
    >
      <ServiceFrame />

      <div
        className="services__media-content"
        data-services-media
      >
        <ServiceMedia
          media={
            media
          }
          playing={
            playing
          }
        />
      </div>
    </div>
  );
}


function DesktopServiceStage({
  service,
  isActive,
  text,
}) {
  return (
    <article
      className={`
        services__stage
        services__stage--${service.layout}
      `}
      data-services-stage
      aria-hidden={
        !isActive
      }
    >
      <div
        className="services__copy"
        data-services-copy
      >
        <div className="services__stage-id">
          <span>
            {service.number}
          </span>

          <strong>
            {service.title}
          </strong>
        </div>

        <div className="services__way">
          <p className="services__column-label">
            {text.choose}
          </p>

          <div className="services__way-card">
            <span>
              {service.workMode}
            </span>

            <p>
              {service.description}
            </p>
          </div>
        </div>

        <div className="services__offer">
          <p className="services__column-label">
            {text.offer}
          </p>

          <div className="services__offer-list">
            {service.offers.map(
              (
                offer
              ) => (
                <span
                  key={
                    offer
                  }
                >
                  {offer}
                </span>
              )
            )}
          </div>

          <a
            href="#contact"
            className="services__cta"
          >
            {text.cta}

            <span
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </div>
      </div>

      <div
        className="services__process"
        data-services-process
      >
        <span className="services__process-label">
          {text.process}
        </span>

        <div className="services__process-steps">
          {text.processSteps.map(
            (
              step,
              index
            ) => (
              <span
                key={
                  step
                }
              >
                <small>
                  {String(
                    index + 1
                  ).padStart(
                    2,
                    "0"
                  )}
                </small>

                {step}
              </span>
            )
          )}
        </div>
      </div>

      <div
        className={`
          services__media-layout
          services__media-layout--${service.layout}
        `}
        data-services-media-layout
      >
        {service.media.map(
          (
            media
          ) => (
            <DesktopMediaCard
              key={
                media.id
              }
              media={
                media
              }
              playing={
                isActive
              }
            />
          )
        )}
      </div>
    </article>
  );
}


function MobileServicePreview({
  media,
}) {
  const rootRef =
    useRef(null);

  const [
    playing,
    setPlaying,
  ] =
    useState(false);

  const isVideo =
    media.kind !==
    "photo";

  useEffect(
    () => {
      if (
        !isVideo ||
        !media.videoSrc
      ) {
        return undefined;
      }

      const root =
        rootRef.current;

      if (
        !root ||
        typeof IntersectionObserver ===
          "undefined"
      ) {
        return undefined;
      }

      const observer =
        new IntersectionObserver(
          (
            entries
          ) => {
            const entry =
              entries[0];

            setPlaying(
              Boolean(
                entry?.isIntersecting &&
                entry.intersectionRatio >=
                  0.58
              )
            );
          },
          {
            threshold: [
              0,
              0.58,
              0.8,
            ],

            rootMargin:
              "-10% 0px -10% 0px",
          }
        );

      observer.observe(
        root
      );

      return () => {
        observer.disconnect();
      };
    },
    [
      isVideo,
      media.videoSrc,
    ]
  );

  return (
    <div
      ref={
        rootRef
      }
      className={`
        services__mobile-media
        services__mobile-media--${media.kind}
      `}
    >
      <ServiceFrame />

      <div className="services__mobile-media-content">
        <ServiceMedia
          media={
            media
          }
          playing={
            playing
          }
        />
      </div>
    </div>
  );
}


function MobileServices({
  text,
}) {
  return (
    <div className="services__mobile">
      <h2 className="services__mobile-title">
        {text.heading}
      </h2>

      <div className="services__mobile-list">
        {services.map(
          (
            service
          ) => {
            const featuredMedia =
              service.media[0];

            return (
              <article
                key={
                  service.id
                }
                className="services__mobile-stage"
              >
                <div className="services__mobile-stage-heading">
                  <span>
                    {service.number}
                  </span>

                  <h3>
                    {service.title}
                  </h3>
                </div>

                <div className="services__mobile-copy">
                  <div>
                    <small>
                      {text.choose}
                    </small>

                    <strong>
                      {service.workMode}
                    </strong>
                  </div>

                  <div>
                    <small>
                      {text.offer}
                    </small>

                    <p>
                      {service.offers.join(
                        " / "
                      )}
                    </p>
                  </div>
                </div>

                {featuredMedia ? (
                  <MobileServicePreview
                    media={
                      featuredMedia
                    }
                  />
                ) : null}

                <p className="services__mobile-description">
                  {service.description}
                </p>
              </article>
            );
          }
        )}
      </div>

      <a
        href="/services"
        className="services__mobile-more"
      >
        {text.more}

        <span
          aria-hidden="true"
        >
          ↗
        </span>
      </a>
    </div>
  );
}


function Services() {
  const {
    language,
  } =
    useLanguage();

  const text =
    translations[
      language
    ].services;

  const localizedServices =
    services.map(
      (
        service
      ) => {
        const itemText =
          text.items?.[
            service.id
          ] ??
          {};

        return {
          ...service,

          title:
            itemText.title ??
            service.title,

          workMode:
            itemText.workMode ??
            service.workMode,

          description:
            itemText.description ??
            service.description,

          offers:
            itemText.offers ??
            service.offers,

          media:
            service.media.map(
              (
                media,
                index
              ) => ({
                ...media,

                label:
                  itemText.mediaLabels?.[
                    index
                  ] ??
                  media.label,

                alt:
                  itemText.mediaAlts?.[
                    index
                  ] ??
                  media.alt,
              })
            ),
        };
      }
    );

  const desktopRef =
    useRef(null);

  const sceneRef =
    useRef(null);

  const activeStageRef =
    useRef(0);

  const [
    activeStageIndex,
    setActiveStageIndex,
  ] =
    useState(0);


  useLayoutEffect(
    () => {
      const desktop =
        desktopRef.current;

      const scene =
        sceneRef.current;

      if (
        !desktop ||
        !scene
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


      function getScrollDistance() {
        return Math.max(
          5600,
          window.innerHeight *
            7.2
        );
      }


      function syncScrollDistance() {
        desktop.style.setProperty(
          "--services-scroll-distance",
          `${getScrollDistance()}px`
        );
      }


      syncScrollDistance();


      ScrollTrigger.addEventListener(
        "refreshInit",
        syncScrollDistance
      );


      const stageElements =
        Array.from(
          scene.querySelectorAll(
            "[data-services-stage]"
          )
        );


      const finale =
        scene.querySelector(
          "[data-services-finale]"
        );


      if (
        stageElements.length !==
          services.length ||
        !finale
      ) {
        ScrollTrigger.removeEventListener(
          "refreshInit",
          syncScrollDistance
        );

        return undefined;
      }


      function getStageParts(
        stage
      ) {
        const cards =
          Array.from(
            stage.querySelectorAll(
              "[data-services-media-card]"
            )
          );

        return {
          stage,

          copy:
            stage.querySelector(
              "[data-services-copy]"
            ),

          process:
            stage.querySelector(
              "[data-services-process]"
            ),

          media:
            cards.map(
              (
                card
              ) =>
                card.querySelector(
                  "[data-services-media]"
                )
            ),

          topLines:
            cards.map(
              (
                card
              ) =>
                card.querySelector(
                  '[data-services-line="top"]'
                )
            ),

          rightLines:
            cards.map(
              (
                card
              ) =>
                card.querySelector(
                  '[data-services-line="right"]'
                )
            ),

          bottomLines:
            cards.map(
              (
                card
              ) =>
                card.querySelector(
                  '[data-services-line="bottom"]'
                )
            ),

          leftLines:
            cards.map(
              (
                card
              ) =>
                card.querySelector(
                  '[data-services-line="left"]'
                )
            ),
        };
      }


      const stages =
        stageElements.map(
          getStageParts
        );


      function updateActiveStage(
        nextIndex
      ) {
        if (
          activeStageRef.current ===
          nextIndex
        ) {
          return;
        }

        activeStageRef.current =
          nextIndex;

        setActiveStageIndex(
          nextIndex
        );
      }


      const context =
        gsap.context(
          () => {
            stages.forEach(
              (
                parts,
                index
              ) => {
                gsap.set(
                  parts.stage,
                  {
                    autoAlpha:
                      index === 0
                        ? 1
                        : 0,

                    pointerEvents:
                      index === 0
                        ? "auto"
                        : "none",
                  }
                );

                gsap.set(
                  parts.copy,
                  {
                    opacity:
                      0,

                    y:
                      14,
                  }
                );

                gsap.set(
                  parts.process,
                  {
                    opacity:
                      0,

                    y:
                      8,
                  }
                );

                gsap.set(
                  parts.media,
                  {
                    opacity:
                      0,

                    y:
                      7,

                    clipPath:
                      "inset(0% 0% 7% 0%)",
                  }
                );

                gsap.set(
                  parts.topLines,
                  {
                    opacity:
                      1,

                    scaleX:
                      0,

                    transformOrigin:
                      "0% 50%",
                  }
                );

                gsap.set(
                  parts.rightLines,
                  {
                    opacity:
                      1,

                    scaleY:
                      0,

                    transformOrigin:
                      "50% 0%",
                  }
                );

                gsap.set(
                  parts.bottomLines,
                  {
                    opacity:
                      1,

                    scaleX:
                      0,

                    transformOrigin:
                      "100% 50%",
                  }
                );

                gsap.set(
                  parts.leftLines,
                  {
                    opacity:
                      1,

                    scaleY:
                      0,

                    transformOrigin:
                      "50% 100%",
                  }
                );
              }
            );


            gsap.set(
              finale,
              {
                autoAlpha:
                  0,

                y:
                  18,

                pointerEvents:
                  "none",
              }
            );


            function drawStage(
              timeline,
              parts,
              start
            ) {
              timeline.set(
                parts.stage,
                {
                  autoAlpha:
                    1,

                  pointerEvents:
                    "auto",
                },
                start
              );

              timeline.to(
                parts.topLines,
                {
                  scaleX:
                    1,

                  duration:
                    0.95,

                  stagger:
                    0.045,

                  ease:
                    "power2.inOut",
                },
                start +
                  0.1
              );

              timeline.to(
                parts.leftLines,
                {
                  scaleY:
                    1,

                  duration:
                    0.92,

                  stagger:
                    0.045,

                  ease:
                    "power2.inOut",
                },
                start +
                  0.18
              );

              timeline.to(
                parts.rightLines,
                {
                  scaleY:
                    1,

                  duration:
                    0.92,

                  stagger:
                    0.045,

                  ease:
                    "power2.inOut",
                },
                start +
                  0.28
              );

              timeline.to(
                parts.bottomLines,
                {
                  scaleX:
                    1,

                  duration:
                    0.95,

                  stagger:
                    0.045,

                  ease:
                    "power2.inOut",
                },
                start +
                  0.38
              );

              timeline.to(
                parts.copy,
                {
                  opacity:
                    1,

                  y:
                    0,

                  duration:
                    0.72,

                  ease:
                    "power2.out",
                },
                start +
                  0.3
              );

              timeline.to(
                parts.process,
                {
                  opacity:
                    1,

                  y:
                    0,

                  duration:
                    0.68,

                  ease:
                    "power2.out",
                },
                start +
                  0.46
              );

              timeline.to(
                parts.media,
                {
                  opacity:
                    1,

                  y:
                    0,

                  clipPath:
                    "inset(0% 0% 0% 0%)",

                  duration:
                    0.95,

                  stagger:
                    0.04,

                  ease:
                    "power2.out",
                },
                start +
                  1.05
              );
            }


            function collapseStage(
              timeline,
              parts,
              start
            ) {
              timeline.to(
                parts.copy,
                {
                  opacity:
                    0,

                  y:
                    -10,

                  duration:
                    0.58,

                  ease:
                    "power2.in",
                },
                start
              );

              timeline.to(
                parts.process,
                {
                  opacity:
                    0,

                  y:
                    -6,

                  duration:
                    0.52,

                  ease:
                    "power2.in",
                },
                start +
                  0.06
              );

              timeline.to(
                parts.media,
                {
                  opacity:
                    0,

                  y:
                    -4,

                  clipPath:
                    "inset(6% 0% 0% 0%)",

                  duration:
                    0.62,

                  stagger: {
                    each:
                      0.03,

                    from:
                      "end",
                  },

                  ease:
                    "power2.in",
                },
                start +
                  0.14
              );

              timeline.to(
                parts.bottomLines,
                {
                  scaleX:
                    0,

                  duration:
                    0.78,

                  stagger: {
                    each:
                      0.035,

                    from:
                      "end",
                  },

                  ease:
                    "power2.inOut",
                },
                start +
                  0.32
              );

              timeline.to(
                parts.rightLines,
                {
                  scaleY:
                    0,

                  duration:
                    0.78,

                  stagger: {
                    each:
                      0.035,

                    from:
                      "end",
                  },

                  ease:
                    "power2.inOut",
                },
                start +
                  0.4
              );

              timeline.to(
                parts.leftLines,
                {
                  scaleY:
                    0,

                  duration:
                    0.78,

                  stagger: {
                    each:
                      0.035,

                    from:
                      "end",
                  },

                  ease:
                    "power2.inOut",
                },
                start +
                  0.48
              );

              timeline.to(
                parts.topLines,
                {
                  scaleX:
                    0,

                  duration:
                    0.78,

                  stagger: {
                    each:
                      0.035,

                    from:
                      "end",
                  },

                  ease:
                    "power2.inOut",
                },
                start +
                  0.56
              );

              timeline.set(
                parts.stage,
                {
                  autoAlpha:
                    0,

                  pointerEvents:
                    "none",
                },
                start +
                  1.75
              );
            }


            const timeline =
              gsap.timeline({
                defaults: {
                  ease:
                    "none",
                },

                scrollTrigger: {
                  id:
                    "services-premium",

                  trigger:
                    desktop,

                  start:
                    "top top",

                  end:
                    () =>
                      `+=${getScrollDistance()}`,

                  scrub:
                    0.9,

                  invalidateOnRefresh:
                    true,

                  onUpdate:
                    (
                      self
                    ) => {
                      const progress =
                        self.progress;

                      if (
                        progress <
                        0.29
                      ) {
                        updateActiveStage(
                          0
                        );
                      } else if (
                        progress <
                        0.57
                      ) {
                        updateActiveStage(
                          1
                        );
                      } else if (
                        progress <
                        0.84
                      ) {
                        updateActiveStage(
                          2
                        );
                      } else {
                        updateActiveStage(
                          -1
                        );
                      }
                    },
                },
              });


            drawStage(
              timeline,
              stages[0],
              0
            );

            timeline.to(
              {},
              {
                duration:
                  1.45,
              },
              2
            );

            collapseStage(
              timeline,
              stages[0],
              3.45
            );

            drawStage(
              timeline,
              stages[1],
              5.55
            );

            timeline.to(
              {},
              {
                duration:
                  1.55,
              },
              7.55
            );

            collapseStage(
              timeline,
              stages[1],
              9.1
            );

            drawStage(
              timeline,
              stages[2],
              11.2
            );

            timeline.to(
              {},
              {
                duration:
                  1.8,
              },
              13.2
            );

            collapseStage(
              timeline,
              stages[2],
              15
            );

            timeline.set(
              finale,
              {
                pointerEvents:
                  "auto",
              },
              17.05
            );

            timeline.to(
              finale,
              {
                autoAlpha:
                  1,

                y:
                  0,

                duration:
                  0.85,

                ease:
                  "power2.out",
              },
              17.15
            );

            timeline.to(
              {},
              {
                duration:
                  2.1,
              },
              18
            );
          },
          desktop
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

        ScrollTrigger.removeEventListener(
          "refreshInit",
          syncScrollDistance
        );

        desktop.style.removeProperty(
          "--services-scroll-distance"
        );

        context.revert();
      };
    },
    []
  );


  return (
    <section
      className="services"
      id="services"
    >
      <div
        ref={
          desktopRef
        }
        className="services__desktop"
      >
        <div
          ref={
            sceneRef
          }
          className="services__scene"
        >
          <div className="services__scene-inner">
            <h2 className="services__title">
              {text.heading}
            </h2>

            <div className="services__stage-stack">
              {localizedServices.map(
                (
                  service,
                  index
                ) => (
                  <DesktopServiceStage
                    key={
                      service.id
                    }
                    service={
                      service
                    }
                    isActive={
                      activeStageIndex ===
                      index
                    }
                    text={
                      text
                    }
                  />
                )
              )}

              <div
                className="services__finale"
                data-services-finale
              >
                <a
                  href="/services"
                  className="services__finale-link"
                >
                  {text.more}

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

      <ServicesMobile
        text={
          text
        }
        services={
          localizedServices
        }
      />
    </section>
  );
}


export default Services;