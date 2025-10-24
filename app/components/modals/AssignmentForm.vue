<script setup lang="ts">
import * as z from 'zod'
import type {FormSubmitEvent} from '@nuxt/ui'

const userStore = useAuthStore()

const trainingStore = useTrainingStore()

const {trainings} = storeToRefs(trainingStore)

const assignmentStore = useAssignmentStore()

const schema = z.object({
  title: z.string('Le sujet est obligatoire').min(3, 'Le sujet doit contenir au moins 3 caractères'),
  description: z.string('La description est obligatoire').min(8, 'Must be at least 8 characters'),
  type: z.string('Le type est obligatoire'),
  maxPoints: z.number('Le nombre de points est obligatoire').min(1, 'Le nombre de points doit être supérieur à 0').max(100, 'Le nombre de points doit être inférieur à 100'),
  dueDate: z.string('La date limite est obligatoire'),
  formationId: z.number('Le formation est obligatoire'),
})

const items = ref(['PROJECT', 'QUIZ', 'EXAMEN', 'TRAVAUX PRATIQUE', 'PRESENTATION'])

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: undefined,
  description: undefined,
  type: undefined,
  maxPoints: undefined,
  dueDate: undefined,
  formationId: undefined,
})

const reset = () => {
  state.title = undefined
  state.description = undefined
  state.type = undefined
  state.maxPoints = undefined
  state.dueDate = undefined
  state.formationId = undefined
}

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {

  await assignmentStore.addAssignment({
    ...event.data,
    dueDate: new Date(event.data.dueDate),
    creatorId: Number(userStore.user?.ypareoId)
  }).then(() => {
    toast.add({
      title: 'Devoir ajouté',
      description: 'Le devoir a été ajouté avec succès',
      color: 'success'
    })

    reset();
  })

}
</script>

<template>
  <UModal title="Formulaire de création de devoir">
    <UButton
        label="Open"
        class="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1.5 rounded-lg hover:shadow-lg transition-all">
      <Icon name="lucide:plus" class="w-5 h-5"/>
      <span class="font-medium">Nouveau challenge</span>
    </UButton>

    <template #body>
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Sujet" name="title">
          <UInput v-model="state.title" class="w-full"/>
        </UFormField>

        <UFormField label="Description" name="description">
          <UTextarea v-model="state.description" type="text" class="w-full"/>
        </UFormField>

        <UFormField label="Type" name="type">
          <USelect v-model="state.type" :items="items" class="w-full"/>
        </UFormField>

        <UFormField label="Nombre de points maximal" name="maxPoints">
          <UInputNumber v-model="state.maxPoints" :max="100" :min="1" label="Nombre de points" class="w-full"/>
        </UFormField>

        <UFormField label="Date limite" name="dueDate">
          <UInput v-model="state.dueDate" type="date" class="w-full"/>
        </UFormField>

        <UFormField label="Classes" name="formationId">
          <USelectMenu
              placeholder="Sélectionner une classe"
              v-model="state.formationId"
              :items="trainings"
              label-key="displayName"
              value-key="id"
              class="w-full"/>
        </UFormField>

        <UButton block type="submit" class="mt-4">
          SOUMETTRE
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>

<style scoped>

</style>