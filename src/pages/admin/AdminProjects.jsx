import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  createProject,
  deleteProject,
  getAdminProjects,
  removeProjectMedia,
  signOutAdmin,
  updateProject,
  uploadProjectMedia,
} from "../../services/portfolioService";

import "../../styles/pages/Admin.css";


function createEmptyForm() {
  return {
    title:
      "",

    category:
      "",

    format:
      "",

    year:
      String(
        new Date()
          .getFullYear()
      ),

    previewType:
      "landscape",

    projectUrl:
      "",

    videoSrc:
      "",

    mobileVideoSrc:
      "",

    posterSrc:
      "",

    imageSrc:
      "",

    published:
      true,

    showOnHome:
      false,

    homeOrder:
      "",

    sortOrder:
      "",
  };
}


function getProjectForm(
  project
) {
  return {
    title:
      project.title ||
      "",

    category:
      project.category ||
      "",

    format:
      project.format ||
      "",

    year:
      project.year ||
      "",

    previewType:
      project.previewType ||
      "landscape",

    projectUrl:
      project.projectUrl ||
      "",

    videoSrc:
      project.videoSrc ||
      "",

    mobileVideoSrc:
      project.mobileVideoSrc ||
      "",

    posterSrc:
      project.posterSrc ||
      "",

    imageSrc:
      project.imageSrc ||
      "",

    published:
      Boolean(
        project.published
      ),

    showOnHome:
      Boolean(
        project.showOnHome
      ),

    homeOrder:
      project.homeOrder ??
      "",

    sortOrder:
      project.sortOrder ??
      "",
  };
}


function MediaStatus({
  label,
  url,
}) {
  if (
    !url
  ) {
    return (
      <span className="admin-media-status admin-media-status--empty">
        {label}: EMPTY
      </span>
    );
  }


  return (
    <a
      className="admin-media-status"
      href={
        url
      }
      target="_blank"
      rel="noreferrer"
    >
      {label}: VIEW ↗
    </a>
  );
}


function AdminProjects() {
  const navigate =
    useNavigate();


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
    saving,
    setSaving,
  ] =
    useState(false);

  const [
    deletingId,
    setDeletingId,
  ] =
    useState(null);

  const [
    editingProject,
    setEditingProject,
  ] =
    useState(null);

  const [
    form,
    setForm,
  ] =
    useState(
      createEmptyForm
    );

  const [
    videoFile,
    setVideoFile,
  ] =
    useState(null);

  const [
    mobileVideoFile,
    setMobileVideoFile,
  ] =
    useState(null);

  const [
    posterFile,
    setPosterFile,
  ] =
    useState(null);

  const [
    imageFile,
    setImageFile,
  ] =
    useState(null);

  const [
    errorMessage,
    setErrorMessage,
  ] =
    useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] =
    useState("");


  const videoInputRef =
    useRef(null);

  const mobileVideoInputRef =
    useRef(null);

  const posterInputRef =
    useRef(null);

  const imageInputRef =
    useRef(null);


  const homepageProjects =
    useMemo(
      () =>
        projects.filter(
          (
            project
          ) =>
            project.showOnHome
        ),
      [
        projects,
      ]
    );


  async function loadProjects() {
    setLoading(
      true
    );


    try {
      const data =
        await getAdminProjects();


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
      setErrorMessage(
        error?.message ||
        "Projects could not be loaded."
      );
    } finally {
      setLoading(
        false
      );
    }
  }


  useEffect(
    () => {
      loadProjects();
    },
    []
  );


  function clearFileInputs() {
    setVideoFile(
      null
    );

    setMobileVideoFile(
      null
    );

    setPosterFile(
      null
    );

    setImageFile(
      null
    );


    if (
      videoInputRef.current
    ) {
      videoInputRef.current.value =
        "";
    }


    if (
      mobileVideoInputRef.current
    ) {
      mobileVideoInputRef.current.value =
        "";
    }


    if (
      posterInputRef.current
    ) {
      posterInputRef.current.value =
        "";
    }


    if (
      imageInputRef.current
    ) {
      imageInputRef.current.value =
        "";
    }
  }


  function resetEditor() {
    setEditingProject(
      null
    );

    setForm(
      createEmptyForm()
    );

    clearFileInputs();

    setErrorMessage(
      ""
    );

    setSuccessMessage(
      ""
    );
  }


  function startNewProject() {
    const nextSortOrder =
      projects.length > 0
        ? Math.max(
            ...projects.map(
              (
                project
              ) =>
                Number(
                  project.sortOrder
                ) ||
                0
            )
          ) + 1
        : 1;


    const nextHomeOrder =
      homepageProjects.length > 0
        ? Math.max(
            ...homepageProjects.map(
              (
                project
              ) =>
                Number(
                  project.homeOrder
                ) ||
                0
            )
          ) + 1
        : 1;


    setEditingProject(
      null
    );


    setForm({
      ...createEmptyForm(),

      sortOrder:
        String(
          nextSortOrder
        ),

      homeOrder:
        String(
          nextHomeOrder
        ),
    });


    clearFileInputs();

    setErrorMessage(
      ""
    );

    setSuccessMessage(
      ""
    );


    window.scrollTo({
      top:
        0,

      behavior:
        "smooth",
    });
  }


  function startEditing(
    project
  ) {
    setEditingProject(
      project
    );

    setForm(
      getProjectForm(
        project
      )
    );

    clearFileInputs();

    setErrorMessage(
      ""
    );

    setSuccessMessage(
      ""
    );


    window.scrollTo({
      top:
        0,

      behavior:
        "smooth",
    });
  }


  function updateField(
    key,
    value
  ) {
    setForm(
      (
        current
      ) => ({
        ...current,

        [key]:
          value,
      })
    );
  }


  async function uploadReplacement({
    projectId,
    kind,
    file,
    currentUrl,
  }) {
    if (
      !file
    ) {
      return {
        url:
          currentUrl,

        oldUrl:
          null,
      };
    }


    const uploaded =
      await uploadProjectMedia({
        projectId,
        kind,
        file,
      });


    return {
      url:
        uploaded.url,

      oldUrl:
        currentUrl ||
        null,
    };
  }


  async function handleSave(
    event
  ) {
    event.preventDefault();


    if (
      saving
    ) {
      return;
    }


    setErrorMessage(
      ""
    );

    setSuccessMessage(
      ""
    );


    const cleanTitle =
      form.title.trim();


    if (
      !cleanTitle
    ) {
      setErrorMessage(
        "Project title is required."
      );

      return;
    }


    const alreadyOnHome =
      Boolean(
        editingProject
          ?.showOnHome
      );


    if (
      form.showOnHome &&
      !alreadyOnHome &&
      homepageProjects.length >=
        8
    ) {
      setErrorMessage(
        "Homepage can contain a maximum of 8 projects."
      );

      return;
    }


    if (
      form.projectUrl &&
      !/^https?:\/\//i.test(
        form.projectUrl.trim()
      )
    ) {
      setErrorMessage(
        "Full video URL must begin with http:// or https://."
      );

      return;
    }


    setSaving(
      true
    );


    const newlyUploadedUrls =
      [];


    try {
      let savedProject =
        editingProject;


      const basePayload = {
        ...form,

        title:
          cleanTitle,

        category:
          form.category.trim(),

        format:
          form.format.trim(),

        year:
          form.year.trim(),

        projectUrl:
          form.projectUrl.trim(),

        sortOrder:
          Number(
            form.sortOrder
          ) ||
          0,

        homeOrder:
          form.showOnHome
            ? (
                Number(
                  form.homeOrder
                ) ||
                null
              )
            : null,
      };


      if (
        !savedProject
      ) {
        savedProject =
          await createProject(
            basePayload
          );
      }


      const [
        previewUpload,
        mobileUpload,
        posterUpload,
        imageUpload,
      ] =
        await Promise.all([
          uploadReplacement({
            projectId:
              savedProject.id,

            kind:
              "preview",

            file:
              videoFile,

            currentUrl:
              savedProject.videoSrc ||
              "",
          }),

          uploadReplacement({
            projectId:
              savedProject.id,

            kind:
              "mobile-preview",

            file:
              mobileVideoFile,

            currentUrl:
              savedProject.mobileVideoSrc ||
              "",
          }),

          uploadReplacement({
            projectId:
              savedProject.id,

            kind:
              "poster",

            file:
              posterFile,

            currentUrl:
              savedProject.posterSrc ||
              "",
          }),

          uploadReplacement({
            projectId:
              savedProject.id,

            kind:
              "image",

            file:
              imageFile,

            currentUrl:
              savedProject.imageSrc ||
              "",
          }),
        ]);


      [
        previewUpload,
        mobileUpload,
        posterUpload,
        imageUpload,
      ].forEach(
        (
          upload
        ) => {
          if (
            upload.oldUrl &&
            upload.url !==
              upload.oldUrl
          ) {
            newlyUploadedUrls.push({
              newUrl:
                upload.url,

              oldUrl:
                upload.oldUrl,
            });
          }
        }
      );


      const finalPayload = {
        ...basePayload,

        videoSrc:
          previewUpload.url,

        mobileVideoSrc:
          mobileUpload.url,

        posterSrc:
          posterUpload.url,

        imageSrc:
          imageUpload.url,
      };


      const finalProject =
        await updateProject(
          savedProject.id,
          finalPayload
        );


      for (
        const replacement
        of newlyUploadedUrls
      ) {
        try {
          await removeProjectMedia(
            replacement.oldUrl
          );
        } catch (
          cleanupError
        ) {
          console.warn(
            "Old media cleanup failed:",
            cleanupError
          );
        }
      }


      setEditingProject(
        finalProject
      );

      setForm(
        getProjectForm(
          finalProject
        )
      );

      clearFileInputs();


      setSuccessMessage(
        editingProject
          ? "Project updated."
          : "Project created."
      );


      await loadProjects();
    } catch (
      error
    ) {
      console.error(
        "Saving project:",
        error
      );


      setErrorMessage(
        error?.message ||
        "Project could not be saved."
      );
    } finally {
      setSaving(
        false
      );
    }
  }


  async function handleDelete(
    project
  ) {
    const confirmed =
      window.confirm(
        `Delete "${project.title}" permanently?`
      );


    if (
      !confirmed
    ) {
      return;
    }


    setDeletingId(
      project.id
    );

    setErrorMessage(
      ""
    );

    setSuccessMessage(
      ""
    );


    try {
      await deleteProject(
        project.id
      );


      if (
        editingProject?.id ===
        project.id
      ) {
        resetEditor();
      }


      setSuccessMessage(
        "Project deleted."
      );


      await loadProjects();
    } catch (
      error
    ) {
      setErrorMessage(
        error?.message ||
        "Project could not be deleted."
      );
    } finally {
      setDeletingId(
        null
      );
    }
  }


  async function handleLogout() {
    try {
      await signOutAdmin();
    } finally {
      navigate(
        "/admin/login",
        {
          replace:
            true,
        }
      );
    }
  }


  return (
    <section className="admin-projects">
      <header className="admin-projects__header">
        <div>
          <span className="admin-kicker">
            N/M PORTFOLIO
          </span>

          <h1>
            PROJECTS
          </h1>
        </div>


        <div className="admin-projects__header-actions">
          <button
            type="button"
            className="admin-button admin-button--primary"
            onClick={
              startNewProject
            }
          >
            + ADD PROJECT
          </button>

          <button
            type="button"
            className="admin-button"
            onClick={
              handleLogout
            }
          >
            LOG OUT
          </button>
        </div>
      </header>


      <div className="admin-projects__layout">

        <form
          className="admin-editor"
          onSubmit={
            handleSave
          }
        >
          <div className="admin-editor__heading">
            <div>
              <span>
                {editingProject
                  ? "EDIT PROJECT"
                  : "NEW PROJECT"}
              </span>

              <h2>
                {editingProject
                  ?.title ||
                  "Project details"}
              </h2>
            </div>


            {editingProject ? (
              <button
                type="button"
                className="admin-text-button"
                onClick={
                  resetEditor
                }
              >
                CANCEL EDIT
              </button>
            ) : null}
          </div>


          {errorMessage ? (
            <p className="admin-message admin-message--error">
              {errorMessage}
            </p>
          ) : null}


          {successMessage ? (
            <p className="admin-message admin-message--success">
              {successMessage}
            </p>
          ) : null}


          <div className="admin-form-grid">

            <label className="admin-field admin-field--wide">
              <span>
                TITLE *
              </span>

              <input
                type="text"
                value={
                  form.title
                }
                onChange={
                  (
                    event
                  ) =>
                    updateField(
                      "title",
                      event.target.value
                    )
                }
                placeholder="Nike Campaign"
              />
            </label>


            <label className="admin-field">
              <span>
                CATEGORY
              </span>

              <input
                type="text"
                value={
                  form.category
                }
                onChange={
                  (
                    event
                  ) =>
                    updateField(
                      "category",
                      event.target.value
                    )
                }
                placeholder="COMMERCIAL"
              />
            </label>


            <label className="admin-field">
              <span>
                FORMAT
              </span>

              <input
                type="text"
                value={
                  form.format
                }
                onChange={
                  (
                    event
                  ) =>
                    updateField(
                      "format",
                      event.target.value
                    )
                }
                placeholder="FILM"
              />
            </label>


            <label className="admin-field">
              <span>
                YEAR
              </span>

              <input
                type="text"
                value={
                  form.year
                }
                onChange={
                  (
                    event
                  ) =>
                    updateField(
                      "year",
                      event.target.value
                    )
                }
                placeholder="2026"
              />
            </label>


            <label className="admin-field">
              <span>
                PREVIEW TYPE
              </span>

              <select
                value={
                  form.previewType
                }
                onChange={
                  (
                    event
                  ) =>
                    updateField(
                      "previewType",
                      event.target.value
                    )
                }
              >
                <option value="landscape">
                  Landscape
                </option>

                <option value="reel">
                  Reel / Vertical
                </option>

                <option value="photo">
                  Photo
                </option>
              </select>
            </label>


            <label className="admin-field admin-field--wide">
              <span>
                FULL VIDEO / PROJECT URL
              </span>

              <input
                type="url"
                value={
                  form.projectUrl
                }
                onChange={
                  (
                    event
                  ) =>
                    updateField(
                      "projectUrl",
                      event.target.value
                    )
                }
                placeholder="https://vimeo.com/..."
              />

              <small>
                Clicking the project on the public site opens this URL.
              </small>
            </label>


            <label className="admin-field">
              <span>
                WORKS ORDER
              </span>

              <input
                type="number"
                min="0"
                value={
                  form.sortOrder
                }
                onChange={
                  (
                    event
                  ) =>
                    updateField(
                      "sortOrder",
                      event.target.value
                    )
                }
              />
            </label>


            <label className="admin-field">
              <span>
                HOME ORDER
              </span>

              <input
                type="number"
                min="1"
                max="8"
                value={
                  form.homeOrder
                }
                disabled={
                  !form.showOnHome
                }
                onChange={
                  (
                    event
                  ) =>
                    updateField(
                      "homeOrder",
                      event.target.value
                    )
                }
              />
            </label>

          </div>


          <div className="admin-toggles">

            <label className="admin-toggle">
              <input
                type="checkbox"
                checked={
                  form.published
                }
                onChange={
                  (
                    event
                  ) =>
                    updateField(
                      "published",
                      event.target.checked
                    )
                }
              />

              <span>
                PUBLISHED
              </span>
            </label>


            <label className="admin-toggle">
              <input
                type="checkbox"
                checked={
                  form.showOnHome
                }
                onChange={
                  (
                    event
                  ) =>
                    updateField(
                      "showOnHome",
                      event.target.checked
                    )
                }
              />

              <span>
                SHOW ON HOMEPAGE
              </span>
            </label>

          </div>


          <div className="admin-media-section">
            <div className="admin-media-section__heading">
              <span>
                MEDIA
              </span>

              <p>
                Upload optimized preview files. Full video stays external through the URL above.
              </p>
            </div>


            <div className="admin-media-grid">

              <label className="admin-upload">
                <span>
                  DESKTOP PREVIEW VIDEO
                </span>

                <input
                  ref={
                    videoInputRef
                  }
                  type="file"
                  accept="video/*"
                  onChange={
                    (
                      event
                    ) =>
                      setVideoFile(
                        event.target
                          .files?.[0] ||
                        null
                      )
                  }
                />

                <strong>
                  {videoFile
                    ?.name ||
                    "CHOOSE VIDEO"}
                </strong>

                <MediaStatus
                  label="CURRENT"
                  url={
                    form.videoSrc
                  }
                />
              </label>


              <label className="admin-upload">
                <span>
                  MOBILE PREVIEW VIDEO
                </span>

                <input
                  ref={
                    mobileVideoInputRef
                  }
                  type="file"
                  accept="video/*"
                  onChange={
                    (
                      event
                    ) =>
                      setMobileVideoFile(
                        event.target
                          .files?.[0] ||
                        null
                      )
                  }
                />

                <strong>
                  {mobileVideoFile
                    ?.name ||
                    "CHOOSE VIDEO"}
                </strong>

                <MediaStatus
                  label="CURRENT"
                  url={
                    form.mobileVideoSrc
                  }
                />
              </label>


              <label className="admin-upload">
                <span>
                  POSTER
                </span>

                <input
                  ref={
                    posterInputRef
                  }
                  type="file"
                  accept="image/*"
                  onChange={
                    (
                      event
                    ) =>
                      setPosterFile(
                        event.target
                          .files?.[0] ||
                        null
                      )
                  }
                />

                <strong>
                  {posterFile
                    ?.name ||
                    "CHOOSE IMAGE"}
                </strong>

                <MediaStatus
                  label="CURRENT"
                  url={
                    form.posterSrc
                  }
                />
              </label>


              <label className="admin-upload">
                <span>
                  PHOTO PREVIEW
                </span>

                <input
                  ref={
                    imageInputRef
                  }
                  type="file"
                  accept="image/*"
                  onChange={
                    (
                      event
                    ) =>
                      setImageFile(
                        event.target
                          .files?.[0] ||
                        null
                      )
                  }
                />

                <strong>
                  {imageFile
                    ?.name ||
                    "CHOOSE IMAGE"}
                </strong>

                <MediaStatus
                  label="CURRENT"
                  url={
                    form.imageSrc
                  }
                />
              </label>

            </div>
          </div>


          <div className="admin-editor__actions">
            <button
              type="submit"
              className="admin-button admin-button--primary admin-button--large"
              disabled={
                saving
              }
            >
              {saving
                ? "SAVING..."
                : editingProject
                  ? "SAVE CHANGES"
                  : "CREATE PROJECT"}
            </button>
          </div>
        </form>


        <aside className="admin-project-list">
          <div className="admin-project-list__heading">
            <span>
              ALL PROJECTS
            </span>

            <strong>
              {projects.length}
            </strong>
          </div>


          <div className="admin-project-list__home-counter">
            HOMEPAGE{" "}
            <strong>
              {homepageProjects.length}/8
            </strong>
          </div>


          {loading ? (
            <div className="admin-project-list__state">
              LOADING PROJECTS...
            </div>
          ) : null}


          {!loading &&
          projects.length ===
            0 ? (
            <div className="admin-project-list__state">
              NO PROJECTS YET
            </div>
          ) : null}


          <div className="admin-project-list__items">
            {projects.map(
              (
                project
              ) => (
                <article
                  key={
                    project.id
                  }
                  className={[
                    "admin-project-row",

                    editingProject
                      ?.id ===
                    project.id
                      ? "admin-project-row--active"
                      : "",
                  ]
                    .filter(
                      Boolean
                    )
                    .join(
                      " "
                    )}
                >
                  <button
                    type="button"
                    className="admin-project-row__main"
                    onClick={
                      () =>
                        startEditing(
                          project
                        )
                    }
                  >
                    <div className="admin-project-row__top">
                      <strong>
                        {project.title}
                      </strong>

                      <span>
                        {String(
                          project.sortOrder ??
                          0
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>
                    </div>


                    <div className="admin-project-row__meta">
                      {project.category ? (
                        <span>
                          {project.category}
                        </span>
                      ) : null}

                      {project.format ? (
                        <span>
                          {project.format}
                        </span>
                      ) : null}

                      {project.year ? (
                        <span>
                          {project.year}
                        </span>
                      ) : null}
                    </div>


                    <div className="admin-project-row__badges">
                      <span
                        className={
                          project.published
                            ? "admin-badge admin-badge--on"
                            : "admin-badge"
                        }
                      >
                        {project.published
                          ? "PUBLISHED"
                          : "DRAFT"}
                      </span>


                      {project.showOnHome ? (
                        <span className="admin-badge admin-badge--home">
                          HOME{" "}
                          {project.homeOrder ??
                            "—"}
                        </span>
                      ) : null}


                      <span className="admin-badge">
                        {project.previewType}
                      </span>
                    </div>
                  </button>


                  <div className="admin-project-row__actions">
                    <button
                      type="button"
                      onClick={
                        () =>
                          startEditing(
                            project
                          )
                      }
                    >
                      EDIT
                    </button>

                    <button
                      type="button"
                      className="admin-project-row__delete"
                      disabled={
                        deletingId ===
                        project.id
                      }
                      onClick={
                        () =>
                          handleDelete(
                            project
                          )
                      }
                    >
                      {deletingId ===
                      project.id
                        ? "DELETING..."
                        : "DELETE"}
                    </button>
                  </div>
                </article>
              )
            )}
          </div>
        </aside>

      </div>
    </section>
  );
}


export default AdminProjects;