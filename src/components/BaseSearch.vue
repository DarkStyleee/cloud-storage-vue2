<template>
  <v-text-field
    v-model="search"
    @input="handleSearch"
    append-icon="mdi-magnify"
    label="Поиск по файлам"
    color="secondary"
    single-line
    hide-details
    outlined
    dense
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },
  methods: {
    handleSearch() {
      this.$emit("search", this.search);
    },
  },
};
</script>

<style></style>
