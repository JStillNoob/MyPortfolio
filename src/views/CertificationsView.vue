<script setup lang="ts">
import { useRouter } from 'vue-router'
import FooterSection from '../components/FooterSection.vue'

const router = useRouter()

const certifications = [
  {
    title: 'Meta Full-Stack Developer Certificate',
    issuer: 'Meta & Coursera',
    date: '2024',
    badge: 'Credential ID: META-FS-84920',
    status: 'Verified',
    desc: 'Comprehensive 8-course specialization covering end-to-end web engineering, React component architecture, relational database modeling, and server-side deployment pipelines.',
    skills: ['React', 'Django / Python', 'Node.js', 'Databases', 'CI/CD'],
    credentialUrl: '#',
  },
  {
    title: 'Responsive Web Design Professional Certificate',
    issuer: 'freeCodeCamp',
    date: '2023',
    badge: 'Credential ID: FCC-RWD-19284',
    status: 'Verified',
    desc: 'Advanced modern HTML5 semantics, CSS3 layouts (Grid, Flexbox), responsive typographic hierarchies, accessible ARIA practices, and cross-browser visual fidelity.',
    skills: ['Modern CSS', 'CSS Grid', 'Flexbox', 'Accessibility (a11y)', 'Mobile-First Design'],
    credentialUrl: '#',
  },
  {
    title: 'JavaScript Algorithms & Data Structures',
    issuer: 'freeCodeCamp',
    date: '2023',
    badge: 'Credential ID: FCC-JADS-48201',
    status: 'Verified',
    desc: 'Deep dive into algorithmic complexity, data structures (linked lists, trees, graphs), functional programming, regular expressions, and ES6+ asynchronous execution patterns.',
    skills: ['Data Structures', 'Algorithms', 'ES6+ JavaScript', 'Functional Programming'],
    credentialUrl: '#',
  },
  {
    title: 'Foundations of User Experience (UX) Design',
    issuer: 'Google Career Certificates',
    date: '2023',
    badge: 'Credential ID: GOOG-UX-39102',
    status: 'Verified',
    desc: 'User-centered design methodology, accessibility principles, wireframing, interactive prototyping, and design systems integration in Figma.',
    skills: ['Figma', 'UX Research', 'Wireframing', 'Design Systems', 'User Testing'],
    credentialUrl: '#',
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
        <h1 class="page-title">Certifications</h1>
        <p class="page-subtitle">Accredited certifications, industry credentials, and verified coursework.</p>
      </div>

      <div class="cert-list">
        <div v-for="cert in certifications" :key="cert.title" class="cert-row">
          <div class="cert-top">
            <div class="cert-title-block">
              <h2 class="cert-name">{{ cert.title }}</h2>
              <div class="cert-meta">
                <span class="issuer">{{ cert.issuer }}</span>
                <span class="dot">·</span>
                <span class="cert-year">{{ cert.date }}</span>
              </div>
            </div>
            <div class="cert-badges">
              <span class="status-pill">{{ cert.status }}</span>
              <span class="id-pill">{{ cert.badge }}</span>
            </div>
          </div>

          <p class="cert-desc">{{ cert.desc }}</p>

          <div class="skills-row">
            <span v-for="s in cert.skills" :key="s" class="skill-pill">{{ s }}</span>
          </div>
        </div>
      </div>
    </div>

    <FooterSection />
  </div>
</template>

<style scoped>
.cert-list {
  display: flex;
  flex-direction: column;
}

.cert-row {
  padding: 36px 0;
  border-bottom: 1px solid var(--border-subtle);
}

.cert-row:first-child {
  border-top: 1px solid var(--border-subtle);
}

.cert-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 12px;
}

.cert-name {
  font-size: 19px;
  font-weight: 400;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  line-height: 1.35;
  margin-bottom: 6px;
}

.cert-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14.5px;
  color: var(--text-secondary);
}

.dot {
  color: var(--text-muted);
}

.cert-year {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-muted);
}

.cert-badges {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.status-pill {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 400;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  background: var(--accent-dim);
  color: var(--text-primary);
  border: 1px solid var(--border);
}

.id-pill {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-muted);
}

.cert-desc {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: 16px;
}

.skills-row {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.skill-pill {
  font-size: 12px;
  font-weight: 400;
  color: var(--text-muted);
  background: var(--accent-dim);
  border: 1px solid var(--border);
  padding: 3px 10px;
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
}

@media (max-width: 700px) {
  .cert-top {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
