<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const tabLinks = [
  {
    num: '02',
    title: 'Experience',
    desc: 'Work history, roles, internships, and educational background.',
    path: '/experience',
  },
  {
    num: '03',
    title: 'Projects',
    desc: 'Featured full-stack web applications, tools, and open-source builds.',
    path: '/projects',
  },
  {
    num: '04',
    title: 'Technologies',
    desc: 'Frontend, backend, databases, and DevOps developer toolkit.',
    path: '/technologies',
  },
  {
    num: '05',
    title: 'Certifications',
    desc: 'Professional certifications, technical diplomas, and credentials.',
    path: '/certifications',
  },
  {
    num: '06',
    title: "Let's Talk",
    desc: 'Send a message, schedule a chat, or get in touch for collaborations.',
    path: '/contact',
  },
]
</script>

<template>
  <div class="about-view">
    <!-- Hero section with the avatar image (About) -->
    <HeroSection />

    <!-- Detailed About Section -->
    <AboutSection />

    <!-- Section navigation cards / headers that go to next page -->
    <section class="section tabs-directory-section">
      <div class="container">
        <p class="section-label">Explore More</p>
        <h2 class="section-title">Sections</h2>

        <div class="tabs-grid">
          <div
            v-for="tab in tabLinks"
            :key="tab.path"
            class="tab-card"
            @click="router.push(tab.path)"
            role="button"
            tabindex="0"
          >
            <div class="tab-card-top">
              <span class="tab-num">{{ tab.num }}</span>
              <span class="tab-arrow">→</span>
            </div>
            <h3 class="tab-title">{{ tab.title }}</h3>
            <p class="tab-desc">{{ tab.desc }}</p>
            <div class="tab-action">
              <span>Open Page</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-view {
  min-height: 100vh;
}

.tabs-directory-section {
  padding-top: 40px;
}

.section-title {
  font-size: 30px;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: 32px;
}

.tabs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.tab-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 26px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: border-color var(--transition), background var(--transition), transform var(--transition);
}

.tab-card:hover {
  border-color: var(--accent);
  background: var(--bg-card-hover);
  transform: translateY(-2px);
}

.tab-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.tab-num {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

.tab-arrow {
  color: var(--text-muted);
  font-size: 16px;
  transition: transform 0.2s ease, color 0.2s ease;
}

.tab-card:hover .tab-arrow {
  color: var(--text-primary);
  transform: translateX(4px);
}

.tab-title {
  font-size: 20px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}

.tab-desc {
  font-size: 14.5px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
}

.tab-action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--accent);
}
</style>
