<script setup lang="ts">
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
  <section id="education" class="section">
    <div class="container">
      <h1 class="section-label">Education</h1>
      <h2 class="section-title">Academic Background</h2>

      <div class="edu-list">
        <div
          class="edu-card"
          v-for="(edu, idx) in education"
          :key="idx"
        >
          <div class="edu-top">
            <div class="edu-header">
              <h3 class="edu-degree">{{ edu.degree }}</h3>
              <span class="edu-status" :class="edu.status.toLowerCase()">{{ edu.status }}</span>
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
.section-title {
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: 36px;
}

.edu-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.edu-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 32px;
  transition: border-color var(--transition), background var(--transition);
}
.edu-card:hover {
  border-color: var(--border);
  background: var(--bg-card-hover);
}

.edu-top {
  margin-bottom: 14px;
}

.edu-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.edu-degree {
  font-size: 17.5px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  line-height: 1.4;
}

.edu-status {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  padding: 4px 11px;
  border-radius: var(--radius-full);
  flex-shrink: 0;
  margin-top: 2px;
}
.edu-status.graduated {
  background: rgba(168, 219, 197, 0.12);
  color: var(--pastel-green);
  border: 1px solid rgba(168, 219, 197, 0.25);
}
.edu-status.completed {
  background: rgba(158, 197, 232, 0.10);
  color: var(--pastel-blue);
  border: 1px solid rgba(158, 197, 232, 0.2);
}

.edu-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.edu-school {
  font-size: 15px;
  color: var(--text-secondary);
  font-weight: 500;
}

.edu-period {
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--text-muted);
}

.edu-desc {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 22px;
}

.edu-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.edu-badge {
  font-size: 12.5px;
  font-weight: 500;
  color: var(--accent);
  background: var(--accent-dim);
  border: 1px solid rgba(197, 190, 255, 0.2);
  padding: 4px 12px;
  border-radius: var(--radius-full);
}

@media (max-width: 480px) {
  .edu-header { flex-direction: column; }
}
</style>
