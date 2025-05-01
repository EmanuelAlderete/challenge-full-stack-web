<template>
  <v-app-bar title="Grupo A +">
    <template #prepend>
      <v-app-bar-nav-icon @click="isSidebarOpen = !isSidebarOpen" />
    </template>
  </v-app-bar>

  <Sidebar v-model:is-drawer-open="isSidebarOpen" />

  <v-main class="d-flex justify-center">
    <v-container>
      <v-container>
        <v-row class="justify-center align-center">
          <v-col
            class="d-flex align-center justify-space-between"
            cols="12"
            lg="12"
            md="12"
            sm="12"
          >
            <v-text-field
              append-inner-icon="mdi-magnify"
              class="align-self-center"
              label="Pesquisar estudante"
            >
              <template #append>
                <student-form-dialog />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-divider />
      </v-container>
      <v-container>
        <v-row class="justify-center align-center">
          <students-table />
        </v-row>
      </v-container>
    </v-container>
  </v-main>
</template>
<script setup>
import { ref } from "vue";

const isSidebarOpen = ref(false);
</script>
