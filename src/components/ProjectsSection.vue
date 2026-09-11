<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const projects = [
  {
    featured: true,
    title: 'DevTrack',
    description:
      'A full-stack project management tool built for developers. Features real-time updates, task boards, GitHub integration, and team collaboration tools.',
    tech: ['Vue.js', 'Node.js', 'PostgreSQL', 'WebSocket'],
    links: { live: '#', github: '#' },
    status: 'Live',
  },
  {
    featured: true,
    title: 'ByteShop',
    description:
      'E-commerce platform for digital products with a custom payment gateway integration, admin dashboard, and automated email delivery system.',
    tech: ['PHP', 'Laravel', 'MySQL', 'Stripe'],
    links: { live: '#', github: '#' },
    status: 'Live',
  },
  {
    featured: false,
    title: 'QuickNote',
    description:
      'A lightweight note-taking app with markdown support, tags, and local-first storage. Works offline seamlessly.',
    tech: ['Vue.js', 'IndexedDB', 'TypeScript'],
    links: { live: '#', github: '#' },
    status: 'Open Source',
  },
  {
    featured: false,
    title: 'LinkPulse',
    description:
      'URL shortener with analytics dashboard. Tracks clicks, geographic data, and generates QR codes for each link.',
    tech: ['Node.js', 'Redis', 'Chart.js'],
    links: { live: null, github: '#' },
    status: 'In Progress',
  },
  {
    featured: false,
    title: 'PortfolioKit',
    description:
      'A reusable portfolio starter template with Vue 3, TypeScript, and a clean minimal design system. MIT licensed.',
    tech: ['Vue.js', 'TypeScript', 'Vite'],
    links: { live: null, github: '#' },
    status: 'Open Source',
  },
  {
    featured: false,
    title: 'WeatherNow',
    description:
      'Real-time weather dashboard using OpenWeather API with 7-day forecasts, animated weather icons, and location search.',
    tech: ['JavaScript', 'OpenWeather API', 'CSS'],
    links: { live: '#', github: '#' },
    status: 'Live',
  },
]

const statusColor: Record<string, string> = {
  'Live':        'green',
  'In Progress': 'amber',
  'Open Source': 'blue',
}
</script>

<template>
  <section id="projects" class="section">
    <div class="container">
      <div class="section-top-bar">
        <button class="view-more-btn" @click="router.push('/projects')">
          <span>View More</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </button>
      </div>

      <div class="section-header">
        <h2 class="section-title">Things I've built</h2>
      </div>

      <!-- Featured projects -->
      <div class="featured-projects">
        <div
          class="project-card featured"
          v-for="proj in projects.filter(p => p.featured)"
          :key="proj.title"
        >
          <div class="project-card-inner">
            <div class="project-top">
              <span class="project-label">Featured Build</span>
              <div class="project-links">
                <a v-if="proj.links.github" :href="proj.links.github" class="proj-link" target="_blank" aria-label="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </a>
                <a v-if="proj.links.live" :href="proj.links.live" class="proj-link" target="_blank" aria-label="Live site">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              </div>
            </div>
            <h3 class="project-title">{{ proj.title }}</h3>
            <p class="project-desc">{{ proj.description }}</p>
            <div class="project-footer">
              <div class="project-tech">
                <span v-for="t in proj.tech" :key="t" class="tech-tag">{{ t }}</span>
              </div>
              <span class="project-status" :class="statusColor[proj.status]">{{ proj.status }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Other projects grid -->
      <h3 class="sub-heading">Other Projects</h3>
      <div class="projects-grid">
        <div
          class="project-card mini"
          v-for="proj in projects.filter(p => !p.featured)"
          :key="proj.title"
        >
          <div class="project-top">
            <svg class="folder-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            <div class="project-links">
              <a v-if="proj.links.github" :href="proj.links.github" class="proj-link" target="_blank" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
              <a v-if="proj.links.live" :href="proj.links.live" class="proj-link" target="_blank" aria-label="Live site">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </div>
          <h3 class="project-title mini-title">{{ proj.title }}</h3>
          <p class="project-desc mini-desc">{{ proj.description }}</p>
          <div class="project-footer">
            <div class="project-tech">
              <span v-for="t in proj.tech.slice(0, 3)" :key="t" class="tech-tag">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

/* Featured */
.featured-projects {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 56px;
}

.project-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: border-color var(--transition), background var(--transition), transform var(--transition);
  cursor: default;
}

.project-card.featured {
  background: var(--bg-card);
}
.project-card.featured:hover {
  border-color: var(--border);
  background: var(--bg-card-hover);
}

.project-card-inner {
  padding: 32px;
}

.project-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.project-label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.folder-icon {
  color: var(--accent);
}

.project-links {
  display: flex;
  gap: 4px;
}

.proj-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  transition: color var(--transition), background var(--transition);
}
.proj-link:hover {
  color: var(--accent);
  background: var(--bg-secondary);
}

.project-title {
  font-size: 20px;
  font-weight: 500;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.project-desc {
  font-size: 15.5px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 22px;
}

.project-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tech-tag {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  padding: 3px 10px;
  border-radius: var(--radius-full);
}

.project-status {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  padding: 4px 11px;
  border-radius: var(--radius-full);
  flex-shrink: 0;
  background: var(--accent-dim);
  color: var(--text-primary);
  border: 1px solid var(--border);
}

/* Sub-heading */
.sub-heading {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.04em;
  margin-bottom: 18px;
}

/* Mini grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
}

.project-card.mini {
  background: var(--bg-card);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.project-card.mini:hover {
  background: var(--bg-card-hover);
  border-color: var(--border);
  transform: translateY(-2px);
}

.mini-title {
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 10px;
}

.mini-desc {
  font-size: 14.5px;
  flex: 1;
  margin-bottom: 20px;
}
</style>
