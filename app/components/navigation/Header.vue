<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const userStore = useAuthStore()

const { user } = storeToRefs(userStore)

const items = ref<DropdownMenuItem[]>([
  [
    {
      label: user.value?.firstName,
      avatar: {
        src: 'https://img.freepik.com/premium-photo/software-engineer-digital-avatar-generative-ai_934475-8997.jpg'
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
      label: 'Settings',
      icon: 'i-lucide-cog',
      kbds: [',']
    },
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
      label: 'YPareo',
      icon: 'i-lucide-cloud',
      to: "https://iticparis.ymag.cloud/",
      target: '_blank'
    }
  ],
  [
    {
      label: 'Déconnexion',
      icon: 'i-lucide-log-out',
      onSelect() {
        useLogout()
      }
    }
  ]
])

</script>

<template>
  <header class="mb-8">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Bienvenue, Professeur {{ user?.fullName }}</h2>
        <NuxtTime
            :datetime="Date.now()"
            weekday="long"
            month="long"
            day="numeric"
            year="numeric"
            locale="fr"
            class="capitalize text-slate-600 dark:text-slate-400"
        />

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

        <ModalsAssignmentForm />

        <UDropdownMenu :items="items">
          <UAvatar src="https://img.freepik.com/premium-photo/software-engineer-digital-avatar-generative-ai_934475-8997.jpg" size="lg"/>
        </UDropdownMenu>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>