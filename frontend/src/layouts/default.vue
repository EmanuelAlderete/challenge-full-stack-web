<template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar title="Grupo A">
      <template #prepend>
        <v-app-bar-nav-icon @click="isSidebarOpen = !isSidebarOpen" />
      </template>
    </v-app-bar>

    <Sidebar v-model:is-drawer-open="isSidebarOpen" />


    <v-main class="d-flex justify-center">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
  import { ref } from 'vue';

  const isSidebarOpen = ref(false);
</script>
