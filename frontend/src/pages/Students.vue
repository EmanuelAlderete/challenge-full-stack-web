<template>
  <Dashboard>
    <v-container>
      <v-dialog v-model="isDeleteDialogOpen" max-width="500">
        <v-card>
          <v-card-title class="text-h6">Confirmar Exclusão</v-card-title>
          <v-card-text>
            Tem certeza de que deseja excluir este estudante? Esta ação não pode
            ser desfeita.
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="isDeleteDialogOpen = false">Cancelar</v-btn>
            <v-btn color="error" text @click="handleDeleteStudent"
              >Excluir</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
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
        <students-table
          :students="students"
          @update-student="handleUpdateStudent"
          @delete-student="confirmDeleteStudent"
        />
      </v-row>
    </v-container>
  </Dashboard>
</template>
<script setup>
import Dashboard from "@/layouts/Dashboard.vue";
import { onMounted, ref } from "vue";
import {
  fetchStudents,
  updateStudent,
  deleteStudent,
} from "@/services/studentsService";

const isSidebarOpen = ref(false);
const students = ref([]);
const isDeleteDialogOpen = ref(false);
const studentToDelete = ref(null);

onMounted(async () => {
  try {
    const response = await fetchStudents();
    students.value = Array.isArray(response) ? response : response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
  }
});

async function handleUpdateStudent(updatedStudent) {
  try {
    const updatedData = await updateStudent(updatedStudent);
    const index = students.value.findIndex(
      (student) => student.id === updatedStudent.id
    );
    if (index !== -1) {
      students.value[index] = updatedData;
    }
  } catch (error) {
    console.error("Failed to update student:", error);
  }
}

async function handleDeleteStudent(id) {
  try {
    if (studentToDelete.value !== null) {
      await deleteStudent(studentToDelete.value);
      const index = students.value.findIndex(
        (student) => student.id === studentToDelete.value
      );
      if (index !== -1) {
        students.value.splice(index, 1);
      }
    }
  } catch (error) {
    console.error("Failed to delete student:", error);
  } finally {
    isDeleteDialogOpen.value = false;
    studentToDelete.value = null;
  }
}

function confirmDeleteStudent(id) {
  studentToDelete.value = id;
  isDeleteDialogOpen.value = true;
}
</script>
