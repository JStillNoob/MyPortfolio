<script setup lang="ts">
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <p class="footer-copy">
        Designed &amp; built by <span class="footer-name">Jessie Alegado Jr.</span>
      </p>
      <p class="footer-mono">
        © {{ new Date().getFullYear() }} · All rights reserved
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 40px 0;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}

.footer-copy {
  font-size: 14.5px;
  color: var(--text-muted);
}

.footer-name {
  color: var(--text-secondary);
  font-weight: 500;
}

.footer-mono {
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--text-muted);
}
</style>
