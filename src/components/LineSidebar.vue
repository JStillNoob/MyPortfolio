<script setup lang="ts">
import { ref, watch, onUnmounted, type CSSProperties, type ComponentPublicInstance } from 'vue';

export type Falloff = 'linear' | 'smooth' | 'sharp';

interface LineSidebarProps {
  items?: string[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: Falloff;
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  defaultActive?: number | null;
  className?: string;
}

const FALLOFF_CURVES: Record<Falloff, (p: number) => number> = {
  linear: p => p,
  smooth: p => p * p * (3 - 2 * p),
  sharp: p => p * p * p,
};

const props = withDefaults(defineProps<LineSidebarProps>(), {
  items: () => ['About', 'Education', 'Projects', 'Skills', 'Contact'],
  accentColor: '#c5beff',
  textColor: '#c4c4c4',
  markerColor: '#6c6c6c',
  showIndex: true,
  showMarker: true,
  proximityRadius: 100,
  maxShift: 30,
  falloff: 'smooth',
  markerLength: 60,
  markerGap: 0,
  tickScale: 0.5,
  scaleTick: true,
  itemGap: 20,
  fontSize: 1.05,
  smoothing: 100,
  defaultActive: null,
  className: '',
});

const emit = defineEmits<{
  itemClick: [index: number, label: string];
}>();

const listRef = ref<HTMLUListElement | null>(null);
const itemRefs = ref<(HTMLLIElement | null)[]>([]);
let targets: number[] = [];
const current: number[] = [];
let rafId: number | null = null;
let last = 0;

// KEY FIX: sync activeIndex whenever the parent's defaultActive prop changes (scroll tracking)
const activeIndex = ref<number | null>(props.defaultActive);
watch(() => props.defaultActive, (val) => {
  activeIndex.value = val ?? null;
  startLoop();
});

const setItemRef = (el: Element | ComponentPublicInstance | null, index: number) => {
  itemRefs.value[index] = el as HTMLLIElement | null;
};

const runFrame = (now: number) => {
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  const tau = Math.max(props.smoothing, 1) / 1000;
  const k = 1 - Math.exp(-dt / tau);

  let moving = false;
  const els = itemRefs.value;
  for (let i = 0; i < els.length; i++) {
    const el = els[i];
    if (!el) continue;
    const target = Math.max(targets[i] || 0, activeIndex.value === i ? 1 : 0);
    const cur = current[i] || 0;
    const next = cur + (target - cur) * k;
    const settled = Math.abs(target - next) < 0.0015;
    const value = settled ? target : next;
    current[i] = value;
    el.style.setProperty('--effect', value.toFixed(4));
    if (!settled) moving = true;
  }

  rafId = moving ? requestAnimationFrame(runFrame) : null;
};

const startLoop = () => {
  if (rafId != null) return;
  last = performance.now();
  rafId = requestAnimationFrame(runFrame);
};

const handlePointerMove = (e: PointerEvent) => {
  const list = listRef.value;
  if (!list) return;
  const rect = list.getBoundingClientRect();
  const pointerY = e.clientY - rect.top;
  const ease = FALLOFF_CURVES[props.falloff] ?? FALLOFF_CURVES.linear;
  const els = itemRefs.value;
  for (let i = 0; i < els.length; i++) {
    const el = els[i];
    if (!el) continue;
    const center = el.offsetTop + el.offsetHeight / 2;
    const distance = Math.abs(pointerY - center);
    targets[i] = ease(Math.max(0, 1 - distance / props.proximityRadius));
  }
  startLoop();
};

const handlePointerLeave = () => {
  targets = targets.map(() => 0);
  startLoop();
};

const handleClick = (index: number, label: string) => {
  activeIndex.value = index;
  emit('itemClick', index, label);
};

watch(activeIndex, () => startLoop(), { immediate: true });

onUnmounted(() => {
  if (rafId != null) cancelAnimationFrame(rafId);
});
</script>

<template>
  <nav
    class="sidebar-nav"
    :class="[{ 'has-marker': showMarker }, className]"
    :style="
      ({
        '--accent-color': accentColor,
        '--text-color': textColor,
        '--marker-color': markerColor,
        '--marker-length': `${markerLength}px`,
        '--marker-gap': `${markerGap}px`,
        '--tick-scale': tickScale,
        '--max-shift': `${maxShift}px`,
        '--item-gap': `${itemGap}px`,
        '--font-size': `${fontSize}rem`,
        '--smoothing': `${smoothing}ms`,
      }) as CSSProperties
    "
  >
    <ul
      ref="listRef"
      class="sidebar-list"
      @pointermove="handlePointerMove"
      @pointerleave="handlePointerLeave"
    >
      <li
        v-for="(label, index) in items"
        :key="`${label}-${index}`"
        :ref="el => setItemRef(el, index)"
        :aria-current="activeIndex === index ? 'true' : undefined"
        class="sidebar-item"
        @click="handleClick(index, label)"
      >
        <!-- Marker line -->
        <span
          v-if="showMarker"
          aria-hidden="true"
          class="sidebar-marker"
        />
        <!-- Ticks between items -->
        <span
          v-if="showMarker"
          aria-hidden="true"
          class="sidebar-tick sidebar-tick-1"
        />
        <span
          v-if="showMarker"
          aria-hidden="true"
          class="sidebar-tick sidebar-tick-2"
        />

        <!-- Label -->
        <span class="sidebar-label">
          <span v-if="showIndex" class="sidebar-index">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <span class="sidebar-text">{{ label }}</span>
        </span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.sidebar-nav {
  position: relative;
  display: flex;
  justify-content: flex-start;
}

.sidebar-nav.has-marker {
  padding-left: calc(var(--marker-length) + var(--marker-gap));
}

.sidebar-list {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 20px 0;
  list-style: none;
  gap: var(--item-gap);
}

.sidebar-item {
  position: relative;
  cursor: pointer;
  --effect: 0;
}

/* Extend click/hover hit area */
.sidebar-item::before {
  content: '';
  position: absolute;
  inset: -8px -56px;
}

/* Marker line */
.sidebar-marker {
  position: absolute;
  top: 50%;
  left: calc(-1 * var(--marker-length) - var(--marker-gap));
  width: var(--marker-length);
  height: 2px;
  transform-origin: left center;
  transform: translateY(-50%) scaleX(calc(0.6 + var(--effect, 0) * 0.6));
  background: color-mix(
    in srgb,
    var(--accent-color) calc(var(--effect, 0) * 100%),
    var(--marker-color)
  );
  border-radius: 2px;
  transition: none; /* rAF-driven */
}

/* Ticks between items */
.sidebar-tick {
  position: absolute;
  left: calc(-1 * var(--marker-length) - var(--marker-gap));
  height: 1px;
  width: calc(var(--marker-length) * var(--tick-scale));
  background: var(--marker-color);
  opacity: 0.4;
  transform-origin: left center;
  transform: translateY(-50%) scaleX(calc(0.7 + var(--effect, 0) * 0.6));
  border-radius: 1px;
}

.sidebar-tick-1 {
  top: calc(100% + var(--item-gap) * 0.333);
}

.sidebar-tick-2 {
  top: calc(100% + var(--item-gap) * 0.667);
}

/* Hide ticks on last item */
.sidebar-item:last-child .sidebar-tick {
  display: none;
}

/* Label row */
.sidebar-label {
  display: inline-flex;
  align-items: baseline;
  gap: 0;
  font-size: var(--font-size);
  line-height: 1.2;
  color: color-mix(
    in srgb,
    var(--accent-color) calc(var(--effect, 0) * 100%),
    var(--text-color)
  );
  transform: translateX(calc(var(--effect, 0) * var(--max-shift)));
  transition: none;
  user-select: none;
}

.sidebar-index {
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 0.8em;
  margin-right: 0.65rem;
  opacity: calc(0.4 + var(--effect, 0) * 0.6);
  letter-spacing: 0.04em;
}

.sidebar-text {
  font-weight: 500;
  letter-spacing: 0.01em;
}
</style>
