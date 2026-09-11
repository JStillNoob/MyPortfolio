<template>

  <div ref="containerRef" :class="['logoloop-root', { 'logoloop-vertical': isVertical, 'logoloop-scale-hover': scaleOnHover }, className]" :style="containerStyle" role="region" :aria-label="ariaLabel">
    <template v-if="fadeOut">
      <template v-if="isVertical">
        <div aria-hidden="true" class="logoloop-fade logoloop-fade-top" />
        <div aria-hidden="true" class="logoloop-fade logoloop-fade-bottom" />
      </template>
      <template v-else>
        <div aria-hidden="true" class="logoloop-fade logoloop-fade-left" />
        <div aria-hidden="true" class="logoloop-fade logoloop-fade-right" />
      </template>
    </template>

    <div
      ref="trackRef"
      :class="['logoloop-track', isVertical ? 'logoloop-track-vertical' : 'logoloop-track-horizontal']"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <ul
        v-for="copyIndex in copyCount"
        :key="`copy-${copyIndex - 1}`"
        :class="['logoloop-list', { 'logoloop-list-vertical': isVertical }]"
        role="list"
        :aria-hidden="copyIndex > 1 ? true : undefined"
        :ref="el => { if (copyIndex === 1) seqRef = el as HTMLUListElement | null }"
      >
        <li
          v-for="(item, itemIndex) in logos"
          :key="`${copyIndex - 1}-${itemIndex}`"
          :class="['logoloop-item', { 'logoloop-item-vertical': isVertical }]"
          role="listitem"
        >
          <slot v-if="$slots.renderItem" name="renderItem" :item="item" :index="`${copyIndex - 1}-${itemIndex}`" />
          <template v-else>
            <a
              v-if="item.href"
              class="logoloop-link"
              :href="item.href"
              :aria-label="getItemAriaLabel(item) || 'logo link'"
              target="_blank"
              rel="noreferrer noopener"
            >
              <LogoContent :item="item" :scale-on-hover="scaleOnHover" />
            </a>
            <LogoContent v-else :item="item" :scale-on-hover="scaleOnHover" />
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch, type CSSProperties } from 'vue';

export type LogoItemNode = {
  node: string;
  href?: string;
  title?: string;
  ariaLabel?: string;
};

export type LogoItemImage = {
  src: string;
  alt?: string;
  href?: string;
  title?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
};

export type LogoItem = LogoItemNode | LogoItemImage;

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2
} as const;

const props = withDefaults(defineProps<LogoLoopProps>(), {
  speed: 120,
  direction: 'left',
  width: '100%',
  logoHeight: 28,
  gap: 32,
  pauseOnHover: undefined,
  hoverSpeed: undefined,
  fadeOut: false,
  scaleOnHover: false,
  ariaLabel: 'Partner logos'
});

const containerRef = ref<HTMLDivElement | null>(null);
const trackRef = ref<HTMLDivElement | null>(null);
const seqRef = ref<HTMLUListElement | null>(null);

const seqWidth = ref<number>(0);
const seqHeight = ref<number>(0);
const copyCount = ref<number>(ANIMATION_CONFIG.MIN_COPIES);
const isHovered = ref<boolean>(false);

let rafRef: number | null = null;
let lastTimestampRef: number | null = null;
const offsetRef = ref(0);
const velocityRef = ref(0);

const isVertical = computed(() => props.direction === 'up' || props.direction === 'down');

const effectiveHoverSpeed = computed<number | undefined>(() => {
  if (props.hoverSpeed !== undefined) return props.hoverSpeed;
  if (props.pauseOnHover === true) return 0;
  if (props.pauseOnHover === false) return undefined;
  return 0;
});

const targetVelocity = computed(() => {
  const magnitude = Math.abs(props.speed);
  let directionMultiplier: number;
  if (isVertical.value) {
    directionMultiplier = props.direction === 'up' ? 1 : -1;
  } else {
    directionMultiplier = props.direction === 'left' ? 1 : -1;
  }
  const speedMultiplier = props.speed < 0 ? -1 : 1;
  return magnitude * directionMultiplier * speedMultiplier;
});

  const containerStyle = computed(() => {
  const w = typeof props.width === 'number' ? `${props.width}px` : props.width;
  return {
    '--logoloop-gap': `${props.gap}px`,
    '--logoloop-logo-height': `${props.logoHeight}px`,
    '--logoloop-fade-color': props.fadeOutColor ?? 'var(--bg-primary, #18181c)',
    ...(isVertical.value ? (w !== '100%' && w ? { width: w } : {}) : { width: w ?? '100%' }),
    ...(props.style ?? {})
  };
});

const isNodeItem = (item: LogoItem): item is LogoItemNode => 'node' in item;

const getItemAriaLabel = (item: LogoItem): string | undefined => {
  if (isNodeItem(item)) return item.ariaLabel ?? item.title;
  return (item as LogoItemImage).alt ?? item.title;
};

const handleMouseEnter = () => {
  if (effectiveHoverSpeed.value !== undefined) isHovered.value = true;
};

const handleMouseLeave = () => {
  if (effectiveHoverSpeed.value !== undefined) isHovered.value = false;
};

const updateDimensions = async () => {
  await nextTick();
  const containerWidth = containerRef.value?.clientWidth ?? 0;
  const sequenceRect = seqRef.value?.getBoundingClientRect?.();
  const sequenceWidth = sequenceRect?.width ?? 0;
  const sequenceHeight = sequenceRect?.height ?? 0;

  if (isVertical.value) {
    const parentHeight = containerRef.value?.parentElement?.clientHeight ?? 0;
    if (containerRef.value && parentHeight > 0) {
      const targetHeight = Math.ceil(parentHeight);
      if (containerRef.value.style.height !== `${targetHeight}px`) {
        containerRef.value.style.height = `${targetHeight}px`;
      }
    }
    if (sequenceHeight > 0) {
      seqHeight.value = Math.ceil(sequenceHeight);
      const viewport = containerRef.value?.clientHeight ?? parentHeight ?? sequenceHeight;
      const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
      copyCount.value = Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded);
    }
  } else if (sequenceWidth > 0) {
    seqWidth.value = Math.ceil(sequenceWidth);
    const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
    copyCount.value = Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded);
  }
};

let resizeObserver: ResizeObserver | null = null;

const setupResizeObserver = () => {
  if (!window.ResizeObserver) {
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    return () => window.removeEventListener('resize', updateDimensions);
  }
  resizeObserver = new ResizeObserver(updateDimensions);
  if (containerRef.value) resizeObserver.observe(containerRef.value);
  if (seqRef.value) resizeObserver.observe(seqRef.value);
  updateDimensions();
  return () => { resizeObserver?.disconnect(); resizeObserver = null; };
};

const setupImageLoader = () => {
  const images = seqRef.value?.querySelectorAll('img') ?? [];
  if (images.length === 0) { updateDimensions(); return () => {}; }
  let remaining = images.length;
  const handleLoad = () => { remaining -= 1; if (remaining === 0) updateDimensions(); };
  images.forEach(img => {
    const htmlImg = img as HTMLImageElement;
    if (htmlImg.complete) { handleLoad(); }
    else {
      htmlImg.addEventListener('load', handleLoad, { once: true });
      htmlImg.addEventListener('error', handleLoad, { once: true });
    }
  });
  return () => { images.forEach(img => { img.removeEventListener('load', handleLoad); img.removeEventListener('error', handleLoad); }); };
};

const startAnimationLoop = () => {
  const track = trackRef.value;
  if (!track) return () => {};
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const seqSize = isVertical.value ? seqHeight.value : seqWidth.value;
  if (seqSize > 0) {
    offsetRef.value = ((offsetRef.value % seqSize) + seqSize) % seqSize;
    track.style.transform = isVertical.value ? `translate3d(0, ${-offsetRef.value}px, 0)` : `translate3d(${-offsetRef.value}px, 0, 0)`;
  }
  if (prefersReduced) { track.style.transform = 'translate3d(0, 0, 0)'; return () => { lastTimestampRef = null; }; }
  const animate = (timestamp: number) => {
    if (lastTimestampRef === null) lastTimestampRef = timestamp;
    const deltaTime = Math.max(0, timestamp - lastTimestampRef) / 1000;
    lastTimestampRef = timestamp;
    const target = isHovered.value && effectiveHoverSpeed.value !== undefined ? effectiveHoverSpeed.value : targetVelocity.value;
    const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
    velocityRef.value += (target - velocityRef.value) * easingFactor;
    const currentSeqSize = isVertical.value ? seqHeight.value : seqWidth.value;
    if (currentSeqSize > 0) {
      let nextOffset = offsetRef.value + velocityRef.value * deltaTime;
      nextOffset = ((nextOffset % currentSeqSize) + currentSeqSize) % currentSeqSize;
      offsetRef.value = nextOffset;
      track.style.transform = isVertical.value ? `translate3d(0, ${-offsetRef.value}px, 0)` : `translate3d(${-offsetRef.value}px, 0, 0)`;
    }
    rafRef = requestAnimationFrame(animate);
  };
  rafRef = requestAnimationFrame(animate);
  return () => { if (rafRef !== null) { cancelAnimationFrame(rafRef); rafRef = null; } lastTimestampRef = null; };
};

let cleanupResize: (() => void) | undefined;
let cleanupImages: (() => void) | undefined;
let cleanupAnimation: (() => void) | undefined;

const cleanup = () => { cleanupResize?.(); cleanupImages?.(); cleanupAnimation?.(); };

onMounted(async () => {
  await nextTick();
  setTimeout(() => {
    cleanupResize = setupResizeObserver();
    cleanupImages = setupImageLoader();
    cleanupAnimation = startAnimationLoop();
  }, 10);
});

onUnmounted(() => { cleanup(); });

watch(
  [() => props.logos, () => props.gap, () => props.logoHeight, () => props.direction],
  async () => {
    await nextTick();
    cleanupImages?.();
    cleanupImages = setupImageLoader();
    cleanupAnimation?.();
    cleanupAnimation = startAnimationLoop();
  },
  { deep: true }
);

watch([() => props.speed, () => props.direction, () => props.hoverSpeed, () => props.pauseOnHover], () => {
  cleanupAnimation?.();
  cleanupAnimation = startAnimationLoop();
});
</script>

<script lang="ts">
import { defineComponent, h } from 'vue';

const LogoContent = defineComponent({
  name: 'LogoContent',
  props: {
    item: { type: Object as () => import('./LogoLoop.vue').LogoItem, required: true },
    scaleOnHover: { type: Boolean, default: false }
  },
  setup(props) {
    const isNodeItem = (item: any): boolean => 'node' in item;
    return () => {
      const item = props.item as any;
      if (isNodeItem(item)) {
        return h('span', {
          class: ['logoloop-node-content', props.scaleOnHover ? 'logoloop-scale-item' : ''].filter(Boolean).join(' '),
          innerHTML: item.node,
          'aria-hidden': item.href && !item.ariaLabel ? true : undefined
        });
      }
      return h('img', {
        class: ['logoloop-img', props.scaleOnHover ? 'logoloop-scale-item' : ''].filter(Boolean).join(' '),
        src: item.src,
        srcset: item.srcSet,
        sizes: item.sizes,
        width: item.width,
        height: item.height,
        alt: item.alt ?? '',
        title: item.title,
        loading: 'lazy',
        decoding: 'async',
        draggable: false
      });
    };
  }
});

export { LogoContent };
</script>

<style scoped>
.logoloop-root {
  position: relative;
  overflow-x: hidden;
}

.logoloop-root.logoloop-vertical {
  overflow: hidden;
  height: 100%;
  display: inline-block;
  overflow-x: visible;
}

.logoloop-root.logoloop-scale-hover {
  padding-top: calc(var(--logoloop-logo-height, 28px) * 0.1);
  padding-bottom: calc(var(--logoloop-logo-height, 28px) * 0.1);
}

/* Fade overlays */
.logoloop-fade {
  pointer-events: none;
  position: absolute;
  z-index: 10;
}

.logoloop-fade-top {
  inset-inline: 0;
  top: 0;
  height: clamp(24px, 8%, 120px);
  background: linear-gradient(to bottom, var(--logoloop-fade-color, var(--bg-primary, #18181c)) 0%, rgba(0,0,0,0) 100%);
}

.logoloop-fade-bottom {
  inset-inline: 0;
  bottom: 0;
  height: clamp(24px, 8%, 120px);
  background: linear-gradient(to top, var(--logoloop-fade-color, var(--bg-primary, #18181c)) 0%, rgba(0,0,0,0) 100%);
}

.logoloop-fade-left {
  inset-block: 0;
  left: 0;
  width: clamp(24px, 8%, 120px);
  background: linear-gradient(to right, var(--logoloop-fade-color, var(--bg-primary, #18181c)) 0%, rgba(0,0,0,0) 100%);
}

.logoloop-fade-right {
  inset-block: 0;
  right: 0;
  width: clamp(24px, 8%, 120px);
  background: linear-gradient(to left, var(--logoloop-fade-color, var(--bg-primary, #18181c)) 0%, rgba(0,0,0,0) 100%);
}

/* Track */
.logoloop-track {
  will-change: transform;
  user-select: none;
  position: relative;
  z-index: 0;
}

.logoloop-track-horizontal {
  display: flex;
  flex-direction: row;
  width: max-content;
}

.logoloop-track-vertical {
  display: flex;
  flex-direction: column;
  height: max-content;
  width: 100%;
}

/* List */
.logoloop-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

.logoloop-list-vertical {
  flex-direction: column;
}

/* Item */
.logoloop-item {
  flex-shrink: 0;
  font-size: var(--logoloop-logo-height, 28px);
  line-height: 1;
  margin-right: var(--logoloop-gap, 12px);
}

.logoloop-item-vertical {
  margin-right: 0;
  margin-bottom: var(--logoloop-gap, 12px);
}

/* Pill badge wrapper — wraps around each icon+title item */
:deep(.logoloop-badge) {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-family: var(--font-sans, 'Roboto', sans-serif);
  font-size: 13.5px;
  font-weight: 500;
  color: var(--text-secondary);
  white-space: nowrap;
  cursor: default;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
}

:deep(.logoloop-badge:hover) {
  border-color: var(--accent);
  color: var(--text-primary);
  background: var(--bg-card-hover);
}

:deep(.logoloop-badge svg),
:deep(.logoloop-badge img) {
  width: 16px;
  height: 16px;
  object-fit: contain;
  flex-shrink: 0;
  filter: grayscale(100%) brightness(2);
  opacity: 0.7;
  transition: opacity 0.2s ease, filter 0.2s ease;
}

:deep(.logoloop-badge:hover svg),
:deep(.logoloop-badge:hover img) {
  filter: grayscale(0%) brightness(1);
  opacity: 1;
}

/* Link */
.logoloop-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.logoloop-link:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

/* Content: node-based */
.logoloop-node-content {
  display: inline-flex;
  align-items: center;
}

/* Content: image */
.logoloop-img {
  height: var(--logoloop-logo-height, 28px);
  width: auto;
  display: block;
  object-fit: contain;
  pointer-events: none;
  -webkit-user-drag: none;
}

/* Scale on hover */
.logoloop-scale-item {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
