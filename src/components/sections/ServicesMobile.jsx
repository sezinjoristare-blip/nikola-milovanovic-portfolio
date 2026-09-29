import {
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

import "../../styles/sections/ServicesMobile.css";


gsap.registerPlugin(
  ScrollTrigger
);


function MobilePlaceholder({
  label,
}) {
  return (
    <div className="services-mobile-premium__placeholder">
      <span>
        {label}
      </span>
    </div>
  );
}


function MobileMedia({
  media,
  playing = false,
}) {
  if (
    !media
  ) {
    return (
      <MobilePlaceholder
        label="MEDIA"
      />
    );
  }

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
        <MobilePlaceholder
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
      <MobilePlaceholder
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


function MobileFrame() {
  return (
    <div
      className="services-mobile-premium__frame"
      aria-hidden="true"
    >
      <span className="services-mobile-premium__frame-line services-mobile-premium__frame-line--top" />

      <span className="services-mobile-premium__frame-line services-mobile-premium__frame-line--right" />

      <span className="services-mobile-premium__frame-line services-mobile-premium__frame-line--bottom" />

      <span className="services-mobile-premium__frame-line services-mobile-premium__frame-line--left" />
    </div>
  );
}


function MobileCard({
  media,
  kind,
  playing = false,
}) {
  return (
    <div
      className={`
        services-mobile-premium__card
        services-mobile-premium__card--${kind}
      `}
      data-services-mobile-card
    >
      <MobileFrame />

      <div className="services-mobile-premium__media">
        <MobileMedia
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


function MobileStageCopy({
  service,
  text,
  stage,
}) {
  if (
    !service
  ) {
    return null;
  }

  return (
    <div
      className={`
        services-mobile-premium__stage-copy
        services-mobile-premium__stage-copy--${stage}
      `}
      data-services-mobile-copy={
        stage
      }
    >
      <div className="services-mobile-premium__stage-heading">
        <span>
          {service.number}
        </span>

        <strong>
          {service.title}
        </strong>
      </div>

      <div className="services-mobile-premium__info-grid">

        <div className="services-mobile-premium__info-block">
          <small>
            {text.choose}
          </small>

          <strong>
            {service.workMode}
          </strong>

          <p>
            {service.description}
          </p>
        </div>

        <div className="services-mobile-premium__info-block">
          <small>
            {text.offer}
          </small>

          <p className="services-mobile-premium__offers">
            {service.offers.join(
              " / "
            )}
          </p>

          <a
            href="#contact"
            className="services-mobile-premium__cta"
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

      <div className="services-mobile-premium__process">
        <small>
          {text.process}
        </small>

        <div className="services-mobile-premium__process-steps">
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
                <i>
                  {String(
                    index + 1
                  ).padStart(
                    2,
                    "0"
                  )}
                </i>

                {step}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}


function ServicesMobile({
  text,
  services = [],
}) {
  const rootRef =
    useRef(null);

  const scrollRef =
    useRef(null);

  const sceneRef =
    useRef(null);

  const activeStageRef =
    useRef(0);

  const [
    activeStage,
    setActiveStage,
  ] =
    useState(0);


  const photoService =
    services.find(
      (
        service
      ) =>
        service.layout ===
        "photos"
    ) ||
    services[0] ||
    null;


  const reelService =
    services.find(
      (
        service
      ) =>
        service.layout ===
        "reels"
    ) ||
    services[1] ||
    null;


  const filmService =
    services.find(
      (
        service
      ) =>
        service.layout ===
        "film"
    ) ||
    services[2] ||
    null;


  const photoMedia =
    photoService?.media
      ?.slice(
        0,
        4
      ) ||
    [];


  const reelMedia =
    reelService?.media
      ?.slice(
        0,
        2
      ) ||
    [];


  const filmMedia =
    filmService?.media?.[0] ||
    null;


  useLayoutEffect(
    () => {
      const root =
        rootRef.current;

      const scroll =
        scrollRef.current;

      const scene =
        sceneRef.current;


      if (
        !root ||
        !scroll ||
        !scene
      ) {
        return undefined;
      }


      const mediaQuery =
        gsap.matchMedia();


      mediaQuery.add(
        "(max-width: 760px) and (prefers-reduced-motion: no-preference)",
        () => {
          const photosGroup =
            scene.querySelector(
              '[data-services-mobile-group="photos"]'
            );


          const reelsGroup =
            scene.querySelector(
              '[data-services-mobile-group="reels"]'
            );


          const filmGroup =
            scene.querySelector(
              '[data-services-mobile-group="film"]'
            );


          const photosCopy =
            scene.querySelector(
              '[data-services-mobile-copy="photos"]'
            );


          const reelsCopy =
            scene.querySelector(
              '[data-services-mobile-copy="reels"]'
            );


          const filmCopy =
            scene.querySelector(
              '[data-services-mobile-copy="film"]'
            );


          const finale =
            scene.querySelector(
              "[data-services-mobile-finale]"
            );


          if (
            !photosGroup ||
            !reelsGroup ||
            !filmGroup ||
            !photosCopy ||
            !reelsCopy ||
            !filmCopy ||
            !finale
          ) {
            return undefined;
          }


          const photoCards =
            Array.from(
              photosGroup.querySelectorAll(
                "[data-services-mobile-card]"
              )
            );


          const reelCards =
            Array.from(
              reelsGroup.querySelectorAll(
                "[data-services-mobile-card]"
              )
            );


          const filmCard =
            filmGroup.querySelector(
              "[data-services-mobile-card]"
            );


          if (
            !filmCard
          ) {
            return undefined;
          }


          const reelHorizontalLines =
            Array.from(
              reelsGroup.querySelectorAll(
                `
                  .services-mobile-premium__frame-line--top,
                  .services-mobile-premium__frame-line--bottom
                `
              )
            );


          const reelVerticalLines =
            Array.from(
              reelsGroup.querySelectorAll(
                `
                  .services-mobile-premium__frame-line--left,
                  .services-mobile-premium__frame-line--right
                `
              )
            );


          const filmHorizontalLines =
            Array.from(
              filmGroup.querySelectorAll(
                `
                  .services-mobile-premium__frame-line--top,
                  .services-mobile-premium__frame-line--bottom
                `
              )
            );


          const filmVerticalLines =
            Array.from(
              filmGroup.querySelectorAll(
                `
                  .services-mobile-premium__frame-line--left,
                  .services-mobile-premium__frame-line--right
                `
              )
            );


          function updateActiveStage(
            nextStage
          ) {
            if (
              activeStageRef.current ===
              nextStage
            ) {
              return;
            }

            activeStageRef.current =
              nextStage;

            setActiveStage(
              nextStage
            );
          }


          const context =
            gsap.context(
              () => {
                gsap.set(
                  photosGroup,
                  {
                    autoAlpha:
                      1,

                    scale:
                      1,
                  }
                );


                gsap.set(
                  photosCopy,
                  {
                    autoAlpha:
                      1,

                    y:
                      0,
                  }
                );


                gsap.set(
                  reelsGroup,
                  {
                    autoAlpha:
                      0,

                    scale:
                      0.82,

                    y:
                      8,
                  }
                );


                gsap.set(
                  reelsCopy,
                  {
                    autoAlpha:
                      0,

                    y:
                      10,
                  }
                );


                gsap.set(
                  filmGroup,
                  {
                    autoAlpha:
                      0,

                    scaleX:
                      0.68,

                    scaleY:
                      0.88,
                  }
                );


                gsap.set(
                  filmCopy,
                  {
                    autoAlpha:
                      0,

                    y:
                      10,
                  }
                );


                gsap.set(
                  reelHorizontalLines,
                  {
                    scaleX:
                      0,

                    transformOrigin:
                      "0% 50%",
                  }
                );


                gsap.set(
                  reelVerticalLines,
                  {
                    scaleY:
                      0,

                    transformOrigin:
                      "50% 0%",
                  }
                );


                gsap.set(
                  filmHorizontalLines,
                  {
                    scaleX:
                      0,

                    transformOrigin:
                      "0% 50%",
                  }
                );


                gsap.set(
                  filmVerticalLines,
                  {
                    scaleY:
                      0,

                    transformOrigin:
                      "50% 0%",
                  }
                );


                gsap.set(
                  finale,
                  {
                    autoAlpha:
                      0,

                    y:
                      16,

                    pointerEvents:
                      "none",
                  }
                );


                const timeline =
                  gsap.timeline({
                    defaults: {
                      ease:
                        "none",
                    },

                    scrollTrigger: {
                      id:
                        "services-mobile-premium",

                      trigger:
                        scroll,

                      start:
                        "top top",

                      end:
                        () =>
                          `+=${Math.max(
                            1,
                            scroll.offsetHeight -
                              window.innerHeight *
                                2
                          )}`,

                      scrub:
                        0.72,

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
                            0.26
                          ) {
                            updateActiveStage(
                              0
                            );
                          } else if (
                            progress <
                            0.55
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


                timeline.to(
                  {},
                  {
                    duration:
                      1.15,
                  }
                );


                /*
                 * PHOTOS → REELS
                 */

                timeline.to(
                  photosCopy,
                  {
                    autoAlpha:
                      0,

                    y:
                      -8,

                    duration:
                      0.46,

                    ease:
                      "power2.in",
                  },
                  1.08
                );


                timeline.to(
                  photoCards,
                  {
                    xPercent:
                      (
                        index
                      ) =>
                        index % 2 ===
                          0
                          ? 42
                          : -42,

                    yPercent:
                      (
                        index
                      ) =>
                        index < 2
                          ? 28
                          : -28,

                    scale:
                      0.64,

                    opacity:
                      0.12,

                    duration:
                      1.2,

                    stagger:
                      0.025,

                    ease:
                      "power2.inOut",
                  },
                  1.15
                );


                timeline.to(
                  reelsCopy,
                  {
                    autoAlpha:
                      1,

                    y:
                      0,

                    duration:
                      0.5,

                    ease:
                      "power2.out",
                  },
                  1.44
                );


                timeline.to(
                  reelsGroup,
                  {
                    autoAlpha:
                      1,

                    scale:
                      1,

                    y:
                      0,

                    duration:
                      1.05,

                    ease:
                      "power2.out",
                  },
                  1.38
                );


                timeline.to(
                  reelHorizontalLines,
                  {
                    scaleX:
                      1,

                    duration:
                      0.72,

                    stagger:
                      0.035,

                    ease:
                      "power2.inOut",
                  },
                  1.48
                );


                timeline.to(
                  reelVerticalLines,
                  {
                    scaleY:
                      1,

                    duration:
                      0.72,

                    stagger:
                      0.035,

                    ease:
                      "power2.inOut",
                  },
                  1.56
                );


                timeline.set(
                  photosGroup,
                  {
                    autoAlpha:
                      0,
                  },
                  2.35
                );


                timeline.to(
                  {},
                  {
                    duration:
                      1.2,
                  },
                  2.4
                );


                /*
                 * REELS → FILM
                 */

                timeline.to(
                  reelsCopy,
                  {
                    autoAlpha:
                      0,

                    y:
                      -8,

                    duration:
                      0.46,

                    ease:
                      "power2.in",
                  },
                  3.48
                );


                timeline.to(
                  reelCards,
                  {
                    xPercent:
                      (
                        index
                      ) =>
                        index === 0
                          ? 34
                          : -34,

                    scaleX:
                      0.82,

                    scaleY:
                      0.72,

                    opacity:
                      0.16,

                    duration:
                      1.15,

                    stagger:
                      0.04,

                    ease:
                      "power2.inOut",
                  },
                  3.55
                );


                timeline.to(
                  filmCopy,
                  {
                    autoAlpha:
                      1,

                    y:
                      0,

                    duration:
                      0.5,

                    ease:
                      "power2.out",
                  },
                  3.82
                );


                timeline.to(
                  filmGroup,
                  {
                    autoAlpha:
                      1,

                    scaleX:
                      1,

                    scaleY:
                      1,

                    duration:
                      1.08,

                    ease:
                      "power2.out",
                  },
                  3.76
                );


                timeline.to(
                  filmHorizontalLines,
                  {
                    scaleX:
                      1,

                    duration:
                      0.76,

                    stagger:
                      0.04,

                    ease:
                      "power2.inOut",
                  },
                  3.84
                );


                timeline.to(
                  filmVerticalLines,
                  {
                    scaleY:
                      1,

                    duration:
                      0.76,

                    stagger:
                      0.04,

                    ease:
                      "power2.inOut",
                  },
                  3.92
                );


                timeline.set(
                  reelsGroup,
                  {
                    autoAlpha:
                      0,
                  },
                  4.68
                );


                timeline.to(
                  {},
                  {
                    duration:
                      1.45,
                  },
                  4.74
                );


                /*
                 * FILM → FINALE
                 */

                timeline.to(
                  filmCopy,
                  {
                    autoAlpha:
                      0,

                    y:
                      -8,

                    duration:
                      0.42,

                    ease:
                      "power2.in",
                  },
                  6.12
                );


                timeline.to(
                  filmGroup,
                  {
                    autoAlpha:
                      0.1,

                    scale:
                      0.94,

                    duration:
                      0.86,

                    ease:
                      "power2.inOut",
                  },
                  6.14
                );


                timeline.set(
                  finale,
                  {
                    pointerEvents:
                      "auto",
                  },
                  6.48
                );


                timeline.to(
                  finale,
                  {
                    autoAlpha:
                      1,

                    y:
                      0,

                    duration:
                      0.82,

                    ease:
                      "power2.out",
                  },
                  6.5
                );


                timeline.to(
                  {},
                  {
                    duration:
                      1.4,
                  },
                  7.24
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
    []
  );


  return (
    <div
      ref={
        rootRef
      }
      className="services-mobile-premium"
    >
      <div
        ref={
          scrollRef
        }
        className="services-mobile-premium__scroll"
      >
        <div
          ref={
            sceneRef
          }
          className="services-mobile-premium__scene"
        >
          <div className="services-mobile-premium__scene-inner">
            <h2 className="services-mobile-premium__title">
              {text.heading}
            </h2>

            <div className="services-mobile-premium__composition">

              <div className="services-mobile-premium__stage-shell">

                <div className="services-mobile-premium__copy-stack">

                  <MobileStageCopy
                    service={
                      photoService
                    }
                    text={
                      text
                    }
                    stage="photos"
                  />

                  <MobileStageCopy
                    service={
                      reelService
                    }
                    text={
                      text
                    }
                    stage="reels"
                  />

                  <MobileStageCopy
                    service={
                      filmService
                    }
                    text={
                      text
                    }
                    stage="film"
                  />

                </div>


                <div className="services-mobile-premium__canvas">

                  <div
                    className="services-mobile-premium__group services-mobile-premium__group--photos"
                    data-services-mobile-group="photos"
                  >
                    {photoMedia.map(
                      (
                        media
                      ) => (
                        <MobileCard
                          key={
                            media.id
                          }
                          media={
                            media
                          }
                          kind="photo"
                        />
                      )
                    )}
                  </div>


                  <div
                    className="services-mobile-premium__group services-mobile-premium__group--reels"
                    data-services-mobile-group="reels"
                    aria-hidden={
                      activeStage !==
                      1
                    }
                  >
                    {reelMedia.map(
                      (
                        media
                      ) => (
                        <MobileCard
                          key={
                            media.id
                          }
                          media={
                            media
                          }
                          kind="reel"
                          playing={
                            activeStage ===
                            1
                          }
                        />
                      )
                    )}
                  </div>


                  <div
                    className="services-mobile-premium__group services-mobile-premium__group--film"
                    data-services-mobile-group="film"
                    aria-hidden={
                      activeStage !==
                      2
                    }
                  >
                    <MobileCard
                      media={
                        filmMedia
                      }
                      kind="landscape"
                      playing={
                        activeStage ===
                        2
                      }
                    />
                  </div>

                </div>
              </div>


              <div
                className="services-mobile-premium__finale"
                data-services-mobile-finale
              >
                <a
                  href="/services"
                  className="services-mobile-premium__finale-link"
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
    </div>
  );
}


export default ServicesMobile;