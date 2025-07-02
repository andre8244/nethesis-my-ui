<!--
  Copyright (C) 2025 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { NeHeading } from '@nethesis/vue-components'
import DistributorsTable from '@/components/distributors/DistributorsTable.vue'

// const loginStore = useLoginStore() ////

////
// const { state: distributors } = useQuery({
//   key: ['distributors'],
//   enabled: !!loginStore.jwtToken,
//   query: getDistributors,
// })

// const distributors = ref([]) ////

//// remove after installing pinia-colada?
// watch( ////
//   () => loginStore.jwtToken,
//   async (jwtToken) => {
//     if (jwtToken) {
//       //// use pinia-colada
//       const res = await axios.get(`${API_URL}/distributors`, {
//         headers: { Authorization: `Bearer ${loginStore.jwtToken}` },
//       })
//       console.log('get distributors, res', res) ////

//       distributors.value = res.data.data.distributors
//     }
//   },
//   { immediate: true },
// )
</script>

<template>
  <div>
    <NeHeading tag="h3" class="mb-7">{{ $t('distributors.title') }}</NeHeading>
    <div class="mb-6 max-w-2xl text-gray-500 dark:text-gray-400">
      {{ $t('distributors.page_description') }}
    </div>
    <DistributorsTable />
  </div>
</template>
