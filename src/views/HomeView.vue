<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="3">
        <v-card>
          <div class="pa-2 cardColor button-group">
            <v-btn color="button primary" @click="showFolderDialog = true">
              Создать папку
              <v-icon right> mdi-plus </v-icon>
            </v-btn>
            <v-btn
              @click="showUploadDialog = true"
              color="teal"
              class="button white--text"
            >
              Загрузить файл
              <v-icon right> mdi-cloud-upload </v-icon>
            </v-btn>
          </div>
          <v-list class="pa-2 rounded-md" color="cardColor" dense>
            <v-list-item
              @click="selectedFolder = null"
              :class="!selectedFolder && 'rounded blue darken-3'"
            >
              <v-list-item-icon>
                <v-icon color="yellow">mdi-folder</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Все файлы</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              v-for="folder in folders"
              :key="folder.id"
              @click="selectedFolder = folder"
              :class="selectedFolder === folder && 'rounded blue darken-3'"
            >
              <v-list-item-icon>
                <v-icon>mdi-folder</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ folder.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <div>
          <v-card-title class="ma-0 pa-0">
            <v-btn-toggle v-model="displayOption" class="mb-2" mandatory>
              <v-btn
                color="teal"
                value="table"
                @click="setDisplayOption('table')"
                >Таблица</v-btn
              >
              <v-btn color="teal" value="grid" @click="setDisplayOption('grid')"
                >Сетка</v-btn
              >
            </v-btn-toggle>
            <v-spacer></v-spacer>

            {{ currentSelectedFolderName }}
            <v-spacer></v-spacer>
            <base-search @search="searchItemsInTable"></base-search>
          </v-card-title>
        </div>

        <v-card color="cardColor">
          <template v-if="displayOption === 'table'">
            <v-data-table
              class="cardColor mt-1"
              :headers="headers"
              :items="
                selectedFolder
                  ? allFilesInSelectFolder
                  : searchedAllFilesAndFolders
              "
              :items-per-page="-1"
              item-key="id"
              :footer-props="{
                'items-per-page-text': 'Кол-во элементов на странице',
              }"
            >
              <template v-slot:item="row">
                <tr>
                  <td
                    style="cursor: pointer"
                    @click="handleClickOnItemInTable(row.item)"
                  >
                    <template v-if="row.item.hasOwnProperty('folder_id')">
                      <v-icon class="mr-2">mdi-file</v-icon>
                    </template>
                    <template v-else>
                      <v-icon class="mr-2">mdi-folder</v-icon>
                    </template>
                    {{ row.item.name }}
                  </td>
                  <td>{{ convertItemSize(row.item.size) }}</td>
                  <td>
                    {{
                      row.item.full_name && extractFileType(row.item.full_name)
                    }}
                  </td>
                  <td>{{ convertDisplayDate(row.item.created_at) }}</td>
                  <td v-if="row.item.hasOwnProperty('folder_id')">
                    <v-btn
                      class="mx-2"
                      fab
                      width="32"
                      height="32"
                      color="primary"
                      @click="createDownloadLinkElementInTable(row.item)"
                    >
                      <v-icon size="24">mdi-link</v-icon>
                    </v-btn>

                    <v-btn
                      class="mx-2"
                      fab
                      width="32"
                      height="32"
                      color="green"
                      @click="downloadElementInTable(row.item)"
                    >
                      <v-icon size="24">mdi-download</v-icon>
                    </v-btn>

                    <v-btn
                      class="mx-2"
                      fab
                      width="32"
                      height="32"
                      color="cyan"
                      @click="editElementInTable(row.item)"
                    >
                      <v-icon size="24">mdi-pen</v-icon>
                    </v-btn>

                    <v-btn
                      class="mx-2"
                      fab
                      width="32"
                      height="32"
                      color="red"
                      @click="deleteElementInTable(row.item)"
                    >
                      <v-icon size="24">mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
              <template slot="no-data"> Директория пуста </template>
              <template slot="no-results">
                Совпадающих записей не найдено
              </template>
            </v-data-table>
          </template>

          <template v-else>
            <v-row class="mt-1 pa-2">
              <v-col
                v-for="item in selectedFolder
                  ? allFilesInSelectFolder
                  : searchedAllFilesAndFolders"
                :key="item.id"
                cols="12"
                sm="6"
                md="3"
              >
                <v-card class="grid-card">
                  <div
                    class="grid-item"
                    @click="handleClickOnItemInTable(item)"
                  >
                    <template v-if="item.hasOwnProperty('folder_id')">
                      <v-icon size="64">mdi-file</v-icon>
                    </template>
                    <template v-else>
                      <v-icon size="64">mdi-folder</v-icon>
                    </template>
                    <p class="grid-item__text">{{ item.name }}</p>
                  </div>
                  <div class="pb-4">
                    <template v-if="item.hasOwnProperty('folder_id')">
                      <v-btn
                        class="mx-1"
                        fab
                        width="32"
                        height="32"
                        color="primary"
                        @click="createDownloadLinkElementInTable(item)"
                      >
                        <v-icon size="24">mdi-link</v-icon>
                      </v-btn>

                      <v-btn
                        class="mx-1"
                        fab
                        width="32"
                        height="32"
                        color="green"
                        @click="downloadElementInTable(item)"
                      >
                        <v-icon size="24">mdi-download</v-icon>
                      </v-btn>

                      <v-btn
                        class="mx-1"
                        fab
                        width="32"
                        height="32"
                        color="cyan"
                        @click="editElementInTable(item)"
                      >
                        <v-icon size="24">mdi-pen</v-icon>
                      </v-btn>

                      <v-btn
                        class="mx-1"
                        fab
                        width="32"
                        height="32"
                        color="red"
                        @click="deleteElementInTable(item)"
                      >
                        <v-icon size="24">mdi-delete</v-icon>
                      </v-btn>
                    </template>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-card>
      </v-col>

      <v-dialog width="600" v-model="showUploadDialog">
        <base-dialog-card title="Загрузить файл">
          <template #input>
            <v-file-input
              color="secondary"
              v-model="selectedFile"
              label="Выберите файл"
            ></v-file-input>
            <v-text-field
              type="number"
              color="secondary"
              v-model="fileLifeTime"
              label="Срок хранения файла (0 - бессрочно)"
            ></v-text-field>
          </template>
          <template #actions>
            <v-btn color="primary" @click="uploadFile">Загрузить</v-btn>
            <v-btn color="grey" @click="showUploadDialog = false">Отмена</v-btn>
          </template>
        </base-dialog-card>
      </v-dialog>

      <v-dialog width="600" v-model="showPublishLinkDialog">
        <base-dialog-card title="Прямая ссылка на скачивание файла">
          <template #input>
            <v-text-field
              :value="publishFileLink"
              append-icon="mdi-content-copy"
              @click:append="copyPublicLink"
            ></v-text-field>
          </template>
          <template #actions>
            <v-btn color="grey" @click="showPublishLinkDialog = false"
              >Закрыть</v-btn
            >
          </template>
        </base-dialog-card>
      </v-dialog>

      <v-dialog width="600" v-model="showReplaceFileDialog">
        <base-dialog-card title="Переименовать файл">
          <template #input>
            <v-text-field
              color="secondary"
              v-model="newFileName"
              label="Название файла"
            ></v-text-field>
          </template>
          <template #actions>
            <v-btn color="primary" @click="replaceFile">Изменить</v-btn>
            <v-btn color="grey" @click="showReplaceFileDialog = false"
              >Отмена</v-btn
            >
          </template>
        </base-dialog-card>
      </v-dialog>

      <v-dialog width="600" v-model="showFolderDialog">
        <base-dialog-card title="Добавить новую директорию">
          <template #input>
            <v-text-field
              color="secondary"
              v-model="newFolderName"
              label="Название директории"
            ></v-text-field>
          </template>
          <template #actions>
            <v-btn color="primary" @click="createFolder">Создать</v-btn>
            <v-btn color="grey" @click="showFolderDialog = false">Отмена</v-btn>
          </template>
        </base-dialog-card>
      </v-dialog>

      <v-dialog width="300" v-model="showDeleteDialog">
        <base-dialog-card title="Удалить файл?">
          <p class="text-caption">Файл будет полностью удален!</p>
          <template #actions>
            <v-btn color="red" @click="deleteFile">Удалить</v-btn>
            <v-btn color="grey" @click="showDeleteDialog = false">Отмена</v-btn>
          </template>
        </base-dialog-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import BaseDialogCard from "@/components/BaseDialogCard.vue";
import BaseSearch from "@/components/BaseSearch";

import { convertDate } from "@/utils/convertFormatDate";
import { extractTypeInFile } from "@/utils/extractFileType";

import {
  convertSize,
  checkLimit,
  checkFileType,
} from "@/utils/uploadFilesRules.js";

export default {
  name: "HomeView",
  components: {
    BaseDialogCard,
    BaseSearch,
  },
  data() {
    return {
      displayOption: "table",
      search: "",
      newFolderName: "",
      newFileName: "",
      publishFileLink: "",
      fileLifeTime: 0,
      showFolderDialog: false,
      showUploadDialog: false,
      showPublishLinkDialog: false,
      showReplaceFileDialog: false,
      showDeleteDialog: false,
      selectedFile: null,
      selectedFolder: null,
      headers: [
        { text: "Имя", value: "name" },
        { text: "Размер", value: "size" },
        { text: "Тип", value: "type" },
        { text: "Дата создания", value: "date" },
        { text: "Действия", value: "actions" },
      ],
    };
  },
  mounted() {
    const displayOpt = JSON.parse(localStorage.getItem("displayOption"));
    if (displayOpt) {
      this.displayOption = displayOpt;
    }
  },
  computed: {
    folders() {
      return this.$store.getters.getFolders;
    },
    files() {
      return this.$store.getters.getFiles;
    },
    allFilesAndFolders() {
      const filteredFiles = this.files.filter((f) => f.folder_id === null);
      return [...this.folders, ...filteredFiles];
    },
    searchedAllFilesAndFolders() {
      return this.allFilesAndFolders.filter((f) =>
        f.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    currentSelectedFolderName() {
      return this.selectedFolder ? this.selectedFolder.name : "Все файлы";
    },
    selectedFolderItem() {
      const findedItem = this.folders.find(
        (f) => f.name.toLowerCase() === this.selectedFolder?.name.toLowerCase()
      );
      return findedItem ? findedItem : null;
    },
    allFilesInSelectFolder() {
      return this.files.filter((f) => f.folder_id === this.selectedFolder.id);
    },
  },
  methods: {
    setDisplayOption(option) {
      this.displayOption = option;
      localStorage.setItem("displayOption", JSON.stringify(option));
    },
    async createDownloadLinkElementInTable(item) {
      this.showPublishLinkDialog = true;

      await this.$store.dispatch("publishFile", item.id);

      this.publishFileLink = item.public_url;
    },
    downloadElementInTable(item) {
      try {
        this.$store.dispatch("downloadFile", {
          id: item.id,
          name: item.full_name,
        });
      } catch (error) {
        this.$toast.error("Не удалось скачать файл!");
      }
    },
    deleteElementInTable(item) {
      this.showDeleteDialog = true;
      this.selectedFile = item;
    },
    editElementInTable(item) {
      this.selectedFile = item;
      this.newFileName = item.name;
      this.showReplaceFileDialog = true;
    },
    copyPublicLink() {
      navigator.clipboard.writeText(this.publishFileLink);

      this.showPublishLinkDialog = false;
      this.$toast.success(`Текст скопирован!`);
    },
    deleteFile() {
      try {
        this.$store.dispatch("deleteFile", this.selectedFile.id);
        this.$toast.success(`Файл ${this.selectedFile.name} успешно удален!`);

        this.showDeleteDialog = false;
        this.selectedFile = null;
      } catch (error) {
        this.$toast.error("Не удалось удалить файл!");
      }
    },
    replaceFile() {
      const select = this.files.find((f) => f.id === this.selectedFile.id);

      try {
        this.$store.dispatch("renameFile", {
          id: this.selectedFile.id,
          name: this.newFileName,
        });

        select.name = this.newFileName;

        this.newFileName = "";
        this.selectedFile = null;
        this.showReplaceFileDialog = false;

        this.$toast.success("Название успешно изменено!");
      } catch (error) {
        this.$toast.error("Не удалось изменить имя файла!");
      }
    },
    searchItemsInTable(value) {
      this.search = value;
    },
    handleClickOnItemInTable(item) {
      if (!item.full_name) {
        this.selectedFolder = item;
        return;
      }
    },
    createFolder() {
      if (this.newFolderName.trim() === "") {
        this.$toast.error("Укажите имя директории!");
        return;
      }

      const existingFolder = this.folders.find(
        (folder) =>
          folder.name.toLowerCase() === this.newFolderName.toLowerCase()
      );
      if (existingFolder) {
        this.$toast.error("Директория с таким именем уже создана!");
        return;
      }

      try {
        this.$store.dispatch("createFolder", { name: this.newFolderName });

        this.newFolderName = "";
        this.showFolderDialog = false;

        this.$toast.success("Директория успешно создана!");
      } catch (error) {
        this.$toast.error("Не удалось создать директорию!");
      }
    },
    uploadFile() {
      if (!this.selectedFile) {
        this.$toast.error("Пожалуйста, выберите файл!");
        return;
      }

      const fileSizeLimit = 20; // лимит загружаеммого файла в МБ
      const checkFileLimit = checkLimit(+this.selectedFile.size, fileSizeLimit);

      if (!checkFileLimit) {
        this.$toast.error(
          `Размер файла не может быть выше ${fileSizeLimit} МБ!`
        );
        return;
      }

      const blockTypes = "php"; // запрещенное расширение для загрузки, можно передать массив
      const checkType = checkFileType(this.selectedFile.name, blockTypes);

      if (checkType.error) {
        this.$toast.error(
          `Файлы типа ${checkType.fileType} не поддерживаются!`
        );
        return;
      }

      let newFile = new FormData();
      newFile.append("file", this.selectedFile);

      if (this.fileLifeTime > 0) {
        let result = new Date();
        result.setDate(+result.getDate() + +this.fileLifeTime);

        newFile.append("expires_at", result.toLocaleString());
      }

      if (this.selectedFolderItem) {
        newFile.append("folder_id", this.selectedFolderItem.id);
      }

      try {
        this.$store.dispatch("uploadFile", newFile, this.selectedFile.size);

        this.showUploadDialog = false;

        this.selectedFile = null;
        this.fileLifeTime = 0;

        this.$toast.success("Файл успешно загружен!");
      } catch (error) {
        this.$toast.error("Не удалось загрузить файл!");
        return;
      }
    },
    convertItemSize(size) {
      return convertSize(size);
    },
    convertDisplayDate(date) {
      return convertDate(date);
    },
    extractFileType(filename) {
      return extractTypeInFile(filename);
    },
  },
};
</script>

<style scoped>
.button {
  font-size: 12px;
  margin: 0;
  padding: 0;
  width: 100%;
}

.button-group {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 5px;
}

.grid-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.grid-item__text {
  width: 100px;
  text-align: center;
}

.grid-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  box-shadow: none !important;
}
</style>
