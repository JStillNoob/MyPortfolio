<script setup lang="ts">
import { useRouter } from 'vue-router'
import CertificateGallery from '../components/CertificateGallery.vue'
import { certifications } from '../data/certifications'

const router = useRouter()
</script>

<template>
  <div class="page-view certifications-view">
    <div class="container">
      <button class="back-btn-global" @click="router.push('/')">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        <span>Back to Home</span>
      </button>

      <div class="page-header" v-reveal>
        <h1 class="page-title">Certifications &amp; Credentials</h1>
        <p class="page-subtitle">Proof of learning. Progress through practice.</p>
      </div>

      <div class="gallery-reveal reveal-on-scroll" v-reveal>
        <CertificateGallery
          :items="certifications"
          aria-label="All certifications"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  max-width: 620px;
  margin-bottom: 52px;
}

.page-subtitle {
  margin-bottom: 0;
}

@media (max-width: 520px) {
  .page-header {
    margin-bottom: 40px;
  }
}
</style>
