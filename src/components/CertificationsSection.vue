<script setup lang="ts">
import { useRouter } from 'vue-router'
import CertificateGallery from './CertificateGallery.vue'
import { certifications } from '../data/certifications'

const router = useRouter()
const featuredCertifications = certifications.slice(0, 3)
</script>

<template>
  <section id="certifications" class="section certifications-section">
    <div class="container">
      <div class="section-top-bar certifications-top-bar" v-reveal>
        <button class="view-more-btn" @click="router.push('/certifications')">
          <span>View More</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </button>
      </div>

      <div class="section-header certification-header" v-reveal>
        <h2 class="section-title">Certifications &amp; Credentials</h2>
        <p class="section-description">Proof of learning. Progress through practice.</p>
      </div>

      <div class="gallery-reveal reveal-on-scroll" v-reveal>
        <CertificateGallery
          :items="featuredCertifications"
          aria-label="Featured certifications"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.certifications-section {
  padding-bottom: 88px;
}

.certifications-top-bar {
  margin-bottom: 20px;
}

.certification-header {
  max-width: 600px;
  margin-bottom: 42px;
}

.section-description {
  margin-top: 10px;
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.7;
}

@media (max-width: 520px) {
  .certification-header {
    margin-bottom: 34px;
  }
}
</style>
