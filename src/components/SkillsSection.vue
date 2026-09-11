<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const categories = [
  {
    label: 'Frontend',
    icon: '⬡',
    skills: [
      { name: 'Vue.js',       level: 90 },
      { name: 'TypeScript',   level: 82 },
      { name: 'HTML & CSS',   level: 95 },
      { name: 'JavaScript',   level: 88 },
      { name: 'React',        level: 65 },
    ],
  },
  {
    label: 'Backend',
    icon: '⬡',
    skills: [
      { name: 'Node.js',      level: 80 },
      { name: 'PHP / Laravel', level: 85 },
      { name: 'REST APIs',    level: 88 },
      { name: 'MySQL',        level: 80 },
      { name: 'PostgreSQL',   level: 70 },
    ],
  },
  {
    label: 'Tools & DevOps',
    icon: '⬡',
    skills: [
      { name: 'Git / GitHub', level: 92 },
      { name: 'Vite',         level: 85 },
      { name: 'Docker',       level: 60 },
      { name: 'Linux / CLI',  level: 75 },
      { name: 'Figma',        level: 65 },
    ],
  },
]

const levelLabel = (lvl: number) => {
  if (lvl >= 85) return 'Expert'
  if (lvl >= 70) return 'Proficient'
  return 'Familiar'
}
</script>

<template>
  <section id="technologies" class="section">
    <div class="container">
      <div class="section-top-bar">
        <button class="view-more-btn" @click="router.push('/technologies')">
          <span>View More</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </button>
      </div>

      <div class="section-header">
        <h2 class="section-title">What I work with</h2>
      </div>

      <div class="skills-grid">
        <div
          class="skill-group"
          v-for="cat in categories"
          :key="cat.label"
        >
          <h3 class="cat-title">{{ cat.label }}</h3>
          <div class="skill-list">
            <div class="skill-item" v-for="skill in cat.skills" :key="skill.name">
              <div class="skill-info">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-level">{{ levelLabel(skill.level) }}</span>
              </div>
              <div class="skill-bar-track">
                <div
                  class="skill-bar-fill"
                  :style="{ width: skill.level + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* skill-group: plain column, no card background */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 40px;
}

.skill-group {
  padding: 32px 0;
  border-bottom: 1px solid var(--border-subtle);
}

.skill-group:first-child {
  border-top: 1px solid var(--border-subtle);
}

.cat-title {
  font-size: 12px;
  font-weight: 400;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 20px;
  font-family: var(--font-mono);
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.skill-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.skill-name {
  font-size: 14px;
  font-weight: 400;
  color: var(--text-primary);
}

.skill-level {
  font-family: var(--font-mono);
  font-size: 11px;
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
  .skills-grid { grid-template-columns: 1fr; }
}

@media (min-width: 700px) and (max-width: 900px) {
  .skills-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
