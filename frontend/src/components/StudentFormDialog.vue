<template>
  <v-dialog v-model="dialog" max-width="600">
    <template #activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular"
        prepend-icon="mdi-plus"
        text="Aluno"
        variant="outlined"
        v-bind="activatorProps"
      />
    </template>

    <v-card prepend-icon="mdi-account-school" title="Cadastrar Aluno">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                autofocus
                v-model="name"
                v-bind="nameAttrs"
                label="Nome completo *"
                :error-messages="errors.name"
                required
              />
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="email"
                v-bind="emailAttrs"
                label="Email*"
                type="email"
                :error-messages="errors.email"
                required
              />
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-maska="'###.###.###-##'"
                v-model="cpf"
                v-bind="cpfAttrs"
                :error-messages="errors.cpf"
                label="CPF*"
                required
              />
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field
                label="RA*"
                v-model="ra"
                v-bind="raAttrs"
                :error-messages="errors.ra"
                required
              />
            </v-col>
          </v-row>
        </v-container>
        <small class="text-caption text-medium-emphasis">
          * campos obrigatórios</small
        >
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />

        <v-btn text="Fechar" variant="plain" @click="dialog = false" />
        <v-btn
          color="primary"
          text="Salvar"
          variant="tonal"
          @click="onSubmit"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { shallowRef, defineEmits } from "vue";
import { vMaska } from "maska/vue";
import { useForm } from "vee-validate";
import { createStudent } from "@/services/studentsService";
import { studentSchema } from "@/utils/studentZodObject";

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

const emit = defineEmits(["student-added"]);

async function onSubmit() {
  const { valid, errors } = await validate();

  if (valid) {
    try {
      await createStudent(values);
      name.value = "";
      email.value = "";
      cpf.value = "";
      ra.value = "";
      dialog.value = false;
      emit("student-added");
    } catch (error) {
      console.log(`Erro inesperado:`, error);
    }
  }
}
</script>
