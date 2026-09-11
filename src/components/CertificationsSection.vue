<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const certifications = [
  {
    title: 'Meta Full-Stack Developer Certificate',
    issuer: 'Coursera & Meta',
    date: '2024',
    badge: 'Verified',
    desc: 'Comprehensive specialization covering React, Node.js, databases, and modern full-stack development best practices.',
  },
  {
    title: 'Responsive Web Design Certification',
    issuer: 'freeCodeCamp',
    date: '2023',
    badge: 'Verified',
    desc: 'Advanced modern HTML5, CSS3, accessibility standards, responsive grid layouts, and design systems.',
  },
  {
    title: 'JavaScript Algorithms & Data Structures',
    issuer: 'freeCodeCamp',
    date: '2023',
    badge: 'Verified',
    desc: 'Object-oriented programming, algorithmic thinking, data manipulation, ES6+ standards, and complex logic.',
  },
]
</script>

<template>
  <section id="certifications" class="section">
    <div class="container">
      <div class="section-top-bar">
        <button class="view-more-btn" @click="router.push('/certifications')">
          <span>View More</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </button>
      </div>

      <div class="section-header">
        <h2 class="section-title">Certifications &amp; Credentials</h2>
      </div>

      <div class="cert-grid">
        <div
          v-for="cert in certifications"
          :key="cert.title"
          class="cert-card"
        >
          <div class="cert-top">
            <span class="cert-badge">{{ cert.badge }}</span>
            <span class="cert-date">{{ cert.date }}</span>
          </div>
          <h3 class="cert-title">{{ cert.title }}</h3>
          <p class="cert-issuer">{{ cert.issuer }}</p>
          <p class="cert-desc">{{ cert.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* cert-list: divider rows like edu-list */
.cert-grid {
  display: flex;
  flex-direction: column;
}

.cert-card {
  padding: 28px 0;
  border-bottom: 1px solid var(--border-subtle);
  transition: none;
}

.cert-card:first-child {
  border-top: 1px solid var(--border-subtle);
}

.cert-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.cert-badge {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 400;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  background: var(--accent-dim);
  color: var(--text-muted);
  border: 1px solid var(--border);
}

.cert-date {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
}

.cert-title {
  font-size: 16px;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.35;
  margin-bottom: 4px;
  letter-spacing: -0.01em;
}

.cert-issuer {
  font-size: 13px;
  font-weight: 400;
  color: var(--text-secondary);
  margin-bottom: 10px;
}

.cert-desc {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.65;
}
</style>

