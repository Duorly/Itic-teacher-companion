<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8 dark:from-slate-900 dark:to-slate-950">
    <div class="max-w-7xl mx-auto">
      <!-- En-tête -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Gestion des Devoirs</h1>
          <p class="text-slate-600 dark:text-slate-400">Créez et gérez les devoirs de vos classes</p>
        </div>
        <button class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm">
          <Icon name="lucide:plus" class="w-5 h-5" />
          Nouveau devoir
        </button>
      </div>

      <!-- Statistiques -->
      <div class="grid grid-cols-4 gap-6 mb-8">
        <div
            v-for="(stat, idx) in stats"
            :key="idx"
            class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
        >
          <div class="flex items-center justify-between mb-3">
            <div :class="[stat.color, 'p-3 rounded-lg']">
              <Icon :name="stat.icon" class="w-6 h-6 text-white" />
            </div>
          </div>
          <p class="text-2xl font-bold text-slate-900 dark:text-white mb-1">{{ stat.value }}</p>
          <p class="text-sm text-slate-600 dark:text-slate-400">{{ stat.label }}</p>
        </div>
      </div>

      <!-- Filtres et recherche -->
      <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
        <div class="flex items-center gap-4">
          <div class="relative flex-1">
            <Icon name="lucide:search" class="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
                v-model="searchTerm"
                type="text"
                placeholder="Rechercher un devoir..."
                class="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
              v-model="filterType"
              class="px-4 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tous les types</option>
            <option value="HOMEWORK">Devoirs</option>
            <option value="PROJECT">Projets</option>
            <option value="EXAM">Examens</option>
            <option value="QUIZ">Quiz</option>
          </select>
          <select
              v-model="filterStatus"
              class="px-4 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="completed">Terminés</option>
            <option value="upcoming">À venir</option>
          </select>
          <select
              v-model="filterFormation"
              class="px-4 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Toutes les classes</option>
            <option v-for="formation in formations" :key="formation" :value="formation">
              {{ formation }}
            </option>
          </select>
        </div>
      </div>

      <!-- Liste des devoirs -->
      <div class="space-y-4">
        <div
            v-for="devoir in filteredDevoirs"
            :key="devoir.id"
            class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all cursor-pointer"
        >
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-xl font-bold text-slate-900 dark:text-white">{{ devoir.title }}</h3>
                  <span :class="['px-3 py-1 rounded-full text-xs font-medium', getTypeColor(devoir.type)]">
                    {{ getTypeLabel(devoir.type) }}
                  </span>
                  <span v-if="!devoir.active" class="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    Inactif
                  </span>
                </div>
                <p class="text-slate-600 dark:text-slate-400 mb-3">{{ devoir.description }}</p>
                <div class="flex items-center gap-6 text-sm">
                  <span class="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Icon name="lucide:book-open" class="w-4 h-4" />
                    {{ devoir.formationName }}
                  </span>
                  <span class="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Icon name="lucide:calendar" class="w-4 h-4" />
                    Date limite: {{ formatDate(devoir.dueDate) }}
                  </span>
                  <span class="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Icon name="lucide:award" class="w-4 h-4" />
                    {{ devoir.maxPoints }} points
                  </span>
                  <span v-if="isLate(devoir.dueDate) && !devoir.completed" class="flex items-center gap-2 text-red-600 font-medium">
                    <Icon name="lucide:alert-circle" class="w-4 h-4" />
                    En retard
                  </span>
                </div>
              </div>
              <div class="flex items-center gap-2 ml-4">
                <button class="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-all">
                  <Icon name="lucide:edit" class="w-5 h-5" />
                </button>
                <button class="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 dark:hover:bg-slate-800 rounded-lg transition-all">
                  <Icon name="lucide:eye" class="w-5 h-5" />
                </button>
                <button class="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg transition-all">
                  <Icon name="lucide:trash-2" class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- Progression -->
            <div class="flex items-center gap-4">
              <div class="flex-1">
                <div class="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                  <span>Progression</span>
                  <span>{{ getProgression(devoir) }}%</span>
                </div>
                <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                      :class="[
                      'h-2 rounded-full transition-all',
                      devoir.completed ? 'bg-green-500' : 'bg-blue-500'
                    ]"
                      :style="{ width: getProgression(devoir) + '%' }"
                  ></div>
                </div>
              </div>
              <span
                  v-if="devoir.completed"
                  class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1"
              >
                <Icon name="lucide:check-circle" class="w-4 h-4" />
                Terminé
              </span>
              <span
                  v-else
                  :class="[
                  'px-3 py-1 rounded-full text-xs font-medium',
                  isLate(devoir.dueDate) ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                ]"
              >
                En cours
              </span>
            </div>

            <!-- Métadonnées -->
            <div class="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div class="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span>Créé le {{ formatDate(devoir.createdAt) }}</span>
                <span v-if="devoir.updatedAt">• Modifié le {{ formatDate(devoir.updatedAt) }}</span>
              </div>
              <button class="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                Voir les soumissions
                <Icon name="lucide:chevron-right" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Message vide -->
        <div v-if="filteredDevoirs?.length === 0" class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
          <Icon name="lucide:file-text" class="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">Aucun devoir trouvé</h3>
          <p class="text-slate-600 dark:text-slate-400 mb-6">Commencez par créer un nouveau devoir pour vos classes</p>
          <button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
            Créer un devoir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useAssignmentStore} from "~/stores/assignment.js";

definePageMeta({
  layout: 'dashboard'
})

const assignmentStore = useAssignmentStore()

const { assignments } = storeToRefs(assignmentStore)

assignmentStore.getAssignments()

const searchTerm = ref('')
const filterType = ref('all')
const filterStatus = ref('all')
const filterFormation = ref('all')

// Données de test


const stats = computed(() => [
  {
    label: 'Total devoirs',
    value: assignments.value?.length ?? 0,
    icon: 'lucide:file-text',
    color: 'bg-blue-500'
  },
  {
    label: 'En cours',
    value: assignments.value?.filter(d => !d.completed && d.active)?.length ?? 0,
    icon: 'lucide:clock',
    color: 'bg-orange-500'
  },
  {
    label: 'Terminés',
    value: assignments.value?.filter(d => d.completed)?.length ?? 0,
    icon: 'lucide:check-circle',
    color: 'bg-green-500'
  },
  {
    label: 'En retard',
    value: assignments.value?.filter(d => isLate(d.dueDate) && !d.completed)?.length ?? 0,
    icon: 'lucide:alert-circle',
    color: 'bg-red-500'
  }
])

const formations = computed(() => {
  return [...new Set(assignments.value?.map(d => d.formationName))]
})

const filteredDevoirs = computed(() => {
  return assignments.value?.filter(devoir => {
    const matchesSearch = devoir.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        devoir.description.toLowerCase().includes(searchTerm.value.toLowerCase())

    const matchesType = filterType.value === 'all' || devoir.type === filterType.value

    const matchesStatus = filterStatus.value === 'all' ||
        (filterStatus.value === 'active' && !devoir.completed && devoir.active) ||
        (filterStatus.value === 'completed' && devoir.completed) ||
        (filterStatus.value === 'upcoming' && new Date(devoir.dueDate) > new Date() && !devoir.completed)

    const matchesFormation = filterFormation.value === 'all' || devoir.formationName === filterFormation.value

    return matchesSearch && matchesType && matchesStatus && matchesFormation
  })
})

const getTypeLabel = (type) => {
  const labels = {
    'PROJECT': 'Projet',
    'EXAM': 'Examen',
    'HOMEWORK': 'Devoir',
    'QUIZ': 'Quiz'
  }
  return labels[type] || type
}

const getTypeColor = (type) => {
  const colors = {
    'PROJECT': 'bg-purple-100 text-purple-700',
    'EXAM': 'bg-red-100 text-red-700',
    'HOMEWORK': 'bg-blue-100 text-blue-700',
    'QUIZ': 'bg-green-100 text-green-700'
  }
  return colors[type] || 'bg-gray-100 text-gray-700'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const isLate = (dueDate) => {
  return new Date(dueDate) < new Date()
}

const getProgression = (devoir) => {
  if (devoir.completed) return 100
  const now = new Date()
  const created = new Date(devoir.createdAt)
  const due = new Date(devoir.dueDate)
  const total = due - created
  const elapsed = now - created
  const progress = Math.min(100, Math.max(0, (elapsed / total) * 100))
  return Math.round(progress)
}
</script>