<!--
  Copyright (C) 2025 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import type { LoggedUser } from '@/stores/login'
import {
  faArrowUpRightFromSquare,
  faAward,
  faCrown,
  faHeadset,
  faShop,
  faWarehouse,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useLogto } from '@logto/vue'
import { NeBadge, NeButton, NeCard, NeHeading, NeRoundedIcon } from '@nethesis/vue-components'
import { onMounted, ref } from 'vue'

const { signIn, signOut, isAuthenticated, getIdTokenClaims } = useLogto() ////
const user = ref<LoggedUser>()
const onClickSignIn = () => signIn('http://localhost:5173/login-redirect')
const onClickSignOut = () => signOut('http://localhost:5173/')

onMounted(async () => {
  if (isAuthenticated.value) {
    console.time('asdf') ////

    //// use pinia colada query?
    const claims = await getIdTokenClaims()

    console.timeEnd('asdf') ////

    console.log('claims', claims) ////

    const username = claims?.username || ''
    const name = claims?.name || claims?.username || ''
    user.value = { username, name }
  }
})
</script>

<template>
  <div>
    <NeHeading tag="h3" class="mb-7">{{ $t('dashboard.title') }}</NeHeading>
    <div class="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
      <!-- logged user -->
      <NeCard>
        <div class="flex items-start gap-5">
          <!-- <div class="size-12 shrink-0 rounded-full bg-gray-500"></div> //// -->
          <NeRoundedIcon
            :customIcon="faCrown"
            customBackgroundClasses="bg-gray-200 dark:bg-gray-800"
            customForegroundClasses="text-gray-700 dark:text-gray-50"
            class="size-12! shrink-0"
          />
          <div class="flex flex-col gap-2">
            <NeHeading tag="h5">
              {{ $t('dashboard.welcome_user', { user: user?.name || user?.username }) }}
            </NeHeading>
            <!-- //// dynamic according to role -->
            <NeBadge text="Nethesis" :icon="faAward" kind="primary" size="xs" />
          </div>
        </div>
      </NeCard>
      <!-- spacing -->
      <div class="hidden sm:block"></div>
      <div class="hidden xl:block"></div>
      <div class="hidden xl:block"></div>
      <!-- warehouse -->
      <NeCard>
        <div class="flex flex-col justify-between gap-4">
          <div class="flex flex-col items-start gap-3">
            <div class="flex items-center gap-3">
              <NeRoundedIcon
                :customIcon="faWarehouse"
                customBackgroundClasses="bg-indigo-100 dark:bg-indigo-800"
                customForegroundClasses="text-indigo-700 dark:text-indigo-50"
              />
              <NeHeading tag="h6">
                {{ $t('dashboard.warehouse') }}
              </NeHeading>
            </div>
            <p>
              {{ $t('dashboard.warehouse_description') }} Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <NeButton kind="secondary" class="bottom-5 self-end">
            <template #prefix>
              <FontAwesomeIcon :icon="faArrowUpRightFromSquare" aria-hidden="true" />
            </template>
            {{ $t('common.open_page', { page: $t('dashboard.warehouse') }) }}
          </NeButton>
        </div>
      </NeCard>
      <!-- nethshop -->
      <NeCard>
        <div class="flex h-full flex-col justify-between gap-4">
          <div class="flex flex-col items-start gap-3">
            <div class="flex items-center gap-3">
              <NeRoundedIcon
                :customIcon="faShop"
                customBackgroundClasses="bg-indigo-100 dark:bg-indigo-800"
                customForegroundClasses="text-indigo-700 dark:text-indigo-50"
              />
              <NeHeading tag="h6">
                {{ $t('dashboard.nethshop') }}
              </NeHeading>
            </div>
            <p>
              {{ $t('dashboard.nethshop_description') }}
            </p>
          </div>
          <NeButton kind="secondary" class="self-end">
            <template #prefix>
              <FontAwesomeIcon :icon="faArrowUpRightFromSquare" aria-hidden="true" />
            </template>
            {{ $t('common.open_page', { page: $t('dashboard.nethshop') }) }}
          </NeButton>
        </div>
      </NeCard>
      <!-- helpdesk -->
      <NeCard>
        <div class="flex flex-col items-start gap-3">
          <div class="flex items-center gap-3">
            <NeRoundedIcon
              :customIcon="faHeadset"
              customBackgroundClasses="bg-indigo-100 dark:bg-indigo-800"
              customForegroundClasses="text-indigo-700 dark:text-indigo-50"
            />
            <NeHeading tag="h6">
              {{ $t('dashboard.helpdesk') }}
            </NeHeading>
          </div>
          <p>
            {{ $t('dashboard.helpdesk_description') }}
          </p>
          <NeButton kind="secondary" class="self-end">
            <template #prefix>
              <FontAwesomeIcon :icon="faArrowUpRightFromSquare" aria-hidden="true" />
            </template>
            {{ $t('common.open_page', { page: $t('dashboard.helpdesk') }) }}
          </NeButton>
        </div>
      </NeCard>
      <!-- training portal -->
      <NeCard>
        <div class="flex flex-col items-start gap-3">
          <div class="flex items-center gap-3">
            <NeRoundedIcon
              :customIcon="faHeadset"
              customBackgroundClasses="bg-indigo-100 dark:bg-indigo-800"
              customForegroundClasses="text-indigo-700 dark:text-indigo-50"
            />
            <NeHeading tag="h6">
              {{ $t('dashboard.training_portal') }}
            </NeHeading>
          </div>
          <p>
            {{ $t('dashboard.training_portal_description') }}
          </p>
          <NeButton kind="secondary" class="self-end">
            <template #prefix>
              <FontAwesomeIcon :icon="faArrowUpRightFromSquare" aria-hidden="true" />
            </template>
            {{ $t('common.open_page', { page: $t('dashboard.training_portal') }) }}
          </NeButton>
        </div>
      </NeCard>
    </div>
  </div>
</template>

<style scoped></style>
