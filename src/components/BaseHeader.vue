<template>
  <div>
    <v-app-bar color="defaultColor" app>
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="45deg, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>
      <v-toolbar-title class="header-title col-md-6 col-sm-6"
        ><router-link class="base-link base-link--white" to="/"
          >Cloud Storage</router-link
        ></v-toolbar-title
      >
      <v-spacer></v-spacer>

      <slot name="search"></slot>
      <slot name="profile"></slot>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
