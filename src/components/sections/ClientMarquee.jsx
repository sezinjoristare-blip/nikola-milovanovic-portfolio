import {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";

import clients
  from "../../data/clients";

import {
  useLanguage,
} from "../../context/LanguageContext";

import "../../styles/sections/ClientMarquee.css";


const copy = {
  en: {
    label:
      "SELECTED CLIENTS",
  },

  sr: {
    label:
      "IZABRANI KLIJENTI",
  },
};


function ClientGroup({
  hidden = false,
}) {
  return (
    <div
      className="client-marquee__group"
      aria-hidden={
        hidden
          ? "true"
          : undefined
      }
    >
      {clients.map(
        (
          client
        ) => (
          <div
            className="client-marquee__item"
            key={
              hidden
                ? `${client.id}-duplicate`
                : client.id
            }
          >
            <img
              src={
                client.logo
              }
              alt={
                hidden
                  ? ""
                  : client.name
              }
              loading="lazy"
              draggable="false"
            />

            <span
              className="client-marquee__separator"
              aria-hidden="true"
            />
          </div>
        )
      )}
    </div>
  );
}


function ClientMarquee() {
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


  const trackRef =
    useRef(null);


  useLayoutEffect(
    () => {
      const section =
        sectionRef.current;


      const track =
        trackRef.current;


      if (
        !section ||
        !track
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
        return undefined;
      }


      const context =
        gsap.context(
          () => {
            const movement =
              gsap.to(
                track,
                {
                  xPercent:
                    -50,

                  duration:
                    24,

                  repeat:
                    -1,

                  ease:
                    "none",
                }
              );


            function slowDown() {
              gsap.to(
                movement,
                {
                  timeScale:
                    0.25,

                  duration:
                    0.8,

                  ease:
                    "power2.out",
                }
              );
            }


            function speedUp() {
              gsap.to(
                movement,
                {
                  timeScale:
                    1,

                  duration:
                    1,

                  ease:
                    "power2.out",
                }
              );
            }


            section.addEventListener(
              "pointerenter",
              slowDown
            );


            section.addEventListener(
              "pointerleave",
              speedUp
            );


            return () => {
              section.removeEventListener(
                "pointerenter",
                slowDown
              );


              section.removeEventListener(
                "pointerleave",
                speedUp
              );
            };
          },
          section
        );


      return () => {
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
      className="client-marquee"
      aria-label={
        text.label
      }
    >
      <div className="client-marquee__header site-shell">
        <span>
          {text.label}
        </span>
      </div>


      <div className="client-marquee__viewport">
        <div
          ref={
            trackRef
          }
          className="client-marquee__track"
        >
          <ClientGroup />

          <ClientGroup
            hidden
          />
        </div>
      </div>
    </section>
  );
}


export default ClientMarquee;