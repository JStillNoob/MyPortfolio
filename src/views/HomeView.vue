<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue'
import EducationSection from '../components/EducationSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import CertificationsSection from '../components/CertificationsSection.vue'
import ContactSection from '../components/ContactSection.vue'
</script>

<template>
  <div class="home-view">
    <HeroSection />
    <EducationSection />
    <ProjectsSection />
    <SkillsSection />
    <CertificationsSection />
    <ContactSection />
  </div>
</template>

<style scoped>
.home-view {
  min-height: 100vh;
}
</style>
