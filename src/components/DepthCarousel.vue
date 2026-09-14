<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, type ComponentPublicInstance } from 'vue';
import gsap from 'gsap';

export interface DepthCarouselCardItem {
  image: string;
  alt?: string;
  title?: string;
  description?: string;
  badges?: string[];
  metaLabel?: string;
  metaValue?: string;
  actionLabel?: string;
  actionUrl?: string;
  githubUrl?: string;
  liked?: boolean;
  [key: string]: any;
}

export type DepthCarouselItem = string | DepthCarouselCardItem;
export type TiltDirection = 'left' | 'right';

interface DepthCarouselProps {
  items?: DepthCarouselItem[];
  cardWidth?: number;
  cardHeight?: number;
  radius?: number;
  tint?: string;
  depth?: number;
  spread?: number;
  tilt?: number;
  tiltDirection?: TiltDirection;
  perspective?: number;
  visibleCards?: number;
  falloff?: number;
  blur?: number;
  duration?: number;
  ease?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  showControls?: boolean;
  showIndicators?: boolean;
}

interface DragState {
  x: number;
  startPos: number;
  lastX: number;
  lastT: number;
  v: number;
  moved: boolean;
  id: number;
}

const clamp = (v: number, min: number, max: number): number => Math.min(Math.max(v, min), max);

const normalizeItem = (it: DepthCarouselItem): DepthCarouselCardItem =>
  typeof it === 'string' ? { image: it, alt: '' } : { ...it };

const props = withDefaults(defineProps<DepthCarouselProps>(), {
  items: () => [
    { image: 'https://picsum.photos/seed/depth1/800/1000', alt: 'Slide 1' },
    { image: 'https://picsum.photos/seed/depth2/800/1000', alt: 'Slide 2' },
    { image: 'https://picsum.photos/seed/depth3/800/1000', alt: 'Slide 3' },
    { image: 'https://picsum.photos/seed/depth4/800/1000', alt: 'Slide 4' },
    { image: 'https://picsum.photos/seed/depth5/800/1000', alt: 'Slide 5' },
    { image: 'https://picsum.photos/seed/depth6/800/1000', alt: 'Slide 6' }
  ],
  cardWidth: 350,
  cardHeight: 490,
  radius: 18,
  tint: '#05060a',
  depth: 210,
  spread: 85,
  tilt: 20,
  tiltDirection: 'right',
  perspective: 1400,
  visibleCards: 4,
  falloff: 0.2,
  blur: 5,
  duration: 700,
  ease: 'power3.out',
  autoplay: false,
  autoplayDelay: 3600,
  loop: true,
  showControls: true,
  showIndicators: true
});

const emit = defineEmits<{
  change: [index: number, item: DepthCarouselCardItem];
  like: [index: number, liked: boolean, item: DepthCarouselCardItem];
  action: [index: number, item: DepthCarouselCardItem];
}>();

// Internal reactive card items to allow local like toggling
const internalItems = ref<DepthCarouselCardItem[]>([]);

watch(
  () => props.items,
  (newItems) => {
    internalItems.value = (Array.isArray(newItems) ? newItems : []).map(normalizeItem);
  },
  { immediate: true, deep: true }
);

const data = computed(() => internalItems.value);
const count = computed(() => data.value.length);

const rootRef = ref<HTMLDivElement | null>(null);
const cardRefs = ref<(HTMLDivElement | null)[]>([]);
const overlayRefs = ref<(HTMLSpanElement | null)[]>([]);

const setCardRef = (el: Element | ComponentPublicInstance | null, index: number) => {
  cardRefs.value[index] = el as HTMLDivElement | null;
};
const setOverlayRef = (el: Element | ComponentPublicInstance | null, index: number) => {
  overlayRefs.value[index] = el as HTMLSpanElement | null;
};

const active = ref(0);

let pos = 0;
let focusIndex = 0;
let tween: gsap.core.Tween | null = null;
let scale = 1;
let drag: DragState | null = null;
let wheelTimer: ReturnType<typeof setTimeout> | null = null;
let reduced = false;

const layout = (p: number) => {
  const n = count.value;
  if (!n) return;
  const dir = props.tiltDirection === 'left' ? -1 : 1;

  for (let i = 0; i < n; i++) {
    const el = cardRefs.value[i];
    if (!el) continue;

    let d = i - p;
    if (props.loop && n > 1) {
      d = ((d % n) + n) % n;
      if (d > n / 2) d -= n;
    }

    const back = Math.max(0, d);
    const az = Math.abs(d);
    const shown = az <= props.visibleCards + 0.5;

    const tz = -props.depth * d;
    const tx = dir * props.spread * d;
    const ry = dir * props.tilt * clamp(d, 0, 1);

    let opacity = d < 0 ? Math.max(0, 1 + d) : 1;
    if (!shown) opacity = 0;

    const brightness = Math.max(0.18, 1 - back * props.falloff);
    const blurPx = props.blur > 0 ? Math.min(props.blur, (back / Math.max(1, props.visibleCards)) * props.blur) : 0;
    const zi = Math.round(2000 - d * 20);

    el.style.transform = `translate(-50%, -50%) scale(${scale}) translateX(${tx.toFixed(2)}px) translateZ(${tz.toFixed(2)}px) rotateY(${ry.toFixed(3)}deg)`;
    el.style.opacity = opacity.toFixed(3);
    el.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blurPx.toFixed(2)}px)`;
    el.style.zIndex = String(zi);
    el.style.pointerEvents = shown && opacity > 0.05 ? 'auto' : 'none';

    const ov = overlayRefs.value[i];
    if (ov) ov.style.opacity = clamp(back * props.falloff * 1.25, 0, 0.86).toFixed(3);
  }
};

const notify = (idx: number) => {
  active.value = idx;
  if (data.value[idx]) {
    emit('change', idx, data.value[idx]);
  }
};

const tweenTo = (target: number, animate: boolean) => {
  tween?.kill();
  const proxy = { p: pos };
  const dur = animate && !reduced ? props.duration / 1000 : 0;
  tween = gsap.to(proxy, {
    p: target,
    duration: dur,
    ease: props.ease,
    onUpdate: () => {
      pos = proxy.p;
      layout(proxy.p);
    },
    onComplete: () => {
      const n = count.value;
      if (n > 0) pos = ((pos % n) + n) % n;
      layout(pos);
    }
  });
};

const setFocus = (rawIndex: number, animate = true) => {
  const n = count.value;
  if (!n) return;
  const idx = props.loop ? ((rawIndex % n) + n) % n : clamp(rawIndex, 0, n - 1);
  let delta = idx - pos;
  if (props.loop && n > 1) {
    delta = ((delta % n) + n) % n;
    if (delta > n / 2) delta -= n;
  }
  tweenTo(pos + delta, animate);
  if (idx !== focusIndex) {
    focusIndex = idx;
    notify(idx);
  }
};

const navigateBy = (step: number) => setFocus(focusIndex + step, true);

const onPointerDown = (e: PointerEvent) => {
  if (count.value < 2) return;
  tween?.kill();
  drag = {
    x: e.clientX,
    startPos: pos,
    lastX: e.clientX,
    lastT: performance.now(),
    v: 0,
    moved: false,
    id: e.pointerId
  };
};

const onPointerMove = (e: PointerEvent) => {
  if (!drag) return;
  const stepPx = Math.max(props.cardWidth * 0.55 * scale, 40);
  const dx = e.clientX - drag.x;
  if (!drag.moved && Math.abs(dx) > 4) {
    drag.moved = true;
    rootRef.value?.setPointerCapture(drag.id);
  }
  if (!drag.moved) return;
  const now = performance.now();
  const dt = Math.max(now - drag.lastT, 1);
  drag.v = (e.clientX - drag.lastX) / dt;
  drag.lastX = e.clientX;
  drag.lastT = now;
  pos = drag.startPos - dx / stepPx;
  layout(pos);
};

const onPointerEnd = () => {
  const d = drag;
  if (!d) return;
  drag = null;
  if (!d.moved) return;
  const stepPx = Math.max(props.cardWidth * 0.55 * scale, 40);
  const projected = pos - (d.v * 180) / stepPx;
  setFocus(Math.round(projected), true);
};

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    navigateBy(-1);
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    navigateBy(1);
  }
};

const onCardClick = (index: number) => {
  if (drag?.moved) return;
  setFocus(index, true);
};

const toggleLike = (index: number) => {
  if (internalItems.value[index]) {
    const item = internalItems.value[index];
    item.liked = !item.liked;
    emit('like', index, item.liked, item);
  }
};

const onActionClick = (index: number, item: DepthCarouselCardItem) => {
  emit('action', index, item);
};

let ro: ResizeObserver | null = null;
let removeWheelListener: (() => void) | null = null;
let stopAutoplay: (() => void) | null = null;

const setupAutoplay = () => {
  reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!props.autoplay || reduced || count.value < 2) return;

  const root = rootRef.value;
  let hovered = false;
  let focused = false;
  let timer: ReturnType<typeof setInterval> | null = null;

  const stop = () => {
    if (timer) clearInterval(timer);
    timer = null;
  };
  const start = () => {
    stop();
    timer = setInterval(
      () => {
        if (!hovered && !focused) navigateBy(1);
      },
      Math.max(props.autoplayDelay, 600)
    );
  };
  const onEnter = () => {
    hovered = true;
  };
  const onLeave = () => {
    hovered = false;
  };
  const onFocusIn = () => {
    focused = true;
  };
  const onFocusOut = () => {
    focused = false;
  };

  root?.addEventListener('mouseenter', onEnter);
  root?.addEventListener('mouseleave', onLeave);
  root?.addEventListener('focusin', onFocusIn);
  root?.addEventListener('focusout', onFocusOut);
  start();

  stopAutoplay = () => {
    stop();
    root?.removeEventListener('mouseenter', onEnter);
    root?.removeEventListener('mouseleave', onLeave);
    root?.removeEventListener('focusin', onFocusIn);
    root?.removeEventListener('focusout', onFocusOut);
  };
};

onMounted(() => {
  const root = rootRef.value;
  if (root) {
    ro = new ResizeObserver(entries => {
      const entry = entries[0];
      if (!entry) return;
      const w = entry.contentRect.width;
      const needed = props.cardWidth + Math.abs(props.spread) * 2 + 120;
      scale = clamp(w / needed, 0.45, 1);
      layout(pos);
    });
    ro.observe(root);

    const onWheel = (e: WheelEvent) => {
      if (count.value < 2) return;
      e.preventDefault();
      tween?.kill();
      const raw = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const delta = e.deltaMode === 1 ? raw * 24 : raw;
      const step = clamp(delta / (props.cardWidth * 0.9), -0.6, 0.6);
      pos += step;
      layout(pos);
      if (wheelTimer) clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => setFocus(Math.round(pos), true), 130);
    };
    root.addEventListener('wheel', onWheel, { passive: false });
    removeWheelListener = () => {
      root.removeEventListener('wheel', onWheel);
      if (wheelTimer) clearTimeout(wheelTimer);
    };
  }

  layout(pos);
  setupAutoplay();
});

onUnmounted(() => {
  tween?.kill();
  if (wheelTimer) clearTimeout(wheelTimer);
  ro?.disconnect();
  removeWheelListener?.();
  stopAutoplay?.();
});

watch(
  () => [props.autoplay, props.autoplayDelay, count.value],
  () => {
    stopAutoplay?.();
    stopAutoplay = null;
    setupAutoplay();
  }
);

watch(
  () => [
    props.depth,
    props.spread,
    props.tilt,
    props.tiltDirection,
    props.visibleCards,
    props.falloff,
    props.blur,
    props.cardWidth,
    props.cardHeight,
    props.radius,
    count.value
  ],
  () => layout(pos)
);
</script>

<template>
  <div
    ref="rootRef"
    class="depth-carousel-root"
    :style="{ perspective: `${perspective}px` }"
    role="group"
    aria-roledescription="carousel"
    aria-label="Depth carousel"
    tabindex="0"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerEnd"
    @pointercancel="onPointerEnd"
    @keydown="onKeyDown"
  >
    <div class="depth-carousel-stage">
      <div
        v-for="(item, i) in data"
        :key="i"
        :ref="(el: Element | ComponentPublicInstance | null) => setCardRef(el, i)"
        class="depth-card"
        :class="{ 'is-active': active === i }"
        :style="{
          width: `${cardWidth}px`,
          height: `${cardHeight}px`,
          borderRadius: `${radius}px`
        }"
        aria-roledescription="slide"
        :aria-label="`${i + 1} of ${count}`"
        :aria-hidden="active !== i"
        @click="onCardClick(i)"
      >
        <!-- Slot support for custom card interior -->
        <slot name="card" :item="item" :index="i" :active="active === i">
          <!-- Card12 Integrated Design -->
          <div class="card12-layout">
            <!-- Media / Top Image Section -->
            <div class="card12-media">
              <img
                class="card12-img"
                :src="item.image"
                :alt="item.alt || item.title || ''"
                :draggable="false"
              />
              <div class="card12-gradient-overlay" />

              <!-- Card12 Floating Heart / Like Button -->
              <button
                type="button"
                class="card12-like-btn"
                :class="{ 'is-liked': item.liked }"
                :aria-label="item.liked ? 'Unlike project' : 'Like project'"
                title="Like project"
                @click.stop="toggleLike(i)"
                @pointerdown.stop
              >
                <svg
                  class="card12-heart-icon"
                  viewBox="0 0 24 24"
                  :fill="item.liked ? '#ef4444' : 'none'"
                  :stroke="item.liked ? '#ef4444' : 'currentColor'"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span class="sr-only">Like</span>
              </button>
            </div>

            <!-- Card12 Content Area -->
            <div class="card12-content">
              <!-- Header: Title and Badges -->
              <div class="card12-header">
                <h4 class="card12-title" :title="item.title">{{ item.title }}</h4>
                <div v-if="item.badges && item.badges.length" class="card12-badges">
                  <span
                    v-for="(badge, bIdx) in item.badges"
                    :key="bIdx"
                    class="card12-badge"
                  >
                    {{ badge }}
                  </span>
                </div>
              </div>

              <!-- Body: Description -->
              <p class="card12-description" :title="item.description">
                {{ item.description }}
              </p>

              <!-- Footer: Meta Information + Action Button -->
              <div class="card12-footer">
                <div class="card12-meta">
                  <span class="card12-meta-label">{{ item.metaLabel || 'CATEGORY' }}</span>
                  <span class="card12-meta-val">{{ item.metaValue || 'Featured' }}</span>
                </div>

                <div class="card12-actions">
                  <!-- GitHub Icon Link if provided -->
                  <a
                    v-if="item.githubUrl"
                    :href="item.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="card12-icon-link"
                    title="View GitHub Repository"
                    @click.stop
                    @pointerdown.stop
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58 0-.28-.01-1.03-.01-2.02-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </a>

                  <!-- Action CTA Button -->
                  <a
                    v-if="item.actionUrl"
                    :href="item.actionUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="card12-cta-btn"
                    @click.stop="onActionClick(i, item)"
                    @pointerdown.stop
                  >
                    <span>{{ item.actionLabel || 'View Project' }}</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </a>
                  <button
                    v-else
                    type="button"
                    class="card12-cta-btn"
                    @click.stop="onActionClick(i, item)"
                    @pointerdown.stop
                  >
                    <span>{{ item.actionLabel || 'View Project' }}</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </slot>

        <!-- Shading Overlay for receding cards in depth -->
        <span
          :ref="(el: Element | ComponentPublicInstance | null) => setOverlayRef(el, i)"
          class="depth-card-overlay"
          :style="{ background: tint }"
        />
      </div>
    </div>

    <!-- Navigation Arrow Controls -->
    <template v-if="showControls && count > 1">
      <button
        type="button"
        class="depth-nav-btn prev"
        aria-label="Previous slide"
        @click.stop="navigateBy(-1)"
        @pointerdown.stop
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            d="M15 5l-7 7 7 7"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        class="depth-nav-btn next"
        aria-label="Next slide"
        @click.stop="navigateBy(1)"
        @pointerdown.stop
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            d="M9 5l7 7-7 7"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </template>

    <!-- Indicators (Pills / Dots) -->
    <div
      v-if="showIndicators && count > 1"
      class="depth-indicators-pill"
      role="tablist"
      aria-label="Slides"
    >
      <button
        v-for="(_, i) in data"
        :key="i"
        type="button"
        role="tab"
        :aria-selected="active === i"
        :aria-label="`Go to slide ${i + 1}`"
        class="depth-indicator-dot"
        :class="{ active: active === i }"
        @click.stop="setFocus(i, true)"
        @pointerdown.stop
      />
    </div>
  </div>
</template>

<style scoped>
.depth-carousel-root {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 520px;
  height: 540px;
  perspective-origin: 50% 50%;
  touch-action: pan-y;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  outline: none;
  overflow: visible;
}

.depth-carousel-root:active {
  cursor: grabbing;
}

.depth-carousel-stage {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  pointer-events: none;
}

/* Base 3D Depth Card */
.depth-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
  cursor: pointer;
  will-change: transform, opacity, filter;
  overflow: hidden;
  background: var(--bg-primary, #18181c);
  border: 1px solid var(--border, rgba(255, 255, 255, 0.12));
  box-shadow:
    0 30px 60px -15px rgba(0, 0, 0, 0.55),
    0 10px 24px -10px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  pointer-events: auto;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.depth-card.is-active {
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow:
    0 35px 70px -12px rgba(0, 0, 0, 0.7),
    0 12px 30px -8px rgba(0, 0, 0, 0.45),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

.depth-card-overlay {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  mix-blend-mode: multiply;
  transition: opacity 0.15s ease;
  z-index: 10;
}

/* =============================================
   CARD12 INTEGRATED DESIGN STYLING
   ============================================= */
.card12-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: var(--bg-card, rgba(24, 24, 28, 0.95));
  position: relative;
  overflow: hidden;
}

/* Top Media Box */
.card12-media {
  position: relative;
  width: 100%;
  height: 220px;
  flex-shrink: 0;
  overflow: hidden;
  background: #0d0e12;
}

.card12-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.depth-card:hover .card12-img {
  transform: scale(1.04);
}

.card12-gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(14, 15, 18, 0.6) 0%, rgba(0, 0, 0, 0.1) 40%, transparent 100%);
  pointer-events: none;
}

/* Floating Like Button (from Card12) */
.card12-like-btn {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.85);
  color: #0f172a;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease, border-color 0.2s ease;
  z-index: 5;
}

:root.dark .card12-like-btn,
html.dark .card12-like-btn {
  border-color: rgba(255, 255, 255, 0.18);
  background: rgba(20, 22, 28, 0.72);
  color: #f1f5f9;
}

.card12-like-btn:hover {
  transform: scale(1.1);
  background: #ffffff;
  color: #000000;
}

:root.dark .card12-like-btn:hover,
html.dark .card12-like-btn:hover {
  background: rgba(30, 34, 44, 0.95);
  color: #ffffff;
}

.card12-like-btn:active {
  transform: scale(0.92);
}

.card12-like-btn.is-liked {
  color: #ef4444;
}

.card12-heart-icon {
  width: 17px;
  height: 17px;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card12-like-btn.is-liked .card12-heart-icon {
  transform: scale(1.08);
}

/* Card Body Area */
.card12-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 18px 20px 16px;
  gap: 12px;
  justify-content: space-between;
  background: var(--bg-primary, #18181c);
}

/* Header */
.card12-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card12-title {
  font-size: 19px;
  font-weight: 600;
  color: var(--text-primary, #ffffff);
  letter-spacing: -0.015em;
  line-height: 1.25;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card12-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.card12-badge {
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  font-weight: 500;
  padding: 2.5px 8px;
  border-radius: 6px;
  background: var(--bg-card, rgba(255, 255, 255, 0.06));
  color: var(--text-secondary, rgba(255, 255, 255, 0.75));
  border: 1px solid var(--border, rgba(255, 255, 255, 0.12));
  letter-spacing: 0.02em;
}

/* Description */
.card12-description {
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--text-secondary, rgba(255, 255, 255, 0.68));
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Footer */
.card12-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 14px;
  border-top: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
  margin-top: auto;
}

.card12-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.card12-meta-label {
  font-size: 10px;
  font-family: var(--font-mono, monospace);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted, rgba(255, 255, 255, 0.45));
}

.card12-meta-val {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary, #ffffff);
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card12-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.card12-icon-link {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--bg-card, rgba(255, 255, 255, 0.06));
  border: 1px solid var(--border, rgba(255, 255, 255, 0.12));
  color: var(--text-secondary, rgba(255, 255, 255, 0.7));
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  text-decoration: none;
}

.card12-icon-link:hover {
  background: var(--bg-card-hover, rgba(255, 255, 255, 0.12));
  color: var(--text-primary, #ffffff);
  border-color: rgba(255, 255, 255, 0.25);
}

/* Main CTA Button */
.card12-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.01em;
  background: #0284c7; /* Sky 600 from Card 12 */
  color: #ffffff;
  border: none;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.card12-cta-btn:hover {
  background: #0369a1; /* Sky 700 */
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(2, 132, 199, 0.45);
}

.card12-cta-btn:active {
  transform: translateY(0);
}

/* =============================================
   NAVIGATION ARROWS & INDICATORS
   ============================================= */
.depth-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(18, 20, 26, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #ffffff;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3000;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  transition: all 0.2s ease;
}

.depth-nav-btn.prev {
  left: 12px;
}

.depth-nav-btn.next {
  right: 12px;
}

.depth-nav-btn:hover {
  background: rgba(28, 31, 40, 0.9);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-50%) scale(1.08);
}

.depth-nav-btn:active {
  transform: translateY(-50%) scale(0.95);
}

/* Dots pill */
.depth-indicators-pill {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3000;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 6px 12px;
  border-radius: 9999px;
  background: rgba(14, 16, 22, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.depth-indicator-dot {
  width: 7px;
  height: 7px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.25s ease;
}

.depth-indicator-dot.active {
  width: 22px;
  background: #ffffff;
  border-radius: 4px;
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
  border-width: 0;
}
</style>
