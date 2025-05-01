<template>
  <v-container
    fluid
    class="d-flex justify-center align-center bg-blue"
    style="height: 100vh"
  >
    <v-card class="mx-auto px-6 py-8" max-width="400" width="100%">
      <v-card-title class="text-center">Área de login</v-card-title>

      <v-form class="mt-4" v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="Email"
          placeholder="Informe seu email"
          type="email"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          label="Password"
          type="password"
          placeholder="Coloque sua senha"
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
          >
            Entrar
          </v-btn>
        </v-actions>
      </v-form>
    </v-card>
  </v-container>
</template>
<script setup>
import { ref } from "vue";

const form = ref(false);
const email = ref(null);
const password = ref(null);
const loading = ref(false);

function onSubmit() {
  if (!form.value) return;
  loading.value = true;
  setTimeout(() => (loading.value = false), 2000);
}
function required(v) {
  return !!v || "Campo obrigatório";
}
</script>
