<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface WeekColumn {
  days: (ContributionDay | null)[]
  monthLabel?: string
}

const props = withDefaults(
  defineProps<{
    username?: string
    title?: string
  }>(),
  {
    username: 'JStillNoob',
    title: 'GitHub Activity',
  }
)

const loading = ref(true)
const error = ref(false)
const rawContributions = ref<ContributionDay[]>([])
const totalContributions = ref<number>(0)

// Tooltip state
const hoveredDay = ref<ContributionDay | null>(null)
const tooltipX = ref(0)
const tooltipY = ref(0)
const isTooltipVisible = ref(false)

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(dateStr: string): string {
  try {
    const parts = dateStr.split('-').map(Number)
    const year = parts[0] ?? 2026
    const month = parts[1] ?? 1
    const day = parts[2] ?? 1
    const d = new Date(year, month - 1, day)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

// Generate fallback mock data in case GitHub API is unreachable
function generateFallbackData(): { contributions: ContributionDay[]; total: number } {
  const contributions: ContributionDay[] = []
  const today = new Date()
  let sum = 0

  // 53 weeks = 371 days
  for (let i = 370; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const isoString = d.toISOString()
    const dateStr = isoString.split('T')[0] ?? ''

    // Create realistic activity pattern
    const rand = Math.random()
    let level: 0 | 1 | 2 | 3 | 4 = 0
    let count = 0

    if (rand > 0.65) {
      if (rand > 0.94) {
        level = 4
        count = Math.floor(Math.random() * 8) + 10
      } else if (rand > 0.85) {
        level = 3
        count = Math.floor(Math.random() * 5) + 6
      } else if (rand > 0.75) {
        level = 2
        count = Math.floor(Math.random() * 3) + 3
      } else {
        level = 1
        count = Math.floor(Math.random() * 2) + 1
      }
    }
    sum += count
    contributions.push({ date: dateStr, count, level })
  }

  return { contributions, total: sum }
}

async function fetchContributions() {
  loading.value = true
  error.value = false

  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${props.username}?y=last`
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`)
    }

    const data = await response.json()
    if (data && Array.isArray(data.contributions) && data.contributions.length > 0) {
      rawContributions.value = data.contributions as ContributionDay[]
      const totalLastYear = typeof data.total?.lastYear === 'number' ? data.total.lastYear : undefined
      totalContributions.value = totalLastYear ?? data.contributions.reduce((acc: number, cur: ContributionDay) => acc + (cur.count || 0), 0)
    } else {
      throw new Error('Invalid contributions data structure')
    }
  } catch (err) {
    console.warn('GitHub contributions API request failed, using fallback data:', err)
    error.value = true
    const fallback = generateFallbackData()
    rawContributions.value = fallback.contributions
    totalContributions.value = fallback.total
  } finally {
    loading.value = false
  }
}

// Group contribution days into weeks (53 columns of 7 days: Sun-Sat)
const weeks = computed<WeekColumn[]>(() => {
  if (rawContributions.value.length === 0) return []

  const firstDay = rawContributions.value[0]
  if (!firstDay) return []

  const result: WeekColumn[] = []
  let currentWeek: (ContributionDay | null)[] = []
  let lastMonth = -1

  // Handle alignment: find the day of week for the first contribution
  const firstDate = new Date(firstDay.date)
  const firstDayOfWeek = firstDate.getDay() // 0 = Sunday

  // Pad the first week if not starting on Sunday
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null)
  }

  for (let i = 0; i < rawContributions.value.length; i++) {
    const day = rawContributions.value[i]
    if (day) {
      currentWeek.push(day)
    }

    if (currentWeek.length === 7) {
      // Check if a new month starts in this week
      let weekMonthLabel = ''
      for (const d of currentWeek) {
        if (d) {
          const parts = d.date.split('-')
          const monthStr = parts[1]
          if (monthStr) {
            const m = parseInt(monthStr, 10) - 1
            if (m !== lastMonth && monthNames[m]) {
              weekMonthLabel = monthNames[m] ?? ''
              lastMonth = m
              break
            }
          }
        }
      }

      result.push({
        days: currentWeek,
        monthLabel: weekMonthLabel,
      })
      currentWeek = []
    }
  }

  // Push any remaining days padded to 7
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null)
    }
    result.push({
      days: currentWeek,
      monthLabel: '',
    })
  }

  return result
})

function handleMouseEnter(day: ContributionDay | null, event: MouseEvent) {
  if (!day) return
  hoveredDay.value = day
  updateTooltipPos(event)
  isTooltipVisible.value = true
}

function handleMouseMove(event: MouseEvent) {
  if (isTooltipVisible.value) {
    updateTooltipPos(event)
  }
}

function handleMouseLeave() {
  isTooltipVisible.value = false
  hoveredDay.value = null
}

function updateTooltipPos(event: MouseEvent) {
  tooltipX.value = event.clientX
  tooltipY.value = event.clientY - 12
}

onMounted(() => {
  fetchContributions()
})
</script>

<template>
  <div class="gh-activity-section">
    <!-- Header -->
    <div v-if="title" class="gh-activity-header">
      <h3 class="gh-activity-title">{{ title }}</h3>
    </div>

    <!-- Outer Dashed Card Container -->
    <div class="gh-activity-card">
      <div class="gh-activity-inner" @mouseleave="handleMouseLeave">
        <!-- Scrollable Graph Area -->
        <div class="gh-graph-scroll">
          <!-- Month Labels -->
          <div class="gh-months-row">
            <div
              v-for="(week, index) in weeks"
              :key="`month-${index}`"
              class="gh-month-cell"
            >
              <span v-if="week.monthLabel" class="gh-month-text">
                {{ week.monthLabel }}
              </span>
            </div>
          </div>

          <!-- Contribution Grid (53 columns x 7 rows) -->
          <div class="gh-grid">
            <div
              v-for="(week, wIndex) in weeks"
              :key="`week-${wIndex}`"
              class="gh-week-column"
            >
              <div
                v-for="(day, dIndex) in week.days"
                :key="`day-${wIndex}-${dIndex}`"
                class="gh-dot-wrapper"
              >
                <div
                  v-if="day"
                  class="gh-dot"
                  :class="`level-${day.level}`"
                  @mouseenter="handleMouseEnter(day, $event)"
                  @mousemove="handleMouseMove($event)"
                />
                <div v-else class="gh-dot-empty" />
              </div>
            </div>
          </div>
        </div>

        <!-- Card Footer (Contribution Count & Legend) -->
        <div class="gh-activity-footer">
          <div class="gh-count-text">
            <span v-if="loading" class="gh-loading-placeholder">Loading contributions...</span>
            <span v-else>
              <strong>{{ totalContributions.toLocaleString() }}</strong> contributions in the last year
            </span>
          </div>

          <!-- Subtle activity legend -->
          <div class="gh-legend">
            <span class="gh-legend-label">Less</span>
            <div class="gh-legend-dots">
              <span class="gh-dot level-0 mini" />
              <span class="gh-dot level-1 mini" />
              <span class="gh-dot level-2 mini" />
              <span class="gh-dot level-3 mini" />
              <span class="gh-dot level-4 mini" />
            </div>
            <span class="gh-legend-label">More</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Tooltip -->
    <Teleport to="body">
      <Transition name="tooltip-fade">
        <div
          v-if="isTooltipVisible && hoveredDay"
          class="gh-tooltip"
          :style="{
            left: `${tooltipX}px`,
            top: `${tooltipY}px`,
          }"
        >
          <div class="gh-tooltip-count">
            <span v-if="hoveredDay.count === 0">No contributions</span>
            <span v-else>
              <strong>{{ hoveredDay.count }}</strong>
              {{ hoveredDay.count === 1 ? 'contribution' : 'contributions' }}
            </span>
          </div>
          <div class="gh-tooltip-date">{{ formatDate(hoveredDay.date) }}</div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.gh-activity-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.gh-activity-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.gh-activity-title {
  font-size: 26px;
  font-weight: 400;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

/* Outer Card with Rounded Dashed Border matching screenshot */
.gh-activity-card {
  border: 1px dashed rgba(255, 255, 255, 0.18);
  border-radius: 20px;
  background: rgba(14, 16, 20, 0.45);
  padding: 24px 28px 20px;
  position: relative;
  overflow: hidden;
  transition: border-color var(--transition), background var(--transition);
}

:global(html.light) .gh-activity-card {
  border-color: rgba(24, 24, 28, 0.2);
  background: rgba(24, 24, 28, 0.02);
}

.gh-activity-inner {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.gh-graph-scroll {
  overflow-x: auto;
  padding-bottom: 6px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.12) transparent;
}

.gh-graph-scroll::-webkit-scrollbar {
  height: 3px;
}

.gh-graph-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.gh-graph-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}

:global(html.light) .gh-graph-scroll::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
}

/* Months Row */
.gh-months-row {
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
  padding-left: 1px;
}

.gh-month-cell {
  width: 11px;
  flex-shrink: 0;
  position: relative;
  height: 16px;
}

.gh-month-text {
  position: absolute;
  left: 0;
  top: 0;
  white-space: nowrap;
  font-size: 11px;
  color: var(--text-muted);
  font-family: var(--font-sans);
  pointer-events: none;
}

/* Grid layout */
.gh-grid {
  display: flex;
  gap: 4px;
  align-items: center;
}

.gh-week-column {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-shrink: 0;
}

.gh-dot-wrapper {
  width: 11px;
  height: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gh-dot-empty {
  width: 11px;
  height: 11px;
}

/* Contribution Dots */
.gh-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.15s ease, filter 0.15s ease;
}

.gh-dot:hover {
  transform: scale(1.35);
  z-index: 5;
  filter: brightness(1.2);
}

/* GitHub Signature Dark Theme Green Levels */
.gh-dot.level-0 {
  background-color: #1a202c;
  opacity: 0.75;
}

:global(html.light) .gh-dot.level-0 {
  background-color: #e2e8f0;
  opacity: 0.9;
}

.gh-dot.level-1 {
  background-color: #0e4429;
}

:global(html.light) .gh-dot.level-1 {
  background-color: #9be9a8;
}

.gh-dot.level-2 {
  background-color: #006d32;
}

:global(html.light) .gh-dot.level-2 {
  background-color: #40c463;
}

.gh-dot.level-3 {
  background-color: #26a641;
  box-shadow: 0 0 6px rgba(38, 166, 65, 0.4);
}

:global(html.light) .gh-dot.level-3 {
  background-color: #30a14e;
  box-shadow: none;
}

.gh-dot.level-4 {
  background-color: #39d353;
  box-shadow: 0 0 10px rgba(57, 211, 83, 0.7);
}

:global(html.light) .gh-dot.level-4 {
  background-color: #216e39;
  box-shadow: none;
}

/* Mini dots for legend */
.gh-dot.mini {
  width: 10px;
  height: 10px;
  cursor: default;
}

.gh-dot.mini:hover {
  transform: none;
}

/* Footer Section */
.gh-activity-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 6px;
}

.gh-count-text {
  font-size: 13.5px;
  color: var(--text-secondary);
  font-family: var(--font-sans);
}

.gh-count-text strong {
  color: var(--text-primary);
  font-weight: 500;
}

.gh-loading-placeholder {
  color: var(--text-muted);
  font-style: italic;
}

.gh-legend {
  display: flex;
  align-items: center;
  gap: 8px;
}

.gh-legend-label {
  font-size: 11px;
  color: var(--text-muted);
  font-family: var(--font-sans);
}

.gh-legend-dots {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Floating Tooltip */
.gh-tooltip {
  position: fixed;
  z-index: 10000;
  transform: translate(-50%, -100%);
  background: rgba(18, 20, 26, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  padding: 6px 12px;
  border-radius: 8px;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  white-space: nowrap;
}

:global(html.light) .gh-tooltip {
  background: rgba(255, 255, 255, 0.96);
  border-color: rgba(0, 0, 0, 0.12);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.gh-tooltip-count {
  font-size: 12px;
  color: #f6f6f6;
  line-height: 1.3;
}

:global(html.light) .gh-tooltip-count {
  color: #18181c;
}

.gh-tooltip-count strong {
  font-weight: 600;
  color: #39d353;
}

:global(html.light) .gh-tooltip-count strong {
  color: #216e39;
}

.gh-tooltip-date {
  font-size: 10.5px;
  color: rgba(246, 246, 246, 0.6);
  font-family: var(--font-mono);
}

:global(html.light) .gh-tooltip-date {
  color: rgba(24, 24, 28, 0.6);
}

/* Tooltip animation */
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -90%);
}

@media (max-width: 640px) {
  .gh-activity-card {
    padding: 18px 16px 14px;
    border-radius: 14px;
  }
  .gh-activity-title {
    font-size: 22px;
  }
}
</style>
