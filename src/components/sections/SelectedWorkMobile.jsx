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

import "../../styles/sections/SelectedWorkMobile.css";


gsap.registerPlugin(
  ScrollTrigger
);


function MobilePlaceholder({
  label,
}) {
  return (
    <div className="selected-work-mobile__placeholder">
      <span>
        {label}
      </span>
    </div>
  );
}


function MobileVideo({
  project,
  loading,
  playing,
}) {
  if (
    !project?.videoSrc
  ) {
    return (
      <MobilePlaceholder
        label={
          loading
            ? "LOADING"
            : "VIDEO"
        }
      />
    );
  }

  return (
    <OptimizedVideo
      src={
        project.videoSrc
      }
      mobileSrc={
        project.mobileVideoSrc
      }
      poster={
        project.posterSrc
      }
      alt={
        project.title ||
        "Project"
      }
      controlledPlayback
      playing={
        playing
      }
      restartOnPlay
    />
  );
}


function MobilePhoto({
  project,
  loading,
}) {
  const imageSrc =
    project?.imageSrc ||
    project?.posterSrc ||
    project?.thumbnailSrc ||
    "";

  if (
    !imageSrc
  ) {
    return (
      <MobilePlaceholder
        label={
          loading
            ? "LOADING"
            : "PHOTO"
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
        project?.title ||
        "Project"
      }
      loading="lazy"
      draggable="false"
    />
  );
}


function getPreviewKind(
  project,
  sourceIndex
) {
  const previewType =
    project?.previewType
      ?.toLowerCase();

  if (
    previewType ===
      "landscape" ||
    previewType ===
      "reel" ||
    previewType ===
      "photo"
  ) {
    return previewType;
  }


  const format =
    project?.format
      ?.toLowerCase() ||
    "";


  if (
    format.includes(
      "photo"
    )
  ) {
    return "photo";
  }


  if (
    format.includes(
      "reel"
    ) ||
    format.includes(
      "vertical"
    )
  ) {
    return "reel";
  }


  if (
    sourceIndex === 1 ||
    sourceIndex === 2
  ) {
    return "reel";
  }


  if (
    sourceIndex >= 3 &&
    sourceIndex <= 6
  ) {
    return "photo";
  }


  return "landscape";
}


function getMobileOrder(
  project,
  sourceIndex
) {
  return (
    project?.mobileHomeOrder ??
    project?.sortOrder ??
    sourceIndex
  );
}


function getProjectNumber(
  project,
  sourceIndex
) {
  const value =
    project?.sortOrder ??
    sourceIndex + 1;

  return String(
    value
  ).padStart(
    2,
    "0"
  );
}


function MobileCard({
  project,
  kind,
  sourceIndex,
  loading,
}) {
  const cardRef =
    useRef(null);

  const [
    playing,
    setPlaying,
  ] =
    useState(false);

  const isVideo =
    kind === "landscape" ||
    kind === "reel";


  useEffect(
    () => {
      if (
        !isVideo ||
        !project?.videoSrc
      ) {
        setPlaying(
          false
        );

        return undefined;
      }


      const card =
        cardRef.current;


      if (
        !card ||
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
            rootMargin:
              "-10% 0px -10% 0px",

            threshold: [
              0,
              0.58,
              0.8,
            ],
          }
        );


      observer.observe(
        card
      );


      return () => {
        observer.disconnect();
      };
    },
    [
      isVideo,
      project?.videoSrc,
    ]
  );


  const projectNumber =
    getProjectNumber(
      project,
      sourceIndex
    );


  return (
    <article
      ref={
        cardRef
      }
      className={`
        selected-work-mobile__card
        selected-work-mobile__card--${kind}
      `}
      aria-label={
        project?.title ||
        `Project ${projectNumber}`
      }
    >
      <div
        className="selected-work-mobile__frame"
        aria-hidden="true"
      >
        <span className="selected-work-mobile__line selected-work-mobile__line--top" />

        <span className="selected-work-mobile__line selected-work-mobile__line--right" />

        <span className="selected-work-mobile__line selected-work-mobile__line--bottom" />

        <span className="selected-work-mobile__line selected-work-mobile__line--left" />

        <span className="selected-work-mobile__number">
          {projectNumber}
        </span>
      </div>


      <div
        className={`
          selected-work-mobile__media
          selected-work-mobile__media--${kind}
        `}
        data-mobile-project-media
      >
        {kind === "photo" ? (
          <MobilePhoto
            project={
              project
            }
            loading={
              loading
            }
          />
        ) : (
          <MobileVideo
            project={
              project
            }
            loading={
              loading
            }
            playing={
              playing
            }
          />
        )}
      </div>
    </article>
  );
}


function MobileRail({
  title,
  projects,
  kind,
  loading,
  railRef,
  premium = false,
}) {
  if (
    projects.length ===
    0
  ) {
    return null;
  }


  return (
    <section
      ref={
        railRef
      }
      className={[
        "selected-work-mobile__rail",

        `selected-work-mobile__rail--${kind}`,

        premium
          ? "selected-work-mobile__rail--premium"
          : "",
      ]
        .filter(
          Boolean
        )
        .join(
          " "
        )}
      aria-label={
        title
      }
      data-mobile-rail
    >
      <h3
        className="selected-work-mobile__label"
        data-mobile-rail-label
      >
        {title}
      </h3>

      <div className="selected-work-mobile__track">
        {projects.map(
          (
            item
          ) => (
            <MobileCard
              key={
                item.project.id ||
                `${kind}-${item.sourceIndex}`
              }
              project={
                item.project
              }
              kind={
                kind
              }
              sourceIndex={
                item.sourceIndex
              }
              loading={
                loading
              }
            />
          )
        )}
      </div>
    </section>
  );
}


function SelectedWorkMobile({
  projects,
  loading,
  text,
}) {
  const title =
    text?.title ??
    "Projects";

  const moreLabel =
    text?.more ??
    "See all projects";

  const landscapeLabel =
    text?.landscape ??
    "Landscape";

  const reelsLabel =
    text?.reels ??
    "Reels";

  const photosLabel =
    text?.photos ??
    "Photos";


  const rootRef =
    useRef(null);

  const introShellRef =
    useRef(null);

  const titleRef =
    useRef(null);

  const landscapeRailRef =
    useRef(null);

  const reelsRailRef =
    useRef(null);

  const photosRailRef =
    useRef(null);

  const moreRef =
    useRef(null);


  const mobileProjects =
    projects
      .map(
        (
          project,
          sourceIndex
        ) => ({
          project,
          sourceIndex,
        })
      )
      .filter(
        (
          item
        ) =>
          item.project
            ?.showOnMobileHome !==
          false
      )
      .sort(
        (
          first,
          second
        ) =>
          getMobileOrder(
            first.project,
            first.sourceIndex
          ) -
          getMobileOrder(
            second.project,
            second.sourceIndex
          )
      );


  const landscapeProjects =
    mobileProjects
      .filter(
        (
          item
        ) =>
          getPreviewKind(
            item.project,
            item.sourceIndex
          ) ===
          "landscape"
      );


  const reelProjects =
    mobileProjects
      .filter(
        (
          item
        ) =>
          getPreviewKind(
            item.project,
            item.sourceIndex
          ) ===
          "reel"
      );


  const photoProjects =
    mobileProjects
      .filter(
        (
          item
        ) =>
          getPreviewKind(
            item.project,
            item.sourceIndex
          ) ===
          "photo"
      );


  useLayoutEffect(
    () => {
      const root =
        rootRef.current;

      const introShell =
        introShellRef.current;

      const title =
        titleRef.current;


      if (
        !root ||
        !introShell ||
        !title
      ) {
        return undefined;
      }


      const isMobile =
        window.matchMedia(
          "(max-width: 760px)"
        ).matches;


      if (
        !isMobile
      ) {
        return undefined;
      }


      const section =
        root.closest(
          ".selected-work"
        );


      if (
        !section
      ) {
        return undefined;
      }


      const reducedMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;


      if (
        reducedMotion
      ) {
        section.style
          .setProperty(
            "--projects-takeover-opacity",
            "0"
          );

        return undefined;
      }


      const titleLetters =
        Array.from(
          title.querySelectorAll(
            ".selected-work-mobile__letter"
          )
        );


      function getRailParts(
        rail
      ) {
        if (
          !rail
        ) {
          return null;
        }


        return {
          root:
            rail,

          label:
            rail.querySelector(
              "[data-mobile-rail-label]"
            ),

          horizontalLines:
            Array.from(
              rail.querySelectorAll(
                `
                  .selected-work-mobile__line--top,
                  .selected-work-mobile__line--bottom
                `
              )
            ),

          verticalLines:
            Array.from(
              rail.querySelectorAll(
                `
                  .selected-work-mobile__line--left,
                  .selected-work-mobile__line--right
                `
              )
            ),

          numbers:
            Array.from(
              rail.querySelectorAll(
                ".selected-work-mobile__number"
              )
            ),

          media:
            Array.from(
              rail.querySelectorAll(
                "[data-mobile-project-media]"
              )
            ),
        };
      }


      const landscapeParts =
        getRailParts(
          landscapeRailRef.current
        );


      const reelsParts =
        getRailParts(
          reelsRailRef.current
        );


      const photosParts =
        getRailParts(
          photosRailRef.current
        );


      function setRailInitial(
        parts
      ) {
        if (
          !parts
        ) {
          return;
        }


        if (
          parts.label
        ) {
          gsap.set(
            parts.label,
            {
              opacity:
                0,

              y:
                12,
            }
          );
        }


        if (
          parts.horizontalLines
            .length
        ) {
          gsap.set(
            parts.horizontalLines,
            {
              scaleX:
                0,

              transformOrigin:
                "0% 50%",
            }
          );
        }


        if (
          parts.verticalLines
            .length
        ) {
          gsap.set(
            parts.verticalLines,
            {
              scaleY:
                0,

              transformOrigin:
                "50% 0%",
            }
          );
        }


        if (
          parts.numbers
            .length
        ) {
          gsap.set(
            parts.numbers,
            {
              opacity:
                0,

              y:
                5,
            }
          );
        }


        if (
          parts.media
            .length
        ) {
          gsap.set(
            parts.media,
            {
              opacity:
                0,

              y:
                12,

              clipPath:
                "inset(0% 0% 8% 0%)",
            }
          );
        }
      }


      function addRailReveal(
        timeline,
        parts,
        start = 0
      ) {
        if (
          !parts
        ) {
          return;
        }


        if (
          parts.label
        ) {
          timeline.to(
            parts.label,
            {
              opacity:
                1,

              y:
                0,

              duration:
                0.42,

              ease:
                "power2.out",
            },
            start
          );
        }


        if (
          parts.horizontalLines
            .length
        ) {
          timeline.to(
            parts.horizontalLines,
            {
              scaleX:
                1,

              duration:
                0.72,

              stagger:
                0.025,

              ease:
                "power2.inOut",
            },
            start +
              0.12
          );
        }


        if (
          parts.verticalLines
            .length
        ) {
          timeline.to(
            parts.verticalLines,
            {
              scaleY:
                1,

              duration:
                0.72,

              stagger:
                0.025,

              ease:
                "power2.inOut",
            },
            start +
              0.19
          );
        }


        if (
          parts.numbers
            .length
        ) {
          timeline.to(
            parts.numbers,
            {
              opacity:
                1,

              y:
                0,

              duration:
                0.42,

              stagger:
                0.045,

              ease:
                "power2.out",
            },
            start +
              0.25
          );
        }


        if (
          parts.media
            .length
        ) {
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
                0.78,

              stagger:
                0.055,

              ease:
                "power2.out",
            },
            start +
              0.3
          );
        }
      }


      const context =
        gsap.context(
          () => {
            gsap.set(
              section,
              {
                "--projects-takeover-opacity":
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
                    "projects-mobile-takeover",

                  trigger:
                    section,

                  start:
                    "top bottom",

                  end:
                    "top top",

                  scrub:
                    0.42,

                  invalidateOnRefresh:
                    true,
                },
              });


            takeoverTimeline.to(
              section,
              {
                "--projects-takeover-opacity":
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
                "--projects-takeover-opacity":
                  0,

                duration:
                  0.18,
              }
            );


            gsap.set(
              titleLetters,
              {
                opacity:
                  0,

                yPercent:
                  115,

                rotateX:
                  -7,

                transformOrigin:
                  "50% 100%",
              }
            );


            setRailInitial(
              landscapeParts
            );


            setRailInitial(
              reelsParts
            );


            setRailInitial(
              photosParts
            );


            if (
              moreRef.current
            ) {
              gsap.set(
                moreRef.current,
                {
                  opacity:
                    0,

                  y:
                    14,
                }
              );
            }


            const introTimeline =
              gsap.timeline({
                defaults: {
                  ease:
                    "none",
                },

                scrollTrigger: {
                  id:
                    "projects-mobile-premium-intro",

                  trigger:
                    introShell,

                  start:
                    "top top",

                  end:
                    "bottom bottom",

                  scrub:
                    0.65,

                  invalidateOnRefresh:
                    true,
                },
              });


            introTimeline.to(
              titleLetters,
              {
                opacity:
                  1,

                yPercent:
                  0,

                rotateX:
                  0,

                stagger:
                  0.08,

                duration:
                  0.52,

                ease:
                  "power3.out",
              },
              0
            );


            introTimeline.to(
              title,
              {
                y:
                  -4,

                duration:
                  0.42,

                ease:
                  "power2.inOut",
              },
              0.42
            );


            addRailReveal(
              introTimeline,
              landscapeParts,
              0.44
            );


            function createRailTimeline(
              parts,
              id
            ) {
              if (
                !parts
              ) {
                return;
              }


              const timeline =
                gsap.timeline({
                  defaults: {
                    ease:
                      "none",
                  },

                  scrollTrigger: {
                    id,

                    trigger:
                      parts.root,

                    start:
                      "top 88%",

                    end:
                      "top 48%",

                    scrub:
                      0.6,

                    invalidateOnRefresh:
                      true,
                  },
                });


              addRailReveal(
                timeline,
                parts,
                0
              );
            }


            createRailTimeline(
              reelsParts,
              "projects-mobile-reels"
            );


            createRailTimeline(
              photosParts,
              "projects-mobile-photos"
            );


            if (
              moreRef.current
            ) {
              gsap.to(
                moreRef.current,
                {
                  opacity:
                    1,

                  y:
                    0,

                  ease:
                    "power2.out",

                  scrollTrigger: {
                    id:
                      "projects-mobile-more",

                    trigger:
                      moreRef.current,

                    start:
                      "top 92%",

                    end:
                      "top 70%",

                    scrub:
                      0.5,

                    invalidateOnRefresh:
                      true,
                  },
                }
              );
            }
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
    },
    [
      mobileProjects.length,
    ]
  );


  return (
    <div
      ref={
        rootRef
      }
      className="selected-work-mobile"
    >
      <div
        ref={
          introShellRef
        }
        className="selected-work-mobile__intro-shell"
      >
        <div className="selected-work-mobile__intro-scene">

          <div className="selected-work-mobile__title-position">
            <h2
              ref={
                titleRef
              }
              className="selected-work-mobile__title"
              aria-label={
                title
              }
            >
              {title
                .split(
                  ""
                )
                .map(
                  (
                    letter,
                    index
                  ) => (
                    <span
                      className="selected-work-mobile__letter-mask"
                      key={
                        index
                      }
                      aria-hidden="true"
                    >
                      <span className="selected-work-mobile__letter">
                        {letter}
                      </span>
                    </span>
                  )
                )}
            </h2>
          </div>


          <MobileRail
            title={
              landscapeLabel
            }
            projects={
              landscapeProjects
            }
            kind="landscape"
            loading={
              loading
            }
            railRef={
              landscapeRailRef
            }
            premium
          />

        </div>
      </div>


      <div className="selected-work-mobile__continuation">

        <MobileRail
          title={
            reelsLabel
          }
          projects={
            reelProjects
          }
          kind="reel"
          loading={
            loading
          }
          railRef={
            reelsRailRef
          }
        />


        <MobileRail
          title={
            photosLabel
          }
          projects={
            photoProjects
          }
          kind="photo"
          loading={
            loading
          }
          railRef={
            photosRailRef
          }
        />


        <div
          ref={
            moreRef
          }
          className="selected-work-mobile__more"
        >
          <a
            className="selected-work-mobile__more-link"
            href="/works"
          >
            {moreLabel}
          </a>
        </div>

      </div>
    </div>
  );
}


export default SelectedWorkMobile;