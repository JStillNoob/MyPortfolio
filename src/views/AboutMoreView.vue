<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import CircularGallery from '../components/CircularGallery.vue'
import TechBadge from '../components/TechBadge.vue'
import GithubActivity from '../components/GithubActivity.vue'
import DepthCarousel, { type DepthCarouselCardItem } from '../components/DepthCarousel.vue'
import { useTheme } from '../composables/useTheme'

const router = useRouter()
const { isDark } = useTheme()

const galleryItems = [
  { image: '/slide 1.jfif', text: 'BioSync' },
  { image: '/slide2.jfif', text: 'DevCon' },
  { image: '/slide3.jfif', text: 'TAGAD' },
  { image: '/slide4.jfif', text: 'TAGAD' },
  { image: '/slide5.jfif', text: 'BioSync' },
  { image: '/slide6.jfif', text: 'Project Management' },
  { image: '/slide8.jfif', text: 'Project Management' },
]

const stats = [
  { value: '3+', label: 'Years Learning' },
  { value: '15+', label: 'Projects Built' },
  { value: '5+', label: 'Core Technologies' },
  { value: '2+', label: 'Client Collaborations' },
]

const currentImage = ref(0)
const isModalOpen = ref(false)
const modalImageIndex = ref(0)

const clientProject = {
  tag: 'SYSTEM INTEGRATION & ARCHITECTURE',
  title: 'Project Management System for Macua Construction',
  logo: '/logo1.png',
  shortBody: 'A centralized project monitoring system built for MACUA Construction to manage construction projects, workers, materials, equipment, and attendance in one place',
  fullBody: 'A centralized project monitoring system built for MACUA Construction to manage construction projects, workers, materials, equipment, and attendance in one place. It helps management monitor project progress, track resources, and generate reports without relying on manual logbooks and spreadsheets.',
  client: 'MACUA Construction',
  role: 'System Architect & Full-Stack Developer',
  timeline: 'Client Project 2023 – 2024',
  status: 'Completed / Active Deployment',
  tech: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
  images: [
    '/slide8.jfif',
    '/slide7.jfif',
    '/slide6.jfif',
  ],
  features: [
    {
      title: 'Project Management',
      tag: 'Core Management',
      desc: 'Create and monitor projects, track their status, and organize projects by milestones.',
      image: '/slide6.jfif',
    },
    {
      title: 'Milestone Tracking',
      tag: 'Progress & Verification',
      desc: 'Track major stages of a project, submit completion updates, and upload proof photos for approval.',
      image: '/slide7.jfif',
    },
    {
      title: 'Attendance / DTR',
      tag: 'Field Workforce',
      desc: 'Digitally record employee time-in and time-out instead of relying on handwritten attendance logbooks.',
      image: '/slide8.jfif',
    },
    {
      title: 'Employee Management',
      tag: 'HR & Personnel',
      desc: 'Manage employee information, positions, and project assignments.',
      image: '/slide 1.jfif',
    },
    {
      title: 'Equipment Tracking',
      tag: 'Asset Management',
      desc: 'Track where equipment is assigned, whether it is in use, returned, damaged, or missing.',
      image: '/slide2.jfif',
    },
    {
      title: 'Material & Inventory Management',
      tag: 'Cost & Waste Control',
      desc: 'Monitor materials and compare the planned quantity vs. actual quantity used to identify possible waste.',
      image: '/slide3.jfif',
    },
    {
      title: 'Supplier Management',
      tag: 'Vendor Directory',
      desc: 'Maintain supplier information and records.',
      image: '/slide4.jfif',
    },
    {
      title: 'Inventory Requests & Purchasing',
      tag: 'Supply Chain',
      desc: 'Request materials, create purchase orders, and record received items.',
      image: '/slide5.jfif',
    },
    {
      title: 'Reports',
      tag: 'PDF & Documentation',
      desc: 'Generate reports for inventory, equipment usage, project milestones, and attendance, including PDF reports.',
      image: '/slide6.jfif',
    },
    {
      title: 'Dashboard',
      tag: 'Executive Overview',
      desc: 'Gives management a centralized view of delayed projects, overdue milestones, equipment assignments, and attendance.',
      image: '/slide7.jfif',
    },
    {
      title: 'User Access Control',
      tag: 'Security & Permissions',
      desc: 'Different users have controlled access to system functions, with authentication and permission checks.',
      image: '/slide8.jfif',
    },
  ],
  challenges: 'Before this system, MACUA Construction managed construction sites using physical paper logbooks, disparate spreadsheets, and manual attendance sheets. This caused delayed communication between field sites and the main office, stock discrepancies, and tedious reporting.',
  solution: 'I designed and developed a centralized, responsive web platform tailored to MACUA Construction’s operational workflow. The system unifies site attendance, materials inventory, and equipment tracking into a single role-based dashboard accessible from any browser.',
}

function prevImage() {
  if (currentImage.value > 0) {
    currentImage.value--
  } else {
    currentImage.value = clientProject.images.length - 1
  }
}

function nextImage() {
  if (currentImage.value < clientProject.images.length - 1) {
    currentImage.value++
  } else {
    currentImage.value = 0
  }
}

function openModal() {
  modalImageIndex.value = currentImage.value
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  isModalOpen.value = false
  document.body.style.overflow = ''
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

const highlightedProjects: DepthCarouselCardItem[] = [
  {
    title: 'Modern Portfolio Platform',
    image: '/slide 1.jfif',
    alt: 'Modern Portfolio Platform preview',
    description: 'An ultra-refined editorial portfolio experience crafted with Vue 3, TypeScript, and modern typography. Designed around unified magazine grid principles.',
    badges: ['Live', 'Vue 3', 'TypeScript'],
    metaLabel: 'TECH STACK',
    metaValue: 'Vue 3 · Vite · CSS Grid',
    actionLabel: 'View Project',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
    liked: false,
  },
  {
    title: 'DevPulse Analytics',
    image: '/slide2.jfif',
    alt: 'DevPulse Analytics dashboard preview',
    description: 'Developer activity metrics and performance dashboard with real-time Git event aggregation, repository velocity, and workflow visualization.',
    badges: ['Live', 'Node.js', 'Chart.js'],
    metaLabel: 'BACKEND & DB',
    metaValue: 'Express · PostgreSQL',
    actionLabel: 'Live Demo',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
    liked: true,
  },
  {
    title: 'Macua Project System',
    image: '/slide6.jfif',
    alt: 'Macua Project Management System preview',
    description: 'Centralized project monitoring system built for MACUA Construction to coordinate site attendance, materials, and heavy equipment.',
    badges: ['Client Work', 'Enterprise', 'Laravel'],
    metaLabel: 'ROLE',
    metaValue: 'Full-Stack Developer',
    actionLabel: 'Case Study',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
    liked: true,
  },
  {
    title: 'OmniFlow Task Engine',
    image: '/slide3.jfif',
    alt: 'OmniFlow Task Engine preview',
    description: 'Lightweight distributed task scheduler and background job orchestration pipeline built for scalable asynchronous execution.',
    badges: ['In Progress', 'Redis', 'Docker'],
    metaLabel: 'SYSTEM',
    metaValue: 'Distributed Worker Queue',
    actionLabel: 'Repository',
    actionUrl: 'https://github.com/JStillNoob',
    githubUrl: 'https://github.com/JStillNoob',
    liked: false,
  },
  {
    title: 'BioSync Health Portal',
    image: '/slide5.jfif',
    alt: 'BioSync Health Portal preview',
    description: 'Biometric records synchronizer and patient management system designed for fast clinical workflows and secure data handling.',
    badges: ['Featured', 'Healthcare', 'Security'],
    metaLabel: 'SPECIALIZATION',
    metaValue: 'Vue 3 · Secure Auth',
    actionLabel: 'Explore',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
    liked: false,
  },
  {
    title: 'ByteShop Digital Store',
    image: '/slide4.jfif',
    alt: 'ByteShop Digital Products Store preview',
    description: 'E-commerce platform for developer assets and digital products with custom Stripe checkout, automated licenses, and seller dashboards.',
    badges: ['Live', 'Commerce', 'Stripe'],
    metaLabel: 'COMMERCE',
    metaValue: 'PHP · MySQL · Stripe',
    actionLabel: 'Live Store',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
    liked: false,
  },
]

const recommendations = [
  {
    text: 'Jessie has a remarkable eye for detail and delivers clean, reliable code. His ability to translate complex requirements into intuitive interfaces made our collaboration effortless.',
    name: 'Collaborator / Peer',
    role: 'Frontend Developer',
    initials: 'CP',
  },
  {
    text: 'A dedicated problem solver who consistently goes beyond basic requirements. His work on our inventory system exceeded expectations and remains indispensable.',
    name: 'Client Partner',
    role: 'Business Owner',
    initials: 'BP',
  },
]
</script>

<template>
  <div class="page-view">
    <div class="container">
      <!-- Back button -->
      <button class="back-btn-global" @click="router.push('/')">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        <span>Back to Home</span>
      </button>

      <!-- 01 — Introduction -->
      <section id="s-intro" class="story-section">
        <h1 class="story-headline">Building my career,<br/><em>one project at a time.</em></h1>
        <p class="story-lead">
          My journey in Information Technology started with learning the fundamentals and gradually grew through hands-on projects, collaboration, and real-world problem solving.
        </p>

        <!-- Tight Circular Gallery without boxed card border -->
        <div class="gallery-viewport">
          <CircularGallery
            :items="galleryItems"
            :bend="2.2"
            :text-color="isDark ? '#f6f6f6' : '#18181c'"
            :border-radius="0.06"
            font="500 22px Roboto, sans-serif"
            :scroll-speed="2"
            :scroll-ease="0.05"
          />
        </div>

        <div class="stats-row">
          <div v-for="stat in stats" :key="stat.label" class="stat-cell">
            <span class="stat-number">{{ stat.value }}</span>
            <span class="stat-title">{{ stat.label }}</span>
          </div>
        </div>
      </section>

      <!-- 02 — First Real Client Work (Clean grid, NO heavy card container) -->
      <section id="s-client" class="story-section">
        <h2 class="section-heading">First Real Client Work</h2>

        <div class="client-story-layout">
          <!-- Single Project Image Carousel -->
          <div class="client-visual-col">
            <img
              :src="clientProject.images[currentImage]"
              :alt="`${clientProject.title} screenshot ${currentImage + 1}`"
              class="client-img"
            />

            <!-- Sleek Glassmorphism Carousel Controls (only visible when multiple images exist) -->
            <div v-if="clientProject.images.length > 1" class="img-carousel-overlay">
              <button
                class="img-nav-btn prev"
                @click="prevImage"
                aria-label="Previous screenshot"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>

              <div class="img-dots-pill">
                <span
                  v-for="(_, idx) in clientProject.images"
                  :key="idx"
                  class="img-dot"
                  :class="{ active: currentImage === idx }"
                  @click="currentImage = idx"
                />
              </div>

              <button
                class="img-nav-btn next"
                @click="nextImage"
                aria-label="Next screenshot"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="client-detail-col">
            <span class="client-tag">{{ clientProject.tag }}</span>
            <h3 class="client-work-title">{{ clientProject.title }}</h3>
            <p class="client-work-body">
              {{ clientProject.shortBody }}...
              <button class="more-link-btn" @click="openModal">more</button>
            </p>
            <div class="client-tech-stack">
              <TechBadge v-for="t in clientProject.tech" :key="t" :name="t" />
            </div>
          </div>
        </div>
      </section>

      <!-- Project Details Modal -->
      <Teleport to="body">
        <Transition name="modal-fade">
          <div
            v-if="isModalOpen"
            class="modal-backdrop"
            @click.self="closeModal"
            role="dialog"
            aria-modal="true"
            :aria-label="clientProject.title"
          >
            <div class="modal-card">
              <!-- Modal Header -->
              <div class="modal-header">
                <div class="modal-header-left">
                  <div class="modal-avatar-wrapper">
                    <img
                      :src="clientProject.logo"
                      alt="Project Logo"
                      class="modal-avatar-img"
                    />
                  </div>
                  <div class="modal-header-text">
                    <span class="modal-tag">{{ clientProject.tag }}</span>
                    <h3 class="modal-title">{{ clientProject.title }}</h3>
                  </div>
                </div>
                <button class="modal-close-btn" @click="closeModal" aria-label="Close modal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                  </svg>
                </button>
              </div>

              <!-- Modal Scrollable Content -->
              <div class="modal-body">
                <!-- Large Image Viewer / Carousel inside modal -->
                <div class="modal-gallery">
                  <div class="modal-img-wrapper">
                    <img
                      :src="clientProject.images[modalImageIndex]"
                      :alt="`${clientProject.title} preview ${modalImageIndex + 1}`"
                      class="modal-img"
                    />
                  </div>
                  <div v-if="clientProject.images.length > 1" class="modal-gallery-controls">
                    <button
                      class="modal-nav-btn"
                      @click="modalImageIndex = (modalImageIndex - 1 + clientProject.images.length) % clientProject.images.length"
                      aria-label="Previous screenshot"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <div class="modal-gallery-dots">
                      <button
                        v-for="(_, idx) in clientProject.images"
                        :key="idx"
                        class="modal-gallery-dot"
                        :class="{ active: modalImageIndex === idx }"
                        @click="modalImageIndex = idx"
                        :aria-label="`Screenshot ${idx + 1}`"
                      />
                    </div>
                    <button
                      class="modal-nav-btn"
                      @click="modalImageIndex = (modalImageIndex + 1) % clientProject.images.length"
                      aria-label="Next screenshot"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                  </div>
                </div>

                <!-- Project Summary -->
                <div class="modal-section">
                  <h4 class="modal-section-title">Project Summary</h4>
                  <p class="modal-paragraph">{{ clientProject.fullBody }}</p>
                </div>

                <!-- System Features & Capabilities -->
                <div class="modal-section">
                  <div class="modal-features-header">
                    <div>
                      <h4 class="modal-section-title">System Features & Modules</h4>
                      <p class="modal-section-subtitle">
                        End-to-end modules engineered for MACUA Construction's active field and enterprise operations.
                      </p>
                    </div>
                    <span class="feature-count-badge">{{ clientProject.features.length }} Modules</span>
                  </div>

                  <div class="features-card-list">
                    <div
                      v-for="feat in clientProject.features"
                      :key="feat.title"
                      class="feature-row-card"
                    >
                      <!-- Left side: Image -->
                      <div class="feature-card-media">
                        <img
                          :src="feat.image"
                          :alt="feat.title"
                          class="feature-card-img"
                          loading="lazy"
                        />
                      </div>

                      <!-- Right side: Content -->
                      <div class="feature-card-content">
                        <h5 class="feature-title">{{ feat.title }}</h5>
                        <p class="feature-desc">{{ feat.desc }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Technologies Used -->
                <div class="modal-section">
                  <h4 class="modal-section-title">Technologies & Architecture</h4>
                  <div class="client-tech-stack">
                    <TechBadge v-for="t in clientProject.tech" :key="t" :name="t" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

      <!-- 03 — Selected Project -->
      <section id="s-projects" class="story-section selected-projects-section">
        <div class="selected-projects-header">
          <h2 class="section-heading">Selected Project</h2>
          <button class="view-projects-link" @click="router.push('/projects')">
            <span>Go to projects</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div class="depth-carousel-wrapper">
          <DepthCarousel
            :items="highlightedProjects"
            :card-width="340"
            :card-height="480"
            :radius="18"
            :depth="210"
            :spread="85"
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
      </section>

      <!-- 04 — Recommendations (Editorial quotes, NO boxed cards) -->
      <section id="s-recs" class="story-section">
        <h2 class="section-heading">Recommendations</h2>

        <div class="quotes-grid">
          <div v-for="(rec, idx) in recommendations" :key="idx" class="quote-item">
            <p class="quote-body">“{{ rec.text }}”</p>
            <div class="quote-author">
              <span class="author-name">{{ rec.name }}</span>
              <span class="author-dot">·</span>
              <span class="author-role">{{ rec.role }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 05 — GitHub Activity -->
      <section id="s-github" class="story-section">
        <h2 class="section-heading">GitHub Activity</h2>

        <div class="github-clean-block">
          <!-- GitHub Activity Calendar Widget -->
          <GithubActivity username="JStillNoob" :title="''" />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.story-section {
  padding: 56px 0;
  border-bottom: 1px solid var(--border-subtle);
}

.story-section:first-of-type {
  padding-top: 0;
}

.story-section:last-of-type {
  border-bottom: none;
  padding-bottom: 80px;
}

.section-top-label {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.story-headline {
  font-size: clamp(32px, 4.5vw, 50px);
  font-weight: 400;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  line-height: 1.15;
  margin-bottom: 16px;
}

.story-headline em {
  font-style: italic;
  opacity: 0.7;
}

.section-heading {
  font-size: 32px;
  font-weight: 400;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: 28px;
}

.story-lead {
  font-size: 16px;
  font-weight: 400;
  color: var(--text-secondary);
  line-height: 1.75;
  max-width: 640px;
  margin-bottom: 20px;
}

/* 01 — Gallery: tight, floating on page with balanced vertical spacing */
.gallery-viewport {
  width: 100%;
  height: 310px;
  overflow: hidden;
  margin-bottom: 12px;
  position: relative;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding-top: 0;
}

.stat-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-number {
  font-size: 26px;
  font-weight: 400;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  font-family: var(--font-sans);
}

.stat-title {
  font-size: 12px;
  font-weight: 400;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  font-family: var(--font-mono);
}

/* 02 — Client Work: Clean editorial presentation without boxed card */
.client-story-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.client-visual-col {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  position: relative;
  background: var(--bg-card);
}

.client-img {
  width: 100%;
  height: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: center;
  display: block;
}

.img-carousel-overlay {
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  pointer-events: none;
}

.img-nav-btn {
  pointer-events: auto;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(18, 18, 22, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition);
  opacity: 0.85;
}

.img-nav-btn:hover {
  opacity: 1;
  transform: scale(1.08);
  background: rgba(18, 18, 22, 0.85);
  border-color: rgba(255, 255, 255, 0.35);
}

.img-dots-pill {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 9px;
  border-radius: var(--radius-full);
  background: rgba(18, 18, 22, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.img-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.38);
  cursor: pointer;
  transition: all var(--transition);
}

.img-dot.active {
  background: #ffffff;
  width: 14px;
  border-radius: 3px;
}

.client-detail-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.client-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.client-work-title {
  font-size: 22px;
  font-weight: 400;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.client-work-body {
  font-size: 14.5px;
  color: var(--text-secondary);
  line-height: 1.75;
}

.more-link-btn {
  background: none;
  border: none;
  padding: 0;
  margin-left: 4px;
  font-family: inherit;
  font-size: inherit;
  color: var(--text-primary);
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
  opacity: 0.85;
  transition: opacity var(--transition), color var(--transition);
}

.more-link-btn:hover {
  opacity: 1;
  color: var(--accent);
}

.client-tech-stack {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  margin-top: 6px;
}

.tag-pill {
  font-size: 12px;
  font-weight: 400;
  color: var(--text-muted);
  background: transparent;
  border: 1px solid var(--border);
  padding: 3px 10px;
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
}

/* 03 — Highlighted Projects: DepthCarousel + Card12 Showcase */
.selected-projects-section {
  position: relative;
  overflow: visible;
}

.selected-projects-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.selected-projects-header .section-heading {
  margin-bottom: 0;
}

.view-projects-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  padding: 4px 0;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
  transition: color var(--transition), transform var(--transition);
}

.view-projects-link:hover {
  color: var(--text-primary);
  transform: translateX(4px);
}

.depth-carousel-wrapper {
  width: 100%;
  position: relative;
  padding: 10px 0 20px;
}

/* 04 — Recommendations: Clean editorial quotes */
.quotes-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.quote-item {
  padding-left: 20px;
  border-left: 2px solid var(--border);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.quote-body {
  font-size: 14.5px;
  color: var(--text-secondary);
  line-height: 1.75;
  font-style: italic;
  margin-bottom: 16px;
}

.quote-author {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.author-name {
  color: var(--text-primary);
  font-weight: 500;
}

.author-dot {
  color: var(--text-muted);
}

.author-role {
  color: var(--text-muted);
  font-size: 12px;
}

/* 05 — GitHub clean block */
.github-clean-block {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* =============================================
   PROJECT DETAILS MODAL
   ============================================= */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(10, 10, 12, 0.78);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  overflow-y: auto;
}

.modal-card {
  width: 100%;
  max-width: 860px;
  max-height: 90vh;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px var(--border-subtle);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  animation: modalScaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalScaleIn {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 28px 18px;
  border-bottom: 1px solid var(--border-subtle);
  gap: 16px;
  flex-shrink: 0;
}

.modal-header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.modal-avatar-wrapper {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: #ffffff;
  padding: 6px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.28);
}

.modal-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.modal-header-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.modal-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.modal-title {
  font-size: 24px;
  font-weight: 400;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.modal-close-btn {
  background: transparent;
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all var(--transition);
}

.modal-close-btn:hover {
  background: var(--bg-card-hover);
  color: var(--text-primary);
  border-color: var(--border);
  transform: rotate(90deg);
}

.modal-body {
  padding: 24px 28px 32px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* Modal Gallery */
.modal-gallery {
  width: 100%;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  background: var(--bg-card);
  position: relative;
}

.modal-img-wrapper {
  width: 100%;
  aspect-ratio: 4 / 3;
  max-height: 480px;
  background: #000000;
  overflow: hidden;
}

.modal-img {
  width: 100%;
  height: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: center;
  display: block;
}

.modal-gallery-controls {
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  pointer-events: none;
}

.modal-nav-btn {
  pointer-events: auto;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(18, 18, 22, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition);
}

.modal-nav-btn:hover {
  background: rgba(18, 18, 22, 0.95);
  transform: scale(1.08);
}

.modal-gallery-dots {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  background: rgba(18, 18, 22, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.modal-gallery-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  border: none;
  cursor: pointer;
  transition: all var(--transition);
  padding: 0;
}

.modal-gallery-dot.active {
  background: #ffffff;
  width: 14px;
  border-radius: 3px;
}

/* Modal Metadata Grid */
.modal-meta-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.meta-label {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}

.meta-value {
  font-size: 13.5px;
  font-weight: 500;
  color: var(--text-primary);
}

/* Modal Sections */
.modal-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-section-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.modal-paragraph {
  font-size: 14.5px;
  color: var(--text-secondary);
  line-height: 1.75;
}

/* 2-col challenge/solution grid */
.modal-grid-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.modal-section-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.modal-section-label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.modal-card-text {
  font-size: 13.5px;
  color: var(--text-secondary);
  line-height: 1.65;
}

/* Features List (Clean Unboxed Layout: Image on left, Content on right) */
.modal-features-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.modal-section-subtitle {
  font-size: 13.5px;
  color: var(--text-muted);
  line-height: 1.5;
  margin-top: 3px;
}

.feature-count-badge {
  font-family: var(--font-mono);
  font-size: 11.5px;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  background: transparent;
  border: none;
  padding: 0;
}

.features-card-list {
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-top: 14px;
}

.feature-row-card {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 22px;
  background: transparent;
  border: none;
  padding: 0;
  align-items: center;
}

.feature-card-media {
  border-radius: 14px;
  overflow: hidden;
  position: relative;
  background: #000000;
  width: 100%;
  height: 155px;
}

.feature-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.feature-row-card:hover .feature-card-img {
  transform: scale(1.04);
}

.feature-card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
}

.feature-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.35;
  letter-spacing: -0.01em;
  margin: 0;
}

.feature-desc {
  font-size: 13.5px;
  color: var(--text-secondary);
  line-height: 1.65;
  margin: 0;
}

/* Modal transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.22s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 800px) {
  .modal-card {
    max-height: 94vh;
  }
  .modal-header,
  .modal-body {
    padding: 18px 20px;
  }
  .modal-avatar-wrapper {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    padding: 5px;
  }
  .modal-meta-grid {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .modal-grid-2col {
    grid-template-columns: 1fr;
  }
  .feature-row-card {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 0;
  }
  .feature-card-media {
    height: 180px;
    min-height: 180px;
  }
  .client-story-layout {
    grid-template-columns: 1fr;
  }
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
  .quotes-grid {
    grid-template-columns: 1fr;
  }
  .gallery-viewport {
    height: 340px;
  }
}
</style>
