<!--
  Copyright (C) 2025 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { useLoginStore } from '@/stores/login'
import { ref, watch } from 'vue'
import axios from 'axios'
import { API_URL } from '@/lib/config'

const loginStore = useLoginStore()

const resellers = ref([])

//// remove after installing pinia-colada?
watch(
  () => loginStore.jwtToken,
  async (jwtToken) => {
    if (jwtToken) {
      //// use pinia-colada
      const res = await axios.get(`${API_URL}/resellers`, {
        headers: { Authorization: `Bearer ${loginStore.jwtToken}` },
      })
      console.log('get resellers, res', res) ////

      resellers.value = res.data.data.resellers
    }
  },
  { immediate: true },
)
</script>

<template>
  <div>resellers ////</div>
  <div>{{ resellers }}</div>
</template>
