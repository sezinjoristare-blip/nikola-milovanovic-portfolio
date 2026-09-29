import {
  useEffect,
} from "react";

import Lenis
  from "lenis";

import gsap
  from "gsap";

import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";


gsap.registerPlugin(
  ScrollTrigger
);


export default function useLenis() {
  useEffect(
    () => {
      const reducedMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;


      /*
       * Kod reduced motion-a
       * ne uključujemo Lenis.
       *
       * Native scroll ostaje normalan,
       * a Projects animacija će kasnije
       * imati svoju reduced-motion
       * varijantu.
       */

      if (
        reducedMotion
      ) {
        return undefined;
      }


      /*
       * ================================================
       * LENIS
       * ================================================
       */

      const lenis =
        new Lenis({
          duration:
            1.05,

          smoothWheel:
            true,

          syncTouch:
            false,

          wheelMultiplier:
            1,

          touchMultiplier:
            1,
        });


      /*
       * ================================================
       * LENIS → SCROLLTRIGGER
       * ================================================
       *
       * Kad Lenis promeni scroll,
       * odmah obavestimo ScrollTrigger.
       *
       * Tako svi scrub/pin timeline-i
       * znaju tačnu poziciju scrolla.
       */

      function handleLenisScroll() {
        ScrollTrigger.update();
      }


      lenis.on(
        "scroll",
        handleLenisScroll
      );


      /*
       * ================================================
       * JEDAN MASTER RAF
       * ================================================
       *
       * Više nemamo poseban
       * requestAnimationFrame za Lenis.
       *
       * GSAP ticker sada vozi i Lenis.
       *
       * GSAP daje vreme u sekundama,
       * Lenis očekuje milisekunde,
       * zato * 1000.
       */

      function updateLenis(
        time
      ) {
        lenis.raf(
          time *
          1000
        );
      }


      gsap.ticker.add(
        updateLenis
      );


      /*
       * Za scroll-linked animacije
       * ne želimo da GSAP pokušava
       * da "nadoknadi" propuštene
       * frame-ove velikim skokom.
       *
       * Time motion ostaje stabilniji.
       */

      gsap.ticker.lagSmoothing(
        0
      );


      /*
       * Kad je sve spremno,
       * ponovo izračunamo pozicije
       * ScrollTrigger elemenata.
       */

      ScrollTrigger.refresh();


      /*
       * ================================================
       * CLEANUP
       * ================================================
       */

      return () => {
        lenis.off(
          "scroll",
          handleLenisScroll
        );


        gsap.ticker.remove(
          updateLenis
        );


        lenis.destroy();
      };
    },
    []
  );
}