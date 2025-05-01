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
            <template #append> <StudentFormDialog /> </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-divider />
    </v-container>
    <v-container>
      <v-row class="justify-center align-center">
        <students-table :students="students" />
      </v-row>
    </v-container>
  </Dashboard>
</template>
<script setup>
import Dashboard from "@/layouts/Dashboard.vue";
import { onMounted, ref } from "vue";
import { fetchStudents } from "@/services/studentsService";
import { ca } from "vuetify/locale";

const isSidebarOpen = ref(false);
const students = ref([]);

onMounted(async () => {
  try {
    const response = await fetchStudents();
    students.value = Array.isArray(response) ? response : response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
  }
});
</script>
