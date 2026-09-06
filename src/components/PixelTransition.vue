<template>
  <div
    ref="containerRef"
    :class="['pixel-transition-container', className]"
    :style="style"
    :tabindex="0"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
    @click="handleClick"
    @focus="handleEnter"
    @blur="handleLeave"
  >
    <div :style="{ paddingTop: aspectRatio }" />

    <div class="pixel-content pixel-first" :aria-hidden="isActive">
      <slot name="first">
        <slot name="firstContent" />
      </slot>
    </div>

    <div
      ref="activeRef"
      class="pixel-content pixel-second"
      :style="{ display: 'none' }"
      :aria-hidden="!isActive"
    >
      <slot name="second">
        <slot name="secondContent" />
      </slot>
    </div>

    <div ref="pixelGridRef" class="pixel-grid" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, type CSSProperties } from 'vue'
import { gsap } from 'gsap'

interface PixelTransitionProps {
  gridSize?: number
  pixelColor?: string
  animationStepDuration?: number
  once?: boolean
  className?: string
  style?: CSSProperties
  aspectRatio?: string
}

const props = withDefaults(defineProps<PixelTransitionProps>(), {
  gridSize: 7,
  pixelColor: 'currentColor',
  animationStepDuration: 0.3,
  once: false,
  aspectRatio: '100%',
  className: '',
  style: () => ({})
})

const containerRef = ref<HTMLDivElement | null>(null)
const pixelGridRef = ref<HTMLDivElement | null>(null)
const activeRef = ref<HTMLDivElement | null>(null)
const delayedCallRef = ref<gsap.core.Tween | null>(null)

const isActive = ref<boolean>(false)
const isPinned = ref<boolean>(false)

const buildGrid = () => {
  const pixelGridEl = pixelGridRef.value
  if (!pixelGridEl) return

  pixelGridEl.innerHTML = ''

  for (let row = 0; row < props.gridSize; row++) {
    for (let col = 0; col < props.gridSize; col++) {
      const pixel = document.createElement('div')
      pixel.classList.add('pixelated-image-card__pixel')
      pixel.style.backgroundColor = props.pixelColor

      const size = 100 / props.gridSize
      pixel.style.width = `${size}%`
      pixel.style.height = `${size}%`
      pixel.style.left = `${col * size}%`
      pixel.style.top = `${row * size}%`
      pixel.style.display = 'none'

      pixelGridEl.appendChild(pixel)
    }
  }
}

const animatePixels = (activate: boolean): void => {
  isActive.value = activate

  const pixelGridEl = pixelGridRef.value
  const activeEl = activeRef.value
  if (!pixelGridEl || !activeEl) return

  const pixels = pixelGridEl.querySelectorAll<HTMLDivElement>('.pixelated-image-card__pixel')
  if (!pixels.length) return

  gsap.killTweensOf(pixels)
  if (delayedCallRef.value) {
    delayedCallRef.value.kill()
  }

  gsap.set(pixels, { display: 'none' })

  const totalPixels = pixels.length
  const staggerDuration = props.animationStepDuration / totalPixels

  gsap.to(pixels, {
    display: 'block',
    duration: 0,
    stagger: {
      each: staggerDuration,
      from: 'random'
    }
  })

  delayedCallRef.value = gsap.delayedCall(props.animationStepDuration, () => {
    activeEl.style.display = activate ? 'block' : 'none'
    activeEl.style.pointerEvents = activate ? 'none' : ''
  })

  gsap.to(pixels, {
    display: 'none',
    duration: 0,
    delay: props.animationStepDuration,
    stagger: {
      each: staggerDuration,
      from: 'random'
    }
  })
}

const handleEnter = (): void => {
  if (!isActive.value) animatePixels(true)
}

const handleLeave = (): void => {
  if (isActive.value && !props.once && !isPinned.value) {
    animatePixels(false)
  }
}

const handleClick = (): void => {
  isPinned.value = !isPinned.value
  if (isPinned.value) {
    if (!isActive.value) animatePixels(true)
  } else {
    animatePixels(false)
  }
}

onMounted(() => {
  buildGrid()
})

onUnmounted(() => {
  if (delayedCallRef.value) {
    delayedCallRef.value.kill()
  }
})

watch(
  () => [props.gridSize, props.pixelColor],
  () => {
    buildGrid()
  }
)
</script>

<style scoped>
.pixel-transition-container {
  position: relative;
  overflow: hidden;
  display: block;
}

.pixel-content {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.pixel-second {
  z-index: 2;
}

.pixel-grid {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 3;
}

:deep(.pixelated-image-card__pixel) {
  position: absolute;
  pointer-events: none;
}
</style>
