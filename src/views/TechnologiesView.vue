<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const technologyCategories = [
  {
    label: 'Frontend Development',
    description: 'Creating high-performance, accessible, and responsive user interfaces with modern component architectures.',
    skills: [
      { name: 'Vue.js (Vue 3 / Composition API)', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'JavaScript (ES6+)', level: 90 },
      { name: 'HTML5 & Semantic Web', level: 95 },
      { name: 'Modern CSS & CSS Grid / Flexbox', level: 90 },
      { name: 'Tailwind CSS', level: 85 },
    ],
  },
  {
    label: 'Backend & APIs',
    description: 'Designing robust server architectures, secure authentication workflows, and high-throughput RESTful services.',
    skills: [
      { name: 'Node.js & Express', level: 82 },
      { name: 'PHP & Modern PHP Frameworks', level: 78 },
      { name: 'RESTful API Design & Integration', level: 88 },
      { name: 'Authentication & JWT', level: 82 },
      { name: 'Python Fundamentals', level: 70 },
    ],
  },
  {
    label: 'Databases & Cloud Storage',
    description: 'Structuring normalized relational schemas, query optimization, and reliable persistent data storage.',
    skills: [
      { name: 'PostgreSQL', level: 80 },
      { name: 'MySQL', level: 84 },
      { name: 'Database Schema Design & Indexing', level: 80 },
      { name: 'Redis Caching Basics', level: 68 },
    ],
  },
  {
    label: 'Tooling & DevOps Workflow',
    description: 'Developer experience utilities, version control discipline, and containerized deployment pipelines.',
    skills: [
      { name: 'Git & GitHub Collaboration', level: 90 },
      { name: 'Vite & Frontend Build Pipelines', level: 88 },
      { name: 'Docker & Containerization', level: 68 },
      { name: 'Linux / Bash Scripting', level: 75 },
      { name: 'Figma to Code Implementation', level: 85 },
    ],
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
        <h1 class="page-title">Technologies</h1>
        <p class="page-subtitle">Languages, libraries, database engines, and tooling I use to craft digital systems.</p>
      </div>

      <div class="tech-sections">
        <div v-for="cat in technologyCategories" :key="cat.label" class="tech-category">
          <div class="category-header">
            <h2 class="category-name">{{ cat.label }}</h2>
            <p class="category-desc">{{ cat.description }}</p>
          </div>

          <div class="skills-stack">
            <div v-for="skill in cat.skills" :key="skill.name" class="skill-row">
              <div class="skill-meta">
                <span class="skill-title">{{ skill.name }}</span>
                <span class="skill-pct">{{ skill.level }}%</span>
              </div>
              <div class="skill-bar-track">
                <div class="skill-bar-fill" :style="{ width: skill.level + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tech-sections {
  display: flex;
  flex-direction: column;
}

.tech-category {
  padding: 40px 0;
  border-bottom: 1px solid var(--border-subtle);
}

.tech-category:first-child {
  border-top: 1px solid var(--border-subtle);
}

.category-header {
  margin-bottom: 28px;
}

.category-name {
  font-size: 13px;
  font-weight: 400;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-family: var(--font-mono);
  margin-bottom: 6px;
}

.category-desc {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.7;
}

.skills-stack {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 48px;
}

.skill-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skill-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.skill-title {
  font-size: 14.5px;
  font-weight: 400;
  color: var(--text-primary);
}

.skill-pct {
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--text-muted);
}

.skill-bar-track {
  width: 100%;
  height: 3px;
  background: var(--border-subtle);
  border-radius: 3px;
  overflow: hidden;
}

.skill-bar-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 3px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 700px) {
  .skills-stack {
    grid-template-columns: 1fr;
    gap: 18px;
  }
}
</style>
