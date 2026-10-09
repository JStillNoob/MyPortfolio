<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Technology } from '../data/technologies'
import { useTheme } from '../composables/useTheme'

const props = withDefaults(defineProps<{
  technology: Technology
  compact?: boolean
}>(), {
  compact: false,
})

const logoFailed = ref(false)
const { isDark } = useTheme()

watch(() => props.technology.logo, () => {
  logoFailed.value = false
})
</script>

<template>
  <span
    class="technology-pill"
    :class="{
      'technology-pill-compact': compact,
      'technology-pill-dark': isDark,
    }"
  >
    <span class="technology-icon" :class="{ 'technology-icon-monochrome': technology.monochrome }">
      <img
        v-if="technology.logo && !logoFailed"
        :src="technology.logo"
        alt=""
        loading="lazy"
        decoding="async"
        @error="logoFailed = true"
      />
      <span v-else class="technology-mark" aria-hidden="true">{{ technology.mark }}</span>
    </span>
    <span class="technology-name">{{ technology.name }}</span>
  </span>
</template>

<style scoped>
.technology-pill {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 38px;
  padding: 7px 13px;
  color: var(--text-secondary);
  background: var(--bg-card);
  border: 1px dashed var(--border);
  border-radius: 9px;
  white-space: nowrap;
  transition: color var(--transition), border-color var(--transition), background var(--transition), transform var(--transition);
}

.technology-pill:hover {
  color: var(--text-primary);
  border-color: var(--accent);
  background: var(--bg-card-hover);
  transform: translateY(-1px);
}

.technology-pill-compact {
  min-height: 50px;
  padding: 11px 18px;
  gap: 11px;
}

.technology-pill-compact .technology-icon {
  width: 24px;
  height: 24px;
}

.technology-pill-compact .technology-name {
  font-size: 15px;
}

.technology-icon {
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.technology-icon img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}

.technology-pill-dark .technology-icon-monochrome img {
  filter: invert(1);
}

.technology-mark {
  min-width: 18px;
  height: 18px;
  padding: 0 3px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  background: var(--accent-dim);
  border: 1px solid var(--border);
  border-radius: 5px;
  font-family: var(--font-mono);
  font-size: 8px;
  font-weight: 700;
  line-height: 1;
}

.technology-name {
  font-size: 13.5px;
  font-weight: 500;
  line-height: 1;
}
</style>
