<template>
  <v-container
    fluid
    class="d-flex justify-center align-center bg-blue"
    style="height: 100vh"
  >
    <v-alert
      v-model="alert"
      color="warning"
      icon="$warning"
      title="Dados inválidos"
      position="absolute"
      class="top-0"
      closable
    >
      {{ alertMessage }}
    </v-alert>
    <v-card outline class="mx-auto px-6 py-8" max-width="400" width="100%">
      <v-card-title class="text-center">Área de Registro</v-card-title>
      <v-card-subtitle class="text-center">
        Informe seus dados para acessar o sistema.</v-card-subtitle
      >
      <v-form class="mt-4" v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="name"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="Nome"
          type="text"
          clearable
        ></v-text-field>
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          label="Email"
          type="email"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          label="Senha"
          type="password"
          placeholder="Enter your password"
          clearable
        ></v-text-field>

        <br />

        <v-card-actions class="d-flex justify-space-between">
          <v-btn
            :loading="loading"
            type="submit"
            variant="text"
            to="/login"
            size="small"
            slim
          >
            Já tem uma conta?
          </v-btn>
          <v-btn
            :disabled="!form"
            :loading="loading"
            color="info"
            variant="elevated"
            prepend-icon="mdi-account-plus"
            @click="onSubmit"
          >
            Registrar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref(false);
const name = ref(null);
const email = ref(null);
const password = ref(null);
const loading = ref(false);
const alert = ref(false);
const alertMessage = ref(null);

async function onSubmit() {
  loading.value = true;

  const data = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  try {
    const response = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 409) {
        alertMessage.value =
          "Erro ao registrar usuário. Esse email já está em uso.";
        alert.value = true;
        email.value = null;
        password.value = null;
      }
    } else {
      router.push({
        path: "/login",
        query: { success: "true" },
      });
    }
  } catch (error) {
    console.error("Erro ao fazer a requisição:", error);
  } finally {
    loading.value = false;
  }
}
function required(v) {
  return !!v || "Campo obrigatório";
}
</script>
