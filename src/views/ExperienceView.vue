<script setup lang="ts">
import { useRouter } from 'vue-router'
import FooterSection from '../components/FooterSection.vue'

const router = useRouter()

const experiences = [
  {
    role: 'Full-Stack Developer',
    organization: 'Freelance / Contract',
    period: '2023 — Present',
    status: 'Active',
    description:
      'Designing and developing tailored web applications, landing pages, and internal management tools for diverse clients. Managing end-to-end deliverables from database architecture to responsive frontend implementation.',
    highlights: [
      'Built responsive Vue 3 & React applications with clean API integrations',
      'Optimized page performance and load times across multiple production sites',
      'Delivered custom dashboard interfaces with real-time state management',
    ],
    tech: ['Vue.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL'],
  },
  {
    role: 'Web Development Intern',
    organization: 'Tech Innovations Inc.',
    period: '2023',
    status: 'Completed',
    description:
      'Collaborated with the engineering team to build customer-facing features and internal reporting modules. Participated in daily standups, code reviews, and cross-functional design sprints.',
    highlights: [
      'Refactored legacy UI components into reusable modern frontend patterns',
      'Assisted in implementing RESTful API endpoints and automated tests',
      'Contributed to component documentation and UI design consistency',
    ],
    tech: ['Vue.js', 'JavaScript', 'REST APIs', 'Git', 'Figma'],
  },
]

const education = [
  {
    degree: 'Bachelor of Science in Information Technology',
    school: 'University of the Philippines',
    period: '2020 — 2024',
    status: 'Graduated',
    description:
      'Focused on software engineering, web application development, database management systems, and human-computer interaction. Graduated with capstone recognition for full-stack system architecture.',
    highlights: ["Dean's List", 'Capstone Award Winner', 'Tech Club President'],
  },
  {
    degree: 'Senior High School — STEM Strand',
    school: 'National High School',
    period: '2018 — 2020',
    status: 'Completed',
    description:
      'Completed the Science, Technology, Engineering, and Mathematics curriculum with honors and advanced coursework in computer programming.',
    highlights: ['With Honors', 'Best in Computer Science'],
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
        <h1 class="page-title">Experience</h1>
        <p class="page-subtitle">Career history, professional roles, and academic foundations.</p>
      </div>

      <!-- Professional Experience -->
      <div class="content-group">
        <h2 class="group-heading">Work &amp; Professional Roles</h2>
        <div class="item-list">
          <div v-for="(exp, idx) in experiences" :key="idx" class="list-row">
            <div class="row-top">
              <div class="row-header">
                <h3 class="row-title">{{ exp.role }}</h3>
                <span class="status-badge">{{ exp.status }}</span>
              </div>
              <div class="row-meta">
                <span class="meta-primary">{{ exp.organization }}</span>
                <span class="meta-secondary">{{ exp.period }}</span>
              </div>
            </div>
            <p class="row-desc">{{ exp.description }}</p>
            <ul class="highlights-list">
              <li v-for="(h, hIdx) in exp.highlights" :key="hIdx">{{ h }}</li>
            </ul>
            <div class="tags-wrap">
              <span v-for="t in exp.tech" :key="t" class="tag-pill">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Education Journey -->
      <div class="content-group">
        <h2 class="group-heading">Academic Journey</h2>
        <div class="item-list">
          <div v-for="(edu, idx) in education" :key="idx" class="list-row">
            <div class="row-top">
              <div class="row-header">
                <h3 class="row-title">{{ edu.degree }}</h3>
                <span class="status-badge">{{ edu.status }}</span>
              </div>
              <div class="row-meta">
                <span class="meta-primary">{{ edu.school }}</span>
                <span class="meta-secondary">{{ edu.period }}</span>
              </div>
            </div>
            <p class="row-desc">{{ edu.description }}</p>
            <div class="tags-wrap">
              <span v-for="h in edu.highlights" :key="h" class="tag-pill">{{ h }}</span>
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

.item-list {
  display: flex;
  flex-direction: column;
}

.list-row {
  padding: 32px 0;
  border-bottom: 1px solid var(--border-subtle);
}

.list-row:first-child {
  border-top: 1px solid var(--border-subtle);
}

.row-top {
  margin-bottom: 14px;
}

.row-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 6px;
}

.row-title {
  font-size: 19px;
  font-weight: 400;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  line-height: 1.35;
}

.status-badge {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 400;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  flex-shrink: 0;
  background: var(--accent-dim);
  color: var(--text-muted);
  border: 1px solid var(--border);
}

.row-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.meta-primary {
  font-size: 14.5px;
  color: var(--text-secondary);
  font-weight: 400;
}

.meta-secondary {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
}

.row-desc {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: 16px;
}

.highlights-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
  padding-left: 18px;
  list-style-type: disc;
}

.highlights-list li {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
}

.tags-wrap {
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

@media (max-width: 600px) {
  .row-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
