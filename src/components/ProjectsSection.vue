<script setup lang="ts">
import { useRouter } from 'vue-router'
import DepthCarousel, { type DepthCarouselCardItem } from './DepthCarousel.vue'

const router = useRouter()

const selectedProjects: DepthCarouselCardItem[] = [
  {
    title: 'Modern Portfolio Platform',
    image: '/slide 1.jfif',
    alt: 'Modern Portfolio Platform preview',
    role: 'Frontend Architect & UI Designer',
    description: 'An ultra-refined editorial portfolio experience crafted with Vue 3, TypeScript, and modern typography. Designed around unified magazine grid principles.',
    tech: ['Vue', 'TypeScript', 'Vite', 'CSS'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'DevPulse Analytics',
    image: '/slide2.jfif',
    alt: 'DevPulse Analytics dashboard preview',
    role: 'Backend & Data Engineer',
    description: 'Developer activity metrics and performance dashboard with real-time Git event aggregation, repository velocity, and workflow visualization.',
    tech: ['Node', 'PostgreSQL', 'TypeScript', 'Docker'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'Macua Project System',
    image: '/slide6.jfif',
    alt: 'Macua Project Management System preview',
    role: 'Full-Stack Developer & Lead Architect',
    description: 'Centralized project monitoring system built for MACUA Construction to coordinate site attendance, materials, and heavy equipment.',
    tech: ['Laravel', 'PHP', 'MySQL', 'CSS'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'OmniFlow Task Engine',
    image: '/slide3.jfif',
    alt: 'OmniFlow Task Engine preview',
    role: 'Systems & Infrastructure Developer',
    description: 'Lightweight distributed task scheduler and background job orchestration pipeline built for scalable asynchronous execution.',
    tech: ['Redis', 'Docker', 'Node', 'TypeScript'],
    actionLabel: 'VISIT SITE',
    actionUrl: 'https://github.com/JStillNoob',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'BioSync Health Portal',
    image: '/slide5.jfif',
    alt: 'BioSync Health Portal preview',
    role: 'Frontend Security & API Integrator',
    description: 'Biometric records synchronizer and patient management system designed for fast clinical workflows and secure data handling.',
    tech: ['Vue', 'TypeScript', 'Node'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'ByteShop Digital Store',
    image: '/slide4.jfif',
    alt: 'ByteShop Digital Products Store preview',
    role: 'Full-Stack E-Commerce Specialist',
    description: 'E-commerce platform for developer assets and digital products with custom Stripe checkout, automated licenses, and seller dashboards.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
]

</script>

<template>
  <section id="projects" class="section">
    <div class="container">
      <div class="section-top-bar">
        <button class="view-more-btn" @click="router.push('/projects')">
          <span>View More</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </button>
      </div>

      <div class="section-header" v-reveal>
        <h2 class="section-title">Things I've built</h2>
      </div>

      <!-- Selected Projects 3D DepthCarousel Showcase -->
      <div class="depth-carousel-wrapper" v-reveal>
        <DepthCarousel
          :items="selectedProjects"
          :card-width="410"
          :card-height="550"
          :radius="20"
          :depth="220"
          :spread="95"
          :tilt="20"
          tilt-direction="right"
          :perspective="1400"
          :visible-cards="4"
          :falloff="0.22"
          :blur="6"
          :duration="650"
          autoplay
          :autoplay-delay="3800"
          loop
          show-controls
          show-indicators
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.depth-carousel-wrapper {
  width: 100%;
  position: relative;
  padding: 10px 0 20px;
}
</style>
