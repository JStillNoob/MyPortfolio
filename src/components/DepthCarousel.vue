<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, type ComponentPublicInstance } from 'vue';
import gsap from 'gsap';

export interface DepthCarouselCardItem {
  image: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  role?: string;
  description?: string;
  badges?: string[];
  tech?: string[];
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
  cardWidth: 410,
  cardHeight: 550,
  radius: 20,
  tint: '#05060a',
  depth: 220,
  spread: 95,
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

const getRoleOrSubtitle = (item: DepthCarouselCardItem): string => {
  return item.subtitle || item.role || item.metaValue || 'Frontend Developer & Deployment Specialist';
};

const getTechList = (item: DepthCarouselCardItem): string[] => {
  if (Array.isArray(item.tech) && item.tech.length) return item.tech;
  if (Array.isArray(item.badges) && item.badges.length) return item.badges;
  return ['Vue', 'TypeScript', 'CSS'];
};

const renderTechIcon = (tech: string): string => {
  const k = tech.toLowerCase().trim();
  if (k.includes('next')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><circle cx="12" cy="12" r="11" fill="#000" stroke="rgba(255,255,255,0.2)" stroke-width="1"/><path d="M16.5 17L9.2 7.5H7.5v9h1.6v-6.6l6.6 8.5c.3-.4.5-.9.8-1.4z" fill="#fff"/><path d="M14.8 7.5h1.6v5.2l-1.6-2V7.5z" fill="#fff"/></svg>`;
  }
  if (k.includes('css')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><rect width="22" height="22" x="1" y="1" rx="4" fill="#1572B6"/><path d="M6 5.5h12l-1.1 11.5L12 18.2l-4.9-1.2L6 5.5z" fill="#33A9DC"/><path d="M12 6.8v10.1l3.5-.9.8-8.2H12z" fill="#fff" opacity=".25"/><path d="M8.5 8.8h7l-.3 2.5H9.8l.2 2h4.8l-.4 3.7-2.4.7-2.4-.7-.2-1.7h-1.3l.3 2.9 3.6 1 3.6-1 .5-5.5H8.3l.2-2.3z" fill="#fff"/></svg>`;
  }
  if (k.includes('react')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><circle cx="12" cy="12" r="1.8" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" stroke-width="1.3" fill="none"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" stroke-width="1.3" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" stroke-width="1.3" fill="none" transform="rotate(120 12 12)"/></svg>`;
  }
  if (k.includes('vue')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M2.5 3.5h3.8L12 13.2l5.7-9.7h3.8L12 20.5 2.5 3.5z" fill="#42B883"/><path d="M6.3 3.5h3.2L12 7.7l2.5-4.2h3.2L12 13.2 6.3 3.5z" fill="#35495E"/></svg>`;
  }
  if (k.includes('typescript') || k === 'ts') {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><rect width="22" height="22" x="1" y="1" rx="4" fill="#3178C6"/><path d="M4.5 9h6.5v1.6H8.6v6.4H6.8v-6.4H4.5V9zm8 5.7c.3.5 1 .9 1.7.9.8 0 1.3-.3 1.3-1 0-.6-.5-.9-1.5-1.3-1.4-.5-2.2-1-2.2-2.1 0-1.4 1.1-2.2 2.5-2.2 1.1 0 1.8.4 2.2 1.1l-1.2 1c-.3-.4-.6-.6-1.1-.6-.5 0-.9.3-.9.7 0 .5.4.7 1.3 1.1 1.5.5 2.4 1.1 2.4 2.3 0 1.5-1.1 2.4-2.8 2.4-1.3 0-2.2-.4-2.7-1.3l1-1.1z" fill="#fff"/></svg>`;
  }
  if (k.includes('javascript') || k === 'js') {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><rect width="22" height="22" x="1" y="1" rx="4" fill="#F7DF1E"/><path d="M12.5 16.5c.4.7 1.1 1 2 1 1 0 1.7-.5 1.7-1.5 0-1-.7-1.4-1.9-1.9-1.5-.7-2.5-1.4-2.5-2.9 0-1.5 1.2-2.6 2.9-2.6 1.3 0 2.2.5 2.8 1.5l-1.5.9c-.3-.6-.7-.8-1.3-.8-.7 0-1.1.3-1.1.8 0 .5.4.8 1.4 1.2 1.7.7 3 1.4 3 3.1 0 1.8-1.4 2.9-3.4 2.9-1.6 0-2.8-.7-3.4-1.8l1.3-1zm-5.3-5.8h1.9v5.4c0 1.1-.6 1.6-1.7 1.6-.4 0-.8-.1-1.2-.3v-1.5c.3.1.5.2.8.2.3 0 .5-.2.5-.6V10.7z" fill="#000"/></svg>`;
  }
  if (k.includes('laravel')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><rect width="22" height="22" x="1" y="1" rx="4" fill="#18181c"/><path d="M21 6.5v4.5c0 .1-.1.2-.2.3L17 13.5v4.2c0 .2-.1.3-.2.3L9 21.5c-.1 0-.2 0-.3 0L3 17c-.1-.1-.1-.2-.1-.3V4.5c0-.1.1-.2.2-.3L7 2c.1 0 .2 0 .3 0l4 2.2c.1.1.2.2.2.3v8.5l3.3-1.9V6.5c0-.1.1-.2.2-.3l4-2.2c.1 0 .2 0 .3 0l1.7 1c.1.1.1.1.1.2z" fill="#FF2D20"/></svg>`;
  }
  if (k.includes('php')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><ellipse cx="12" cy="12" rx="11" ry="6.5" fill="#777BB4"/><text x="12" y="14.8" font-size="7.5" font-weight="900" font-family="sans-serif" text-anchor="middle" fill="#fff">PHP</text></svg>`;
  }
  if (k.includes('mysql') || k.includes('sql') || k.includes('postgres')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><rect width="22" height="22" x="1" y="1" rx="4" fill="#00618A"/><ellipse cx="12" cy="7" rx="7" ry="2.5" fill="#fff" opacity=".9"/><path d="M5 7v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V7" stroke="#fff" stroke-width="1.2" fill="none"/><path d="M5 11v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4" stroke="#fff" stroke-width="1.2" fill="none"/></svg>`;
  }
  if (k.includes('node')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2z" fill="#339933"/><text x="12" y="14.8" font-size="6.5" font-weight="800" font-family="sans-serif" text-anchor="middle" fill="#fff">node</text></svg>`;
  }
  if (k.includes('docker')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><rect width="22" height="22" x="1" y="1" rx="4" fill="#0db7ed"/><path d="M20 12c-.4-.4-1.2-.4-1.7 0-.2-.7-.6-1.3-1.3-1.7-.2 0-.3-.1-.5-.1-.2-.5-.7-.9-1.2-1.1-.2-.1-.4-.2-.6-.2-.2-.4-.5-.8-.9-1-.3-.2-.7-.3-1.1-.3V9.5H11V5.5H9v2.2H7V5.5H5v4.2H3.2c-.5 0-.9.2-1.3.4-.6.6-.9 1.7-.9 3 0 3.3 3 5.9 9.2 5.9 5.7 0 9-2.7 9.7-6.3.6-.3 1.2-.9 1.2-1.5-.5-.4-.9-.9-.9-1.2h-.5z" fill="#fff"/></svg>`;
  }
  if (k.includes('redis')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M2 8.5L12 3l10 5.5-10 5.5L2 8.5z" fill="#DC382D"/><path d="M2 8.5v6.5L12 20.5v-6.5L2 8.5z" fill="#A8251E"/><path d="M12 14v6.5l10-5.5V8.5L12 14z" fill="#C62828"/></svg>`;
  }
  if (k.includes('vite')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M20.5 3.5L12.5 21 3.5 3.5h17z" fill="#646CFF"/><path d="M17 2.5l-5.8 12.5-2.4-4.8 8.2-7.7z" fill="#FFD62E"/></svg>`;
  }
  if (k.includes('html')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><rect width="22" height="22" x="1" y="1" rx="4" fill="#E34F26"/><path d="M5.5 5h13l-1.2 12.5-5.3 1.5-5.3-1.5L5.5 5z" fill="#EF652A"/><text x="12" y="14" font-size="6" font-weight="900" font-family="sans-serif" text-anchor="middle" fill="#fff">HTML</text></svg>`;
  }
  return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><rect width="22" height="22" x="1" y="1" rx="4" fill="#23242b" stroke="rgba(255,255,255,0.15)" stroke-width="1"/><circle cx="12" cy="12" r="3" fill="rgba(255,255,255,0.7)"/></svg>`;
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
          <div class="project-card-layout">
            <!-- Media / Top Image (No heart icon) -->
            <div class="project-card-media">
              <img
                class="project-card-img"
                :src="item.image"
                :alt="item.alt || item.title || ''"
                :draggable="false"
              />
            </div>

            <!-- Content Area: Title -> Subtitle/Role -> Description -> Tech -> Divider -> Visit Site -->
            <div class="project-card-content">
              <!-- Title -->
              <h4 class="project-card-title" :title="item.title">{{ item.title }}</h4>

              <!-- Role / Subtitle -->
              <p class="project-card-role" :title="getRoleOrSubtitle(item)">
                {{ getRoleOrSubtitle(item) }}
              </p>

              <!-- Description -->
              <p class="project-card-desc" :title="item.description">
                {{ item.description }}
              </p>

              <!-- Tech Stack Icons Row -->
              <div class="project-card-tech">
                <span
                  v-for="(t, tIdx) in getTechList(item)"
                  :key="tIdx"
                  class="tech-icon-pill"
                  :title="t"
                  v-html="renderTechIcon(t)"
                />
              </div>

              <!-- Divider Line -->
              <div class="project-card-divider" />

              <!-- Footer Action: VISIT SITE ↗ -->
              <div class="project-card-footer">
                <a
                  v-if="item.actionUrl"
                  :href="item.actionUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-card-visit-link"
                  @click.stop="onActionClick(i, item)"
                  @pointerdown.stop
                >
                  <span>{{ (item.actionLabel || 'VISIT SITE').toUpperCase() }}</span>
                  <svg class="visit-arrow-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </a>
                <button
                  v-else
                  type="button"
                  class="project-card-visit-link"
                  @click.stop="onActionClick(i, item)"
                  @pointerdown.stop
                >
                  <span>{{ (item.actionLabel || 'VISIT SITE').toUpperCase() }}</span>
                  <svg class="visit-arrow-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </button>
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
  min-height: 590px;
  height: 620px;
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
  border: 1.5px dashed rgba(255, 255, 255, 0.24);
  border-radius: 20px;
  box-shadow:
    0 30px 60px -15px rgba(0, 0, 0, 0.7),
    0 10px 24px -10px rgba(0, 0, 0, 0.45);
  pointer-events: auto;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
  box-sizing: border-box;
}

.depth-card.is-active {
  border-color: rgba(255, 255, 255, 0.48);
  box-shadow:
    0 35px 70px -12px rgba(0, 0, 0, 0.85),
    0 12px 30px -8px rgba(0, 0, 0, 0.55);
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
   NEW EDITORIAL CARD STYLING (MATCHING DESIGN REFERENCE)
   ============================================= */
.project-card-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 16px 20px 14px 20px;
  box-sizing: border-box;
  background: var(--bg-primary, #18181c);
  position: relative;
  overflow: hidden;
}

.project-card-media {
  position: relative;
  width: 100%;
  height: 220px;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  background: #f1f3f6;
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
  display: block;
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
  transition: transform 0.45s ease;
}

.depth-card:hover .project-card-img {
  transform: scale(1.03);
}

.project-card-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 15px;
  min-width: 0;
}

.project-card-title {
  font-size: 23px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.015em;
  line-height: 1.25;
  margin: 0 0 5px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-card-role {
  font-size: 14.5px;
  font-weight: 600;
  color: #f1f5f9;
  line-height: 1.35;
  margin: 0 0 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-card-desc {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.55;
  color: rgba(246, 246, 246, 0.76);
  margin: 0 0 14px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-card-tech {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  min-height: 26px;
}

.tech-icon-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 5px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.tech-icon-pill:hover {
  transform: translateY(-2px);
}

.project-card-divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.12);
  margin: 15px 0 11px 0;
}

.project-card-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
}

.project-card-visit-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: none;
  border: none;
  padding: 0;
  font-family: var(--font-mono, monospace);
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(246, 246, 246, 0.65);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease;
}

.project-card-visit-link:hover {
  color: #ffffff;
  transform: translateX(2px);
}

.visit-arrow-icon {
  width: 13px;
  height: 13px;
  stroke: currentColor;
  transition: transform 0.2s ease;
}

.project-card-visit-link:hover .visit-arrow-icon {
  transform: translate(1px, -1px);
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
