<template>
  <div class="min-h-screen bg-slate-950 text-green-400 font-mono overflow-hidden relative">
    <!-- Matrix Background Effect -->
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <div class="absolute inset-0" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 197, 94, 0.03) 2px, rgba(34, 197, 94, 0.03) 4px);"></div>
    </div>

    <!-- Scanline Effect -->
    <div class="absolute inset-0 pointer-events-none opacity-10">
      <div class="h-full w-full animate-scan" style="background: linear-gradient(transparent 50%, rgba(34, 197, 94, 0.1) 50%); background-size: 100% 4px;"></div>
    </div>

    <div class="relative z-10 p-8">
      <!-- Terminal Header -->
      <div class="mb-8 border-2 border-green-500/30 bg-black/40 backdrop-blur-sm rounded-lg p-6 shadow-2xl shadow-green-500/20">
        <div class="flex items-center gap-2 mb-4">
          <div class="flex gap-2">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span class="text-green-400 text-sm ml-2">root@edunote:~$</span>
        </div>

        <div class="space-y-2">
          <p class="text-green-400">
            <span class="text-green-500">$</span> ./leaderboard.sh --top-students --year=2025
          </p>
          <p class="text-green-300 animate-pulse">
            <span class="text-yellow-400">[INFO]</span> Initializing quantum neural network...
          </p>
          <p class="text-green-300">
            <span class="text-blue-400">[OK]</span> Data matrix loaded successfully
          </p>
          <p class="text-green-300">
            <span class="text-purple-400">[EXEC]</span> Computing student rankings...
          </p>
        </div>

        <div class="mt-6 flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-green-400 mb-2 glitch" data-text=">>> HALL OF FAME <<<">
              >>> HALL OF FAME <<<
            </h1>
            <p class="text-green-500/70 text-sm">[ CLASSEMENT TEMPS RÉEL - ANNÉE SCOLAIRE 2024/2025 ]</p>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold text-cyan-400 animate-pulse">{{ currentTime }}</div>
            <div class="text-xs text-green-500/70">SYSTEM.TIME</div>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-4 gap-4 mb-8">
        <div class="border-2 border-cyan-500/30 bg-black/40 backdrop-blur-sm rounded-lg p-4 hover:border-cyan-500 transition-all">
          <div class="text-cyan-400 text-xs mb-2">TOTAL_STUDENTS</div>
          <div class="text-3xl font-bold text-cyan-300">{{ students.length }}</div>
          <div class="text-xs text-cyan-500/70 mt-1">ACTIFS</div>
        </div>
        <div class="border-2 border-purple-500/30 bg-black/40 backdrop-blur-sm rounded-lg p-4 hover:border-purple-500 transition-all">
          <div class="text-purple-400 text-xs mb-2">AVG_SCORE</div>
          <div class="text-3xl font-bold text-purple-300">{{ averageScore }}</div>
          <div class="text-xs text-purple-500/70 mt-1">POINTS</div>
        </div>
        <div class="border-2 border-yellow-500/30 bg-black/40 backdrop-blur-sm rounded-lg p-4 hover:border-yellow-500 transition-all">
          <div class="text-yellow-400 text-xs mb-2">TOP_PERFORMER</div>
          <div class="text-3xl font-bold text-yellow-300">{{ students[0]?.score }}</div>
          <div class="text-xs text-yellow-500/70 mt-1">MAX_POINTS</div>
        </div>
        <div class="border-2 border-green-500/30 bg-black/40 backdrop-blur-sm rounded-lg p-4 hover:border-green-500 transition-all">
          <div class="text-green-400 text-xs mb-2">COMPLETION</div>
          <div class="text-3xl font-bold text-green-300">{{ completionRate }}%</div>
          <div class="text-xs text-green-500/70 mt-1">RATE</div>
        </div>
      </div>

      <!-- Podium TOP 3 -->
      <div class="grid grid-cols-3 gap-6 mb-8">
        <!-- 2ème Place -->
        <div class="order-1 mt-12">
          <div class="border-2 border-gray-400/50 bg-gradient-to-b from-gray-800/60 to-black/60 backdrop-blur-sm rounded-lg p-6 hover:scale-105 transition-all relative">
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-600 text-white px-4 py-1 rounded-full text-xs font-bold border-2 border-gray-400">
              RANK #2
            </div>
            <div class="text-center">
              <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-4xl border-4 border-gray-500 animate-pulse">
                🥈
              </div>
              <div class="text-2xl font-bold text-gray-300 mb-2">{{ students[1]?.nom }}</div>
              <div class="text-gray-500 text-sm mb-3">{{ students[1]?.classe }}</div>
              <div class="bg-black/60 rounded-lg p-3 border border-gray-600">
                <div class="text-3xl font-bold text-gray-300">{{ students[1]?.score }}</div>
                <div class="text-xs text-gray-500">POINTS</div>
              </div>
              <div class="mt-3 text-xs text-gray-500">
                <div>XP: {{ students[1]?.xp }}</div>
                <div>Niveau: {{ students[1]?.level }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 1ère Place -->
        <div class="order-2">
          <div class="border-2 border-yellow-500/70 bg-gradient-to-b from-yellow-900/60 to-black/60 backdrop-blur-sm rounded-lg p-6 hover:scale-105 transition-all relative shadow-2xl shadow-yellow-500/30">
            <div class="absolute -top-30px left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-2 rounded-full text-sm font-bold border-4 border-yellow-400 animate-pulse shadow-lg shadow-yellow-500/50 flex items-center gap-2">
              <span>👑</span>
              <span>RANK #1</span>
              <span>👑</span>
            </div>
            <div class="text-center mt-4">
              <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-5xl border-4 border-yellow-500 animate-bounce">
                🏆
              </div>
              <div class="text-3xl font-bold text-yellow-400 mb-2">{{ students[0]?.nom }}</div>
              <div class="text-yellow-600 text-sm mb-4">{{ students[0]?.classe }}</div>
              <div class="bg-black/60 rounded-lg p-4 border-2 border-yellow-600">
                <div class="text-4xl font-bold text-yellow-300">{{ students[0]?.score }}</div>
                <div class="text-xs text-yellow-600">LEGENDARY POINTS</div>
              </div>
              <div class="mt-4 text-xs text-yellow-500">
                <div>XP: {{ students[0]?.xp }}</div>
                <div>Niveau: {{ students[0]?.level }}</div>
              </div>
              <div class="mt-4 flex items-center justify-center gap-2">
                <div class="px-2 py-1 bg-yellow-500/20 rounded text-yellow-400 text-xs">🔥 STREAK: 15</div>
                <div class="px-2 py-1 bg-yellow-500/20 rounded text-yellow-400 text-xs">⚡ COMBO: x3</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3ème Place -->
        <div class="order-3 mt-12">
          <div class="border-2 border-orange-700/50 bg-gradient-to-b from-orange-900/60 to-black/60 backdrop-blur-sm rounded-lg p-6 hover:scale-105 transition-all relative">
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-700 text-white px-4 py-1 rounded-full text-xs font-bold border-2 border-orange-600">
              RANK #3
            </div>
            <div class="text-center">
              <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-600 to-orange-800 flex items-center justify-center text-4xl border-4 border-orange-700 animate-pulse">
                🥉
              </div>
              <div class="text-2xl font-bold text-orange-400 mb-2">{{ students[2]?.nom }}</div>
              <div class="text-orange-700 text-sm mb-3">{{ students[2]?.classe }}</div>
              <div class="bg-black/60 rounded-lg p-3 border border-orange-700">
                <div class="text-3xl font-bold text-orange-400">{{ students[2]?.score }}</div>
                <div class="text-xs text-orange-700">POINTS</div>
              </div>
              <div class="mt-3 text-xs text-orange-600">
                <div>XP: {{ students[2]?.xp }}</div>
                <div>Niveau: {{ students[2]?.level }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Classement complet -->
      <div class="border-2 border-green-500/30 bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl shadow-green-500/10">
        <div class="bg-gradient-to-r from-green-900/60 to-black/60 p-4 border-b border-green-500/30">
          <h2 class="text-xl font-bold text-green-400">
            <span class="text-green-500">[</span> CLASSEMENT GÉNÉRAL <span class="text-green-500">]</span>
          </h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
            <tr class="border-b border-green-500/20 bg-black/40">
              <th class="text-left py-3 px-4 text-green-400 text-xs">RANK</th>
              <th class="text-left py-3 px-4 text-green-400 text-xs">STUDENT_ID</th>
              <th class="text-left py-3 px-4 text-green-400 text-xs">CLASS</th>
              <th class="text-left py-3 px-4 text-green-400 text-xs">SCORE</th>
              <th class="text-left py-3 px-4 text-green-400 text-xs">XP</th>
              <th class="text-left py-3 px-4 text-green-400 text-xs">LVL</th>
              <th class="text-left py-3 px-4 text-green-400 text-xs">BADGES</th>
              <th class="text-left py-3 px-4 text-green-400 text-xs">STATUS</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="(student, idx) in students"
                :key="idx"
                class="border-b border-green-500/10 hover:bg-green-500/5 transition-all group"
                :class="{ 'bg-green-500/10': idx < 3 }"
            >
              <td class="py-4 px-4">
                <div class="flex items-center gap-2">
                    <span
                        :class="[
                        'font-bold text-lg',
                        idx === 0 ? 'text-yellow-400' :
                        idx === 1 ? 'text-gray-400' :
                        idx === 2 ? 'text-orange-600' :
                        'text-green-400'
                      ]"
                    >
                      #{{ idx + 1 }}
                    </span>
                  <span v-if="idx < 3" class="text-xl">
                      {{ idx === 0 ? '👑' : idx === 1 ? '🥈' : '🥉' }}
                    </span>
                </div>
              </td>
              <td class="py-4 px-4">
                <div class="font-bold text-green-300">{{ student.nom }}</div>
                <div class="text-xs text-green-600">ID: {{ student.id }}</div>
              </td>
              <td class="py-4 px-4 text-green-400">{{ student.classe }}</td>
              <td class="py-4 px-4">
                <div class="font-bold text-cyan-400 text-lg">{{ student.score }}</div>
                <div class="w-full bg-black/60 h-1 rounded-full mt-1">
                  <div
                      class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all"
                      :style="{ width: (student.score / students[0].score * 100) + '%' }"
                  ></div>
                </div>
              </td>
              <td class="py-4 px-4 text-purple-400 font-mono">{{ student.xp }}</td>
              <td class="py-4 px-4">
                  <span class="px-2 py-1 bg-green-500/20 rounded text-green-400 text-xs font-bold">
                    {{ student.level }}
                  </span>
              </td>
              <td class="py-4 px-4">
                <div class="flex gap-1">
                  <span v-for="badge in student.badges" :key="badge" class="text-lg">{{ badge }}</span>
                </div>
              </td>
              <td class="py-4 px-4">
                  <span
                      :class="[
                      'px-2 py-1 rounded text-xs font-bold',
                      student.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400 border border-green-500' :
                      'bg-yellow-500/20 text-yellow-400 border border-yellow-500'
                    ]"
                  >
                    {{ student.status }}
                  </span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Footer Terminal -->
      <div class="mt-8 border-2 border-green-500/30 bg-black/40 backdrop-blur-sm rounded-lg p-4">
        <p class="text-green-500 text-sm">
          <span class="text-green-400">$</span> System uptime: 99.9% | Last update: {{ currentTime }} | Data integrity: ✓ VERIFIED
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const currentTime = ref('');
let timeInterval = null;

const students = ref([
  { id: 'STU_2401', nom: 'Sophie Durant', classe: 'Terminale S1', score: 1847, xp: 15420, level: 42, badges: ['🏆', '⚡', '🔥', '💎'], status: 'ACTIVE' },
  { id: 'STU_2402', nom: 'Thomas Martin', classe: 'Terminale S1', score: 1756, xp: 14230, level: 40, badges: ['🥈', '⚡', '🔥'], status: 'ACTIVE' },
  { id: 'STU_2403', nom: 'Emma Rousseau', classe: 'Première ES2', score: 1689, xp: 13670, level: 38, badges: ['🥉', '⚡'], status: 'ACTIVE' },
  { id: 'STU_2404', nom: 'Lucas Bernard', classe: 'Terminale L', score: 1623, xp: 13120, level: 37, badges: ['⭐', '🔥'], status: 'ACTIVE' },
  { id: 'STU_2405', nom: 'Chloé Petit', classe: 'Seconde A', score: 1567, xp: 12450, level: 35, badges: ['⭐'], status: 'ACTIVE' },
  { id: 'STU_2406', nom: 'Hugo Dubois', classe: 'Terminale S1', score: 1498, xp: 11890, level: 34, badges: ['⭐'], status: 'ACTIVE' },
  { id: 'STU_2407', nom: 'Léa Moreau', classe: 'Première ES2', score: 1432, xp: 11234, level: 32, badges: ['🎯'], status: 'ACTIVE' },
  { id: 'STU_2408', nom: 'Nathan Laurent', classe: 'Terminale L', score: 1389, xp: 10876, level: 31, badges: ['🎯'], status: 'IDLE' },
  { id: 'STU_2409', nom: 'Camille Simon', classe: 'Seconde A', score: 1345, xp: 10345, level: 30, badges: ['🎯'], status: 'ACTIVE' },
  { id: 'STU_2410', nom: 'Arthur Leroy', classe: 'Terminale S1', score: 1298, xp: 9876, level: 29, badges: [], status: 'ACTIVE' }
]);

const averageScore = computed(() => {
  const sum = students.value.reduce((acc, s) => acc + s.score, 0);
  return Math.round(sum / students.value.length);
});

const completionRate = computed(() => {
  return Math.round((students.value.filter(s => s.status === 'ACTIVE').length / students.value.length) * 100);
});

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

onMounted(() => {
  updateTime();
  timeInterval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval);
  }
});
</script>

<style scoped>
@keyframes scan {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

.animate-scan {
  animation: scan 8s linear infinite;
}

.glitch {
  position: relative;
  text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
  -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
  0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  animation: glitch 500ms infinite;
}

@keyframes glitch {
  0% {
    text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
    -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
    0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  }
  14% {
    text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
    -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
    0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  }
  15% {
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
    0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
    -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  49% {
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
    0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
    -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  50% {
    text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
    0.05em 0 0 rgba(0, 255, 0, 0.75),
    0 -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  99% {
    text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
    0.05em 0 0 rgba(0, 255, 0, 0.75),
    0 -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  100% {
    text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
    -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
    -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
}
</style>