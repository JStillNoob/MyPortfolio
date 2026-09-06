<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const mobileMenuOpen = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const navLinks = [
  { label: 'About',     href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Projects',  href: '#projects' },
  { label: 'Skills',    href: '#skills' },
  { label: 'Contact',   href: '#contact' },
]

const closeMenu = () => { mobileMenuOpen.value = false }
</script>

<template>
  <nav class="navbar" :class="{ 'scrolled': scrolled }">
    <div class="navbar-inner container">
      <a href="#" class="nav-logo">
        <span class="logo-initials">JA</span>
      </a>

      <!-- Desktop links -->
      <ul class="nav-links">
        <li v-for="link in navLinks" :key="link.label">
          <a :href="link.href" class="nav-link">{{ link.label }}</a>
        </li>
      </ul>

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

    <!-- Mobile dropdown -->
    <div class="mobile-menu" :class="{ open: mobileMenuOpen }">
      <a
        v-for="link in navLinks"
        :key="link.label"
        :href="link.href"
        class="mobile-link"
        @click="closeMenu"
      >
        {{ link.label }}
      </a>
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
  transition: border-color var(--transition), background var(--transition);
  border-bottom: 1px solid transparent;
  background: transparent;
}

.navbar.scrolled {
  background: rgba(24, 24, 28, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom-color: var(--border);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-initials {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  letter-spacing: 0.05em;
  transition: border-color var(--transition), color var(--transition);
}
.logo-initials:hover {
  border-color: var(--accent);
  color: var(--accent);
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
  background: rgba(24, 24, 28, 0.97);
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
