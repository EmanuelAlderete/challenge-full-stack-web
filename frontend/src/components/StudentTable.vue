<template>
  <v-sheet class="w-100">
    <v-data-table
      :headers="headers"
      :hide-default-footer="students.length < 11"
      :items="students"
    >
      <template #item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(item.id)" />

          <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(item.id)" />
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
  import { ref, shallowRef } from 'vue'

  const DEFAULT_RECORD = { id: 1, name: 'João da Silva', email: 'luis', ra: 'top', cpf: '123.456.789-00', pages: 1 }

  defineProps({
    items: {
      type: Array,
      default: () => [],
    },
  })
  const record = ref(DEFAULT_RECORD)
  const dialog = shallowRef(false)
  const students = ref([
    { id: 1, name: 'João da Silva', email: 'luis', ra: 'top', cpf: '123.456.789-00' },
    { id: 2, name: 'Maria da Silva', email: 'maria', ra: 'top', cpf: '123.456.789-00' },
    { id: 3, name: 'José da Silva', email: 'jose', ra: 'top', cpf: '123.456.789-00' },
    { id: 4, name: 'Ana da Silva', email: 'ana', ra: 'top', cpf: '123.456.789-00' },
    { id: 5, name: 'Carlos da Silva', email: 'carlos', ra: 'top', cpf: '123.456.789-00' },
    { id: 6, name: 'Fernanda da Silva', email: 'fernanda', ra: 'top', cpf: '123.456.789-00' },
    { id: 7, name: 'Roberto da Silva', email: 'roberto', ra: 'top', cpf: '123.456.789-00' },
    { id: 8, name: 'Patrícia da Silva', email: 'patricia', ra: 'top', cpf: '123.456.789-00' },
    { id: 9, name: 'Ricardo da Silva', email: 'ricardo', ra: 'top', cpf: '123.456.789-00' },
    { id: 10, name: 'Juliana da Silva', email: 'juliana', ra: 'top', cpf: '123.456.789-00' }]);

  const headers = [
    { title: 'RA', key: 'ra', align: 'start' },
    { title: 'Nome', key: 'name' },
    { title: 'Email', key: 'email' },
    { title: 'CPF', key: 'cpf', align: 'end' },
    { title: 'Ações', key: 'actions', align: 'end', sortable: false },
  ]

  function edit (id) {
    const found = students.value.find(student => student.id === id)

    record.value = {
      id: found.id,
      name: found.name,
      ra: found.ra,
      email: found.email,
      cpf: found.cpf,
      pages: found.pages,
    }

    dialog.value = true
  }

  function remove (id) {
    const index = students.value.findIndex(student => student.id === id)
    students.value.splice(index, 1)
  }

  function save () {

    const index = students.value.findIndex(student => student.id === record.value.id)
    students.value[index] = record.value

    dialog.value = false
  }
</script>
