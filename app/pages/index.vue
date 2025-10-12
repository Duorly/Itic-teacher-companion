<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <!-- Sidebar -->
    <aside class="fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 p-6">
      <div class="flex items-center gap-3 mb-8 p-4 rounded-lg">
        <img v-if="colorMode.value === 'light'" src="/images/logo-white.svg" alt="Logo">
        <img v-else src="/images/logo.svg" alt="Logo">
      </div>

      <nav class="space-y-2">
        <button
            v-for="item in menuItems"
            :key="item.id"
            :class="[
            'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
            activeTab === item.id
              ? 'bg-blue-50 text-blue-600 font-medium'
              : 'text-slate-600 hover:bg-slate-50'
          ]"
            @click="activeTab = item.id"
        >
          <Icon :name="item.icon" class="w-5 h-5" />
          <span>{{ item.label }}</span>
        </button>
      </nav>

      <div class="absolute bottom-6 left-6 right-6">
        <div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 text-white">
          <p class="text-sm font-medium mb-2">Besoin d'aide ?</p>
          <p class="text-xs opacity-90 mb-3">Consultez notre guide</p>
          <button class="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg py-2 text-sm font-medium transition-all">
            En savoir plus
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="ml-64 p-8 bg-white dark:bg-gray-900">
      <!-- Header -->
      <header class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Bienvenue, Professeur Martin</h2>
            <p class="text-slate-600">Dimanche 12 Octobre 2025</p>
          </div>
          <div class="flex items-center gap-3">
            <UColorModeSwitch />
            <button class="p-2 hover:bg-white rounded-lg transition-all border border-slate-200">
              <Icon name="lucide:search" class="w-5 h-5 text-slate-600" />
            </button>
            <button class="p-2 hover:bg-white rounded-lg transition-all border border-slate-200">
              <Icon name="lucide:filter" class="w-5 h-5 text-slate-600" />
            </button>
            <button class="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
              <Icon name="lucide:plus" class="w-5 h-5" />
              <span class="font-medium">Nouveau devoir</span>
            </button>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-4 gap-6">
          <div
              v-for="(stat, idx) in stats"
              :key="idx"
              class="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all"
          >
            <div class="flex items-center justify-between mb-4">
              <div :class="[stat.color, 'w-12 h-12 rounded-lg flex items-center justify-center']">
                <Icon :name="stat.icon" class="w-6 h-6 text-white" />
              </div>
              <span class="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                {{ stat.change }}
              </span>
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mb-1">{{ stat.value }}</h3>
            <p class="text-slate-600 text-sm">{{ stat.label }}</p>
          </div>
        </div>
      </header>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-3 gap-6">
        <!-- Classes -->
        <div class="col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-slate-900">Mes Classes</h3>
            <button class="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
              Voir tout
              <Icon name="lucide:chevron-right" class="w-4 h-4" />
            </button>
          </div>
          <div class="space-y-4">
            <div
                v-for="(classe, idx) in classes"
                :key="idx"
                class="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
            >
              <div class="flex items-center gap-4">
                <div :class="[classe.couleur, 'px-3 py-2 rounded-lg font-medium text-sm']">
                  {{ classe.nom }}
                </div>
                <div class="flex items-center gap-6 text-sm text-slate-600">
                  <span class="flex items-center gap-1">
                    <Icon name="lucide:users" class="w-4 h-4" />
                    {{ classe.eleves }} élèves
                  </span>
                  <span class="flex items-center gap-1">
                    <Icon name="lucide:file-text" class="w-4 h-4" />
                    {{ classe.devoirs }} devoirs
                  </span>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="text-right">
                  <p class="text-sm text-slate-500">Moyenne</p>
                  <p class="text-lg font-bold text-slate-900">{{ classe.moyenne }}</p>
                </div>
                <Icon name="lucide:chevron-right" class="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        <!-- Prochains cours -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div class="flex items-center gap-2 mb-6">
            <Icon name="lucide:clock" class="w-5 h-5 text-blue-600" />
            <h3 class="text-xl font-bold text-slate-900">Prochains cours</h3>
          </div>
          <div class="space-y-4">
            <div
                v-for="(cours, idx) in prochainsCours"
                :key="idx"
                class="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200"
            >
              <p class="font-semibold text-slate-900 mb-1">{{ cours.matiere }}</p>
              <p class="text-sm text-slate-600 mb-2">{{ cours.classe }}</p>
              <div class="flex items-center justify-between text-xs">
                <span class="text-blue-600 font-medium">{{ cours.horaire }}</span>
                <span class="bg-white px-2 py-1 rounded text-slate-600">{{ cours.salle }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Devoirs récents -->
        <div class="col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 class="text-xl font-bold text-slate-900 mb-6">Devoirs récents</h3>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
              <tr class="border-b border-slate-200">
                <th class="text-left py-3 px-4 text-sm font-semibold text-slate-600">Titre</th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-slate-600">Classe</th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-slate-600">Date</th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-slate-600">Statut</th>
                <th class="text-left py-3 px-4 text-sm font-semibold text-slate-600">Notes saisies</th>
                <th class="text-right py-3 px-4 text-sm font-semibold text-slate-600">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="(devoir, idx) in devoirsRecents"
                  :key="idx"
                  class="border-b border-slate-100 hover:bg-slate-50 transition-all"
              >
                <td class="py-4 px-4 font-medium text-slate-900">{{ devoir.titre }}</td>
                <td class="py-4 px-4 text-slate-600">{{ devoir.classe }}</td>
                <td class="py-4 px-4 text-slate-600">{{ devoir.date }}</td>
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
                <td class="py-4 px-4 text-slate-600">{{ devoir.notes }}/28</td>
                <td class="py-4 px-4 text-right">
                  <button class="text-blue-600 hover:text-blue-700 font-medium text-sm">
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

const colorMode = useColorMode()

const menuItems = [
  { id: 'overview', label: 'Vue d\'ensemble', icon: 'lucide:trending-up' },
  { id: 'classes', label: 'Classes', icon: 'lucide:users' },
  { id: 'devoirs', label: 'Devoirs', icon: 'lucide:file-text' },
  { id: 'calendrier', label: 'Calendrier', icon: 'lucide:calendar' },
  { id: 'notes', label: 'Notes', icon: 'lucide:award' }
];

const stats = [
  { label: 'Classes', value: '8', icon: 'lucide:users', change: '+2', color: 'bg-blue-500' },
  { label: 'Devoirs', value: '24', icon: 'lucide:file-text', change: '+5', color: 'bg-purple-500' },
  { label: 'Étudiants', value: '156', icon: 'lucide:book-open', change: '+12', color: 'bg-green-500' },
  { label: 'Moyenne', value: '14.5', icon: 'lucide:award', change: '+0.3', color: 'bg-orange-500' }
];

const classes = [
  { nom: 'Terminale S1', eleves: 28, devoirs: 5, moyenne: 15.2, couleur: 'bg-blue-100 text-blue-700' },
  { nom: 'Première ES2', eleves: 25, devoirs: 4, moyenne: 13.8, couleur: 'bg-purple-100 text-purple-700' },
  { nom: 'Seconde A', eleves: 30, devoirs: 6, moyenne: 14.5, couleur: 'bg-green-100 text-green-700' },
  { nom: 'Terminale L', eleves: 22, devoirs: 3, moyenne: 14.9, couleur: 'bg-orange-100 text-orange-700' }
];

const devoirsRecents = [
  { titre: 'Contrôle Mathématiques', classe: 'Terminale S1', date: '15 Oct 2025', statut: 'Corrigé', notes: 28 },
  { titre: 'Dissertation Philosophie', classe: 'Terminale L', date: '14 Oct 2025', statut: 'En cours', notes: 15 },
  { titre: 'TP Physique-Chimie', classe: 'Première ES2', date: '13 Oct 2025', statut: 'À corriger', notes: 0 },
  { titre: 'Quiz Histoire', classe: 'Seconde A', date: '12 Oct 2025', statut: 'Corrigé', notes: 30 }
];

const prochainsCours = [
  { matiere: 'Mathématiques', classe: 'Terminale S1', horaire: 'Aujourd\'hui 14h-16h', salle: 'B204' },
  { matiere: 'Français', classe: 'Première ES2', horaire: 'Demain 10h-12h', salle: 'A105' },
  { matiere: 'Physique', classe: 'Terminale S1', horaire: 'Demain 14h-15h', salle: 'C301' }
];
</script>