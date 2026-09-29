import {
  useEffect,
  useState,
} from "react";


export default function useNearViewport(
  ref,
  {
    rootMargin =
      "600px 0px",
    once =
      true,
  } = {}
) {
  const [
    isNear,
    setIsNear,
  ] =
    useState(false);


  useEffect(
    () => {
      const element =
        ref.current;


      if (
        !element
      ) {
        return undefined;
      }


      if (
        !(
          "IntersectionObserver"
          in window
        )
      ) {
        setIsNear(
          true
        );

        return undefined;
      }


      const observer =
        new IntersectionObserver(
          (
            entries
          ) => {
            const [
              entry,
            ] =
              entries;


            if (
              entry.isIntersecting
            ) {
              setIsNear(
                true
              );


              if (
                once
              ) {
                observer.disconnect();
              }

              return;
            }


            if (
              !once
            ) {
              setIsNear(
                false
              );
            }
          },
          {
            rootMargin,
          }
        );


      observer.observe(
        element
      );


      return () => {
        observer.disconnect();
      };
    },
    [
      ref,
      rootMargin,
      once,
    ]
  );


  return isNear;
}