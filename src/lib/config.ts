//  Copyright (C) 2025 Nethesis S.r.l.
//  SPDX-License-Identifier: GPL-3.0-or-later

////
// export const getStandaloneApiEndpoint = () => {
//   if (!isStandaloneMode()) {
//     // a controller is managing this unit
//     return getUnitManagementApiEndpoint()
//   }

//   if (import.meta.env.DEV) {
//     // standalone development environment

//     const apiScheme = import.meta.env.VITE_API_SCHEME
//     const standaloneApiHost = import.meta.env.VITE_STANDALONE_API_HOST
//     return `${apiScheme}://${standaloneApiHost}/api`
//   } else {
//     // standalone production environment

//     return (
//       window.location.protocol +
//       '//' +
//       window.location.hostname +
//       (window.location.port ? ':' + window.location.port : '') +
//       '/api'
//     )
//   }
// }

export const getProductName = () => {
  return 'My Nethesis' ////
}

////
// export const getProductUrl = () => {
//   // @ts-expect-error branding.js should be always be present
//   return window.BRANDING.PRODUCT_URL
// }

// ////
// export const getCompanyName = () => {
//   // @ts-expect-error branding.js should be always be present
//   return window.BRANDING.COMPANY_NAME
// }

// ////
// export const getCompanyUrl = () => {
//   // @ts-expect-error branding.js should be always be present
//   return window.BRANDING.COMPANY_URL
// }

// ////
// export const getDocsUrl = () => {
//   // @ts-expect-error branding.js should be always be present
//   return window.BRANDING.DOCS_URL
// }

// ////
// export const getHelpdeskUrl = () => {
//   // @ts-expect-error branding.js should be always be present
//   return window.BRANDING.HELPDESK_URL
// }

// ////
// export const getPrivacyPolicyUrl = () => {
//   // @ts-expect-error branding.js should be always be present
//   return window.BRANDING.PRIVACY_POLICY_URL
// }
