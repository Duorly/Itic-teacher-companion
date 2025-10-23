<script setup lang="ts">
import type {Training} from "~/utils/types/training.type";
import type {TableColumn} from "#ui/components/Table.vue";
import {UBadge, UButton} from "#components";

definePageMeta({
  layout: 'dashboard'
})

const trainingStore = useTrainingStore()

trainingStore.getTeacherTraining()

const {trainings, loading} = storeToRefs(trainingStore)

const columns: TableColumn<Training>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({row}) => `#${row.getValue('id')}`
  },
  {
    accessorKey: 'displayName',
    header: 'Libellé',
    cell: ({row}) => {
      const displayName = row.getValue('displayName') as string
      return h(
          'span',
          {
            class: `font-semibold capitalize text-success`
          },
          displayName
      )
    }
  },
  {
    accessorKey: 'totalStudents',
    header: 'Nombre d\'élèves',
  },
  {
    accessorKey: 'dateDebut',
    header: 'Date de début',
    cell: ({row}) => {
      return new Date(row.getValue('dateDebut')).toLocaleString('fr-FR', {
        day: 'numeric',
        month: '2-digit',
        year: 'numeric',
      })
    }
  },
  {
    accessorKey: 'dateFin',
    header: 'Date de fin',
    cell: ({row}) => {
      return new Date(row.getValue('dateFin')).toLocaleString('fr-FR', {
        day: 'numeric',
        month: '2-digit',
        year: 'numeric',
      })
    }
  },
  {
    accessorKey: 'active',
    header: 'Actif',
    cell: ({row}) => {
      const color = row.getValue('active') ? ('success' as const) : ('error' as const);

      return h(UBadge, {class: 'capitalize', variant: 'subtle', color}, () =>
          row.getValue('active') ? 'OUI' : 'NON'
      )
    }
  },
  {
    id: 'actions',
    cell: ({row}) => {
      return h(UButton, {
        trailingIcon: 'i-lucide-arrow-right',
        // arrow icon
        color: 'primary',
        variant: 'outline',
        class: 'mx-auto',
        to: `/classes/details/${row.getValue('id')}`,
        label: 'Voir détails',
        'aria-label': 'Actions dropdown'
      })
    }
  }
]


const value = ref('Click to clear')

</script>

<template>

  <div>
    <div class="border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden p-2 mb-4">
      <UBreadcrumb
          :items="[
              {
                label: 'Vue d\'ensemble',
                icon: 'lucide:trending-up',
                to: '/'
              },
              {
                label: 'Classes',
                icon: 'lucide:users',
                to: '/classes'
              },
              {
                label: 'Liste de toutes les classes',
                icon: 'i-lucide-link',
                to: '/classes'
              }
          ]"/>
    </div>
    <div class="border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden p-2 mb-4">
      <UInput
          v-model="value"
          placeholder="Type something..."
          :ui="{ trailing: 'pe-1' }"
      >
        <template v-if="value?.length" #trailing>
          <UButton
              color="neutral"
              variant="link"
              size="sm"
              icon="i-lucide-circle-x"
              aria-label="Clear input"
              @click="value = ''"
          />
        </template>
      </UInput>
    </div>
    <div class="border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <UTable
          sticky
          :loading="loading"
          loading-color="primary"
          loading-animation="carousel"
          :columns="columns"
          :data="trainings"
          class="flex-1"
      />
    </div>

  </div>

</template>

<style scoped>

</style>