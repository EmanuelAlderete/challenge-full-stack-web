<template>
  <Dashboard>
    <v-container>
      <v-row class="justify-center align-center">
        <v-col class="d-flex justify-start" cols="12" lg="12" md="12" sm="12">
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
  </Dashboard>
</template>
<script setup>
import Dashboard from "@/layouts/Dashboard.vue";
import { ref } from "vue";

const isSidebarOpen = ref(false);
</script>
