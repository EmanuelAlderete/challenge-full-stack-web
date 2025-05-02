<script setup>
import { shallowRef } from "vue";
import { vMaska } from "maska/vue";

const dialog = shallowRef(false);
</script>

<template>
  <v-dialog v-model="dialog" max-width="600">
    <template #activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular"
        prepend-icon="mdi-plus"
        text="Aluno"
        variant="outlined"
        v-bind="activatorProps"
      />
    </template>

    <v-card prepend-icon="mdi-account-school" title="Cadastrar Aluno">
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="6" sm="6">
            <v-text-field autofocus label="Nome completo *" required />
          </v-col>

          <v-col cols="12" md="6" sm="6">
            <v-text-field label="Email*" required />
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field v-maska="'###.###.###-##'" label="CPF*" required />
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field label="RA*" required />
          </v-col>
        </v-row>

        <small class="text-caption text-medium-emphasis"
          >* campos obrigatórios</small
        >
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />

        <v-btn text="Fechar" variant="plain" @click="dialog = false" />

        <v-btn
          color="primary"
          text="Salvar"
          variant="tonal"
          @click="dialog = false"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
