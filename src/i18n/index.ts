import { createI18n } from 'vue-i18n'

export const SUPPORTED_LOCALES = ['en', 'it']
const DEFAULT_LOCALE = 'en'

// Detect browser language
function getBrowserLocale() {
  const navigatorLocale =
    navigator.languages !== undefined ? navigator.languages[0] : navigator.language

  if (!navigatorLocale) {
    return DEFAULT_LOCALE
  }

  // Extract language code (e.g., 'en-US' -> 'en')
  const locale = navigatorLocale.split('-')[0].toLowerCase()

  // Check if the detected locale is supported
  return SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE
}

// Initialize i18n with detected locale
const i18n = createI18n({
  locale: getBrowserLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  availableLocales: SUPPORTED_LOCALES,
  legacy: false, // use composition API mode
  // globalInjection: true, // enable global $t ////
  messages: {}, // start empty, load dynamically
})

// Dynamic locale loading
export async function loadLocaleMessages(locale: string) {
  // Check if already loaded
  if (i18n.global.availableLocales.includes(locale)) {
    return Promise.resolve()
  }

  try {
    // Dynamic import of locale file
    const messages = await import(`./${locale}/translation.json`)
    i18n.global.setLocaleMessage(locale, messages.default)
    return Promise.resolve()
  } catch (error) {
    console.warn(`Failed to load locale ${locale}:`, error)
    // Fallback to default locale if current locale fails
    if (locale !== DEFAULT_LOCALE) {
      return loadLocaleMessages(DEFAULT_LOCALE)
    }
    return Promise.reject(error)
  }
}

// Function to change locale
export async function setLocale(locale: string) {
  await loadLocaleMessages(locale)
  i18n.global.locale.value = locale

  // Save to localStorage
  // localStorage.setItem('user-locale', locale) ////

  // Update document lang attribute
  document.documentElement.setAttribute('lang', locale)
}

// Load initial locale messages
loadLocaleMessages(i18n.global.locale.value)

export default i18n
