<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Certification } from '../data/certifications'

withDefaults(defineProps<{
  items: Certification[]
  ariaLabel?: string
}>(), {
  ariaLabel: 'Certificate gallery',
})

const selectedCertificate = ref<Certification | null>(null)
const dialogRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)
let previewTrigger: HTMLElement | null = null
let previousBodyOverflow = ''

const openPreview = async (certificate: Certification, event: MouseEvent) => {
  if (!certificate.image) return

  previewTrigger = event.currentTarget as HTMLElement
  selectedCertificate.value = certificate
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'

  await nextTick()
  closeButtonRef.value?.focus()
}

const closePreview = async () => {
  if (!selectedCertificate.value) return

  selectedCertificate.value = null
  document.body.style.overflow = previousBodyOverflow

  await nextTick()
  previewTrigger?.focus()
  previewTrigger = null
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!selectedCertificate.value) return

  if (event.key === 'Escape') {
    event.preventDefault()
    void closePreview()
    return
  }

  if (event.key === 'Tab') {
    const focusableElements = dialogRef.value?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    )

    if (!focusableElements?.length) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement?.focus()
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement?.focus()
    }
  }
}

onMounted(() => document.addEventListener('keydown', handleKeydown))

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  if (selectedCertificate.value) document.body.style.overflow = previousBodyOverflow
})
</script>

<template>
  <div class="certificate-grid" role="list" :aria-label="ariaLabel">
    <article
      v-for="certificate in items"
      :key="certificate.id"
      class="certificate-entry"
      role="listitem"
    >
      <button
        v-if="certificate.image"
        type="button"
        class="certificate-preview-trigger"
        :aria-label="`Preview ${certificate.title}`"
        aria-haspopup="dialog"
        @click="openPreview(certificate, $event)"
      >
        <img
          :src="certificate.image.src"
          :alt="certificate.image.alt"
          class="certificate-image"
          loading="lazy"
          decoding="async"
        >
        <span class="preview-cue" aria-hidden="true">Preview ↗</span>
      </button>

      <div
        v-else
        class="certificate-image-placeholder"
        role="img"
        :aria-label="`Certificate image pending for ${certificate.title}`"
      >
        <span class="placeholder-index">{{ certificate.id.slice(0, 2).toUpperCase() }}</span>
        <span class="placeholder-copy">Certificate image pending</span>
      </div>

      <div class="certificate-details">
        <h3 class="certificate-title">{{ certificate.title }}</h3>
        <div class="certificate-meta">
          <span>{{ certificate.issuer }}</span>
          <span class="meta-separator" aria-hidden="true">/</span>
          <time :datetime="certificate.dateEarned">{{ certificate.dateEarned }}</time>
        </div>
        <a
          v-if="certificate.verificationUrl"
          class="verification-link"
          :href="certificate.verificationUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Verify Credential ↗
        </a>
      </div>
    </article>
  </div>

  <Teleport to="body">
    <Transition name="certificate-lightbox">
      <div
        v-if="selectedCertificate?.image"
        class="certificate-lightbox"
        @click.self="closePreview"
      >
        <section
          ref="dialogRef"
          class="certificate-dialog"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="`certificate-dialog-title-${selectedCertificate.id}`"
        >
          <div class="dialog-bar">
            <div>
              <p class="dialog-kicker">Certificate preview</p>
              <h2 :id="`certificate-dialog-title-${selectedCertificate.id}`" class="dialog-title">
                {{ selectedCertificate.title }}
              </h2>
            </div>
            <button
              ref="closeButtonRef"
              type="button"
              class="dialog-close"
              aria-label="Close certificate preview"
              @click="closePreview"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div class="dialog-image-wrap">
            <img
              :src="selectedCertificate.image.src"
              :alt="selectedCertificate.image.alt"
              class="dialog-image"
            >
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.certificate-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 42px 22px;
}

.certificate-entry {
  min-width: 0;
}

.certificate-preview-trigger,
.certificate-image-placeholder {
  position: relative;
  width: 100%;
  aspect-ratio: 1.414 / 1;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--bg-card);
}

.certificate-preview-trigger {
  display: block;
  color: var(--text-primary);
  transition: border-color var(--transition), transform var(--transition);
}

.certificate-preview-trigger:hover,
.certificate-preview-trigger:focus-visible {
  border-color: var(--text-muted);
  transform: translateY(-3px);
}

.certificate-preview-trigger:focus-visible,
.dialog-close:focus-visible,
.verification-link:focus-visible {
  outline: 1px solid var(--accent);
  outline-offset: 4px;
}

.certificate-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: var(--bg-card);
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity var(--transition);
}

.certificate-preview-trigger:hover .certificate-image,
.certificate-preview-trigger:focus-visible .certificate-image {
  transform: scale(1.018);
  opacity: 0.88;
}

.preview-cue {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 4px 8px;
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  background: var(--nav-bg-scrolled);
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 10px;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity var(--transition), transform var(--transition);
}

.certificate-preview-trigger:hover .preview-cue,
.certificate-preview-trigger:focus-visible .preview-cue {
  opacity: 1;
  transform: translateY(0);
}

.certificate-image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--text-muted);
}

.placeholder-index {
  font-family: var(--font-mono);
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 400;
  letter-spacing: -0.08em;
  color: var(--border);
}

.placeholder-copy {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.certificate-details {
  padding-top: 16px;
  border-top: 1px solid transparent;
}

.certificate-title {
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -0.015em;
}

.certificate-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 7px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 1.5;
}

.meta-separator {
  color: var(--border);
}

.verification-link {
  display: inline-flex;
  margin-top: 12px;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 11px;
  transition: color var(--transition), transform var(--transition);
}

.verification-link:hover {
  color: var(--text-primary);
  transform: translateX(2px);
}

.certificate-lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 28px;
  background: rgba(24, 24, 28, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.certificate-dialog {
  width: min(1040px, 100%);
  max-height: calc(100vh - 56px);
  overflow: auto;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  box-shadow: var(--shadow-lg);
}

.dialog-bar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 28px;
  padding: 18px 20px;
  border-bottom: 1px solid var(--border-subtle);
}

.dialog-kicker {
  margin-bottom: 3px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.dialog-title {
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
}

.dialog-close {
  flex: 0 0 auto;
  width: 34px;
  height: 34px;
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  font-size: 22px;
  line-height: 1;
  transition: border-color var(--transition), color var(--transition), transform var(--transition);
}

.dialog-close:hover {
  border-color: var(--text-muted);
  color: var(--text-primary);
  transform: rotate(4deg);
}

.dialog-image-wrap {
  display: grid;
  place-items: center;
  padding: 22px;
  background: var(--accent-glow);
}

.dialog-image {
  max-width: 100%;
  max-height: calc(100vh - 180px);
  object-fit: contain;
}

.certificate-lightbox-enter-active,
.certificate-lightbox-leave-active {
  transition: opacity 0.24s cubic-bezier(0.16, 1, 0.3, 1);
}

.certificate-lightbox-enter-active .certificate-dialog,
.certificate-lightbox-leave-active .certificate-dialog {
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.24s ease;
}

.certificate-lightbox-enter-from,
.certificate-lightbox-leave-to,
.certificate-lightbox-enter-from .certificate-dialog,
.certificate-lightbox-leave-to .certificate-dialog {
  opacity: 0;
}

.certificate-lightbox-enter-from .certificate-dialog,
.certificate-lightbox-leave-to .certificate-dialog {
  transform: translateY(10px) scale(0.985);
}

@media (max-width: 1180px) {
  .certificate-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .certificate-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .certificate-lightbox {
    padding: 12px;
  }

  .certificate-dialog {
    max-height: calc(100vh - 24px);
  }

  .dialog-bar {
    padding: 14px;
  }

  .dialog-image-wrap {
    padding: 10px;
  }

  .preview-cue {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .certificate-preview-trigger,
  .certificate-image,
  .preview-cue,
  .dialog-close,
  .verification-link,
  .certificate-lightbox-enter-active,
  .certificate-lightbox-leave-active,
  .certificate-lightbox-enter-active .certificate-dialog,
  .certificate-lightbox-leave-active .certificate-dialog {
    transition: none;
  }
}
</style>
