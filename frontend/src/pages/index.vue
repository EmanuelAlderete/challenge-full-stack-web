<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col
        class="d-inline-flex align-center justify-space-between"
        cols="12"
        lg="12"
        md="12"
        sm="12"
      >
        <v-text-field append-inner-icon="mdi-magnify" class="align-self-center" label="Pesquisar estudante">
          <template #append>
            <student-form-dialog />
          </template>
        </v-text-field>

      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  //
</script>
