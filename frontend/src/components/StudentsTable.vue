<template>
  <v-sheet class="w-100">
    <v-data-table
      :items="students"
      :headers="headers"
      :hide-default-footer="students.length < 11"
      :search="search"
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
            @click="$emit('delete-student', item.id)"
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
            <v-text-field
              v-model="name"
              v-bind="nameAttrs"
              :error-messages="errors.name"
              label="Nome"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              v-bind="emailAttrs"
              :error-messages="errors.email"
              label="Email"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="cpf" label="CPF" readonly />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="ra" label="RA" readonly />
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
import { studentSchema } from "@/utils/studentZodObject";
import { useForm } from "vee-validate";
import { ref, shallowRef } from "vue";

const props = defineProps({
  students: {
    type: Array,
    required: true,
  },
  search: {
    type: String,
  },
});

const emit = defineEmits(["update-student", "delete-student"]);
const headers = [
  { title: "RA", key: "ra", align: "start" },
  { title: "Nome", key: "name" },
  { title: "Email", key: "email" },
  { title: "CPF", key: "cpf", align: "end" },
  { title: "Ações", key: "actions", align: "end", sortable: false },
];

const record = ref({});
const dialog = shallowRef(false);
const validationSchema = studentSchema;

const { values, errors, defineField, validate } = useForm({
  validationSchema,
});

const [name, nameAttrs] = defineField("name", {
  validateOnModelUpdate: false,
});
const [email, emailAttrs] = defineField("email", {
  validateOnModelUpdate: false,
});
const [ra, raAttrs] = defineField("ra", {
  validateOnModelUpdate: false,
});
const [cpf, cpfAttrs] = defineField("cpf", {
  validateOnModelUpdate: false,
});

function edit(id) {
  const found = props.students.find((student) => student.id === id);

  if (!found) {
    console.error(`Student with id ${id} not found`);
    return;
  }

  record.id = id;
  name.value = found.name;
  email.value = found.email;
  ra.value = found.ra;
  cpf.value = found.cpf;

  dialog.value = true;
}

function remove(id) {
  emit("delete-student", id);
}

async function save() {
  const { valid, errors } = await validate();

  if (valid) {
    emit("update-student", { id: record.id, ...values });
    dialog.value = false;
  }
}
</script>
