<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import LineSidebar from './components/LineSidebar.vue'
import FooterSection from './components/FooterSection.vue'
import { useTheme } from './composables/useTheme'

const { isDark } = useTheme()
const router = useRouter()
const route = useRoute()

const navItems = [
  'About',
  'Experience',
  'Projects',
  'Technologies',
  'Certifications',
  "Let's Talk",
]

const sectionIds = [
  'about',
  'experience',
  'projects',
  'technologies',
  'certifications',
  'contact',
]

const routeMap: Record<string, number> = {
  '/about-more': 0,
  '/experience': 1,
  '/projects': 2,
  '/technologies': 3,
  '/certifications': 4,
  '/contact': 5,
}

const currentScrollIndex = ref(0)

const activeNav = computed(() => {
  if (route.path !== '/') {
    return routeMap[route.path] ?? 0
  }
  return currentScrollIndex.value
})

const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleNavClick = (index: number) => {
  const targetId = sectionIds[index]
  if (!targetId) return

  if (route.path !== '/') {
    router.push('/').then(() => {
      setTimeout(() => {
        scrollToSection(targetId)
      }, 150)
    })
  } else {
    currentScrollIndex.value = index
    scrollToSection(targetId)
  }
}

const updateActiveOnScroll = () => {
  if (route.path !== '/') return

  const threshold = window.scrollY + (window.innerHeight * 0.35)
  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const id = sectionIds[i]
    if (!id) continue
    const el = document.getElementById(id)
    if (el && el.offsetTop <= threshold) {
      currentScrollIndex.value = i
      break
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateActiveOnScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveOnScroll)
})

watch(() => route.path, (newPath) => {
  if (newPath === '/') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    currentScrollIndex.value = 0
  }
})
</script>

<template>
  <div id="app" class="app-layout">
    <NavBar />

    <!-- Fixed left sidebar -->
    <aside class="sidebar-shell">
      <div class="sidebar-nav-wrap">
        <LineSidebar
          :items="navItems"
          :accent-color="isDark ? '#f6f6f6' : '#18181c'"
          :text-color="isDark ? 'rgba(246, 246, 246, 0.45)' : 'rgba(24, 24, 28, 0.45)'"
          :marker-color="isDark ? 'rgba(246, 246, 246, 0.25)' : 'rgba(24, 24, 28, 0.25)'"
          :show-index="true"
          :show-marker="true"
          :proximity-radius="200"
          :max-shift="65"
          falloff="smooth"
          :marker-length="110"
          :marker-gap="0"
          :tick-scale="0.5"
          :scale-tick="true"
          :item-gap="48"
          :font-size="1.85"
          :smoothing="70"
          :default-active="activeNav"
          @item-click="handleNavClick"
        />
      </div>

      <FooterSection class="sidebar-footer" />
    </aside>

    <!-- Routed view content -->
    <main class="main-content typeset">
      <router-view />
      <FooterSection class="mobile-footer" />
    </main>
  </div>
</template>

<style scoped>
/* ── Layout shell ──────────────────────────────────────────── */
.app-layout {
  display: flex;
  min-height: 100vh;
}

/* ── Fixed sidebar ─────────────────────────────────────────── */
.sidebar-shell {
  position: fixed;
  top: 0;
  left: 0;
  width: 380px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px 0 36px 0;
  box-sizing: border-box;
  z-index: 100;
  background: var(--sidebar-gradient);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.sidebar-nav-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  width: 100%;
}

.sidebar-footer {
  padding-left: 30px;
  padding-right: 24px;
}

.sidebar-logo {
  position: absolute;
  top: 36px;
  left: 40px;
  font-family: var(--font-mono);
  font-size: 17px;
  font-weight: 500;
  color: var(--text-primary);
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 8px 18px;
  border-radius: var(--radius-sm);
  letter-spacing: 0.1em;
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s;
}
.sidebar-logo:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* ── Main scrollable area ──────────────────────────────────── */
.main-content {
  margin-left: 380px;
  width: calc(100vw - 380px);
  min-width: 0;
  box-sizing: border-box;
}

.mobile-footer {
  display: none;
}

/* ── Logo strip ────────────────────────────────────────────── */
.logoloop-section {
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow: hidden;
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
}

/* ── Mobile: hide sidebar, go back to stacked ──────────────── */
@media (max-width: 700px) {
  .sidebar-shell {
    display: none;
  }
  .main-content {
    margin-left: 0;
    width: 100vw;
  }
  .mobile-footer {
    display: flex;
    padding: 44px 24px 36px;
    border-top: 1px solid var(--border-subtle);
  }
}
</style>
