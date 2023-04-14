<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center" wrap>
      <v-flex sm8 md6 lg4 class="pa-2">
        <v-card elevation="10" light tag="section">
          <v-card-title>
            <v-layout align-center justify-space-between>
              <h3 class="headline">Регистрация</h3>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="grey lighten-3">
            <p>Для регистрации введите почту и пароль:</p>
            <v-form>
              <v-text-field
                outline
                hide-details
                label="Почта"
                type="email"
                v-model="email"
                class="mb-2"
              ></v-text-field>
              <v-text-field
                outline
                hide-details
                label="Имя"
                type="text"
                v-model="name"
                class="mb-2"
              ></v-text-field>
              <v-text-field
                outline
                hide-details
                label="Пароль"
                type="password"
                v-model="password"
                class="mb-2"
              ></v-text-field>
              <v-text-field
                mt-2
                outline
                hide-details
                label="Потвердить пароль"
                type="password"
                v-model="repassword"
                class="mb-2"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <router-link round-md class="base-link" :to="{ name: 'login' }"
              >Авторизация!</router-link
            >
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="registerUser"> Регистрация </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      name: "",
      password: "",
      repassword: "",
    };
  },
  methods: {
    registerUser() {
      if ((this.mail !== "" && this.password !== "", this.name !== "")) {
        if (this.password === this.repassword) {
          this.$store.dispatch("registerUser", {
            email: this.email,
            name: this.name,
            password: this.password,
          });
          return;
        }
        return this.$toast.error("Пароли не совпадают!");
      }
      return this.$toast.error("Не все поля заполнены!");
    },
  },
};
</script>

<style></style>
