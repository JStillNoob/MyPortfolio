<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../composables/useTheme'
import AnimatedThemeToggler from './AnimatedThemeToggler.vue'

import { useRouter } from 'vue-router'

const scrolled = ref(false)
const mobileMenuOpen = ref(false)
const router = useRouter()

const { isDark, isSystem, setSystemTheme, toggleTheme, initTheme } = useTheme()

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  initTheme()
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const navLinks = [
  { label: 'About',          path: '/' },
  { label: 'Experience',     path: '/experience' },
  { label: 'Projects',       path: '/projects' },
  { label: 'Technologies',   path: '/technologies' },
  { label: 'Certifications', path: '/certifications' },
  { label: "Let's Talk",     path: '/contact' },
]

const handleMobileNav = (path: string) => {
  router.push(path)
  mobileMenuOpen.value = false
}
</script>

<template>
  <nav class="navbar" :class="{ 'scrolled': scrolled }">
    <div class="navbar-inner">

      <!-- Desktop links -->


      <!-- Theme Controls & Mobile Actions at Top-Right -->
      <div class="navbar-actions">
        <div class="theme-controls" role="group" aria-label="Theme controls">
          <!-- Laptop / System Theme Icon Button -->
          <button
            type="button"
            class="theme-btn system-theme-btn"
            :class="{ active: isSystem }"
            @click="setSystemTheme"
            title="System theme"
            aria-label="System theme"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="laptop-icon"
            >
              <rect width="18" height="12" x="3" y="4" rx="2" />
              <line x1="2" x2="22" y1="20" y2="20" />
            </svg>
            <span class="theme-tooltip" role="tooltip">System theme</span>
          </button>

          <!-- Divider -->
          <span class="theme-divider" aria-hidden="true"></span>

          <!-- Animated Theme Toggler from Magic UI -->
          <AnimatedThemeToggler
            :is-dark="isDark"
            @toggle="toggleTheme"
          />
        </div>

        <!-- Mobile hamburger -->
        <button
          class="hamburger"
          :class="{ open: mobileMenuOpen }"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- Mobile dropdown -->
    <div class="mobile-menu" :class="{ open: mobileMenuOpen }">
      <button
        v-for="link in navLinks"
        :key="link.label"
        class="mobile-link"
        @click="handleMobileNav(link.path)"
      >
        {{ link.label }}
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background var(--transition);
  background: transparent;
}

.navbar.scrolled {
  background: var(--nav-bg-scrolled, rgba(24, 24, 28, 0.92));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  width: 100%;
  padding: 0 40px 0 380px;
  box-sizing: border-box;
}

@media (max-width: 700px) {
  .navbar-inner {
    padding: 0 16px;
    justify-content: flex-end;
  }
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-link {
  font-size: 14.5px;
  font-weight: 500;
  color: var(--text-secondary);
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  transition: color var(--transition), background var(--transition);
}
.nav-link:hover {
  color: var(--text-primary);
  background: var(--bg-card);
}

/* ── Top-right theme controls & actions ── */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
}

.theme-controls {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  padding: 0;
  box-shadow: none;
}

.theme-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color var(--transition), background-color var(--transition), transform 0.2s ease;
  user-select: none;
  outline: none;
}

.theme-btn:hover {
  color: var(--text-primary);
  background: var(--bg-card-hover);
}

.theme-btn:active {
  transform: scale(0.92);
}

.system-theme-btn.active {
  color: var(--accent);
}

.system-theme-btn.active::after {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent);
}

.laptop-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease;
}

.theme-btn:hover .laptop-icon {
  transform: translateY(-1px);
}

.theme-divider {
  display: inline-block;
  width: 1px;
  height: 18px;
  background-color: var(--text-secondary);
  opacity: 0.55;
  margin: 0 4px;
  flex-shrink: 0;
  border-radius: 1px;
}

/* Styled Hover Tooltip */
.theme-tooltip {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  padding: 5px 10px;
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 11.5px;
  font-family: var(--font-sans);
  font-weight: 500;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s;
  z-index: 1000;
}

.theme-tooltip::before {
  content: '';
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 7px;
  height: 7px;
  background: var(--bg-card);
  border-left: 1px solid var(--border);
  border-top: 1px solid var(--border);
}

.theme-btn:hover .theme-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
  border-radius: var(--radius-sm);
  transition: background var(--transition);
}
.hamburger:hover { background: var(--bg-card); }
.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text-secondary);
  border-radius: 2px;
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Mobile menu */
.mobile-menu {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease, border-color 0.3s ease;
  border-bottom: 1px solid transparent;
  background: var(--nav-bg-scrolled, rgba(24, 24, 28, 0.97));
  backdrop-filter: blur(16px);
}
.mobile-menu.open {
  max-height: 360px;
  border-bottom-color: var(--border);
}
.mobile-link {
  padding: 18px 32px;
  font-size: 15px;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-subtle);
  transition: color var(--transition), background var(--transition);
}
.mobile-link:last-child { border-bottom: none; }
.mobile-link:hover { color: var(--text-primary); background: var(--bg-card); }

@media (max-width: 600px) {
  .nav-links { display: none; }
  .hamburger { display: flex; }
}
</style>
