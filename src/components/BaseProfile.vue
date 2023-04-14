<template>
  <v-menu bottom min-width="200px" rounded offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon x-large v-on="on">
        <v-avatar>
          <v-icon color="white"> mdi-account-circle </v-icon>
        </v-avatar>
      </v-btn>
    </template>
    <v-card color="defaultColor">
      <v-list-item-content class="justify-center">
        <div class="mx-auto text-center">
          <v-avatar>
            <v-icon size="32" color="white"> mdi-account-circle </v-icon>
          </v-avatar>
          <h3>{{ user.name }}</h3>
          <p class="text-caption mt-1">
            {{ user.email }}
          </p>
          <v-divider class="my-3"></v-divider>
          <p class="text-caption font-weight-bold mt-1 mb-1">
            Дата регистрации:
          </p>
          <p class="text-caption">
            {{ convertDisplayDate(user.created_at) }}
          </p>
          <v-divider class="my-3"></v-divider>
          <p class="text-caption font-weight-bold mt-1 mb-1">Место занято:</p>
          <p class="text-caption">
            {{ convertStorageSize(user.storage_size) }} из
            {{ convertStorageSize(user.storage_quota) }}
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn depressed rounded text @click="logout"> Выйти </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script>
import { convertSize } from "@/utils/uploadFilesRules";
import { convertDate } from "@/utils/convertFormatDate";

export default {
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    logout() {
      return this.$store.dispatch("logoutUser");
    },
    convertStorageSize(size) {
      return convertSize(+size);
    },
    convertDisplayDate(date) {
      return convertDate(date);
    },
  },
};
</script>

<style></style>
