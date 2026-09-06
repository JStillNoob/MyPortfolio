<script setup lang="ts">
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
  <section id="skills" class="section">
    <div class="container">
      <p class="section-label">Skills</p>
      <h2 class="section-title">What I work with</h2>

      <div class="skills-grid">
        <div
          class="skill-category"
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
.section-title {
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: 36px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.skill-category {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 30px;
  transition: border-color var(--transition);
}
.skill-category:hover {
  border-color: rgba(197, 190, 255, 0.2);
}

.cat-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.02em;
  margin-bottom: 22px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-subtle);
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
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
  font-size: 14.5px;
  font-weight: 500;
  color: var(--text-primary);
}

.skill-level {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-muted);
}

.skill-bar-track {
  width: 100%;
  height: 4px;
  background: var(--bg-secondary);
  border-radius: 3px;
  overflow: hidden;
}

.skill-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent) 0%, rgba(197, 190, 255, 0.4) 100%);
  border-radius: 3px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 700px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 700px) and (max-width: 900px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
