<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const education = [
  {
    degree: 'Bachelor of Science in Information Technology',
    school: 'University of the Philippines',
    period: '2020 – 2024',
    status: 'Graduated',
    description:
      'Focused on software engineering, web development, and database management. Completed capstone project on full-stack web application development.',
    highlights: ['Dean\'s List', 'Capstone Award', 'Tech Club President'],
  },
  {
    degree: 'Senior High School — STEM Strand',
    school: 'National High School',
    period: '2018 – 2020',
    status: 'Completed',
    description:
      'Completed the Science, Technology, Engineering, and Mathematics strand with focus on computer science fundamentals.',
    highlights: ['With Honors', 'Best in Computer Science'],
  },
]
</script>

<template>
  <section id="experience" class="section">
    <div class="container">
      <div class="section-top-bar">
        <button class="view-more-btn" @click="router.push('/experience')">
          <span>View More</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </button>
      </div>

      <div class="section-header" v-reveal>
        <h2 class="section-title">Academic &amp; Work Journey</h2>
      </div>

      <div class="edu-list reveal-stagger" v-reveal>
        <div
          class="edu-item"
          v-for="(edu, idx) in education"
          :key="idx"
        >
          <div class="edu-top">
            <div class="edu-header">
              <h3 class="edu-degree">{{ edu.degree }}</h3>
              <span class="edu-status">{{ edu.status }}</span>
            </div>
            <div class="edu-meta">
              <span class="edu-school">{{ edu.school }}</span>
              <span class="edu-period">{{ edu.period }}</span>
            </div>
          </div>
          <p class="edu-desc">{{ edu.description }}</p>
          <div class="edu-highlights">
            <span
              class="edu-badge"
              v-for="h in edu.highlights"
              :key="h"
            >{{ h }}</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* edu-list: simple stack with dividers, no card background */
.edu-list {
  display: flex;
  flex-direction: column;
}

.edu-item {
  padding: 32px 0;
  border-bottom: 1px solid var(--border-subtle);
}

.edu-item:first-child {
  border-top: 1px solid var(--border-subtle);
}

.edu-top {
  margin-bottom: 12px;
}

.edu-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 6px;
}

.edu-degree {
  font-size: 17px;
  font-weight: 400;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  line-height: 1.4;
}

.edu-status {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 400;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  flex-shrink: 0;
  margin-top: 3px;
  background: var(--accent-dim);
  color: var(--text-muted);
  border: 1px solid var(--border);
}

.edu-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.edu-school {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 400;
}

.edu-period {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
}

.edu-desc {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: 18px;
}

.edu-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.edu-badge {
  font-size: 12px;
  font-weight: 400;
  color: var(--text-muted);
  background: var(--accent-dim);
  border: 1px solid var(--border);
  padding: 3px 10px;
  border-radius: var(--radius-full);
}

@media (max-width: 480px) {
  .edu-header { flex-direction: column; }
}
</style>

