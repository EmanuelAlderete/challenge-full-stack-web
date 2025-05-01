<template>
  <v-navigation-drawer app :model-value="isDrawerOpen">
    <v-list nav>
      <v-list-item link title="Estudantes" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
defineProps({
  isDrawerOpen: Boolean,
});
</script>
