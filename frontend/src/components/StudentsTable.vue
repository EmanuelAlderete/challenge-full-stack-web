<template>
  <v-sheet class="w-100">
    <v-data-table
      :items="students"
      :headers="headers"
      :hide-default-footer="students.length < 11"
    >
      <template #item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon
            color="medium-emphasis"
            icon="mdi-pencil"
            size="small"
            @click="edit(item.id)"
          />

          <v-icon
            color="medium-emphasis"
            icon="mdi-delete"
            size="small"
            @click="remove(item.id)"
          />
        </div>
      </template>

      <template #no-data>
        Sem dados no momento. Tente cadastrar um estudante.
      </template>
    </v-data-table>
  </v-sheet>

  <v-dialog v-model="dialog" max-width="500">
    <v-card
      :subtitle="'Você pode alterar somente o nome e o email.'"
      :title="'Edite o estudante.'"
    >
      <template #text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="record.name" label="Nome" />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="record.email" label="Email" />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="record.cpf" label="CPF" readonly="true" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="record.ra" label="RA" readonly="true" />
          </v-col>
        </v-row>
      </template>

      <v-divider />

      <v-card-actions class="bg-surface-light">
        <v-btn text="Cancelar" variant="plain" @click="dialog = false" />

        <v-spacer />

        <v-btn text="Salvar" @click="save" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref, shallowRef } from "vue";

defineProps({
  students: {
    type: Array,
    required: true,
  },
});

const headers = [
  { title: "RA", key: "ra", align: "start" },
  { title: "Nome", key: "name" },
  { title: "Email", key: "email" },
  { title: "CPF", key: "cpf", align: "end" },
  { title: "Ações", key: "actions", align: "end", sortable: false },
];
const DEFAULT_RECORD = {
  id: 1,
  name: "João da Silva",
  email: "luis",
  ra: "top",
  cpf: "123.456.789-00",
  pages: 1,
};
const record = ref(DEFAULT_RECORD);
const dialog = shallowRef(false);

function edit(id) {
  const found = students.value.find((student) => student.id === id);

  record.value = {
    id: found.id,
    name: found.name,
    ra: found.ra,
    email: found.email,
    cpf: found.cpf,
    pages: found.pages,
  };

  dialog.value = true;
}

function remove(id) {
  const index = students.value.findIndex((student) => student.id === id);
  students.value.splice(index, 1);
}

function save() {
  const index = students.value.findIndex(
    (student) => student.id === record.value.id
  );
  students.value[index] = record.value;

  dialog.value = false;
}
</script>
