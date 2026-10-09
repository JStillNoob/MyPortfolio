<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const education = [
  {
    degree: 'BS Information Technology Major in Service Management',
    school: 'University of Mindanao - Matina Campus',
    location: 'Davao City',
    period: '2027 (Expected)',
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
              <div>
                <h3 class="edu-school">{{ edu.school }}</h3>
                <span class="edu-degree">{{ edu.degree }}</span>
              </div>
              <div class="edu-place">
                <span>{{ edu.location }}</span>
                <span class="edu-period">{{ edu.period }}</span>
              </div>
            </div>
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
  font-size: 14px;
  font-weight: 400;
  color: var(--text-secondary);
  letter-spacing: -0.01em;
  line-height: 1.4;
}

.edu-school {
  font-size: 17px;
  color: var(--text-primary);
  font-weight: 600;
  margin: 0 0 4px;
}

.edu-period {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
}

.edu-place {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  font-size: 14px;
  color: var(--text-secondary);
}

@media (max-width: 480px) {
  .edu-header { flex-direction: column; }
  .edu-place { align-items: flex-start; }
}
</style>
