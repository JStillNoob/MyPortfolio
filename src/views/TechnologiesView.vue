<script setup lang="ts">
import { useRouter } from 'vue-router'
import TechnologyPill from '../components/TechnologyPill.vue'
import { technologyCategories } from '../data/technologies'

const router = useRouter()
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
        <h1 class="page-title">Full Tech Stack</h1>
        <p class="page-subtitle">Technologies, platforms, and practices organized by purpose.</p>
      </div>

      <div class="technology-categories">
        <section
          v-for="category in technologyCategories"
          :key="category.number"
          class="technology-category"
          v-reveal
        >
          <div class="category-heading">
            <span class="category-number">{{ category.number }}</span>
            <div>
              <h2 class="category-name">{{ category.label }}</h2>
              <p class="category-purpose">{{ category.purpose }}</p>
            </div>
          </div>

          <div class="technology-list reveal-stagger" v-reveal>
            <TechnologyPill
              v-for="technology in category.technologies"
              :key="technology.name"
              :technology="technology"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.technology-categories {
  display: flex;
  flex-direction: column;
}

.technology-category {
  display: grid;
  grid-template-columns: minmax(220px, 0.85fr) minmax(0, 1.65fr);
  gap: 32px 48px;
  padding: 38px 0;
  border-bottom: 1px solid var(--border-subtle);
}

.technology-category:first-child {
  border-top: 1px solid var(--border-subtle);
}

.category-heading {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  align-items: start;
  gap: 10px;
}

.category-number {
  padding-top: 3px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
}

.category-name {
  margin: 0 0 7px;
  color: var(--text-primary);
  font-size: 17px;
  font-weight: 500;
  line-height: 1.35;
}

.category-purpose {
  max-width: 330px;
  margin: 0;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.6;
}

.technology-list {
  display: flex;
  align-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 820px) {
  .technology-category {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .category-purpose {
    max-width: 520px;
  }
}

@media (max-width: 480px) {
  .technology-category {
    padding: 30px 0;
  }

  .category-heading {
    grid-template-columns: 28px minmax(0, 1fr);
  }
}
</style>
