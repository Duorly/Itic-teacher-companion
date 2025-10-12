<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <!-- Sidebar -->
    <NavigationSidebar />
    <!-- Main Content -->
    <main class="ml-64 p-8 bg-white dark:bg-gray-900">
      <!-- Header -->
      <header class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Bienvenue, Professeur Martin</h2>
            <p class="text-slate-600 dark:text-slate-400">{{
                capitalize(new Date().toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                }))
              }}</p>
          </div>
          <div class="flex items-center gap-3">
            <UColorModeSwitch/>
            <button class="p-2 flex items-center hover:bg-white rounded-lg transition-all border border-slate-200">
              <Icon name="lucide:search" class="w-5 h-5 text-slate-600"/>
            </button>
            <button class="p-2 flex items-center hover:bg-white rounded-lg transition-all border border-slate-200">
              <Icon name="lucide:filter" class="w-5 h-5 text-slate-600"/>
            </button>
            <button
                class="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
              <Icon name="lucide:plus" class="w-5 h-5"/>
              <span class="font-medium">Nouveau devoir</span>
            </button>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-4 gap-6">
          <StatCard v-for="(stat, idx) in stats" :key="idx" :stat="stat"/>
        </div>
      </header>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-3 gap-6">
        <!-- Classes -->
        <div
            class="col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">Mes Classes</h3>
            <button class="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
              Voir tout
              <Icon name="lucide:chevron-right" class="w-4 h-4"/>
            </button>
          </div>
          <div class="space-y-4">
            <div
                v-for="(classe, idx) in classes"
                :key="idx"
                class="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
            >
              <div class="flex items-center gap-4">
                <div :class="[classe.couleur, 'px-3 py-2 rounded-lg font-medium text-sm']">
                  {{ classe.nom }}
                </div>
                <div class="flex items-center gap-6 text-sm text-slate-600">
                  <span class="flex items-center gap-1">
                    <Icon name="lucide:users" class="w-4 h-4"/>
                    {{ classe.eleves }} élèves
                  </span>
                  <span class="flex items-center gap-1">
                    <Icon name="lucide:file-text" class="w-4 h-4"/>
                    {{ classe.devoirs }} devoirs
                  </span>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="text-right">
                  <p class="text-sm text-slate-500">Moyenne</p>
                  <p class="text-lg font-bold text-slate-900">{{ classe.moyenne }}</p>
                </div>
                <Icon name="lucide:chevron-right" class="w-5 h-5 text-slate-400"/>
              </div>
            </div>
          </div>
        </div>

        <!-- Prochains cours -->
        <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div class="flex items-center gap-2 mb-6">
            <Icon name="lucide:clock" class="w-5 h-5 text-blue-600"/>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">Prochains cours</h3>
          </div>
          <div class="space-y-4">
            <div
                v-for="(cours, idx) in prochainsCours"
                :key="idx"
                class="p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-sm transition-all cursor-pointer"
            >
              <p class="font-semibold text-slate-900 dark:text-white mb-1">{{ cours.matiere }}</p>
              <p class="text-sm text-slate-600 dark:text-slate-400 mb-2">{{ cours.classe }}</p>
              <div class="flex items-center justify-between text-xs">
                <span class="text-blue-600 font-medium">{{ cours.horaire }}</span>
                <span class="bg-white px-2 py-1 rounded text-slate-600">{{ cours.salle }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Devoirs récents -->
        <div
            class="col-span-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6">Devoirs récents</h3>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
              <tr class="border-b border-slate-200 dark:border-slate-700">
                <th class="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-white">Titre</th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-white ">Classe</th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-white">Date</th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-white">Statut</th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-white">Notes saisies</th>
                <th class="text-right py-3 px-4 text-sm font-semibold text-slate-600 dark:text-white">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="(devoir, idx) in devoirsRecents"
                  :key="idx"
                  class="border-b border-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 dark:border-slate-700 transition-all"
              >
                <td class="py-4 px-4 font-medium text-slate-900 dark:text-white">{{ devoir.titre }}</td>
                <td class="py-4 px-4 text-slate-600 dark:text-slate-400">{{ devoir.classe }}</td>
                <td class="py-4 px-4 text-slate-600 dark:text-slate-400">{{ devoir.date }}</td>
                <td class="py-4 px-4">
                    <span
                        :class="[
                        'px-3 py-1 rounded-full text-xs font-medium',
                        devoir.statut === 'Corrigé' ? 'bg-green-100 text-green-700' :
                        devoir.statut === 'En cours' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      ]"
                    >
                      {{ devoir.statut }}
                    </span>
                </td>
                <td class="py-4 px-4 text-slate-600 dark:text-white">{{ devoir.notes }}/28</td>
                <td class="py-4 px-4 text-right">
                  <button class="text-blue-600 hover:text-blue-700 hover:text-blue-700 font-medium text-sm">
                    {{ devoir.statut === 'À corriger' ? 'Corriger' : 'Voir détails' }}
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const activeTab = ref('overview');



const stats = [
  {label: 'Classes', value: '8', icon: 'lucide:users', change: '+2', color: 'bg-blue-500'},
  {label: 'Devoirs', value: '24', icon: 'lucide:file-text', change: '+5', color: 'bg-purple-500'},
  {label: 'Étudiants', value: '156', icon: 'lucide:book-open', change: '+12', color: 'bg-green-500'},
  {label: 'Moyenne', value: '14.5', icon: 'lucide:award', change: '+0.3', color: 'bg-orange-500'}
];

const classes = [
  {nom: 'Terminale S1', eleves: 28, devoirs: 5, moyenne: 15.2, couleur: 'bg-blue-100 text-blue-700'},
  {nom: 'Première ES2', eleves: 25, devoirs: 4, moyenne: 13.8, couleur: 'bg-purple-100 text-purple-700'},
  {nom: 'Seconde A', eleves: 30, devoirs: 6, moyenne: 14.5, couleur: 'bg-green-100 text-green-700'},
  {nom: 'Terminale L', eleves: 22, devoirs: 3, moyenne: 14.9, couleur: 'bg-orange-100 text-orange-700'}
];

const devoirsRecents = [
  {titre: 'Contrôle Mathématiques', classe: 'Terminale S1', date: '15 Oct 2025', statut: 'Corrigé', notes: 28},
  {titre: 'Dissertation Philosophie', classe: 'Terminale L', date: '14 Oct 2025', statut: 'En cours', notes: 15},
  {titre: 'TP Physique-Chimie', classe: 'Première ES2', date: '13 Oct 2025', statut: 'À corriger', notes: 0},
  {titre: 'Quiz Histoire', classe: 'Seconde A', date: '12 Oct 2025', statut: 'Corrigé', notes: 30}
];

const prochainsCours = [
  {matiere: 'Mathématiques', classe: 'Terminale S1', horaire: 'Aujourd\'hui 14h-16h', salle: 'B204'},
  {matiere: 'Français', classe: 'Première ES2', horaire: 'Demain 10h-12h', salle: 'A105'},
  {matiere: 'Physique', classe: 'Terminale S1', horaire: 'Demain 14h-15h', salle: 'C301'}
];
</script>