import type { Directive } from 'vue'

export interface RevealOptions {
  delay?: number
}

type RevealElement = HTMLElement & {
  _revealObserver?: IntersectionObserver
  _revealTimers?: number[]
}

export const vReveal: Directive<HTMLElement, RevealOptions | undefined> = {
  mounted(el, binding) {
    if (typeof window === 'undefined') return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      el.classList.add('is-revealed')
      return
    }

    const revealEl = el as RevealElement
    revealEl._revealTimers = []

    if (!el.classList.contains('reveal-stagger')) {
      el.classList.add('reveal-on-scroll')
    } else {
      Array.from(el.children).forEach((child, index) => {
        const delay = Math.min((index + 1) * 55, 385)
        ;(child as HTMLElement).style.setProperty('--reveal-delay', `${delay}ms`)
      })
    }

    if (binding.value?.delay) {
      el.style.setProperty('--reveal-delay', `${binding.value.delay}ms`)
    }

    const reveal = () => {
      el.classList.add('is-revealed')
      if (observer) {
        observer.unobserve(el)
      }

      const cleanupTimer = window.setTimeout(() => {
        if (el.classList.contains('reveal-stagger')) {
          Array.from(el.children).forEach(child => {
            ;(child as HTMLElement).style.willChange = 'auto'
          })
        } else {
          el.style.willChange = 'auto'
        }
      }, 900)
      revealEl._revealTimers?.push(cleanupTimer)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal()
          }
        })
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -8% 0px',
      }
    )

    observer.observe(el)
    ;(el as RevealElement)._revealObserver = observer

    // Immediate and post-route-transition check for elements already in viewport
    const checkImmediate = () => {
      if (el.classList.contains('is-revealed')) return
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        reveal()
      }
    }
    revealEl._revealTimers.push(window.setTimeout(checkImmediate, 100))
    revealEl._revealTimers.push(window.setTimeout(checkImmediate, 350))
    requestAnimationFrame(checkImmediate)
  },
  unmounted(el) {
    const revealEl = el as RevealElement
    revealEl._revealObserver?.disconnect()
    revealEl._revealTimers?.forEach(timer => window.clearTimeout(timer))
    delete revealEl._revealObserver
    delete revealEl._revealTimers
  },
}

export default vReveal
