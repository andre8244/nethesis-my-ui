//  Copyright (C) 2025 Nethesis S.r.l.
//  SPDX-License-Identifier: GPL-3.0-or-later

import axios from 'axios'
import { API_URL } from './config'
import { useLoginStore } from '@/stores/login'
import * as v from 'valibot'

//// generate type from valibot schema
// export type Distributor = {
//   id: string
//   name: string
//   description: string
//   branding: {
//     darkFavicon: string
//     darkLogoUrl: string
//     favicon: string
//     logoUrl: string
//   }
//   customData: {
//     address: string
//     city: string
//     codiceFiscale: string
//     contactPerson: string
//     createdAt: string
//     createdBy: string
//     email: string
//     partitaIva: string
//     phone: string
//     region: string
//     territory: string[]
//     type: 'distributor'
//     website: string
//   }
//   type: 'distributor'
//   isMfaRequired: boolean
// }

//// check attributes
export const DistributorSchema = v.object({
  id: v.optional(v.string()),
  name: v.pipe(v.string(), v.nonEmpty('distributors.name_required')),
  description: v.optional(v.string()),
  branding: v.optional(
    v.object({
      darkFavicon: v.string(),
      darkLogoUrl: v.string(),
      favicon: v.string(),
      logoUrl: v.string(),
    }),
  ),
  customData: v.optional(
    v.object({
      address: v.optional(v.string()),
      city: v.optional(v.string()),
      codiceFiscale: v.optional(v.string()),
      contactPerson: v.optional(v.string()),
      createdAt: v.optional(v.string()),
      createdBy: v.optional(v.string()),
      email: v.optional(v.string()),
      partitaIva: v.optional(v.string()),
      phone: v.optional(v.string()),
      region: v.optional(v.string()),
      territory: v.optional(v.array(v.string())),
      // type: v.literal('distributor'), ////
      website: v.optional(v.string()),
    }),
  ),
  // type: v.literal('distributor'), ////
  isMfaRequired: v.optional(v.boolean()),
})

export type Distributor = v.InferOutput<typeof DistributorSchema>

export const getDistributors = () => {
  console.log('getDistributors') ////

  const loginStore = useLoginStore()

  return axios
    .get(`${API_URL}/distributors`, {
      headers: { Authorization: `Bearer ${loginStore.jwtToken}` },
    })
    .then((res) => res.data.data.distributors as Distributor[])
}

export const postDistributor = (distributor: Distributor) => {
  console.log('postDistributor', distributor) ////

  const loginStore = useLoginStore()

  return axios.post(`${API_URL}/distributors`, distributor, {
    headers: { Authorization: `Bearer ${loginStore.jwtToken}` },
  })
}

export const putDistributor = (distributor: Distributor) => {
  console.log('putDistributor', distributor) ////

  const loginStore = useLoginStore()

  return axios.put(`${API_URL}/distributors/${distributor.id}`, distributor, {
    headers: { Authorization: `Bearer ${loginStore.jwtToken}` },
  })
}
