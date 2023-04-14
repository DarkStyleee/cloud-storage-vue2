import { API_URL, API_LIST } from "./API";

// User authentication API

export async function loginUserAPI(data) {
  try {
    const response = await fetch(`${API_URL}/${API_LIST.login}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function registerUserAPI(data) {
  try {
    const response = await fetch(`${API_URL}/${API_LIST.register}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function logoutUserAPI() {
  try {
    const response = await fetch(`${API_URL}/${API_LIST.logout}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUserAPI(token) {
  try {
    const response = await fetch(`${API_URL}/${API_LIST.user}`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

// Folders API

export async function getFoldersAPI(token) {
  try {
    const response = await fetch(`${API_URL}/${API_LIST.folders}`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getFolderByIdAPI(token, id) {
  try {
    const response = await fetch(`${API_URL}/${API_LIST.folders}/${id}`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createFolderAPI(token, data) {
  try {
    const response = await fetch(`${API_URL}/${API_LIST.folders}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

// Files API

export async function getFilesAPI(token) {
  try {
    const response = await fetch(`${API_URL}/${API_LIST.files}`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function uploadFileAPI(token, data) {
  try {
    const response = await fetch(`${API_URL}/${API_LIST.files}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function renameFileAPI(token, file) {
  try {
    const response = await fetch(
      `${API_URL}/${API_LIST.files}/${file.id}?name=${file.name}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function downloadFileAPI(token, file) {
  try {
    const response = await fetch(
      `${API_URL}/${API_LIST.files}/${file.id}/download`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const fBlob = await response.blob();

    const url = window.URL.createObjectURL(fBlob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = file.name;
    anchor.click();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteFileAPI(token, id) {
  try {
    await fetch(`${API_URL}/${API_LIST.files}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function publishFileAPI(token, id) {
  try {
    const response = await fetch(`${API_URL}/${API_LIST.files}/${id}/publish`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(id),
    });

    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}
