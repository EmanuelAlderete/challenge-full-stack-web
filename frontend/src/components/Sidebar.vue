<template>
  <v-navigation-drawer app :model-value="isDrawerOpen">
    <v-list nav>
      <v-list-subheader>MÓDULO ACADÊMICO</v-list-subheader>
      <v-list-item
        prepend-icon="mdi-school-outline"
        link
        title="Alunos"
        to="/students"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
defineProps({
  isDrawerOpen: Boolean,
});
</script>
