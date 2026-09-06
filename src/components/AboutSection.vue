<script setup lang="ts">
</script>

<template>
  <section id="about" class="section about-section">
    <div class="container">
      <p class="section-label">About</p>
      <div class="about-grid">
        <div class="about-main">
          <h2 class="about-heading">Hey, I'm Jessie 👋</h2>
          <p class="about-text">
            I'm a passionate full-stack developer based in the Philippines.
            I enjoy transforming ideas into clean, efficient digital products.
            My work spans from building interactive user interfaces to designing
            scalable backend systems.
          </p>
          <p class="about-text">
            When I'm not coding, I'm usually exploring new frameworks, contributing
            to open-source projects, or leveling up my problem-solving skills through
            competitive programming. I believe great software is built with both
            technical skill and empathy for the end user.
          </p>

          <div class="highlights">
            <div class="highlight-item" v-for="item in highlights" :key="item.label">
              <span class="highlight-icon" v-html="item.icon"></span>
              <div>
                <p class="highlight-value">{{ item.value }}</p>
                <p class="highlight-label">{{ item.label }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="about-side">
          <div class="info-card">
            <div class="info-row" v-for="info in infoItems" :key="info.label">
              <span class="info-label">{{ info.label }}</span>
              <span class="info-value">{{ info.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  data() {
    return {
      highlights: [
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
          value: '3+ Years',
          label: 'Coding Experience',
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
          value: '15+ Projects',
          label: 'Completed',
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
          value: 'Open',
          label: 'to Opportunities',
        },
      ],
      infoItems: [
        { label: 'Location',     value: 'Philippines 🇵🇭' },
        { label: 'Role',         value: 'Full-Stack Developer' },
        { label: 'Stack',        value: 'Vue · Node · PHP' },
        { label: 'Status',       value: '✦ Available' },
        { label: 'Languages',    value: 'English · Filipino' },
      ],
    }
  },
}
</script>

<style scoped>
.about-section {
}

.about-heading {
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 22px;
  color: var(--text-primary);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 56px;
  align-items: start;
}

.about-text {
  font-size: 17px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 20px;
}

/* Highlights */
.highlights {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 36px;
  padding-top: 36px;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 14px;
}

.highlight-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background: var(--accent-dim);
  border-radius: var(--radius-sm);
  color: var(--accent);
  flex-shrink: 0;
}

.highlight-value {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.2;
}

.highlight-label {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 2px;
}

/* Info card */
.info-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 15px 0;
  border-bottom: 1px solid var(--border-subtle);
}
.info-row:first-child { padding-top: 0; }
.info-row:last-child  { padding-bottom: 0; border-bottom: none; }

.info-label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.info-value {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
}

@media (max-width: 700px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .about-side { order: -1; }
}
</style>
