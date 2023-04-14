<template>
  <v-card color="cardColor">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <slot></slot>
    </v-card-text>
    <v-card-text>
      <slot name="input"></slot>
    </v-card-text>
    <v-card-actions>
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
