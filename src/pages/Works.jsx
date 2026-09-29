import {
  useEffect,
  useState,
} from "react";

import OptimizedVideo
  from "../components/ui/OptimizedVideo";

import {
  getPublishedProjects,
} from "../services/portfolioService";

import "../styles/pages/Works.css";


function ProjectPreview({
  project,
}) {
  if (!project) {
    return null;
  }


  const previewType =
    project.previewType ||
    (
      project.imageSrc
        ? "photo"
        : "landscape"
    );


  const imageSrc =
    project.imageSrc ||
    project.posterSrc ||
    "";


  if (
    previewType ===
    "photo"
  ) {
    return (
      <div
        className="
          works-page__preview-media
          works-page__preview-media--photo
        "
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={
              project.title ||
              "Project"
            }
            draggable="false"
          />
        ) : (
          <span className="works-page__preview-placeholder">
            PHOTO
          </span>
        )}
      </div>
    );
  }


  return (
    <div
      className={`
        works-page__preview-media
        works-page__preview-media--${previewType}
      `}
    >
      {project.videoSrc ? (
        <OptimizedVideo
          key={project.id}
          src={project.videoSrc}
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
          playing
          restartOnPlay
        />
      ) : imageSrc ? (
        <img
          src={imageSrc}
          alt={
            project.title ||
            "Project"
          }
          draggable="false"
        />
      ) : (
        <span className="works-page__preview-placeholder">
          VIDEO
        </span>
      )}
    </div>
  );
}


function Works() {
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


  /*
   * Desktop:
   * samo projekat koji je trenutno
   * pod mišem.
   */
  const [
    activeProject,
    setActiveProject,
  ] =
    useState(null);


  /*
   * Mobile:
   * više projekata može biti
   * otvoreno u isto vreme.
   */
  const [
    openMobileProjects,
    setOpenMobileProjects,
  ] =
    useState([]);


  useEffect(
    () => {
      let active = true;


      async function loadProjects() {
        try {
          const data =
            await getPublishedProjects();


          if (!active) {
            return;
          }


          setProjects(
            Array.isArray(data)
              ? data
              : []
          );
        } catch (error) {
          console.error(
            "Loading projects:",
            error
          );
        } finally {
          if (active) {
            setLoading(false);
          }
        }
      }


      loadProjects();


      return () => {
        active = false;
      };
    },
    []
  );


  function activateProject(
    event,
    project
  ) {
    if (
      event.pointerType !==
      "mouse"
    ) {
      return;
    }


    setActiveProject(
      project
    );
  }


  function deactivateProject(
    event,
    projectId
  ) {
    if (
      event.pointerType !==
      "mouse"
    ) {
      return;
    }


    setActiveProject(
      (current) =>
        current?.id ===
        projectId
          ? null
          : current
    );
  }


  function isMobileLayout() {
    return window.matchMedia(
      "(max-width: 760px)"
    ).matches;
  }


  function toggleMobileProject(
    projectId
  ) {
    setOpenMobileProjects(
      (current) => {
        if (
          current.includes(
            projectId
          )
        ) {
          return current.filter(
            (id) =>
              id !==
              projectId
          );
        }


        return [
          ...current,
          projectId,
        ];
      }
    );
  }


  function handleProjectClick(
    event,
    project
  ) {
    if (
      isMobileLayout()
    ) {
      event.preventDefault();

      toggleMobileProject(
        project.id
      );

      return;
    }


    if (
      !project.projectUrl
    ) {
      event.preventDefault();
    }
  }


  function renderProjectContent(
    project,
    isMobileOpen
  ) {
    return (
      <>
        <div className="works-page__project-main">
          <span className="works-page__project-title">
            {project.title}
          </span>

          <span
            className="works-page__mobile-toggle"
            aria-hidden="true"
          >
            {isMobileOpen
              ? "−"
              : "+"}
          </span>
        </div>


        <div className="works-page__project-details">
          <div className="works-page__project-details-inner">
            {project.category ? (
              <div className="works-page__project-detail">
                {
                  project.category
                }
              </div>
            ) : null}


            {project.format ? (
              <div className="works-page__project-detail">
                {
                  project.format
                }
              </div>
            ) : null}
          </div>
        </div>


        <div className="works-page__mobile-preview">
          {project.projectUrl ? (
            <a
              className="works-page__mobile-preview-link"
              href={
                project.projectUrl
              }
              target="_blank"
              rel="noreferrer"
              onClick={
                (event) =>
                  event.stopPropagation()
              }
              aria-label={
                `Open ${project.title}`
              }
            >
              <ProjectPreview
                project={project}
              />
            </a>
          ) : (
            <ProjectPreview
              project={project}
            />
          )}
        </div>
      </>
    );
  }


  return (
    <section className="works-page">
      <div className="works-page__inner">

        {/* =============================================
            PROJECT LIST
            ============================================= */}

        <div className="works-page__list">
          {loading ? (
            <div className="works-page__loading">
              Loading projects
            </div>
          ) : null}


          {!loading &&
          projects.length === 0 ? (
            <div className="works-page__loading">
              No projects yet
            </div>
          ) : null}


          {projects.map(
            (project) => {
              const isActive =
                activeProject?.id ===
                project.id;


              const isMobileOpen =
                openMobileProjects.includes(
                  project.id
                );


              const className = `
                works-page__project
                ${
                  isActive
                    ? "works-page__project--active"
                    : ""
                }
                ${
                  isMobileOpen
                    ? "works-page__project--mobile-open"
                    : ""
                }
              `;


              if (
                project.projectUrl
              ) {
                return (
                  <a
                    key={project.id}
                    className={className}
                    href={
                      project.projectUrl
                    }
                    target="_blank"
                    rel="noreferrer"
                    onPointerEnter={
                      (event) =>
                        activateProject(
                          event,
                          project
                        )
                    }
                    onPointerLeave={
                      (event) =>
                        deactivateProject(
                          event,
                          project.id
                        )
                    }
                    onClick={
                      (event) =>
                        handleProjectClick(
                          event,
                          project
                        )
                    }
                  >
                    {renderProjectContent(
                      project,
                      isMobileOpen
                    )}
                  </a>
                );
              }


              return (
                <button
                  key={project.id}
                  type="button"
                  className={`
                    ${className}
                    works-page__project--no-link
                  `}
                  onPointerEnter={
                    (event) =>
                      activateProject(
                        event,
                        project
                      )
                  }
                  onPointerLeave={
                    (event) =>
                      deactivateProject(
                        event,
                        project.id
                      )
                  }
                  onClick={
                    (event) =>
                      handleProjectClick(
                        event,
                        project
                      )
                  }
                >
                  {renderProjectContent(
                    project,
                    isMobileOpen
                  )}
                </button>
              );
            }
          )}
        </div>


        {/* =============================================
            DESKTOP HOVER PREVIEW
            ============================================= */}

        <div className="works-page__preview-column">
          <div className="works-page__preview-frame">
            <ProjectPreview
              project={
                activeProject
              }
            />
          </div>
        </div>

      </div>
    </section>
  );
}


export default Works;