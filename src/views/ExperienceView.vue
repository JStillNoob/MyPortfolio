<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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

const education = ref([
  {
    degree: 'BS Information Technology Major in Service Management',
    school: 'University of Mindanao - Matina Campus',
    logo: '/UM_logo.png',
    location: 'Davao City',
    period: '2027 (Expected)',
  },
])

const failedSchoolLogos = ref<Record<number, boolean>>({})
const onSchoolLogoError = (idx: number) => {
  failedSchoolLogos.value[idx] = true
}
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

      <div class="page-header" v-reveal>
        <h1 class="page-title">Experience</h1>
        <p class="page-subtitle">Career history, professional roles, and academic foundations.</p>
      </div>

      <!-- Professional Experience -->
      <div class="content-group" v-reveal>
        <h2 class="group-heading">Work &amp; Professional Roles</h2>
        <div class="item-list reveal-stagger reveal-stagger-scale" v-reveal>
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
      <div class="content-group" v-reveal>
        <h2 class="group-heading">Academic Journey</h2>
        <div class="item-list reveal-stagger reveal-stagger-scale" v-reveal>
          <div v-for="(edu, idx) in education" :key="idx" class="list-row">
            <div class="row-top">
              <div class="row-meta edu-school-row">
                <div class="school-logo-wrap" :title="edu.logo ? `${edu.school} logo` : 'School logo placeholder'">
                  <img
                    v-if="edu.logo && !failedSchoolLogos[idx]"
                    :src="edu.logo"
                    :alt="`${edu.school} logo`"
                    class="school-logo-img"
                    @error="onSchoolLogoError(idx)"
                  />
                  <div v-else class="school-logo-placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                    </svg>
                  </div>
                </div>
                <div class="school-details">
                  <h3 class="education-school">{{ edu.school }}</h3>
                  <span class="education-degree">{{ edu.degree }}</span>
                </div>
                <div class="education-place">
                  <span class="education-location">{{ edu.location }}</span>
                  <span class="meta-secondary">{{ edu.period }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

.edu-school-row {
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 64px;
  width: 100%;
}

.school-logo-wrap {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: var(--shadow-sm);
  transition: border-color var(--transition), transform 0.2s ease;
}

.school-logo-wrap:hover {
  border-color: var(--accent);
  transform: translateY(-1px);
}

.school-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 2px;
  box-sizing: border-box;
  display: block;
}

.school-logo-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--text-muted);
  background: var(--bg-card);
}

.school-logo-wrap:hover .school-logo-placeholder {
  color: var(--accent);
}

.school-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
}

.education-school {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.35;
  margin: 0;
}

.education-degree,
.education-location {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.education-place {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 4px;
  margin-left: auto;
  flex-shrink: 0;
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

  .edu-school-row {
    flex-wrap: wrap;
  }

  .education-place {
    width: 100%;
    align-items: flex-start;
    margin-left: 80px;
  }
}
</style>
