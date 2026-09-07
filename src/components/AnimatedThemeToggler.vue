<script setup lang="ts">
import { ref } from 'vue'

export type TransitionVariant =
  | 'circle'
  | 'square'
  | 'triangle'
  | 'diamond'
  | 'hexagon'
  | 'rectangle'
  | 'star'

interface Props {
  isDark?: boolean
  duration?: number
  variant?: TransitionVariant
  fromCenter?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isDark: false,
  duration: 400,
  variant: 'circle',
  fromCenter: false,
})

const emit = defineEmits<{
  (e: 'toggle', event: MouseEvent): void
}>()

const buttonRef = ref<HTMLButtonElement | null>(null)
const isTransitioning = ref(false)

function polygonCollapsed(point: string, vertexCount: number): string {
  const pairs = Array.from({ length: vertexCount }, () => point).join(', ')
  return `polygon(${pairs})`
}

// All coordinates are percentages of the snapshot reference box to support all display scales accurately
function getThemeTransitionClipPaths(
  variant: TransitionVariant,
  cx: number,
  cy: number,
  maxRadius: number,
  viewportWidth: number,
  viewportHeight: number
): [string, string] {
  const toX = (x: number) => `${(x / viewportWidth) * 100}%`
  const toY = (y: number) => `${(y / viewportHeight) * 100}%`
  const point = (x: number, y: number) => `${toX(x)} ${toY(y)}`
  const toRadius = (r: number) =>
    `${(r / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100}%`

  switch (variant) {
    case 'square': {
      const halfW = Math.max(cx, viewportWidth - cx)
      const halfH = Math.max(cy, viewportHeight - cy)
      const halfSide = Math.max(halfW, halfH) * 1.05
      const end = [
        point(cx - halfSide, cy - halfSide),
        point(cx + halfSide, cy - halfSide),
        point(cx + halfSide, cy + halfSide),
        point(cx - halfSide, cy + halfSide),
      ].join(', ')
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`]
    }
    case 'circle':
    default:
      return [
        `circle(0% at ${point(cx, cy)})`,
        `circle(${toRadius(maxRadius)} at ${point(cx, cy)})`,
      ]
  }
}

const handleToggle = (event: MouseEvent) => {
  const button = buttonRef.value
  const root = document.documentElement

  // If transition already running or View Transitions not supported, do regular toggle
  if (
    !button ||
    isTransitioning.value ||
    root.dataset.magicuiThemeVt === 'active' ||
    !(document as any).startViewTransition
  ) {
    emit('toggle', event)
    return
  }

  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  let x: number
  let y: number
  if (props.fromCenter) {
    x = viewportWidth / 2
    y = viewportHeight / 2
  } else {
    const rect = button.getBoundingClientRect()
    x = rect.left + rect.width / 2
    y = rect.top + rect.height / 2
  }

  const maxRadius = Math.hypot(
    Math.max(x, viewportWidth - x),
    Math.max(y, viewportHeight - y)
  )

  const clipPath = getThemeTransitionClipPaths(
    props.variant,
    x,
    y,
    maxRadius,
    viewportWidth,
    viewportHeight
  )

  root.dataset.magicuiThemeVt = 'active'
  root.style.setProperty('--magicui-theme-toggle-vt-duration', `${props.duration}ms`)
  root.style.setProperty('--magicui-theme-vt-clip-from', clipPath[0])

  const cleanup = () => {
    isTransitioning.value = false
    delete root.dataset.magicuiThemeVt
    root.style.removeProperty('--magicui-theme-toggle-vt-duration')
    root.style.removeProperty('--magicui-theme-vt-clip-from')
  }

  isTransitioning.value = true
  const transition = (document as any).startViewTransition(() => {
    emit('toggle', event)
  })

  if (transition?.finished?.finally) {
    transition.finished.finally(cleanup).catch(() => {})
  } else {
    cleanup()
  }

  if (transition?.ready?.then) {
    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath,
          },
          {
            duration: props.duration,
            easing: 'ease-in-out',
            fill: 'forwards',
            pseudoElement: '::view-transition-new(root)',
          }
        )
      })
      .catch(() => {})
  }
}
</script>

<template>
  <button
    ref="buttonRef"
    type="button"
    class="animated-theme-toggler"
    :title="'Toggle theme'"
    aria-label="Toggle theme"
    @click="handleToggle"
  >
    <!-- Sun icon when dark mode (clicking will switch to light) -->
    <svg
      v-if="isDark"
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="toggle-icon sun-icon"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>

    <!-- Moon icon when light mode (clicking will switch to dark) -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="toggle-icon moon-icon"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>

    <span class="sr-only">Toggle theme</span>
    <span class="theme-tooltip" role="tooltip">Toggle theme</span>
  </button>
</template>

<style scoped>
.animated-theme-toggler {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  padding: 0;
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color var(--transition), background-color var(--transition), transform 0.2s ease;
  user-select: none;
  outline: none;
}

.animated-theme-toggler:hover {
  color: var(--text-primary);
  background: var(--bg-card-hover);
}

.animated-theme-toggler:active {
  transform: scale(0.92);
}

.toggle-icon {
  width: 25px;
  height: 25px;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.animated-theme-toggler:hover .sun-icon {
  transform: rotate(45deg) scale(1.08);
}

.animated-theme-toggler:hover .moon-icon {
  transform: rotate(-15deg) scale(1.08);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Styled Hover Tooltip */
.theme-tooltip {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  padding: 5px 10px;
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 11.5px;
  font-family: var(--font-sans);
  font-weight: 500;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s;
  z-index: 1000;
}

.theme-tooltip::before {
  content: '';
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 7px;
  height: 7px;
  background: var(--bg-card);
  border-left: 1px solid var(--border);
  border-top: 1px solid var(--border);
}

.animated-theme-toggler:hover .theme-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}
</style>
