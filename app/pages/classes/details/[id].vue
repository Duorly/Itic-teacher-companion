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
                label: 'M1s ' + route.params.id,
                icon: 'i-lucide-link',
                to: '/classes'
              }
          ]"/>
    </div>
    <div
        class="min-h-screen rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 p-8 dark:from-slate-900 dark:to-slate-800">
      <div class="max-w-7xl mx-auto">
        <!-- En-tête de la classe -->
        <div
            class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8 dark:border-slate-700 dark:bg-slate-900">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-4">
              <div :class="[classeInfo.couleur, 'px-4 py-2 rounded-lg font-bold text-2xl']">
                {{ training.displayName }}
              </div>
              <div>
                <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Nom de la matière</h1>
                <p class="text-slate-600 dark:text-slate-400">Année scolaire
                  {{ new Date(training.dateDebut).getFullYear() }} - {{ new Date(training.dateFin).getFullYear() }}</p>
              </div>
            </div>
            <div class="flex gap-3">
              <button
                  class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                <Icon name="lucide:mail" class="w-4 h-4"/>
                Contacter tous
              </button>
              <button
                  class="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all">
                <Icon name="lucide:download" class="w-4 h-4"/>
                Exporter
              </button>
            </div>
          </div>
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
                <Icon :name="stat.icon" class="w-6 h-6 text-white"/>
              </div>
            </div>
            <p class="text-2xl font-bold text-slate-900 dark:text-white mb-1">{{ stat.value }}</p>
            <p class="text-sm text-slate-600 dark:text-slate-400">{{ stat.label }}</p>
          </div>
        </div>

        <!-- Liste des élèves -->
        <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">Liste des élèves</h3>
            <div class="flex gap-3">
              <div class="relative">
                <Icon name="lucide:search" class="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                <input
                    v-model="searchTerm"
                    type="text"
                    placeholder="Rechercher un élève..."
                    class="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                  v-model="filterStatus"
                  class="px-4 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tous les statuts</option>
                <option value="Excellent">Excellent</option>
                <option value="Bon">Bon</option>
                <option value="Moyen">Moyen</option>
                <option value="Difficultés">Difficultés</option>
              </select>
            </div>
          </div>

          <div class="overflow-x-auto">
            <UTable :data="training_students" class="flex-1" />
          </div>

          <div v-if="filteredStudents.length === 0" class="text-center py-12">
            <Icon name="lucide:users" class="w-12 h-12 text-slate-300 mx-auto mb-3"/>
            <p class="text-slate-600 dark:text-slate-400">Aucun élève trouvé</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})

const trainingStore = useTrainingStore()

const route = useRoute()

const {training, training_students, loading} = storeToRefs(trainingStore)

trainingStore.getTrainingById(Number(route.params.id))

trainingStore.getTeacherStudentsByTraining(route.params.id)


const searchTerm = ref('')
const filterStatus = ref('all')

const classeInfo = {
  label: 'Terminale S1',
  matiere: 'Mathématiques',
  annee: '2024-2025',
  totalStudents: 28,
  devoirs: 12,
  moyenne: '14.5',
  couleur: 'bg-blue-100 text-blue-700'
}

const stats = computed(() => [
  {label: 'Élèves', value: training_students.value?.length, icon: 'lucide:users', color: 'bg-blue-500'},
  {label: 'Moyenne classe', value: '0', icon: 'lucide:award', color: 'bg-green-500'},
  {label: 'Taux présence', value: '0%', icon: 'lucide:trending-up', color: 'bg-purple-500'},
  {label: 'Devoirs rendus', value: '0%', icon: 'lucide:file-text', color: 'bg-orange-500'}
])

const students = [
  {
    id: 1,
    nom: 'Dupont',
    prenom: 'Marie',
    moyenne: '16.5',
    presence: '98%',
    devoirs: '12/12',
    statut: 'Excellent',
    email: 'marie.dupont@lycee.fr',
    telephone: '06 12 34 56 78'
  },
  {
    id: 2,
    nom: 'Martin',
    prenom: 'Lucas',
    moyenne: '14.2',
    presence: '92%',
    devoirs: '11/12',
    statut: 'Bon',
    email: 'lucas.martin@lycee.fr',
    telephone: '06 23 45 67 89'
  },
  {
    id: 3,
    nom: 'Bernard',
    prenom: 'Sophie',
    moyenne: '15.8',
    presence: '96%',
    devoirs: '12/12',
    statut: 'Excellent',
    email: 'sophie.bernard@lycee.fr',
    telephone: '06 34 56 78 90'
  },
  {
    id: 4,
    nom: 'Dubois',
    prenom: 'Thomas',
    moyenne: '12.5',
    presence: '88%',
    devoirs: '10/12',
    statut: 'Moyen',
    email: 'thomas.dubois@lycee.fr',
    telephone: '06 45 67 89 01'
  },
  {
    id: 5,
    nom: 'Laurent',
    prenom: 'Emma',
    moyenne: '17.2',
    presence: '100%',
    devoirs: '12/12',
    statut: 'Excellent',
    email: 'emma.laurent@lycee.fr',
    telephone: '06 56 78 90 12'
  },
  {
    id: 6,
    nom: 'Simon',
    prenom: 'Hugo',
    moyenne: '13.8',
    presence: '90%',
    devoirs: '11/12',
    statut: 'Bon',
    email: 'hugo.simon@lycee.fr',
    telephone: '06 67 89 01 23'
  },
  {
    id: 7,
    nom: 'Michel',
    prenom: 'Léa',
    moyenne: '15.0',
    presence: '94%',
    devoirs: '12/12',
    statut: 'Bon',
    email: 'lea.michel@lycee.fr',
    telephone: '06 78 90 12 34'
  },
  {
    id: 8,
    nom: 'Lefebvre',
    prenom: 'Nathan',
    moyenne: '11.5',
    presence: '85%',
    devoirs: '9/12',
    statut: 'Difficultés',
    email: 'nathan.lefebvre@lycee.fr',
    telephone: '06 89 01 23 45'
  }
]

const getStatutColor = (statut) => {
  switch (statut) {
    case 'Excellent':
      return 'bg-green-100 text-green-700'
    case 'Bon':
      return 'bg-blue-100 text-blue-700'
    case 'Moyen':
      return 'bg-orange-100 text-orange-700'
    case 'Difficultés':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const filteredStudents = computed(() => {
  return students.filter(student => {
    const matchesSearch = student.nom.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        student.prenom.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesFilter = filterStatus.value === 'all' || student.statut === filterStatus.value
    return matchesSearch && matchesFilter
  })
})
</script>