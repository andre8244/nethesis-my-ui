<!--
  Copyright (C) 2025 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { NeHeading, NeButton } from '@nethesis/vue-components'
import { PRODUCT_NAME, LOGIN_REDIRECT_URI } from '@/lib/config'
import { useLogto } from '@logto/vue'
import LoginLogo from '@/assets/login_logo.svg'
import LogoLight from '@/assets/logo_light.svg'
import LogoDark from '@/assets/logo_dark.svg'
import Loader from '@/assets/loader.svg'
import { computed, onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightToBracket'

//// review

// const loginStore = useLoginStore() ////
const themeStore = useThemeStore()
const { signIn, signOut, isAuthenticated, fetchUserInfo } = useLogto()

const logoFile = computed(() => {
  if (themeStore.isLight) {
    return LogoLight
  } else {
    return LogoDark
  }
})

onMounted(() => {
  if (!isAuthenticated.value) {
    signIn(LOGIN_REDIRECT_URI)
  }
})

const login = () => signIn(LOGIN_REDIRECT_URI)
</script>

<template>
  <div class="bg-primary-600 fixed top-0 left-0 h-screen w-screen">
    <div class="flex h-full flex-col items-center justify-center">
      <!-- loader -->
      <img class="animate-spin-relaxed mb-14 h-16 w-16" :src="Loader" alt="" aria-hidden="true" />
      <!-- logo -->
      <img :src="LoginLogo" alt="" aria-hidden="true" class="mb-14 h-14" />
      <!-- <p>{{ $t('login.finish_message') }}</p> ////  -->
    </div>
  </div>
  <!-- //// -->
  <!-- <div class="flex h-screen min-h-full flex-1 bg-gray-200 dark:bg-gray-950">
    <div
      class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-md">
        <div
          class="flex flex-col items-center bg-gray-50 px-6 py-12 shadow sm:rounded-lg sm:px-12 dark:bg-gray-900"
        >
          <img class="mb-4 h-8 w-auto" :src="logoFile" :alt="`${PRODUCT_NAME} logo`" />
          <NeHeading tag="h4" class="mb-2">
            {{ $t('login.welcome_title') }}
          </NeHeading>
          <div class="mb-6 text-sm text-gray-700 dark:text-gray-100">
            {{ $t('login.welcome_description', { product: PRODUCT_NAME }) }}
          </div>
          <NeButton kind="primary" size="lg" type="submit" class="w-full" @click.prevent="login">
            <template #prefix>
              <FontAwesomeIcon :icon="faArrowRightToBracket" aria-hidden="true" />
            </template>
            {{ $t('login.sign_in') }}
          </NeButton>
        </div>
      </div>
    </div>
    <div
      class="to-primary-800 relative hidden w-0 flex-1 items-center justify-center bg-linear-to-t from-gray-950 lg:flex"
    >
      <img
        :src="LoginLogo"
        :alt="`${PRODUCT_NAME} logo`"
        class="3xl:w-1/3 5xl:w-1/4 w-2/3 xl:w-2/5"
      />
    </div>
  </div> -->
</template>
