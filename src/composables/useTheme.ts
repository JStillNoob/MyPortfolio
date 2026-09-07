import { ref, computed } from 'vue'

export type ThemeMode = 'system' | 'light' | 'dark'

const themeMode = ref<ThemeMode>('system')
const systemIsDark = ref(true)
let isInitialized = false

export function useTheme() {
  const isDark = computed(() => {
    if (themeMode.value === 'system') {
      return systemIsDark.value
    }
    return themeMode.value === 'dark'
  })

  const isSystem = computed(() => themeMode.value === 'system')

  const applyThemeToDom = (dark: boolean) => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      root.classList.remove('light')
      root.setAttribute('data-theme', 'dark')
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
      root.setAttribute('data-theme', 'light')
    }
  }

  const updateSystemTheme = () => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    systemIsDark.value = media.matches
    if (themeMode.value === 'system') {
      applyThemeToDom(systemIsDark.value)
    }
  }

  const setSystemTheme = () => {
    themeMode.value = 'system'
    localStorage.setItem('theme', 'system')
    updateSystemTheme()
  }

  const toggleTheme = () => {
    const nextIsDark = !isDark.value
    themeMode.value = nextIsDark ? 'dark' : 'light'
    localStorage.setItem('theme', themeMode.value)
    applyThemeToDom(nextIsDark)
  }

  const initTheme = () => {
    if (typeof window === 'undefined' || isInitialized) return
    isInitialized = true

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    systemIsDark.value = media.matches

    media.addEventListener('change', (e) => {
      systemIsDark.value = e.matches
      if (themeMode.value === 'system') {
        applyThemeToDom(e.matches)
      }
    })

    const stored = localStorage.getItem('theme') as ThemeMode | null
    if (stored === 'light' || stored === 'dark') {
      themeMode.value = stored
      applyThemeToDom(stored === 'dark')
    } else {
      themeMode.value = 'system'
      applyThemeToDom(systemIsDark.value)
    }
  }

  return {
    themeMode,
    isDark,
    isSystem,
    setSystemTheme,
    toggleTheme,
    initTheme,
  }
}
