<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
    <div class="max-w-7xl mx-auto">
      <!-- En-tête de la classe -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-4">
            <div :class="[classeInfo.couleur, 'px-4 py-2 rounded-lg font-bold text-2xl']">
              {{ classeInfo.label }}
            </div>
            <div>
              <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ classeInfo.matiere }}</h1>
              <p class="text-slate-600 dark:text-slate-400">Année scolaire {{ classeInfo.annee }}</p>
            </div>
          </div>
          <div class="flex gap-3">
            <button class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
              <Icon name="lucide:mail" class="w-4 h-4" />
              Contacter tous
            </button>
            <button class="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all">
              <Icon name="lucide:download" class="w-4 h-4" />
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
              <Icon :name="stat.icon" class="w-6 h-6 text-white" />
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
              <Icon name="lucide:search" class="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
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
          <table class="w-full">
            <thead>
            <tr class="border-b border-slate-200 dark:border-slate-700">
              <th class="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-white">Élève</th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-white">Contact</th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-white">Moyenne</th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-white">Présence</th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-white">Devoirs rendus</th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-white">Statut</th>
              <th class="text-right py-3 px-4 text-sm font-semibold text-slate-600 dark:text-white">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="student in filteredStudents"
                :key="student.id"
                class="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              <td class="py-4 px-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {{ student.prenom[0] }}{{ student.nom[0] }}
                  </div>
                  <div>
                    <p class="font-medium text-slate-900 dark:text-white">{{ student.prenom }} {{ student.nom }}</p>
                    <p class="text-sm text-slate-500 dark:text-slate-400">ID: #{{ student.id }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4">
                <div class="flex flex-col gap-1">
                    <span class="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <Icon name="lucide:mail" class="w-4 h-4" />
                      {{ student.email }}
                    </span>
                  <span class="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <Icon name="lucide:phone" class="w-4 h-4" />
                      {{ student.telephone }}
                    </span>
                </div>
              </td>
              <td class="py-4 px-4">
                <span class="text-lg font-bold text-slate-900 dark:text-white">{{ student.moyenne }}/20</span>
              </td>
              <td class="py-4 px-4">
                <span class="text-slate-600 dark:text-slate-400">{{ student.presence }}</span>
              </td>
              <td class="py-4 px-4">
                <span class="text-slate-600 dark:text-slate-400">{{ student.devoirs }}</span>
              </td>
              <td class="py-4 px-4">
                  <span :class="['px-3 py-1 rounded-full text-xs font-medium', getStatutColor(student.statut)]">
                    {{ student.statut }}
                  </span>
              </td>
              <td class="py-4 px-4 text-right">
                <button class="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 ml-auto">
                  Voir profil
                  <Icon name="lucide:chevron-right" class="w-4 h-4" />
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div v-if="filteredStudents.length === 0" class="text-center py-12">
          <Icon name="lucide:users" class="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p class="text-slate-600 dark:text-slate-400">Aucun élève trouvé</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})

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

const stats = [
  { label: 'Élèves', value: '28', icon: 'lucide:users', color: 'bg-blue-500' },
  { label: 'Moyenne classe', value: '14.5/20', icon: 'lucide:award', color: 'bg-green-500' },
  { label: 'Taux présence', value: '94%', icon: 'lucide:trending-up', color: 'bg-purple-500' },
  { label: 'Devoirs rendus', value: '89%', icon: 'lucide:file-text', color: 'bg-orange-500' }
]

const students = [
  { id: 1, nom: 'Dupont', prenom: 'Marie', moyenne: '16.5', presence: '98%', devoirs: '12/12', statut: 'Excellent', email: 'marie.dupont@lycee.fr', telephone: '06 12 34 56 78' },
  { id: 2, nom: 'Martin', prenom: 'Lucas', moyenne: '14.2', presence: '92%', devoirs: '11/12', statut: 'Bon', email: 'lucas.martin@lycee.fr', telephone: '06 23 45 67 89' },
  { id: 3, nom: 'Bernard', prenom: 'Sophie', moyenne: '15.8', presence: '96%', devoirs: '12/12', statut: 'Excellent', email: 'sophie.bernard@lycee.fr', telephone: '06 34 56 78 90' },
  { id: 4, nom: 'Dubois', prenom: 'Thomas', moyenne: '12.5', presence: '88%', devoirs: '10/12', statut: 'Moyen', email: 'thomas.dubois@lycee.fr', telephone: '06 45 67 89 01' },
  { id: 5, nom: 'Laurent', prenom: 'Emma', moyenne: '17.2', presence: '100%', devoirs: '12/12', statut: 'Excellent', email: 'emma.laurent@lycee.fr', telephone: '06 56 78 90 12' },
  { id: 6, nom: 'Simon', prenom: 'Hugo', moyenne: '13.8', presence: '90%', devoirs: '11/12', statut: 'Bon', email: 'hugo.simon@lycee.fr', telephone: '06 67 89 01 23' },
  { id: 7, nom: 'Michel', prenom: 'Léa', moyenne: '15.0', presence: '94%', devoirs: '12/12', statut: 'Bon', email: 'lea.michel@lycee.fr', telephone: '06 78 90 12 34' },
  { id: 8, nom: 'Lefebvre', prenom: 'Nathan', moyenne: '11.5', presence: '85%', devoirs: '9/12', statut: 'Difficultés', email: 'nathan.lefebvre@lycee.fr', telephone: '06 89 01 23 45' }
]

const getStatutColor = (statut) => {
  switch (statut) {
    case 'Excellent': return 'bg-green-100 text-green-700'
    case 'Bon': return 'bg-blue-100 text-blue-700'
    case 'Moyen': return 'bg-orange-100 text-orange-700'
    case 'Difficultés': return 'bg-red-100 text-red-700'
    default: return 'bg-gray-100 text-gray-700'
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