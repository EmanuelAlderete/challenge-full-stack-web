<template>
  <v-layout>
    <v-app-bar title="Grupo A +">
      <template #prepend>
        <v-app-bar-nav-icon @click="isSidebarOpen = !isSidebarOpen" />
      </template>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
        </template>

        <v-list>
          <v-list-item title="Sair" prepend-icon="mdi-logout" link />
        </v-list>
      </v-menu>
    </v-app-bar>

    <Sidebar v-model:is-drawer-open="isSidebarOpen" />

    <v-main>
      <v-container fluid>
        <slot></slot>
      </v-container>
    </v-main>
  </v-layout>
</template>
<script setup>
import { ref } from "vue";

const isSidebarOpen = ref(false);
</script>
