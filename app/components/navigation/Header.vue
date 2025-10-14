<script setup lang="ts">
const items = ref([
  [
    {
      label: 'Benjamin',
      avatar: {
        src: 'https://github.com/benjamincanac.png'
      },
      type: 'label'
    }
  ],
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user'
    },
    {
      label: 'Billing',
      icon: 'i-lucide-credit-card'
    },
    {
      label: 'Settings',
      icon: 'i-lucide-cog',
      kbds: [',']
    },
    {
      label: 'Keyboard shortcuts',
      icon: 'i-lucide-monitor'
    }
  ],
  [
    {
      label: 'Team',
      icon: 'i-lucide-users'
    },
    {
      label: 'Invite users',
      icon: 'i-lucide-user-plus',
      children: [
        [
          {
            label: 'Email',
            icon: 'i-lucide-mail'
          },
          {
            label: 'Message',
            icon: 'i-lucide-message-square'
          }
        ],
        [
          {
            label: 'More',
            icon: 'i-lucide-circle-plus'
          }
        ]
      ]
    },
    {
      label: 'New team',
      icon: 'i-lucide-plus',
      kbds: ['meta', 'n']
    }
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/nuxt/ui',
      target: '_blank'
    },
    {
      label: 'Support',
      icon: 'i-lucide-life-buoy',
      to: '/docs/components/dropdown-menu'
    },
    {
      label: 'API',
      icon: 'i-lucide-cloud',
      disabled: true
    }
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      kbds: ['shift', 'meta', 'q']
    }
  ]
])
</script>

<template>
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
        <button
            class="p-2 flex items-center hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all border border-slate-200 dark:border-slate-700">
          <Icon name="lucide:search" class="w-5 h-5 text-slate-600 dark:text-slate-300"/>
        </button>
        <button
            class="p-2 flex items-center hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all border border-slate-200 dark:border-slate-700">
          <Icon name="lucide:filter" class="w-5 h-5 text-slate-600 dark:text-slate-300"/>
        </button>


        <UModal title="Modal with title">
          <UButton
              label="Open"
              class="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1.5 rounded-lg hover:shadow-lg transition-all">
            <Icon name="lucide:plus" class="w-5 h-5"/>
            <span class="font-medium">Nouveau challenge</span>
          </UButton>

          <template #body>
            <Placeholder class="h-48 m-4"/>
          </template>
        </UModal>
        <UDropdownMenu :items="items">
          <UAvatar src="https://github.com/benjamincanac.png" size="lg"/>
        </UDropdownMenu>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>