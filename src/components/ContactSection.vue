<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  name: '',
  email: '',
  message: '',
})

const submitted = ref(false)
const submitting = ref(false)

const handleSubmit = () => {
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    submitted.value = true
  }, 1200)
}

const contactLinks = [
  {
    label: 'GitHub',
    value: 'github.com/jessie-alegado',
    href: 'https://github.com',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/jessie-alegado',
    href: 'https://linkedin.com',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  },
  {
    label: 'Email',
    value: 'jessie@example.com',
    href: 'mailto:jessie@example.com',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  },
]
</script>

<template>
  <section id="contact" class="section">
    <div class="container">
      <div class="section-top-bar">
        <button class="view-more-btn" @click="router.push('/contact')">
          <span>View More</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </button>
      </div>

      <div class="section-header">
        <h2 class="section-title">Let's work together</h2>
      </div>
      <p class="contact-intro">
        I'm open to full-time roles, freelance projects, or just a good conversation
        about tech. Drop me a message and I'll get back to you within 24 hours.
      </p>

      <div class="contact-layout">
        <!-- Form -->
        <div class="contact-form-wrap">
          <form class="contact-form" @submit.prevent="handleSubmit" v-if="!submitted">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="Your name"
                required
                autocomplete="off"
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                placeholder="What's on your mind?"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              class="submit-btn"
              :class="{ loading: submitting }"
              :disabled="submitting"
            >
              <span v-if="!submitting">Send Message</span>
              <span v-else class="spinner"></span>
            </button>
          </form>

          <!-- Success state -->
          <div class="success-msg" v-else>
            <div class="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h3>Message sent!</h3>
            <p>Thanks for reaching out. I'll get back to you soon.</p>
          </div>
        </div>

        <!-- Side links -->
        <div class="contact-links">
          <p class="links-label">Or reach me directly</p>
          <a
            v-for="link in contactLinks"
            :key="link.label"
            :href="link.href"
            class="contact-link-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="link-icon" v-html="link.icon"></span>
            <div>
              <p class="link-name">{{ link.label }}</p>
              <p class="link-value">{{ link.value }}</p>
            </div>
            <svg class="link-arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

.contact-intro {
  font-size: 17px;
  color: var(--text-secondary);
  line-height: 1.8;
  max-width: 560px;
  margin-bottom: 44px;
}

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 44px;
  align-items: start;
}

/* Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

label {
  font-size: 14px;
  font-weight: 400;
  color: var(--text-secondary);
}

input,
textarea {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 13px 16px;
  font-size: 15.5px;
  color: var(--text-primary);
  font-family: var(--font-sans);
  transition: border-color var(--transition), box-shadow var(--transition);
  outline: none;
  resize: vertical;
}

input::placeholder,
textarea::placeholder {
  color: var(--text-muted);
}

input:focus,
textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-dim);
}

.submit-btn {
  align-self: flex-start;
  background: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  border: none;
  padding: 12px 26px;
  border-radius: var(--radius-sm);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background var(--transition), box-shadow var(--transition), transform var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  height: 46px;
}
.submit-btn:hover:not(:disabled) {
  background: var(--btn-primary-bg-hover);
  box-shadow: var(--btn-primary-shadow);
  transform: translateY(-1px);
}
.submit-btn.loading { opacity: 0.8; cursor: not-allowed; }

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid var(--border);
  border-top-color: var(--btn-primary-text);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Success */
.success-msg {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 36px;
}
.success-icon {
  width: 60px;
  height: 60px;
  background: var(--accent-dim);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  margin-bottom: 8px;
}
.success-msg h3 {
  font-size: 19px;
  font-weight: 500;
  color: var(--text-primary);
}
.success-msg p {
  font-size: 15px;
  color: var(--text-secondary);
}

/* Contact links */
.contact-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.links-label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.contact-link-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 16px;
  text-decoration: none;
  transition: border-color var(--transition), background var(--transition), transform var(--transition);
  position: relative;
}
.contact-link-card:hover {
  border-color: var(--border);
  background: var(--bg-card-hover);
  transform: translateY(-1px);
}

.link-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--accent-dim);
  border-radius: var(--radius-sm);
  color: var(--accent);
  flex-shrink: 0;
}

.link-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.2;
}

.link-value {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
  word-break: break-all;
}

.link-arrow {
  position: absolute;
  top: 14px;
  right: 14px;
  color: var(--text-muted);
  opacity: 0;
  transition: opacity var(--transition), transform var(--transition);
}
.contact-link-card:hover .link-arrow {
  opacity: 1;
  transform: translate(1px, -1px);
}

@media (max-width: 700px) {
  .contact-layout {
    grid-template-columns: 1fr;
  }
  .contact-links { order: -1; }
}
</style>
