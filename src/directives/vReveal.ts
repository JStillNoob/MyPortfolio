import type { Directive } from 'vue'

export interface RevealOptions {
  delay?: number
}

export const vReveal: Directive<HTMLElement, RevealOptions | undefined> = {
  mounted(el, binding) {
    if (typeof window === 'undefined') return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      el.classList.add('is-revealed')
      return
    }

    if (!el.classList.contains('reveal-stagger')) {
      el.classList.add('reveal-on-scroll')
    }

    if (binding.value?.delay) {
      el.style.transitionDelay = `${binding.value.delay}ms`
    }

    const reveal = () => {
      el.classList.add('is-revealed')
      if (observer) {
        observer.unobserve(el)
      }
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
        threshold: 0.01,
        rootMargin: '40px 0px -20px 0px',
      }
    )

    observer.observe(el)
    ;(el as any)._revealObserver = observer

    // Immediate and post-route-transition check for elements already in viewport
    const checkImmediate = () => {
      if (el.classList.contains('is-revealed')) return
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        reveal()
      }
    }
    requestAnimationFrame(checkImmediate)
    setTimeout(checkImmediate, 100)
    setTimeout(checkImmediate, 350)
  },
  unmounted(el) {
    if ((el as any)._revealObserver) {
      ;(el as any)._revealObserver.disconnect()
      delete (el as any)._revealObserver
    }
  },
}

export default vReveal
