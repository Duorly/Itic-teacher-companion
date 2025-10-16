<template>
  <div
      class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 p-8 rounded-lg">
    <div class="max-w-8xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">📝 Saisie de notes</h1>
            <p class="text-gray-600 dark:text-slate-300">Évaluez rapidement vos étudiants</p>
          </div>
          <div class="flex items-center gap-3">
            <button
                class="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2
                     dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <Icon name="lucide:save" class="w-5 h-5"/>
              Brouillon
            </button>
            <button
                class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2
                     dark:from-blue-500 dark:to-purple-500"
                @click="saveNotes"
            >
              <Icon name="lucide:check-circle" class="w-5 h-5"/>
              Enregistrer
            </button>
          </div>
        </div>

        <!-- Sélection Devoir/Classe -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-slate-200 mb-2">Classe</label>
              <USelect
                  v-model="selectedClasse" placeholder="Sélectionner une classe" :items="classes" size="xl"
                  class="w-full"/>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-slate-200 mb-2">Devoir</label>
              <USelect
                  v-model="selectedDevoir" placeholder="Sélectionner un devoir" :items="devoirs" value-key="id"
                  size="xl" class="w-full" label-key="nom"/>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-slate-200 mb-2">Note sur</label>
              <UInputNumber v-model="noteMax" size="xl" class="w-full"/>
            </div>
          </div>

          <!-- Stats rapides -->
          <div v-if="selectedClasse && selectedDevoir" class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
                class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white dark:from-blue-600 dark:to-blue-700">
              <div class="text-sm mb-1 opacity-90">Notes saisies</div>
              <div class="text-3xl font-black">{{ notesSaisies }}/{{ students.length }}</div>
            </div>
            <div
                class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white dark:from-green-600 dark:to-green-700">
              <div class="text-sm mb-1 opacity-90">Moyenne classe</div>
              <div class="text-3xl font-black">{{ moyenneClasse }}</div>
            </div>
            <div
                class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white dark:from-purple-600 dark:to-purple-700">
              <div class="text-sm mb-1 opacity-90">Note la plus haute</div>
              <div class="text-3xl font-black">{{ noteMax > 0 ? maxNote : '-' }}</div>
            </div>
            <div
                class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white dark:from-orange-600 dark:to-orange-700">
              <div class="text-sm mb-1 opacity-90">Note la plus basse</div>
              <div class="text-3xl font-black">{{ noteMax > 0 ? minNote : '-' }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Outils rapides -->
      <div v-if="selectedClasse && selectedDevoir" class="mb-6 flex items-center gap-3">
        <button
            :class="[
            'px-4 py-2 rounded-xl font-semibold transition-all border-2',
            saisieMode === 'simple'
              ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-600 dark:border-blue-600'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700'
          ]"
            @click="toggleSaisieMode"
        >
          <Icon name="lucide:list" class="w-4 h-4 inline mr-2"/>
          Saisie simple
        </button>
        <button
            :class="[
            'px-4 py-2 rounded-xl font-semibold transition-all border-2',
            saisieMode === 'rapide'
              ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-600 dark:border-blue-600'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700'
          ]"
            @click="toggleSaisieMode"
        >
          <Icon name="lucide:zap" class="w-4 h-4 inline mr-2"/>
          Saisie rapide
        </button>
        <div class="flex-1"/>
        <button
            class="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all
                 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
            @click="showAbsentsModal = true"
        >
          <Icon name="lucide:user-x" class="w-4 h-4 inline mr-2"/>
          Gérer les absents
        </button>
        <button
            class="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all
                 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          <Icon name="lucide:filter" class="w-4 h-4 inline mr-2"/>
          Filtrer
        </button>
      </div>

      <!-- Liste des étudiants -->
      <div
          v-if="selectedClasse && selectedDevoir"
          class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
            <tr
                class="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200
                          dark:from-slate-800 dark:to-slate-800 dark:border-slate-700">
              <th class="text-left py-4 px-6 text-gray-700 dark:text-slate-200 font-bold text-sm">
                <input
                    type="checkbox"
                    class="w-5 h-5 rounded border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800">
              </th>
              <th class="text-left py-4 px-6 text-gray-700 dark:text-slate-200 font-bold">N°</th>
              <th class="text-left py-4 px-6 text-gray-700 dark:text-slate-200 font-bold">Étudiant</th>
              <th class="text-center py-4 px-6 text-gray-700 dark:text-slate-200 font-bold">Note</th>
              <th
                  v-if="saisieMode === 'simple'"
                  class="text-center py-4 px-6 text-gray-700 dark:text-slate-200 font-bold">Appréciation
              </th>
              <th class="text-center py-4 px-6 text-gray-700 dark:text-slate-200 font-bold">Statut</th>
              <th class="text-center py-4 px-6 text-gray-700 dark:text-slate-200 font-bold">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="(student, idx) in students"
                :key="student.id"
                class="border-b border-gray-100 hover:bg-blue-50/50 transition-all
                       dark:border-slate-800 dark:hover:bg-slate-800/60"
                :class="{ 'bg-gray-50 dark:bg-slate-800/40': student.absent }"
            >
              <td class="py-4 px-6">
                <input
                    type="checkbox"
                    class="w-5 h-5 rounded border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800">
              </td>
              <td class="py-4 px-6">
                <span class="font-semibold text-gray-600 dark:text-slate-300">{{ idx + 1 }}</span>
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div
                      class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {{ student.nom.charAt(0) }}{{ student.prenom.charAt(0) }}
                  </div>
                  <div>
                    <div class="font-semibold text-gray-900 dark:text-white">{{ student.nom }} {{
                        student.prenom
                      }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-slate-400">{{ student.id }}</div>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6">
                <div v-if="!student.absent" class="flex items-center justify-center gap-2">
                  <input
                      v-model.number="student.note"
                      type="number"
                      step="0.5"
                      :max="noteMax"
                      min="0"
                      class="w-24 px-3 py-2 text-center text-xl font-bold border-2 rounded-xl focus:border-blue-500 focus:outline-none transition-all
                             bg-white border-gray-200 text-gray-900
                             dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                      :class="getNoteColorClass(student.note)"
                      placeholder="-"
                      @input="validateNote(student)"
                  >
                  <span class="text-gray-400 dark:text-slate-400 font-semibold">/ {{ noteMax }}</span>
                </div>
                <div v-else class="text-center text-gray-400 dark:text-slate-500 font-semibold">-</div>
              </td>
              <td v-if="saisieMode === 'simple'" class="py-4 px-6">
                <input
                    v-if="!student.absent"
                    v-model="student.appreciation"
                    type="text"
                    class="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all
                           bg-white text-gray-900
                           dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    placeholder="Très bien, À améliorer..."
                >
                <span v-else class="text-gray-400 dark:text-slate-500">-</span>
              </td>
              <td class="py-4 px-6 text-center">
                  <span
                      v-if="student.absent"
                      class="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold
                           dark:bg-red-900/30 dark:text-red-300"
                  >
                    <Icon name="lucide:user-x" class="w-4 h-4"/>
                    Absent
                  </span>
                <span
                    v-else-if="student.note !== null && student.note !== undefined && student.note !== ''"
                    class="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold
                           dark:bg-green-900/30 dark:text-green-300"
                >
                    <Icon name="lucide:check" class="w-4 h-4"/>
                    Saisi
                  </span>
                <span
                    v-else
                    class="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-semibold
                           dark:bg-slate-800 dark:text-slate-300"
                >
                    <Icon name="lucide:clock" class="w-4 h-4"/>
                    En attente
                  </span>
              </td>
              <td class="py-4 px-6 text-center">
                <div class="flex items-center justify-center gap-2">
                  <button
                      class="p-2 hover:bg-gray-100 rounded-lg transition-all dark:hover:bg-slate-800"
                      :title="student.absent ? 'Marquer présent' : 'Marquer absent'"
                      @click="toggleAbsent(student)"
                  >
                    <Icon
                        :name="student.absent ? 'lucide:user-check' : 'lucide:user-x'"
                        class="w-5 h-5 text-gray-600 dark:text-slate-300"/>
                  </button>
                  <button
                      class="p-2 hover:bg-gray-100 rounded-lg transition-all dark:hover:bg-slate-800"
                      title="Commentaire">
                    <Icon name="lucide:message-square" class="w-5 h-5 text-gray-600 dark:text-slate-300"/>
                  </button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- État vide -->
      <div
          v-else
          class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 p-16 text-center">
        <div class="text-6xl mb-4">📚</div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sélectionnez une classe et un devoir</h3>
        <p class="text-gray-600 dark:text-slate-300">Choisissez d'abord la classe et le devoir pour commencer la saisie
          des notes</p>
      </div>
    </div>

    <!-- Modal Absents -->
    <div
        v-if="showAbsentsModal"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-8">
      <div
          class="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-gray-200 dark:border-slate-800">
        <div class="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white dark:from-red-600 dark:to-orange-600">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-bold flex items-center gap-3">
              <Icon name="lucide:user-x" class="w-8 h-8"/>
              Gestion des absents
            </h3>
            <button class="p-2 hover:bg-white/20 rounded-lg transition-all" @click="showAbsentsModal = false">
              <Icon name="lucide:x" class="w-6 h-6"/>
            </button>
          </div>
        </div>
        <div class="p-6 overflow-y-auto max-h-96">
          <div class="space-y-3">
            <div
                v-for="student in students"
                :key="student.id"
                class="flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-slate-800"
                :class="student.absent ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900'"
                @click="toggleAbsent(student)"
            >
              <div class="flex items-center gap-3">
                <div
                    class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {{ student.nom.charAt(0) }}{{ student.prenom.charAt(0) }}
                </div>
                <div>
                  <div class="font-semibold text-gray-900 dark:text-white">{{ student.nom }} {{ student.prenom }}</div>
                  <div class="text-sm text-gray-500 dark:text-slate-400">{{ student.id }}</div>
                </div>
              </div>
              <div>
                <input
                    type="checkbox" :checked="student.absent"
                    class="w-6 h-6 rounded border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800">
              </div>
            </div>
          </div>
        </div>
        <div class="p-6 border-t border-gray-200 dark:border-slate-800 flex justify-end gap-3">
          <button
              class="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all
                   dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              @click="showAbsentsModal = false"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>

    <!-- Notification de sauvegarde -->
    <div
        v-if="showSaveNotification"
        class="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-up
             dark:from-green-600 dark:to-emerald-600"
    >
      <Icon name="lucide:check-circle" class="w-6 h-6"/>
      <div>
        <div class="font-bold">Notes enregistrées !</div>
        <div class="text-sm opacity-90">{{ notesSaisies }} notes sauvegardées avec succès</div>
      </div>
    </div>
  </div>
</template>


<script setup>
definePageMeta({
  layout: "dashboard"
})

const selectedClasse = ref('');
const selectedDevoir = ref('');
const noteMax = ref(20);
const saisieMode = ref('simple'); // 'simple' ou 'rapide'
const showAbsentsModal = ref(false);
const showSaveNotification = ref(false);

const classes = ['Terminale S1', 'Première ES2', 'Seconde A', 'Terminale L'];
const devoirs = [
  {id: 1, nom: 'Contrôle Chapitre 1'},
  {id: 2, nom: 'Devoir Maison'},
  {id: 3, nom: 'Examen Blanc'},
  {id: 4, nom: 'TP Pratique'}
];

const students = ref([
  {id: 'STU001', nom: 'Durant', prenom: 'Sophie', note: null, appreciation: '', absent: false},
  {id: 'STU002', nom: 'Martin', prenom: 'Thomas', note: 16, appreciation: 'Très bon travail', absent: false},
  {id: 'STU003', nom: 'Rousseau', prenom: 'Emma', note: null, appreciation: '', absent: false},
  {id: 'STU004', nom: 'Bernard', prenom: 'Lucas', note: 14.5, appreciation: 'Bien', absent: false},
  {id: 'STU005', nom: 'Petit', prenom: 'Chloé', note: null, appreciation: '', absent: false},
  {id: 'STU006', nom: 'Dubois', prenom: 'Hugo', note: null, appreciation: '', absent: true},
  {id: 'STU007', nom: 'Moreau', prenom: 'Léa', note: 18, appreciation: 'Excellent', absent: false},
  {id: 'STU008', nom: 'Laurent', prenom: 'Nathan', note: null, appreciation: '', absent: false},
  {id: 'STU009', nom: 'Simon', prenom: 'Camille', note: 12, appreciation: 'Peut mieux faire', absent: false},
  {id: 'STU010', nom: 'Leroy', prenom: 'Arthur', note: null, appreciation: '', absent: false}
]);

const notesSaisies = computed(() => {
  return students.value.filter(s => !s.absent && s.note !== null && s.note !== undefined && s.note !== '').length;
});

const moyenneClasse = computed(() => {
  const notesValides = students.value.filter(s => !s.absent && s.note !== null && s.note !== undefined && s.note !== '');
  if (notesValides.length === 0) return '-';
  const sum = notesValides.reduce((acc, s) => acc + parseFloat(s.note), 0);
  return (sum / notesValides.length).toFixed(2);
});

const maxNote = computed(() => {
  const notesValides = students.value.filter(s => !s.absent && s.note !== null && s.note !== undefined && s.note !== '').map(s => parseFloat(s.note));
  return notesValides.length > 0 ? Math.max(...notesValides) : '-';
});

const minNote = computed(() => {
  const notesValides = students.value.filter(s => !s.absent && s.note !== null && s.note !== undefined && s.note !== '').map(s => parseFloat(s.note));
  return notesValides.length > 0 ? Math.min(...notesValides) : '-';
});

const validateNote = (student) => {
  if (student.note > noteMax.value) {
    student.note = noteMax.value;
  }
  if (student.note < 0) {
    student.note = 0;
  }
};

const getNoteColorClass = (note) => {
  if (note === null || note === undefined || note === '') return 'border-gray-300 bg-white';
  const percentage = (note / noteMax.value) * 100;
  if (percentage >= 80) return 'border-green-400 bg-green-50 text-green-700';
  if (percentage >= 60) return 'border-blue-400 bg-blue-50 text-blue-700';
  if (percentage >= 40) return 'border-orange-400 bg-orange-50 text-orange-700';
  return 'border-red-400 bg-red-50 text-red-700';
};

const toggleSaisieMode = () => {
  saisieMode.value = saisieMode.value === 'simple' ? 'rapide' : 'simple';
};

const toggleAbsent = (student) => {
  student.absent = !student.absent;
  if (student.absent) {
    student.note = null;
    student.appreciation = '';
  }
};

const saveNotes = () => {
  // Logique de sauvegarde
  showSaveNotification.value = true;
  setTimeout(() => {
    showSaveNotification.value = false;
  }, 3000);
};
</script>

<style scoped>
@keyframes slide-up {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}

/* Masquer les spinners des inputs number */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>