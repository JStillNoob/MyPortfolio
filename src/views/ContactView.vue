<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const submitted = ref(false)
const submitting = ref(false)

const handleSubmit = async () => {
  submitting.value = true
  await new Promise((r) => setTimeout(r, 800))
  submitting.value = false
  submitted.value = true
}

const contactChannels = [
  {
    label: 'Email',
    value: 'jessie@example.com',
    href: 'mailto:jessie@example.com',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  },
  {
    label: 'GitHub',
    value: 'github.com/JStillNoob',
    href: 'https://github.com/JStillNoob',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/jessie',
    href: 'https://linkedin.com',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
  },
]
</script>

<template>
  <div class="page-view">
    <div class="container">
      <button class="back-btn-global" @click="router.push('/')">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        <span>Back to Home</span>
      </button>

      <div class="page-header">
        <h1 class="page-title">Let's Talk</h1>
        <p class="page-subtitle">Available for full-time software roles, contract engineering, and technical collaborations.</p>
      </div>

      <div class="contact-grid">
        <!-- Message form -->
        <div class="form-container">
          <form v-if="!submitted" class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-row">
              <div class="form-group">
                <label for="c-name">Name</label>
                <input id="c-name" v-model="form.name" type="text" placeholder="Your name" required />
              </div>
              <div class="form-group">
                <label for="c-email">Email</label>
                <input id="c-email" v-model="form.email" type="email" placeholder="your@email.com" required />
              </div>
            </div>

            <div class="form-group">
              <label for="c-subject">Subject</label>
              <input id="c-subject" v-model="form.subject" type="text" placeholder="Project Inquiry / Job Opportunity" required />
            </div>

            <div class="form-group">
              <label for="c-msg">Message</label>
              <textarea id="c-msg" v-model="form.message" rows="6" placeholder="Tell me about your project, timeline, or idea..." required></textarea>
            </div>

            <button type="submit" class="submit-btn" :disabled="submitting">
              <span v-if="!submitting">Send Message</span>
              <span v-else class="spinner"></span>
            </button>
          </form>

          <div v-else class="success-state">
            <div class="check-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 class="success-title">Message dispatched!</h2>
            <p class="success-desc">Thank you for getting in touch. I'll review your note and respond within 24 hours.</p>
          </div>
        </div>

        <!-- Sidebar channels -->
        <div class="direct-channels">
          <div class="channels-section">
            <h2 class="sidebar-heading">Direct Channels</h2>
            <div class="channel-list">
              <a v-for="ch in contactChannels" :key="ch.label" :href="ch.href" target="_blank" rel="noopener noreferrer" class="channel-row">
                <span class="channel-icon" v-html="ch.icon"></span>
                <div>
                  <span class="channel-label">{{ ch.label }}</span>
                  <span class="channel-value">{{ ch.value }}</span>
                </div>
              </a>
            </div>
          </div>

          <div class="channels-section">
            <h2 class="sidebar-heading">Availability &amp; Timezone</h2>
            <p class="info-text">Based in Philippines (GMT+8). Open to local hybrid roles and global remote opportunities with flexible overlap.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 56px;
  align-items: start;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

label {
  font-size: 13.5px;
  font-weight: 400;
  color: var(--text-secondary);
}

input,
textarea {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  font-size: 15px;
  color: var(--text-primary);
  font-family: var(--font-sans);
  transition: border-color var(--transition), box-shadow var(--transition);
  outline: none;
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
  padding: 12px 28px;
  border-radius: var(--radius-sm);
  font-size: 14.5px;
  font-weight: 500;
  cursor: pointer;
  transition: background var(--transition), transform var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
}

.submit-btn:hover {
  background: var(--btn-primary-bg-hover);
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.success-state {
  padding: 48px 0;
}

.check-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--accent-dim);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.success-title {
  font-size: 22px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.success-desc {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* Sidebar */
.direct-channels {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.sidebar-heading {
  font-size: 12px;
  font-weight: 400;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-family: var(--font-mono);
  margin-bottom: 16px;
}

.channel-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.channel-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--bg-card);
  transition: border-color var(--transition), background var(--transition);
}

.channel-row:hover {
  border-color: var(--border);
  background: var(--bg-card-hover);
}

.channel-icon {
  color: var(--text-muted);
  display: flex;
  align-items: center;
}

.channel-label {
  font-size: 12px;
  color: var(--text-muted);
  display: block;
}

.channel-value {
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 400;
  display: block;
}

.info-text {
  font-size: 14.5px;
  color: var(--text-secondary);
  line-height: 1.7;
}

@media (max-width: 800px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
