import router from "@/router";

import {
  getUserAPI,
  loginUserAPI,
  registerUserAPI,
  logoutUserAPI,
  getFoldersAPI,
  getFolderByIdAPI,
  createFolderAPI,
  getFilesAPI,
  uploadFileAPI,
  renameFileAPI,
  downloadFileAPI,
  deleteFileAPI,
  publishFileAPI,
} from "@/api/userAPI";

export default {
  state: {
    user: null,
    token: null,
    folders: [],
    files: [],
    folderById: null,
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getToken(state) {
      return state.token;
    },
    getFolderById(state) {
      return state.folderById;
    },
    getFolders(state) {
      return state.folders;
    },
    getFiles(state) {
      return state.files;
    },
  },
  mutations: {
    LOGIN_USER(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    GET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    LOGOUT_USER(state) {
      state.token = null;
      state.user = null;
      localStorage.setItem("token", state.token);
    },
    SET_USER_FOLDERS(state, folders) {
      state.folders = folders;
    },
    SET_USER_FOLDER_BY_ID(state, folder) {
      state.activeFolder = folder;
    },
    SET_USER_FILES(state, files) {
      state.files = files;
    },
    DELETE_FILE(state, id) {
      state.files = state.files.filter((f) => f.id !== +id);
    },
    PUBLISH_FILE(state, file) {
      const searchedFile = state.files.find((f) => f.id === file.id);
      searchedFile.public_url = file.url;
    },
  },
  actions: {
    async getUser({ commit, dispatch }) {
      const localToken = localStorage.getItem("token");

      if (localToken && localToken !== "null") {
        const userData = await getUserAPI(localToken);
        const user = await userData.data;

        if (userData) {
          await commit("GET_USER", user);
          await commit("SET_TOKEN", localToken);

          await dispatch("setUserFolders");
          await dispatch("setUserFiles");
        }
      } else {
        router.push({ name: "login" });
      }
    },
    async logoutUser({ commit }) {
      await logoutUserAPI();

      await commit("LOGOUT_USER");

      router.push({ name: "login" });
    },
    async loginUser({ commit, dispatch }, user) {
      const response = await loginUserAPI(user);
      const token = await response.data.token;

      await commit("LOGIN_USER", token);

      await dispatch("getUser");

      router.push({ name: "home" });
    },
    // eslint-disable-next-line no-unused-vars
    async registerUser({ commit }, user) {
      await registerUserAPI(user);

      router.push({ name: "login" });
    },
    async setUserFolders({ commit, state }) {
      const response = await getFoldersAPI(state.token);
      const folders = await response.data;

      commit("SET_USER_FOLDERS", folders);
    },
    async setUserFolderById({ commit, state }, folderId) {
      const response = await getFolderByIdAPI(state.token, folderId);
      const folder = await response.data;

      commit("SET_USER_FOLDER_BY_ID", folder);
    },
    async createFolder({ dispatch, state }, folderName) {
      await createFolderAPI(state.token, folderName);

      dispatch("setUserFolders");
    },
    async setUserFiles({ commit, state }) {
      const response = await getFilesAPI(state.token);
      const files = await response.data;

      commit("SET_USER_FILES", files);
    },
    async uploadFile({ dispatch, state }, file) {
      await uploadFileAPI(state.token, file);

      await dispatch("getUser");
    },
    async renameFile({ state }, file) {
      await renameFileAPI(state.token, file);
    },
    async downloadFile({ state }, file) {
      await downloadFileAPI(state.token, file);
    },
    async deleteFile({ state, commit }, id) {
      await deleteFileAPI(state.token, id);

      await commit("DELETE_FILE", id);
    },
    async publishFile({ state, commit }, id) {
      const response = await publishFileAPI(state.token, id);
      const link = await response.data.link;

      await commit("PUBLISH_FILE", { id: id, url: link });
    },
  },
};
