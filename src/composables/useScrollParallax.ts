import { onMounted, onUnmounted, type Ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollParallaxOptions {
  desktopDistance: number
  tabletDistance?: number
  start?: string
  end?: string
  scrub?: number
}

/**
 * Adds a restrained, transform-only scroll offset to an existing element.
 * It is disabled on mobile and whenever reduced motion is requested.
 */
export function useScrollParallax(
  triggerRef: Ref<HTMLElement | null>,
  targetRef: Ref<HTMLElement | null>,
  options: ScrollParallaxOptions,
) {
  let context: gsap.Context | undefined
  let media: gsap.MatchMedia | undefined

  onMounted(() => {
    const trigger = triggerRef.value
    const target = targetRef.value

    if (!trigger || !target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    context = gsap.context(() => {
      media = gsap.matchMedia()

      const animate = (distance: number) => {
        gsap.to(target, {
          y: distance,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger,
            start: options.start ?? 'top bottom',
            end: options.end ?? 'bottom top',
            scrub: options.scrub ?? 0.7,
            invalidateOnRefresh: true,
          },
        })
      }

      media.add('(min-width: 901px)', () => animate(options.desktopDistance))
      media.add('(min-width: 701px) and (max-width: 900px)', () =>
        animate(options.tabletDistance ?? options.desktopDistance * 0.5),
      )
    }, trigger)
  })

  onUnmounted(() => {
    media?.revert()
    context?.revert()
  })
}
