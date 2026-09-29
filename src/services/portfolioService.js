import {
  supabase,
} from "../lib/supabaseClient";


const MEDIA_BUCKET =
  "portfolio-media";


function normalizeProject(
  project
) {
  if (
    !project
  ) {
    return null;
  }


  return {
    id:
      project.id,

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

    status:
      project.published
        ? "published"
        : "draft",

    published:
      Boolean(
        project.published
      ),

    sortOrder:
      project.sort_order ??
      0,

    previewType:
      project.preview_type ||
      "landscape",

    projectUrl:
      project.project_url ||
      "",

    videoSrc:
      project.video_url ||
      "",

    mobileVideoSrc:
      project.mobile_video_url ||
      "",

    posterSrc:
      project.poster_url ||
      "",

    imageSrc:
      project.image_url ||
      "",

    showOnHome:
      Boolean(
        project.show_on_home
      ),

    homeOrder:
      project.home_order ??
      null,

    createdAt:
      project.created_at ||
      null,

    updatedAt:
      project.updated_at ||
      null,
  };
}


function projectToRow(
  project
) {
  return {
    title:
      project.title
        ?.trim() ||
      "Untitled project",

    category:
      project.category
        ?.trim() ||
      null,

    format:
      project.format
        ?.trim() ||
      null,

    year:
      project.year
        ?.trim() ||
      null,

    preview_type:
      project.previewType ||
      "landscape",

    project_url:
      project.projectUrl
        ?.trim() ||
      null,

    video_url:
      project.videoSrc ||
      null,

    mobile_video_url:
      project.mobileVideoSrc ||
      null,

    poster_url:
      project.posterSrc ||
      null,

    image_url:
      project.imageSrc ||
      null,

    published:
      Boolean(
        project.published
      ),

    show_on_home:
      Boolean(
        project.showOnHome
      ),

    home_order:
      project.showOnHome
        ? (
            Number(
              project.homeOrder
            ) ||
            null
          )
        : null,

    sort_order:
      Number(
        project.sortOrder
      ) ||
      0,
  };
}


function getStoragePathFromUrl(
  url
) {
  if (
    !url
  ) {
    return null;
  }


  const marker =
    `/storage/v1/object/public/${MEDIA_BUCKET}/`;


  const markerIndex =
    url.indexOf(
      marker
    );


  if (
    markerIndex ===
    -1
  ) {
    return null;
  }


  const encodedPath =
    url.slice(
      markerIndex +
      marker.length
    );


  try {
    return decodeURIComponent(
      encodedPath
    );
  } catch {
    return encodedPath;
  }
}


function sanitizeFilename(
  filename
) {
  return String(
    filename ||
    "file"
  )
    .trim()
    .toLowerCase()
    .replace(
      /[^a-z0-9._-]+/g,
      "-"
    )
    .replace(
      /-+/g,
      "-"
    )
    .replace(
      /^-|-$/g,
      ""
    );
}


function getFileExtension(
  filename
) {
  const clean =
    sanitizeFilename(
      filename
    );


  const parts =
    clean.split(
      "."
    );


  if (
    parts.length <
    2
  ) {
    return "";
  }


  return parts
    .pop()
    ?.toLowerCase() ||
    "";
}


function buildStoragePath({
  projectId,
  kind,
  file,
}) {
  const extension =
    getFileExtension(
      file.name
    );


  const suffix =
    extension
      ? `.${extension}`
      : "";


  const timestamp =
    Date.now();


  return [
    projectId,
    `${kind}-${timestamp}${suffix}`,
  ].join(
    "/"
  );
}


export async function getPublishedProjects() {
  const {
    data,
    error,
  } =
    await supabase
      .from(
        "projects"
      )
      .select(
        "*"
      )
      .eq(
        "published",
        true
      )
      .order(
        "sort_order",
        {
          ascending:
            true,
        }
      );


  if (
    error
  ) {
    throw error;
  }


  return (
    data ??
    []
  ).map(
    normalizeProject
  );
}


export async function getHomepageProjects() {
  const {
    data,
    error,
  } =
    await supabase
      .from(
        "projects"
      )
      .select(
        "*"
      )
      .eq(
        "published",
        true
      )
      .eq(
        "show_on_home",
        true
      )
      .order(
        "home_order",
        {
          ascending:
            true,

          nullsFirst:
            false,
        }
      )
      .limit(
        8
      );


  if (
    error
  ) {
    throw error;
  }


  return (
    data ??
    []
  ).map(
    normalizeProject
  );
}


export async function getAdminProjects() {
  const {
    data,
    error,
  } =
    await supabase
      .from(
        "projects"
      )
      .select(
        "*"
      )
      .order(
        "sort_order",
        {
          ascending:
            true,
        }
      )
      .order(
        "created_at",
        {
          ascending:
            false,
        }
      );


  if (
    error
  ) {
    throw error;
  }


  return (
    data ??
    []
  ).map(
    normalizeProject
  );
}


export async function createProject(
  project
) {
  const {
    data,
    error,
  } =
    await supabase
      .from(
        "projects"
      )
      .insert(
        projectToRow(
          project
        )
      )
      .select(
        "*"
      )
      .single();


  if (
    error
  ) {
    throw error;
  }


  return normalizeProject(
    data
  );
}


export async function updateProject(
  projectId,
  project
) {
  const {
    data,
    error,
  } =
    await supabase
      .from(
        "projects"
      )
      .update(
        projectToRow(
          project
        )
      )
      .eq(
        "id",
        projectId
      )
      .select(
        "*"
      )
      .single();


  if (
    error
  ) {
    throw error;
  }


  return normalizeProject(
    data
  );
}


export async function uploadProjectMedia({
  projectId,
  kind,
  file,
}) {
  if (
    !projectId
  ) {
    throw new Error(
      "Project ID is required."
    );
  }


  if (
    !file
  ) {
    throw new Error(
      "File is required."
    );
  }


  const storagePath =
    buildStoragePath({
      projectId,
      kind,
      file,
    });


  const {
    error,
  } =
    await supabase
      .storage
      .from(
        MEDIA_BUCKET
      )
      .upload(
        storagePath,
        file,
        {
          cacheControl:
            "31536000",

          upsert:
            false,
        }
      );


  if (
    error
  ) {
    throw error;
  }


  const {
    data,
  } =
    supabase
      .storage
      .from(
        MEDIA_BUCKET
      )
      .getPublicUrl(
        storagePath
      );


  return {
    path:
      storagePath,

    url:
      data.publicUrl,
  };
}


export async function removeProjectMedia(
  urlOrPath
) {
  if (
    !urlOrPath
  ) {
    return;
  }


  const storagePath =
    urlOrPath.includes(
      "/storage/v1/object/"
    )
      ? getStoragePathFromUrl(
          urlOrPath
        )
      : urlOrPath;


  if (
    !storagePath
  ) {
    return;
  }


  const {
    error,
  } =
    await supabase
      .storage
      .from(
        MEDIA_BUCKET
      )
      .remove([
        storagePath,
      ]);


  if (
    error
  ) {
    throw error;
  }
}


export async function deleteProject(
  projectId
) {
  const {
    data: project,
    error: loadError,
  } =
    await supabase
      .from(
        "projects"
      )
      .select(
        `
          id,
          video_url,
          mobile_video_url,
          poster_url,
          image_url
        `
      )
      .eq(
        "id",
        projectId
      )
      .single();


  if (
    loadError
  ) {
    throw loadError;
  }


  const mediaUrls = [
    project.video_url,
    project.mobile_video_url,
    project.poster_url,
    project.image_url,
  ].filter(
    Boolean
  );


  const storagePaths =
    mediaUrls
      .map(
        getStoragePathFromUrl
      )
      .filter(
        Boolean
      );


  if (
    storagePaths.length >
    0
  ) {
    const {
      error:
        storageError,
    } =
      await supabase
        .storage
        .from(
          MEDIA_BUCKET
        )
        .remove(
          storagePaths
        );


    if (
      storageError
    ) {
      throw storageError;
    }
  }


  const {
    error,
  } =
    await supabase
      .from(
        "projects"
      )
      .delete()
      .eq(
        "id",
        projectId
      );


  if (
    error
  ) {
    throw error;
  }
}


export async function signInAdmin({
  email,
  password,
}) {
  const {
    data,
    error,
  } =
    await supabase
      .auth
      .signInWithPassword({
        email:
          email.trim(),

        password,
      });


  if (
    error
  ) {
    throw error;
  }


  const userId =
    data.user?.id;


  if (
    !userId
  ) {
    await supabase.auth
      .signOut();

    throw new Error(
      "Login failed."
    );
  }


  const {
    data:
      adminUser,
    error:
      adminError,
  } =
    await supabase
      .from(
        "admin_users"
      )
      .select(
        "user_id"
      )
      .eq(
        "user_id",
        userId
      )
      .maybeSingle();


  if (
    adminError ||
    !adminUser
  ) {
    await supabase.auth
      .signOut();

    throw new Error(
      "This account does not have admin access."
    );
  }


  return data.user;
}


export async function signOutAdmin() {
  const {
    error,
  } =
    await supabase
      .auth
      .signOut();


  if (
    error
  ) {
    throw error;
  }
}


export async function getCurrentAdmin() {
  const {
    data:
      userData,
    error:
      userError,
  } =
    await supabase
      .auth
      .getUser();


  if (
    userError ||
    !userData?.user
  ) {
    return null;
  }


  const {
    data:
      adminUser,
    error:
      adminError,
  } =
    await supabase
      .from(
        "admin_users"
      )
      .select(
        "user_id"
      )
      .eq(
        "user_id",
        userData.user.id
      )
      .maybeSingle();


  if (
    adminError ||
    !adminUser
  ) {
    return null;
  }


  return userData.user;
}


export {
  normalizeProject,
};