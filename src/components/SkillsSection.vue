<script setup lang="ts">
import { useRouter } from 'vue-router'
import LogoLoop, { type LogoItem, type LogoItemNode } from './LogoLoop.vue'
import TechnologyPill from './TechnologyPill.vue'
import { allTechnologies, type Technology } from '../data/technologies'

type TechnologyLoopItem = LogoItemNode & { technology: Technology }

const router = useRouter()

const logoRows: TechnologyLoopItem[][] = Array.from({ length: 4 }, (_, rowIndex) =>
  allTechnologies
    .filter((_, technologyIndex) => technologyIndex % 4 === rowIndex)
    .map(technology => ({
      node: '',
      title: technology.name,
      ariaLabel: technology.name,
      technology,
    })),
)

const rowDirections = ['left', 'right', 'left', 'right'] as const
const rowSpeeds = [22, 18, 24, 20]

const getTechnology = (item: LogoItem) =>
  (item as TechnologyLoopItem).technology
</script>

<template>
  <section id="technologies" class="section technologies-section" aria-label="Technologies">
    <div class="container">
      <div class="technologies-heading" v-reveal>
        <h2 class="section-title">Technologies</h2>
        <button class="view-more-btn" @click="router.push('/technologies')">
          <span>View All</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </button>
      </div>

      <div class="technology-loops" v-reveal>
        <LogoLoop
          v-for="(row, index) in logoRows"
          :key="index"
          :logos="row"
          :speed="rowSpeeds[index]"
          :direction="rowDirections[index]"
          :logo-height="50"
          :gap="18"
          :hover-speed="0"
          :scale-on-hover="true"
          :fade-out="true"
          aria-label="Technology logos"
          class-name="technology-logo-loop"
        >
          <template #renderItem="{ item }">
            <TechnologyPill :technology="getTechnology(item)" compact />
          </template>
        </LogoLoop>
      </div>
    </div>
  </section>
</template>

<style scoped>
.technologies-section {
  display: flex;
  align-items: center;
  padding-top: 60px;
  padding-bottom: 60px;
}

.technologies-section > .container {
  position: relative;
  top: -28px;
}

.technologies-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.technology-loops {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  overflow: hidden;
}

.technology-logo-loop {
  width: 100%;
}

@media (max-width: 600px) {
  .technologies-section {
    padding-top: 84px;
    padding-bottom: 48px;
  }

  .technologies-heading {
    align-items: flex-end;
    gap: 16px;
  }

  .technologies-section > .container {
    top: -16px;
  }

  .technology-loops {
    gap: 10px;
  }
}
</style>
