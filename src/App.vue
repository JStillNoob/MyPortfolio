<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from './components/NavBar.vue'
import LineSidebar from './components/LineSidebar.vue'
import { useTheme } from './composables/useTheme'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import EducationSection from './components/EducationSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'
import LogoLoop from './components/LogoLoop.vue'
import type { LogoItem } from './components/LogoLoop.vue'

const { isDark } = useTheme()

const navItems = ['About Jessie', 'My Experience', 'Things Ive Built', 'Projects', 'Skills', 'Contact']
const sectionIds = ['home', 'about', 'education', 'projects', 'skills', 'contact']
const activeNav = ref(0)

const handleNavClick = (index: number) => {
  const id = sectionIds[index]
  if (!id) return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  activeNav.value = index
}

const onScroll = () => {
  const scrollY = window.scrollY + window.innerHeight / 3
  let current = 0
  for (let i = 0; i < sectionIds.length; i++) {
    const id = sectionIds[i]
    if (!id) continue
    const el = document.getElementById(id)
    if (el && el.offsetTop <= scrollY) current = i
  }
  activeNav.value = current
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

// Helper to create a pill badge node string
const badge = (svgPath: string, label: string) =>
  `<span class="logoloop-badge"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">${svgPath}</svg>${label}</span>`

const row1: LogoItem[] = [
  { node: badge('<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>', 'Vue.js') },
  { node: badge('<path d="M3 3h18v18H3V3zm14.5 9.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"/>', 'TypeScript') },
  { node: badge('<path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 11.5h-1.5V13H12v2.5h-1.5v-7H12v3h1.5v-3H15v7z"/>', 'JavaScript') },
  { node: badge('<circle cx="12" cy="12" r="10"/><path fill="none" stroke="white" stroke-width="1.5" d="M8 12h8M12 8l4 4-4 4"/>', 'Node.js') },
  { node: badge('<path d="M4 4h16v16H4V4zm4 4v8m4-8v8m4-8v8M8 8h8"/>', 'PHP') },
  { node: badge('<path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm-1 14.5v-9l7 4.5-7 4.5z"/>', 'Laravel') },
  { node: badge('<ellipse cx="12" cy="12" rx="10" ry="6"/><path d="M2 12c0 3.3 4.5 6 10 6s10-2.7 10-6M12 6v12"/>', 'MySQL') },
  { node: badge('<path d="M21 6.5C21 8.4 16.97 10 12 10S3 8.4 3 6.5 7.03 3 12 3s9 1.57 9 3.5z"/><path d="M3 6.5v5C3 13.4 7.03 15 12 15s9-1.6 9-3.5v-5"/><path d="M3 11.5v5C3 18.4 7.03 20 12 20s9-1.6 9-3.5v-5"/>', 'PostgreSQL') },
]

const row2: LogoItem[] = [
  { node: badge('<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>', 'Git') },
  { node: badge('<rect x="2" y="8" width="20" height="10" rx="2"/><circle cx="7" cy="13" r="2"/><path d="M15 11h4m-4 4h4"/>', 'Docker') },
  { node: badge('<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>', 'Vite') },
  { node: badge('<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>', 'React') },
  { node: badge('<path d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"/>', 'Figma') },
  { node: badge('<path d="M3 5h18M3 12h18M3 19h18"/>', 'REST API') },
  { node: badge('<path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>', 'SQL') },
  { node: badge('<path d="M2 20h20M6 20V10m4 10V4m4 16V8m4 12v-6"/>', 'Analytics') },
]

const row3: LogoItem[] = [
  { node: badge('<path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 3a7 7 0 110 14A7 7 0 0112 5zm0 1a6 6 0 100 12A6 6 0 0012 6z"/>', 'Linux') },
  { node: badge('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/>', 'VS Code') },
  { node: badge('<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>', 'Security') },
  { node: badge('<circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>', 'API Design') },
  { node: badge('<path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5zm-5 0C8.67 10 8 9.33 8 8.5v-5C8 2.67 8.67 2 9.5 2S11 2.67 11 3.5v5c0 .83-.67 1.5-1.5 1.5zm-5 5c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5S5 7.67 5 8.5v5c0 .83-.67 1.5-1.5 1.5zm10 0c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5zm-5 5c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/>', 'Microservices') },
  { node: badge('<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>', 'Hosting') },
  { node: badge('<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>', 'Packages') },
  { node: badge('<path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>', 'Problem Solving') },
]
</script>

<template>
  <div id="app" class="app-layout">
    <NavBar />

    <!-- Fixed left sidebar -->
    <aside class="sidebar-shell">
      
      <LineSidebar
        :items="navItems"
        :accent-color="isDark ? '#f6f6f6' : '#18181c'"
        :text-color="isDark ? '#666' : '#8c8c9a'"
        :marker-color="isDark ? '#3a3a3a' : '#c8c8d0'"
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
        :font-size="1.65"
        :smoothing="70"
        :default-active="activeNav"
        @item-click="handleNavClick"
      />
    </aside>

    <!-- Scrollable content -->
    <main class="main-content">
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <FooterSection />
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
  width: 340px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 0 0 0 48px;
  z-index: 100;
  background: var(--sidebar-gradient);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.sidebar-logo {
  position: absolute;
  top: 36px;
  left: 40px;
  font-family: var(--font-mono);
  font-size: 17px;
  font-weight: 700;
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
  border-color: #c5beff;
  color: #c5beff;
}

/* ── Main scrollable area ──────────────────────────────────── */
.main-content {
  margin-left: 340px;
  flex: 1;
  min-width: 0;
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
  }
}
</style>
