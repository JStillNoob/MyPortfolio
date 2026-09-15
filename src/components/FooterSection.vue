<script setup lang="ts">
</script>

<template>
  <footer class="footer-wrapper">
    <p class="footer-quote">Curiosity into craft.</p>
    <div class="footer-meta">
      <span class="meta-name">Jessie Alegado Jr.</span>
      <span class="meta-sep">/</span>
      <span class="meta-location">Davao City, Philippines</span>
    </div>
  </footer>
</template>

<style scoped>
.footer-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  user-select: none;
}

.footer-quote {
  font-family: var(--font-sans);
  font-style: italic;
  font-size: 13.5px;
  color: var(--text-muted);
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.footer-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12.5px;
  line-height: 1.4;
}

.meta-name {
  color: var(--text-primary);
  font-weight: 100;
  letter-spacing: -0.010em;
}

.meta-sep {
  color: var(--text-muted);
  opacity: 1;
  font-weight: 500;
}

.meta-status,
.meta-location {
  color: var(--text-muted);
}
</style>
