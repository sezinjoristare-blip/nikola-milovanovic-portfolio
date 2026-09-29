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

import SelectedWorkMobile
  from "./SelectedWorkMobile";

  import {
  getHomepageProjects,
} from "../../services/portfolioService";

import {
  useLanguage,
} from "../../context/LanguageContext";

import translations
  from "../../data/translations";


import "../../styles/sections/SelectedWork.css";


gsap.registerPlugin(
  ScrollTrigger
);


const PROJECT_SLOTS = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
];


function ProjectPlaceholder({
  label,
}) {
  return (
    <div className="selected-work__project-placeholder">
      <span>
        {label}
      </span>
    </div>
  );
}


function VideoProjectMedia({
  project,
  loading,
  playing,
}) {
  if (
    !project?.videoSrc
  ) {
    return (
      <ProjectPlaceholder
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
  posterWhenPaused
/>
  );
}


function PhotoProjectMedia({
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
      <ProjectPlaceholder
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


function ProjectItem({
  slot,
  kind,
  project,
  loading,
  playing,
  onPointerEnter,
  onPointerLeave,
  sharedTop = false,
  sharedRight = false,
  noBottom = false,
  numberPlacement = "top",
}) {
  const isVideo =
    kind === "landscape" ||
    kind === "reel";

  return (
    <article
      className={[
        "selected-work__project-item",

        `selected-work__project-item--${slot}`,

        `selected-work__project-item--${kind}`,

        sharedTop
          ? "selected-work__project-item--shared-top"
          : "",

        sharedRight
          ? "selected-work__project-item--shared-right"
          : "",

        noBottom
          ? "selected-work__project-item--no-bottom"
          : "",
      ]
        .filter(
          Boolean
        )
        .join(
          " "
        )}
      data-project-card={
        slot
      }
      aria-label={
        project?.title ||
        `Project ${slot}`
      }
      onPointerEnter={
        isVideo
          ? onPointerEnter
          : undefined
      }
      onPointerLeave={
        isVideo
          ? onPointerLeave
          : undefined
      }
    >
      <div
        className="selected-work__project-frame"
        aria-hidden="true"
      >
        <span
          className="
            selected-work__frame-line
            selected-work__frame-line--top
          "
          data-frame-line="top"
        />

        <span
          className="
            selected-work__frame-line
            selected-work__frame-line--right
          "
          data-frame-line="right"
        />

        <span
          className="
            selected-work__frame-line
            selected-work__frame-line--bottom
          "
          data-frame-line="bottom"
        />

        <span
          className="
            selected-work__frame-line
            selected-work__frame-line--left
          "
          data-frame-line="left"
        />

        <span
          className={`
            selected-work__project-number
            selected-work__project-number--${numberPlacement}
          `}
          data-project-number
        >
          {slot}
        </span>
      </div>

      <div
        className={`
          selected-work__project-media
          selected-work__project-media--${kind}
        `}
        data-project-media
      >
        {kind === "photo" ? (
          <PhotoProjectMedia
            project={
              project
            }
            loading={
              loading
            }
          />
        ) : (
          <VideoProjectMedia
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


function SelectedWork() {
  const {
    language,
  } =
    useLanguage();

  const text =
    translations[
      language
    ].projects;

  const projectTitle =
    text.title;

  const sectionRef =
    useRef(null);

  const stageRef =
    useRef(null);

  const layoutRef =
    useRef(null);

  const introShellRef =
    useRef(null);

  const introRef =
    useRef(null);

  const titleRef =
    useRef(null);

  const moreRef =
    useRef(null);

  const [
    projects,
    setProjects,
  ] =
    useState([]);

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    hoveredVideo,
    setHoveredVideo,
  ] =
    useState(null);

  const project01 =
    projects[0] ??
    null;

  const project02 =
    projects[1] ??
    null;

  const project03 =
    projects[2] ??
    null;

  const project04 =
    projects[3] ??
    null;

  const project05 =
    projects[4] ??
    null;

  const project06 =
    projects[5] ??
    null;

  const project07 =
    projects[6] ??
    null;

  const project08 =
    projects[7] ??
    null;


  useEffect(
    () => {
      let active =
        true;

      async function loadProjects() {
        try {
          const data =
  await getHomepageProjects();
        

          if (
            !active
          ) {
            return;
          }

          setProjects(
            Array.isArray(
              data
            )
              ? data
              : []
          );
        } catch (
          error
        ) {
          console.error(
            "Loading projects:",
            error
          );
        } finally {
          if (
            active
          ) {
            setLoading(
              false
            );
          }
        }
      }

      loadProjects();

      return () => {
        active =
          false;
      };
    },
    []
  );


  function handleVideoPointerEnter(
    event,
    slot
  ) {
    if (
      event.pointerType !==
      "mouse"
    ) {
      return;
    }

    setHoveredVideo(
      slot
    );
  }


  function handleVideoPointerLeave(
    slot
  ) {
    setHoveredVideo(
      (
        current
      ) =>
        current ===
        slot
          ? null
          : current
    );
  }


  useLayoutEffect(
    () => {
      const section =
        sectionRef.current;

      const stage =
        stageRef.current;

      const layout =
        layoutRef.current;

      const introShell =
        introShellRef.current;

      const intro =
        introRef.current;

      const title =
        titleRef.current;

      const more =
        moreRef.current;

      if (
        !section ||
        !stage ||
        !layout ||
        !introShell ||
        !intro ||
        !title ||
        !more
      ) {
        return undefined;
      }


      const reducedMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;


      const isMobile =
        window.matchMedia(
          "(max-width: 760px)"
        ).matches;


      const letters =
        title.querySelectorAll(
          ".selected-work__letter"
        );


      if (
        isMobile
      ) {
        gsap.set(
          letters,
          {
            opacity:
              1,

            yPercent:
              0,

            rotateX:
              0,
          }
        );

        return undefined;
      }


      function getProjectParts(
        slot
      ) {
        const root =
          layout.querySelector(
            `[data-project-card="${slot}"]`
          );

        if (
          !root
        ) {
          return null;
        }

        return {
          root,

          top:
            root.querySelector(
              '[data-frame-line="top"]'
            ),

          right:
            root.querySelector(
              '[data-frame-line="right"]'
            ),

          bottom:
            root.querySelector(
              '[data-frame-line="bottom"]'
            ),

          left:
            root.querySelector(
              '[data-frame-line="left"]'
            ),

          number:
            root.querySelector(
              "[data-project-number]"
            ),

          media:
            root.querySelector(
              "[data-project-media]"
            ),
        };
      }


      const cards = {};


      PROJECT_SLOTS.forEach(
        (
          slot
        ) => {
          cards[
            slot
          ] =
            getProjectParts(
              slot
            );
        }
      );


      const allCardsReady =
        PROJECT_SLOTS.every(
          (
            slot
          ) => {
            const card =
              cards[
                slot
              ];

            return Boolean(
              card?.root &&
              card?.top &&
              card?.right &&
              card?.bottom &&
              card?.left &&
              card?.number &&
              card?.media
            );
          }
        );


      if (
        !allCardsReady
      ) {
        return undefined;
      }


      function getIntroPinDistance() {
        return Math.max(
          1100,
          window.innerHeight *
            1.7
        );
      }


      function syncLayoutGeometry() {
        const introPinDistance =
          reducedMotion
            ? 0
            : getIntroPinDistance();

        introShell.style.setProperty(
          "--intro-pin-distance",
          `${introPinDistance}px`
        );


        const landscapeHeight =
          cards[
            "01"
          ].root
            .getBoundingClientRect()
            .height;


        const reelHeight =
          Math.max(
            cards[
              "02"
            ].root
              .getBoundingClientRect()
              .height,

            cards[
              "03"
            ].root
              .getBoundingClientRect()
              .height
          );


        const leftLift =
          Math.max(
            0,
            reelHeight -
              landscapeHeight
          );


        layout.style.setProperty(
          "--left-lift",
          `${leftLift}px`
        );


        const lowerPhotoBottom =
          Math.max(
            cards[
              "06"
            ].root
              .getBoundingClientRect()
              .bottom,

            cards[
              "07"
            ].root
              .getBoundingClientRect()
              .bottom
          );


        const project08Rect =
          cards[
            "08"
          ].root
            .getBoundingClientRect();


        const project08Height =
          Math.max(
            1,
            lowerPhotoBottom -
              project08Rect.top
          );


        layout.style.setProperty(
          "--project-08-height",
          `${project08Height}px`
        );
      }


      syncLayoutGeometry();


      let resizeFrame =
        null;


      function handleResize() {
        if (
          resizeFrame
        ) {
          cancelAnimationFrame(
            resizeFrame
          );
        }

        resizeFrame =
          requestAnimationFrame(
            () => {
              syncLayoutGeometry();
            }
          );
      }


      window.addEventListener(
        "resize",
        handleResize
      );


      let resizeObserver =
        null;


      if (
        typeof ResizeObserver !==
        "undefined"
      ) {
        resizeObserver =
          new ResizeObserver(
            () => {
              syncLayoutGeometry();
            }
          );

        resizeObserver.observe(
          cards[
            "01"
          ].root
        );

        resizeObserver.observe(
          cards[
            "02"
          ].root
        );

        resizeObserver.observe(
          cards[
            "03"
          ].root
        );
      }


      let pinnedProject01Top =
        null;


      function clearReleaseOffset() {
        layout.style.setProperty(
          "--release-offset",
          "0px"
        );
      }


      function rememberPinnedProject01Top(
        self
      ) {
        if (
          !self.isActive
        ) {
          return;
        }

        pinnedProject01Top =
          cards[
            "01"
          ].root
            .getBoundingClientRect()
            .top;
      }


      function alignReleasedLayout() {
        if (
          pinnedProject01Top ===
          null
        ) {
          return;
        }


        const releasedProject01Top =
          cards[
            "01"
          ].root
            .getBoundingClientRect()
            .top;


        const releaseOffset =
          pinnedProject01Top -
          releasedProject01Top;


        layout.style.setProperty(
          "--release-offset",
          `${
            Math.abs(
              releaseOffset
            ) <
            0.5
              ? 0
              : releaseOffset
          }px`
        );
      }


      const context =
        gsap.context(
          () => {
            const allLines =
              PROJECT_SLOTS.flatMap(
                (
                  slot
                ) => [
                  cards[
                    slot
                  ].top,

                  cards[
                    slot
                  ].right,

                  cards[
                    slot
                  ].bottom,

                  cards[
                    slot
                  ].left,
                ]
              );


            const allNumbers =
              PROJECT_SLOTS.map(
                (
                  slot
                ) =>
                  cards[
                    slot
                  ].number
              );


            const allMedia =
              PROJECT_SLOTS.map(
                (
                  slot
                ) =>
                  cards[
                    slot
                  ].media
              );


            if (
              reducedMotion
            ) {
              gsap.set(
                letters,
                {
                  opacity:
                    1,

                  yPercent:
                    0,

                  rotateX:
                    0,
                }
              );


              gsap.set(
                allLines,
                {
                  opacity:
                    1,

                  scaleX:
                    1,

                  scaleY:
                    1,
                }
              );


              gsap.set(
                allNumbers,
                {
                  opacity:
                    1,

                  y:
                    0,
                }
              );


              gsap.set(
                allMedia,
                {
                  opacity:
                    1,

                  y:
                    0,

                  clipPath:
                    "inset(0% 0% 0% 0%)",
                }
              );


              gsap.set(
                more,
                {
                  opacity:
                    1,

                  y:
                    0,
                }
              );

              return;
            }


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
                    "projects-takeover",

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
              letters,
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


            PROJECT_SLOTS.forEach(
              (
                slot
              ) => {
                const card =
                  cards[
                    slot
                  ];


                gsap.set(
                  card.top,
                  {
                    opacity:
                      0,

                    scaleX:
                      0,

                    transformOrigin:
                      slot ===
                      "01"
                        ? "78% 50%"
                        : "0% 50%",
                  }
                );


                gsap.set(
                  card.right,
                  {
                    opacity:
                      0,

                    scaleY:
                      0,

                    transformOrigin:
                      "50% 0%",
                  }
                );


                gsap.set(
                  card.bottom,
                  {
                    opacity:
                      0,

                    scaleX:
                      0,

                    transformOrigin:
                      "100% 50%",
                  }
                );


                gsap.set(
                  card.left,
                  {
                    opacity:
                      0,

                    scaleY:
                      0,

                    transformOrigin:
                      slot ===
                      "01"
                        ? "50% 0%"
                        : "50% 100%",
                  }
                );


                gsap.set(
                  card.number,
                  {
                    opacity:
                      0,

                    y:
                      5,
                  }
                );


                gsap.set(
                  card.media,
                  {
                    opacity:
                      0,

                    y:
                      9,

                    clipPath:
                      "inset(0% 0% 8% 0%)",
                  }
                );
              }
            );


            gsap.set(
              more,
              {
                opacity:
                  0,

                y:
                  14,
              }
            );


            function revealProject(
              timeline,
              slot,
              start,
              {
                revealTop =
                  true,

                revealRight =
                  true,

                revealBottom =
                  true,

                revealLeft =
                  true,
              } = {}
            ) {
              const card =
                cards[
                  slot
                ];


              if (
                revealTop
              ) {
                timeline.to(
                  card.top,
                  {
                    opacity:
                      1,

                    scaleX:
                      1,

                    duration:
                      0.62,

                    ease:
                      "power2.inOut",
                  },
                  start
                );
              }


              if (
                revealLeft
              ) {
                timeline.to(
                  card.left,
                  {
                    opacity:
                      1,

                    scaleY:
                      1,

                    duration:
                      0.68,

                    ease:
                      "power2.inOut",
                  },
                  start +
                    0.08
                );
              }


              if (
                revealRight
              ) {
                timeline.to(
                  card.right,
                  {
                    opacity:
                      1,

                    scaleY:
                      1,

                    duration:
                      0.68,

                    ease:
                      "power2.inOut",
                  },
                  start +
                    0.16
                );
              }


              timeline.to(
                card.number,
                {
                  opacity:
                    1,

                  y:
                    0,

                  duration:
                    0.46,

                  ease:
                    "power2.out",
                },
                start +
                  0.18
              );


              timeline.to(
                card.media,
                {
                  opacity:
                    1,

                  y:
                    0,

                  clipPath:
                    "inset(0% 0% 0% 0%)",

                  duration:
                    0.82,

                  ease:
                    "power2.out",
                },
                start +
                  0.24
              );


              if (
                revealBottom
              ) {
                timeline.to(
                  card.bottom,
                  {
                    opacity:
                      1,

                    scaleX:
                      1,

                    duration:
                      0.72,

                    ease:
                      "power2.inOut",
                  },
                  start +
                    0.3
                );
              }
            }


            const introTimeline =
              gsap.timeline({
                defaults: {
                  ease:
                    "none",
                },

                scrollTrigger: {
                  id:
                    "projects-premium-intro",

                  trigger:
                    introShell,

                  start:
                    "top top",

                  end:
                    () =>
                      `+=${
                        getIntroPinDistance()
                      }`,

                  pin:
                    intro,

                  pinSpacing:
                    false,

                  scrub:
                    0.65,

                  anticipatePin:
                    1,

                  invalidateOnRefresh:
                    true,

                  onRefreshInit:
                    syncLayoutGeometry,

                  onRefresh:
                    syncLayoutGeometry,

                  onUpdate:
                    rememberPinnedProject01Top,

                  onLeave:
                    alignReleasedLayout,

                  onEnterBack:
                    clearReleaseOffset,

                  onLeaveBack:
                    clearReleaseOffset,
                },
              });


            introTimeline.to(
              letters,
              {
                opacity:
                  1,

                yPercent:
                  0,

                rotateX:
                  0,

                stagger:
                  0.085,

                duration:
                  0.55,

                ease:
                  "power3.out",
              },
              0
            );


            introTimeline.to(
              title,
              {
                y:
                  -6,

                duration:
                  0.5,

                ease:
                  "power2.inOut",
              },
              0.46
            );


            introTimeline.to(
              cards[
                "01"
              ].left,
              {
                opacity:
                  1,

                scaleY:
                  0.23,

                duration:
                  0.72,

                ease:
                  "power2.inOut",
              },
              0.58
            );


            introTimeline.to(
              cards[
                "01"
              ].top,
              {
                opacity:
                  1,

                scaleX:
                  0.34,

                duration:
                  0.82,

                ease:
                  "power2.inOut",
              },
              0.88
            );


            introTimeline.to(
              cards[
                "01"
              ].top,
              {
                scaleX:
                  1,

                duration:
                  0.85,

                ease:
                  "power2.inOut",
              },
              1.04
            );


            introTimeline.to(
              cards[
                "01"
              ].left,
              {
                scaleY:
                  1,

                duration:
                  0.92,

                ease:
                  "power2.inOut",
              },
              1.08
            );


            introTimeline.to(
              cards[
                "01"
              ].number,
              {
                opacity:
                  1,

                y:
                  0,

                duration:
                  0.48,

                ease:
                  "power2.out",
              },
              1.18
            );


            introTimeline.to(
              cards[
                "01"
              ].media,
              {
                opacity:
                  1,

                y:
                  0,

                clipPath:
                  "inset(0% 0% 0% 0%)",

                duration:
                  0.86,

                ease:
                  "power2.out",
              },
              1.24
            );


            introTimeline.to(
              cards[
                "01"
              ].bottom,
              {
                opacity:
                  1,

                scaleX:
                  1,

                duration:
                  0.82,

                ease:
                  "power2.inOut",
              },
              1.34
            );


            revealProject(
              introTimeline,
              "02",
              1.42,
              {
                revealBottom:
                  false,
              }
            );


            revealProject(
              introTimeline,
              "03",
              1.68,
              {
                revealBottom:
                  false,
              }
            );


            const photoRowOneTimeline =
              gsap.timeline({
                defaults: {
                  ease:
                    "none",
                },

                scrollTrigger: {
                  id:
                    "projects-photos-one",

                  trigger:
                    cards[
                      "04"
                    ].root,

                  start:
                    "top 88%",

                  end:
                    "top 48%",

                  scrub:
                    0.65,

                  invalidateOnRefresh:
                    true,
                },
              });


            revealProject(
              photoRowOneTimeline,
              "04",
              0,
              {
                revealTop:
                  false,
              }
            );


            revealProject(
              photoRowOneTimeline,
              "05",
              0.16,
              {
                revealTop:
                  false,

                revealRight:
                  false,
              }
            );


            const project08Timeline =
              gsap.timeline({
                defaults: {
                  ease:
                    "none",
                },

                scrollTrigger: {
                  id:
                    "projects-08",

                  trigger:
                    cards[
                      "08"
                    ].root,

                  start:
                    "top 88%",

                  end:
                    "top 46%",

                  scrub:
                    0.65,

                  invalidateOnRefresh:
                    true,
                },
              });


            revealProject(
              project08Timeline,
              "08",
              0
            );


            const photoRowTwoTimeline =
              gsap.timeline({
                defaults: {
                  ease:
                    "none",
                },

                scrollTrigger: {
                  id:
                    "projects-photos-two",

                  trigger:
                    cards[
                      "06"
                    ].root,

                  start:
                    "top 90%",

                  end:
                    "top 52%",

                  scrub:
                    0.65,

                  invalidateOnRefresh:
                    true,
                },
              });


            revealProject(
              photoRowTwoTimeline,
              "06",
              0,
              {
                revealTop:
                  false,
              }
            );


            revealProject(
              photoRowTwoTimeline,
              "07",
              0.16,
              {
                revealTop:
                  false,

                revealRight:
                  false,
              }
            );


            gsap.to(
              more,
              {
                opacity:
                  1,

                y:
                  0,

                ease:
                  "power2.out",

                scrollTrigger: {
                  id:
                    "projects-more",

                  trigger:
                    more,

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
          },
          section
        );


      const refreshFrame =
        requestAnimationFrame(
          () => {
            syncLayoutGeometry();

            ScrollTrigger.refresh();
          }
        );


      return () => {
        cancelAnimationFrame(
          refreshFrame
        );

        if (
          resizeFrame
        ) {
          cancelAnimationFrame(
            resizeFrame
          );
        }

        window.removeEventListener(
          "resize",
          handleResize
        );

        resizeObserver
          ?.disconnect();

        context.revert();
      };
    },
    []
  );


  return (
    <section
      ref={
        sectionRef
      }
      className="selected-work"
      id="work"
      data-takeover-label={
        language ===
        "sr"
          ? "NASTAVI DA SKROLUJEŠ"
          : "KEEP SCROLLING"
      }
    >
      <div
        ref={
          stageRef
        }
        className="selected-work__stage"
      >
        <div
          ref={
            layoutRef
          }
          className="selected-work__layout"
        >
          <div
            ref={
              introShellRef
            }
            className="selected-work__intro-shell"
          >
            <div
              ref={
                introRef
              }
              className="selected-work__intro"
            >
              <div className="selected-work__title-position">
                <h2
                  ref={
                    titleRef
                  }
                  className="selected-work__title"
                  aria-label={
                    projectTitle
                  }
                >
                  {projectTitle
                    .split(
                      ""
                    )
                    .map(
                      (
                        letter,
                        index
                      ) => (
                        <span
                          className="selected-work__letter-mask"
                          key={
                            index
                          }
                          aria-hidden="true"
                        >
                          <span className="selected-work__letter">
                            {letter}
                          </span>
                        </span>
                      )
                    )}
                </h2>
              </div>

              <div className="selected-work__top-grid">
                <ProjectItem
                  slot="01"
                  kind="landscape"
                  project={
                    project01
                  }
                  loading={
                    loading
                  }
                  playing={
                    hoveredVideo ===
                    "01"
                  }
                  onPointerEnter={
                    (
                      event
                    ) =>
                      handleVideoPointerEnter(
                        event,
                        "01"
                      )
                  }
                  onPointerLeave={
                    () =>
                      handleVideoPointerLeave(
                        "01"
                      )
                  }
                  sharedRight
                />

                <div className="selected-work__reel-grid">
                  <ProjectItem
                    slot="02"
                    kind="reel"
                    project={
                      project02
                    }
                    loading={
                      loading
                    }
                    playing={
                      hoveredVideo ===
                      "02"
                    }
                    onPointerEnter={
                      (
                        event
                      ) =>
                        handleVideoPointerEnter(
                          event,
                          "02"
                        )
                    }
                    onPointerLeave={
                      () =>
                        handleVideoPointerLeave(
                          "02"
                        )
                    }
                    noBottom
                  />

                  <ProjectItem
                    slot="03"
                    kind="reel"
                    project={
                      project03
                    }
                    loading={
                      loading
                    }
                    playing={
                      hoveredVideo ===
                      "03"
                    }
                    onPointerEnter={
                      (
                        event
                      ) =>
                        handleVideoPointerEnter(
                          event,
                          "03"
                        )
                    }
                    onPointerLeave={
                      () =>
                        handleVideoPointerLeave(
                          "03"
                        )
                    }
                    noBottom
                  />
                </div>
              </div>
            </div>
          </div>

          <SelectedWorkMobile
            projects={
              projects
            }
            loading={
              loading
            }
            text={
              text
            }
          />

          <div className="selected-work__continuation">
            <div className="selected-work__continuation-left">
              <div className="selected-work__photo-grid">
                <ProjectItem
                  slot="04"
                  kind="photo"
                  project={
                    project04
                  }
                  loading={
                    loading
                  }
                  sharedTop
                  numberPlacement="left"
                />

                <ProjectItem
                  slot="05"
                  kind="photo"
                  project={
                    project05
                  }
                  loading={
                    loading
                  }
                  sharedTop
                  sharedRight
                  numberPlacement="left"
                />

                <ProjectItem
                  slot="06"
                  kind="photo"
                  project={
                    project06
                  }
                  loading={
                    loading
                  }
                  sharedTop
                  numberPlacement="left"
                />

                <ProjectItem
                  slot="07"
                  kind="photo"
                  project={
                    project07
                  }
                  loading={
                    loading
                  }
                  sharedTop
                  sharedRight
                  numberPlacement="left"
                />
              </div>
            </div>

            <div className="selected-work__continuation-right">
              <ProjectItem
                slot="08"
                kind="landscape"
                project={
                  project08
                }
                loading={
                  loading
                }
                playing={
                  hoveredVideo ===
                  "08"
                }
                onPointerEnter={
                  (
                    event
                  ) =>
                    handleVideoPointerEnter(
                      event,
                      "08"
                    )
                }
                onPointerLeave={
                  () =>
                    handleVideoPointerLeave(
                      "08"
                    )
                }
                numberPlacement="left"
              />
            </div>
          </div>

          <div
            ref={
              moreRef
            }
            className="selected-work__more"
          >
            <a
              className="selected-work__more-link"
              href="/works"
            >
              {text.more}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


export default SelectedWork;