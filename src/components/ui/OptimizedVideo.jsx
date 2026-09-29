import {
  useEffect,
  useRef,
  useState,
} from "react";

import useNearViewport
  from "../../hooks/useNearViewport";

import "../../styles/ui/OptimizedVideo.css";


function OptimizedVideo({
  src,

  mobileSrc = null,

  poster = "",

  alt = "",

  className = "",

  eager = false,

  loop = true,

  autoPlay = true,

  objectPosition =
    "center center",

  controlledPlayback =
    false,

  playing =
    false,

  restartOnPlay =
    false,

  posterWhenPaused =
    false,

  onReady =
    null,
}) {
  const wrapperRef =
    useRef(null);


  const videoRef =
    useRef(null);


  const previousPlayingRef =
    useRef(false);


  const [
    isReady,
    setIsReady,
  ] =
    useState(false);


  const [
    hasError,
    setHasError,
  ] =
    useState(false);


  const isNear =
    useNearViewport(
      wrapperRef,
      {
        rootMargin:
          "700px 0px",

        once:
          true,
      }
    );


  const shouldLoad =
    eager ||
    isNear;


  const showPausePoster =
    controlledPlayback &&
    posterWhenPaused &&
    !playing;


  /*
   * NORMAL VIDEOS
   *
   * Existing site behaviour.
   */
  useEffect(
    () => {
      if (
        controlledPlayback
      ) {
        return undefined;
      }


      const video =
        videoRef.current;


      if (
        !video ||
        !shouldLoad
      ) {
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
              if (
                autoPlay
              ) {
                video
                  .play()
                  .catch(
                    () => {}
                  );
              }

              return;
            }


            video.pause();
          },
          {
            threshold:
              0.08,
          }
        );


      observer.observe(
        video
      );


      return () => {
        observer.disconnect();
      };
    },
    [
      shouldLoad,
      autoPlay,
      controlledPlayback,
    ]
  );


  /*
   * CONTROLLED VIDEOS
   *
   * restartOnPlay:
   * resets video to 0.
   *
   * Without restartOnPlay:
   * pause preserves currentTime,
   * so playback can continue
   * from the same frame.
   */
  useEffect(
    () => {
      if (
        !controlledPlayback
      ) {
        return;
      }


      const video =
        videoRef.current;


      if (
        !video ||
        !shouldLoad
      ) {
        return;
      }


      const wasPlaying =
        previousPlayingRef
          .current;


      if (
        playing
      ) {
        if (
          restartOnPlay &&
          !wasPlaying
        ) {
          try {
            video.currentTime =
              0;
          } catch {
            // Browser may not allow seeking
            // before metadata exists.
          }
        }


        video
          .play()
          .catch(
            () => {}
          );
      } else {
        video.pause();


        if (
          restartOnPlay
        ) {
          try {
            video.currentTime =
              0;
          } catch {
            // Safe fallback.
          }
        }
      }


      previousPlayingRef.current =
        playing;
    },
    [
      controlledPlayback,
      playing,
      restartOnPlay,
      shouldLoad,
    ]
  );


  return (
    <div
      ref={
        wrapperRef
      }
      className={
        [
          "optimized-video",

          isReady
            ? "optimized-video--ready"
            : "",

          hasError
            ? "optimized-video--error"
            : "",

          className,
        ]
          .filter(
            Boolean
          )
          .join(
            " "
          )
      }
    >
      {poster ? (
        <img
          className="optimized-video__poster"
          src={
            poster
          }
          alt=""
          aria-hidden="true"
          loading={
            eager
              ? "eager"
              : "lazy"
          }
          decoding="async"
          draggable="false"
          style={{
            objectPosition,
          }}
        />
      ) : null}


      {shouldLoad &&
      src ? (
        <video
          ref={
            videoRef
          }
          className="optimized-video__media"
          muted
          playsInline
          loop={
            loop
          }
          autoPlay={
            controlledPlayback
              ? false
              : autoPlay
          }
          preload={
            eager
              ? "auto"
              : "none"
          }
          aria-label={
            alt ||
            undefined
          }
          style={{
            objectPosition,
          }}
          onCanPlay={
            () => {
              setIsReady(
                true
              );


              setHasError(
                false
              );


              if (
                onReady
              ) {
                onReady(
                  videoRef.current
                );
              }
            }
          }
          onError={
            () => {
              setHasError(
                true
              );
            }
          }
        >
          {mobileSrc ? (
            <source
              src={
                mobileSrc
              }
              media="(max-width: 760px)"
              type="video/mp4"
            />
          ) : null}

          <source
            src={
              src
            }
            type="video/mp4"
          />
        </video>
      ) : null}


      {poster &&
      posterWhenPaused ? (
        <img
          className={[
            "optimized-video__pause-poster",

            showPausePoster
              ? "optimized-video__pause-poster--visible"
              : "",
          ]
            .filter(
              Boolean
            )
            .join(
              " "
            )}
          src={
            poster
          }
          alt=""
          aria-hidden="true"
          decoding="async"
          draggable="false"
          style={{
            objectPosition,
          }}
        />
      ) : null}


      {!src ? (
        <div className="optimized-video__placeholder">
          <span>
            VIDEO
          </span>
        </div>
      ) : null}
    </div>
  );
}


export default OptimizedVideo;