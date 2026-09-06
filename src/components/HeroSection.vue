<script setup lang="ts">
import PixelTransition from './PixelTransition.vue';

const imgPrimary = '/jessie_pixel_image.png';
const imgSecondary = '/resumeIMG.png';

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  },
  {
    label: 'Email',
    href: 'mailto:jessie@example.com',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  },
];
</script>

<template>
  <section id="home" class="hero section">
    <div class="container">
      <!-- Avatar + Name row -->
      <div class="hero-identity fade-in">
        <div class="avatar-wrapper">
          <PixelTransition
            :grid-size="10"
            pixel-color="#ffffff"
            :animation-step-duration="0.35"
            class-name="avatar-pixel-card"
          >
            <template #first>
              <img :src="imgPrimary" alt="Jessie Alegado Jr." class="avatar-img" />
            </template>
            <template #second>
              <img :src="imgSecondary" alt="Jessie Alegado Jr." class="avatar-img" />
            </template>
          </PixelTransition>
        </div>
        <div class="identity-text">
          <h1 class="hero-name">Jessie Alegado Jr.</h1>
          <div class="social-row">
            <a
              v-for="s in socials"
              :key="s.label"
              :href="s.href"
              :aria-label="s.label"
              class="social-icon"
              target="_blank"
              rel="noopener noreferrer"
              v-html="s.icon"
            />
          </div>
        </div>
      </div>

      <!-- Role headline -->
      <h1 class="hero-headline fade-in delay-1">
        Full-Stack Developer
        <span class="headline-divider">—</span>
        <span class="headline-accent">Building things for the web.</span>
      </h1>

      <!-- Bio -->
      <p class="hero-bio fade-in delay-2">
        I'm a full-stack developer who loves crafting clean, performant web
        applications. I enjoy working across the stack — from designing intuitive
        UIs to building robust APIs. Currently exploring modern JavaScript
        frameworks and cloud-native architectures.
      </p>

      <!-- CTA row -->
      <div class="hero-cta fade-in delay-3">
        <a href="#projects" class="btn btn-primary">
          View Projects
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
        <a href="#contact" class="btn btn-ghost">Get in touch</a>
      </div>

      <!-- Tech badge strip -->
      <div class="tech-strip fade-in delay-4">
        <span class="tech-badge" v-for="tech in ['Vue.js', 'TypeScript', 'Node.js', 'PHP', 'MySQL', 'Git']" :key="tech">
          {{ tech }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: 130px;
  padding-bottom: 110px;
}

/* Identity row */
.hero-identity {
  display: flex;
  align-items: center;
  gap: 26px;
  margin-bottom: 44px;
}

.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid var(--border);
  object-fit: cover;
  object-position: center top;
  filter: grayscale(10%);
  transition: border-color var(--transition);
}
.avatar:hover { border-color: var(--accent); }

.status-dot {
  position: absolute;
  bottom: 10px;
  right: 15px;
  width: 20px;
  height: 20px;
  background: #ffffff;
  border-radius: 100%;
  border: 2px solid var(--bg-primary);
  animation: pulse 2.5s infinite;
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
  50%       { box-shadow: 0 0 0 5px rgba(255, 255, 255, 0); }
}

.identity-text {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hero-name {
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--text-primary);
  line-height: 1.2;
}

.social-row {
  display: flex;
  align-items: center;
  gap: 2px;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  transition: color var(--transition), background var(--transition);
}
.social-icon:hover {
  color: var(--accent);
  background: var(--bg-card);
}

/* Headlines */
.hero-headline {
  font-size: clamp(30px, 3.5vw, 40px);
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.2;
  color: var(--text-primary);
  margin-bottom: 26px;
}

.headline-divider {
  color: var(--text-muted);
  margin: 0 6px;
  font-weight: 300;
}

.headline-accent {
  color: var(--text-secondary);
  font-weight: 200;
}

/* Bio */
.hero-bio {
  font-size: 17px;
  color: var(--text-secondary);
  line-height: 1.8;
  max-width: 800px;
  margin-bottom: 40px;
}

/* CTA */
.hero-cta {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 44px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  font-size: 15px;
  font-weight: 500;
  transition: all var(--transition);
  cursor: pointer;
  text-decoration: none;
}

.btn-primary {
  background: var(--accent);
  color: #18181c;
}
.btn-primary:hover {
  background: #d9d4ff;
  box-shadow: 0 0 28px rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
}
.btn-ghost:hover {
  color: var(--text-primary);
  border-color: var(--border);
  background: var(--bg-card);
}

/* Tech badge strip */
.tech-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-badge {
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--text-muted);
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 5px 14px;
  border-radius: var(--radius-full);
  transition: color var(--transition), border-color var(--transition);
}
.tech-badge:hover {
  color: var(--accent);
  border-color: rgba(197, 190, 255, 0.3);
}

@media (max-width: 480px) {
  .hero-identity { flex-direction: column; align-items: flex-start; }
  .hero { padding-top: 130px; }
}

.avatar-wrapper {
  position: relative;
  width: 175px;
  height: 175px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--border);
  box-shadow: 0 0 0 0 rgba(197, 190, 255, 0);
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  flex-shrink: 0;
}

.avatar-wrapper:hover {
  border-color: var(--accent);
  box-shadow: 0 0 28px rgba(197, 190, 255, 0.3);
  transform: scale(1.03);
}

.avatar-pixel-card {
  width: 100%;
  height: 100%;
  cursor: pointer;
  user-select: none;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  display: block;
}


</style>
