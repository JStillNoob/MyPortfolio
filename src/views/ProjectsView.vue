<script setup lang="ts">
import { useRouter } from 'vue-router'
import FooterSection from '../components/FooterSection.vue'

const router = useRouter()

const featuredProjects = [
  {
    title: 'Modern Portfolio Platform',
    desc: 'An ultra-refined editorial portfolio experience crafted with Vue 3, TypeScript, and modern typography. Features responsive layout mirroring editorial magazine aesthetics, dynamic theme switching, and smooth transitions.',
    tech: ['Vue 3', 'TypeScript', 'Vite', 'CSS Grid'],
    liveUrl: '#',
    githubUrl: '#',
    status: 'Live',
  },
  {
    title: 'DevPulse Analytics',
    desc: 'A developer metrics and performance analytics dashboard. Provides automated tracking for Git activities, pull request velocity, and team collaboration insights with real-time charting.',
    tech: ['Vue 3', 'Node.js', 'Chart.js', 'PostgreSQL'],
    liveUrl: '#',
    githubUrl: '#',
    status: 'Live',
  },
  {
    title: 'OmniFlow Task Engine',
    desc: 'Lightweight distributed task scheduler and workflow automation engine designed for background jobs, webhook processing, and pipeline orchestration.',
    tech: ['TypeScript', 'Express', 'Redis', 'Docker'],
    liveUrl: '#',
    githubUrl: '#',
    status: 'In Progress',
  },
]

const archiveProjects = [
  {
    title: 'CodeSnap CLI',
    desc: 'Command-line tool for generating beautiful syntax-highlighted code snippets for social media and technical blog posts.',
    tech: ['Node.js', 'TypeScript'],
    githubUrl: '#',
  },
  {
    title: 'TypeForge',
    desc: 'Visual playground for pairing Google Fonts and exploring editorial typography scale systems in real time.',
    tech: ['Vue.js', 'CSS Custom Properties'],
    githubUrl: '#',
  },
  {
    title: 'PulseGraph',
    desc: 'Zero-dependency SVG interactive chart library tailored for lightweight data visualizations on mobile devices.',
    tech: ['TypeScript', 'SVG'],
    githubUrl: '#',
  },
  {
    title: 'DocuCraft',
    desc: 'Minimalist markdown documentation generator featuring full-text client-side search and dark mode support.',
    tech: ['Vue.js', 'Markdown-it'],
    githubUrl: '#',
  },
]
</script>

<template>
  <div class="page-view">
    <div class="container">
      <button class="back-btn-global" @click="router.push('/')">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        <span>Back to Home</span>
      </button>

      <div class="page-header">
        <h1 class="page-title">Projects</h1>
        <p class="page-subtitle">A curated collection of web applications, developer tools, and open-source explorations.</p>
      </div>

      <!-- Featured Projects -->
      <div class="content-group">
        <h2 class="group-heading">Featured Applications</h2>
        <div class="featured-list">
          <div v-for="proj in featuredProjects" :key="proj.title" class="project-card">
            <div class="project-header">
              <div class="title-wrap">
                <h3 class="project-title">{{ proj.title }}</h3>
                <span class="status-badge">{{ proj.status }}</span>
              </div>
              <div class="project-links">
                <a :href="proj.githubUrl" class="icon-link" title="Source Code">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                </a>
                <a :href="proj.liveUrl" class="icon-link" title="Live Preview">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              </div>
            </div>
            <p class="project-desc">{{ proj.desc }}</p>
            <div class="tech-tags">
              <span v-for="t in proj.tech" :key="t" class="tag-pill">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional & Open-source Work -->
      <div class="content-group">
        <h2 class="group-heading">Tools &amp; Experiments</h2>
        <div class="archive-grid">
          <div v-for="proj in archiveProjects" :key="proj.title" class="archive-item">
            <div class="archive-top">
              <h3 class="archive-title">{{ proj.title }}</h3>
              <a :href="proj.githubUrl" class="icon-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </a>
            </div>
            <p class="archive-desc">{{ proj.desc }}</p>
            <div class="tech-tags">
              <span v-for="t in proj.tech" :key="t" class="tag-pill">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FooterSection />
  </div>
</template>

<style scoped>
.content-group {
  margin-bottom: 64px;
}

.group-heading {
  font-size: 13px;
  font-weight: 400;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-family: var(--font-mono);
  margin-bottom: 24px;
}

.featured-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.project-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 32px;
  background: var(--bg-card);
  transition: border-color var(--transition), background var(--transition);
}

.project-card:hover {
  border-color: var(--border);
  background: var(--bg-card-hover);
}

.project-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.title-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.project-title {
  font-size: 20px;
  font-weight: 500;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.status-badge {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 400;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  background: var(--accent-dim);
  color: var(--text-primary);
  border: 1px solid var(--border);
}

.project-links {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-link {
  color: var(--text-muted);
  transition: color var(--transition), transform var(--transition);
  display: flex;
  align-items: center;
}

.icon-link:hover {
  color: var(--text-primary);
  transform: translateY(-1px);
}

.project-desc {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: 20px;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.tag-pill {
  font-size: 12px;
  font-weight: 400;
  color: var(--text-muted);
  background: var(--accent-dim);
  border: 1px solid var(--border);
  padding: 3px 10px;
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
}

/* Archive Grid */
.archive-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.archive-item {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 24px;
  background: var(--bg-card);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: border-color var(--transition), background var(--transition);
}

.archive-item:hover {
  border-color: var(--border);
  background: var(--bg-card-hover);
}

.archive-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.archive-title {
  font-size: 16.5px;
  font-weight: 500;
  color: var(--text-primary);
}

.archive-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 18px;
  flex: 1;
}

@media (max-width: 700px) {
  .archive-grid {
    grid-template-columns: 1fr;
  }
}
</style>
