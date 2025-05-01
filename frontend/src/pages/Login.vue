<template>
  <v-container
    fluid
    class="d-flex justify-center align-center bg-blue"
    style="height: 100vh"
  >
    <v-alert
      v-if="alert"
      :color="alertType"
      icon="$check"
      title="Sucesso!"
      class="top-0"
      position="absolute"
      closable
    >
      {{ alertMessage }}
    </v-alert>

    <v-card class="mx-auto px-6 py-8" max-width="400" width="100%">
      <v-card-title class="text-center">Área de login</v-card-title>

      <v-form class="mt-4" v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          :readonly="loading"
          class="mb-2"
          label="Email"
          placeholder="Informe seu email"
          type="email"
          autocomplete="email"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          label="Password"
          type="password"
          placeholder="Coloque sua senha"
          autocomplete="current-password"
          clearable
        ></v-text-field>

        <br />

        <v-actions class="d-flex justify-space-between">
          <v-btn
            :loading="loading"
            color="info"
            type="submit"
            variant="text"
            to="/register"
          >
            Registrar-se
          </v-btn>
          <v-btn
            :disabled="!form"
            :loading="loading"
            color="info"
            variant="elevated"
            prepend-icon="mdi-login"
            @click="onSubmit"
          >
            Entrar
          </v-btn>
        </v-actions>
      </v-form>
    </v-card>
  </v-container>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuth } from "@/composables/auth/login";

const { alert, alertMessage, alertType, loading, login } = useAuth();
const route = useRoute();
const router = useRouter();

const form = ref(null);
const email = ref(null);
const password = ref(null);

async function onSubmit() {
  const data = { email: email.value, password: password.value };
  const result = await login(data);

  if (result) {
    setTimeout(() => {
      router.push("/students");
    }, 1000);
  }
}

onMounted(() => {
  if (route.query.success === "true") {
    alertMessage.value = "Usuário criado com sucesso! Faça login.";
    alert.value = true;
    alertType.value = "success";
  }
});
</script>
