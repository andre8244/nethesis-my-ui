<!--
  Copyright (C) 2025 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
// import { useNotificationsStore } from '@/stores/notifications' ////
import { NeDropdown, NeTooltip } from '@nethesis/vue-components'
import { computed, ref } from 'vue'
import { useThemeStore } from '@/stores/theme'
import {
  faBars,
  faBell,
  faChevronDown,
  faCircleUser,
  faMoon,
  faRightFromBracket,
  faSun,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useI18n } from 'vue-i18n'
import { useLogto } from '@logto/vue'
import { SIGN_OUT_REDIRECT_URI } from '@/lib/config'

const emit = defineEmits(['openSidebar'])

const { t } = useI18n()
// const loginStore = useLoginStore() ////
const themeStore = useThemeStore()
const { signIn, signOut, isAuthenticated } = useLogto()
// const notificationsStore = useNotificationsStore() ////

const topBarButtonsColorClasses =
  'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50'
const shakeNotificationsIcon = ref(false)

const accountMenuOptions = computed(() => {
  return [
    //   {
    //     id: 'account',
    //     label: t('shell.account_settings'),
    //     icon: faCircleUser,
    //     action: () => router.push('/standalone/account'),
    //   },
    {
      id: 'theme',
      label: t('shell.toggle_theme'),
      icon: themeStore.isLight ? faMoon : faSun,
      action: themeStore.toggleTheme,
    },
    {
      id: 'logout',
      label: t('shell.sign_out'),
      icon: faRightFromBracket,
      action: () => signOut(SIGN_OUT_REDIRECT_URI),
    },
  ]
})

//// uncomment
// watch(
//   () => notificationsStore.numNotifications,
//   (newNum, oldNum) => {
//     if (newNum > oldNum) {
//       // briefly shake notifications icon
//       setTimeout(() => {
//         shakeNotificationsIcon.value = true
//       }, 700)

//       setTimeout(() => {
//         shakeNotificationsIcon.value = false
//       }, 2700)
//     }
//   },
// )

function openNotificationsDrawer() {
  // notificationsStore.setNotificationDrawerOpen(true) ////
}
</script>

<template>
  <div
    class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 dark:border-gray-700 dark:bg-gray-950"
  >
    <button
      type="button"
      class="-m-2.5 p-2.5 text-gray-600 hover:text-gray-900 lg:hidden dark:text-gray-300 dark:hover:text-gray-50"
      @click="emit('openSidebar')"
    >
      <span class="sr-only">{{ $t('shell.open_sidebar') }}</span>
      <FontAwesomeIcon :icon="faBars" class="h-6 w-6 shrink-0" aria-hidden="true" />
    </button>

    <!-- Separator -->
    <div class="h-6 w-px bg-gray-200 lg:hidden dark:bg-gray-700" aria-hidden="true" />

    <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
      <div class="relative flex flex-1 items-center">
        <!-- global search -->
        <!-- //// remove -->
        <div v-if="isAuthenticated" class="text-green-600">logged in</div>
        <div v-else class="text-amber-600">logged out</div>
      </div>
      <!-- unsaved changes button -->
      <div class="flex items-center gap-x-4 lg:gap-x-6">
        <!-- separator -->
        <div
          class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:lg:bg-gray-700"
          aria-hidden="true"
        />

        <!-- help -->
        <!-- <NeTooltip trigger-event="mouseenter focus" placement="bottom">
          <template #trigger>
            <a
              href="https://docs.nethsecurity.org/"
              target="_blank"
              rel="noreferrer"
              :class="['-m-2.5 flex items-center gap-3 p-2.5', topBarButtonsColorClasses]"
            >
              <FontAwesomeIcon
                :icon="faCircleQuestion"
                class="h-6 w-6 shrink-0"
                aria-hidden="true"
              />
            </a>
          </template>
          <template #content>
            {{ $t('shell.help') }}
          </template>
        </NeTooltip> //// -->

        <!-- notifications -->
        <NeTooltip trigger-event="mouseenter focus" placement="bottom">
          <template #trigger>
            <button
              type="button"
              :class="['-m-2.5 flex p-2.5', topBarButtonsColorClasses]"
              @click="openNotificationsDrawer"
            >
              <span class="sr-only">{{ $t('shell.show_notifications') }}</span>
              <FontAwesomeIcon
                :icon="faBell"
                :class="['h-6 w-6 shrink-0', { 'fa-shake': shakeNotificationsIcon }]"
                style="--fa-animation-duration: 2s"
                aria-hidden="true"
              />
            </button>
          </template>
          <template #content>
            {{ $t('notifications.title') }}
          </template>
        </NeTooltip>

        <!-- account dropdown -->
        <NeTooltip trigger-event="mouseenter focus" placement="bottom">
          <template #trigger>
            <NeDropdown
              :items="accountMenuOptions"
              :align-to-right="true"
              :open-menu-aria-label="$t('shell.open_account_menu')"
              menu-classes="z-150!"
            >
              <template #button>
                <button type="button" :class="['-m-2.5 flex p-2.5', topBarButtonsColorClasses]">
                  <div class="flex items-center gap-2">
                    <FontAwesomeIcon
                      :icon="faCircleUser"
                      class="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    <FontAwesomeIcon
                      :icon="faChevronDown"
                      class="h-3 w-3 shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                </button>
              </template>
            </NeDropdown>
          </template>
          <template #content>
            {{ $t('shell.account') }}
          </template>
        </NeTooltip>
      </div>
    </div>
  </div>
</template>
