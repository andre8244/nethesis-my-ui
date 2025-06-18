<!--
  Copyright (C) 2025 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { useLoginStore } from '@/stores/login'
import { getPreference, savePreference } from '@nethesis/vue-components'
import isEmpty from 'lodash/isEmpty'
import { onMounted, ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faHouse as fasHouse,
  faGear as fasGear,
  faChevronUp,
  faChevronDown,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { faHouse as falHouse, faGear as falGear } from '@nethesis/nethesis-light-svg-icons'

//// review

type MenuItem = {
  name: string
  to: string
  solidIcon?: IconDefinition
  lightIcon?: IconDefinition
  children?: MenuItem[]
}

const { t } = useI18n()
const route = useRoute()
const loginStore = useLoginStore()

const menuExpanded: Ref<Record<string, boolean>> = ref({
  test: false, ////
  // system: false, ////
  // network: false,
  // 'users-objects': false,
  // firewall: false,
  // security: false,
  // vpn: false,
  // monitoring: false,
})

//// don't use string icons
const navigation: Ref<MenuItem[]> = ref([
  { name: 'dashboard.title', to: 'dashboard', solidIcon: fasHouse, lightIcon: falHouse },
  {
    name: 'test.title',
    to: 'test',
    solidIcon: fasGear,
    lightIcon: falGear,
    children: [
      {
        name: 'subtest.title',
        to: 'test/subtest',
      },
      // { ////
      //   name: 'netify_informatics.title',
      //   to: 'monitoring/netify-informatics',
      // },
      // {
      //   name: 'ping_latency_monitor.title',
      //   to: 'monitoring/ping-latency-monitor',
      // },
    ],
  },
  // { ////
  //   name: 'system.title',
  //   icon: 'server',
  //   to: 'system',
  //   children: [
  //     { name: 'subscription.title', to: 'system/subscription' },
  //     {
  //       name: 'system_settings.title',
  //       to: 'system/systemSettings',
  //     },
  //     { name: 'ssh.title', to: 'system/ssh' },
  //     {
  //       name: 'backup_and_restore.title',
  //       to: 'system/backup-and-restore',
  //     },
  //     {
  //       name: 'reboot_and_shutdown.title',
  //       to: 'system/reboot-and-shutdown',
  //     },
  //     {
  //       name: 'update.title',
  //       to: 'system/update',
  //     },
  //     {
  //       name: 'storage.title',
  //       to: 'system/storage',
  //     },
  //     {
  //       name: 'factory_reset.title',
  //       to: 'system/factory_reset',
  //     },
  //     {
  //       name: 'certificates.title',
  //       to: 'system/certificates',
  //     },
  //     {
  //       name: 'controller.title',
  //       to: 'system/controller',
  //     },
  //   ],
  // },
])

onMounted(() => {
  // wait for route.path //// todo use route watch instead
  setTimeout(() => {
    loadMenuItemsExpanded()
  }, 500)
})

function isCurrentRoute(itemPath: string) {
  return route.path.includes(itemPath)
}

function toggleExpand(menuItem: MenuItem) {
  const newValue = !menuExpanded.value[menuItem.to]
  menuExpanded.value[menuItem.to] = newValue
  savePreference(`${menuItem.to}MenuExpanded`, newValue, loginStore.username)
}

function loadMenuItemsExpanded() {
  for (const menuName of Object.keys(menuExpanded.value)) {
    const isMenuExpanded = getPreference(`${menuName}MenuExpanded`, loginStore.username)

    if (isMenuExpanded || isCurrentRoute(menuName)) {
      menuExpanded.value[menuName] = true
    }
  }
}
</script>

<template>
  <li v-for="item in navigation" :key="item.name">
    <!-- simple link -->
    <template v-if="isEmpty(item.children)">
      <router-link
        :to="`/${item.to}`"
        :class="[
          isCurrentRoute(item.to)
            ? 'border-primary-700 dark:border-primary-500 border-l-4 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
            : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50',
          'group flex cursor-pointer items-center gap-x-3 rounded-md px-3 py-2 text-sm leading-6 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800',
        ]"
      >
        <FontAwesomeIcon
          :icon="isCurrentRoute(item.to) ? item.solidIcon! : item.lightIcon!"
          class="h-6 w-8 shrink-0"
          aria-hidden="true"
        />
        {{ t(item.name) }}
      </router-link>
    </template>
    <!-- open submenu -->
    <template v-else>
      <a
        :class="[
          isCurrentRoute(item.to)
            ? 'text-gray-900 dark:text-gray-50'
            : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50',
          'group flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm leading-6 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800',
        ]"
        @click="toggleExpand(item)"
      >
        <div class="flex items-center gap-x-3">
          <FontAwesomeIcon
            :icon="isCurrentRoute(item.to) ? item.solidIcon! : item.lightIcon!"
            class="h-6 w-8 shrink-0"
            aria-hidden="true"
          />
          <span>
            {{ t(item.name) }}
          </span>
        </div>
        <FontAwesomeIcon
          :icon="menuExpanded[item.to] ? faChevronUp : faChevronDown"
          class="ml-2 h-3 w-3 shrink-0"
          aria-hidden="true"
        />
      </a>
      <Transition name="slide-down">
        <ul v-show="menuExpanded[item.to]" role="list" class="mt-2 space-y-1">
          <li v-for="child in item.children" :key="child.name">
            <div class="ml-10">
              <router-link
                :to="`/${child.to}`"
                :class="[
                  isCurrentRoute(child.to)
                    ? 'border-primary-700 dark:border-primary-500 border-l-4 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50',
                  'group flex cursor-pointer items-center gap-x-3 rounded-md px-3 py-1 text-sm leading-6 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800',
                ]"
              >
                {{ t(child.name) }}
              </router-link>
            </div>
          </li>
        </ul>
      </Transition>
    </template>
  </li>
</template>
