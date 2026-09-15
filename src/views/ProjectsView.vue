<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  const mainEl = document.querySelector('.main-content')
  if (mainEl) mainEl.scrollTop = 0
})

export interface ProjectItem {
  title: string
  role: string
  description: string
  image: string
  alt?: string
  status?: string
  tech: string[]
  actionLabel?: string
  actionUrl?: string
  githubUrl?: string
}

const allProjects: ProjectItem[] = [
  // Page 1
  {
    title: 'Modern Portfolio Platform',
    role: 'Frontend Architect & UI Designer',
    description: 'An ultra-refined editorial portfolio experience crafted with Vue 3, TypeScript, and modern typography. Designed around unified magazine grid principles.',
    image: '/slide 1.jfif',
    alt: 'Modern Portfolio Platform preview',
    status: 'LIVE',
    tech: ['Vue', 'TypeScript', 'Vite', 'CSS'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'DevPulse Analytics',
    role: 'Backend & Data Engineer',
    description: 'Developer activity metrics and performance dashboard with real-time Git event aggregation, repository velocity, and workflow visualization.',
    image: '/slide2.jfif',
    alt: 'DevPulse Analytics preview',
    status: 'LIVE',
    tech: ['Node', 'PostgreSQL', 'TypeScript', 'Docker'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'Macua Project System',
    role: 'Full-Stack Developer & Lead Architect',
    description: 'Centralized project monitoring system built for MACUA Construction to coordinate site attendance, materials, and heavy equipment.',
    image: '/slide6.jfif',
    alt: 'Macua Project System preview',
    status: 'FEATURED',
    tech: ['Laravel', 'PHP', 'MySQL', 'CSS'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'OmniFlow Task Engine',
    role: 'Systems & Infrastructure Developer',
    description: 'Lightweight distributed task scheduler and background job orchestration pipeline built for scalable asynchronous execution.',
    image: '/slide3.jfif',
    alt: 'OmniFlow Task Engine preview',
    status: 'IN PROGRESS',
    tech: ['Redis', 'Docker', 'Node', 'TypeScript'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },

  // Page 2
  {
    title: 'BioSync Health Portal',
    role: 'Frontend Security & API Integrator',
    description: 'Biometric records synchronizer and patient management system designed for fast clinical workflows and secure data handling.',
    image: '/slide5.jfif',
    alt: 'BioSync Health Portal preview',
    status: 'LIVE',
    tech: ['Vue', 'TypeScript', 'Node'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'ByteShop Digital Store',
    role: 'Full-Stack E-Commerce Specialist',
    description: 'E-commerce platform for developer assets and digital products with custom Stripe checkout, automated licenses, and seller dashboards.',
    image: '/slide4.jfif',
    alt: 'ByteShop Digital Store preview',
    status: 'LIVE',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'CodeSnap CLI',
    role: 'CLI Tooling Developer',
    description: 'Command-line tool for generating beautiful syntax-highlighted code snippets for social media and technical documentation.',
    image: '/slide7.jfif',
    alt: 'CodeSnap CLI preview',
    status: 'OPEN SOURCE',
    tech: ['Node', 'TypeScript'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'TypeForge Playground',
    role: 'UI/UX Developer',
    description: 'Visual playground for pairing Google Fonts and exploring editorial typography scale systems in real time.',
    image: '/slide8.jfif',
    alt: 'TypeForge Playground preview',
    status: 'LIVE',
    tech: ['Vue', 'CSS', 'TypeScript'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },

  // Page 3
  {
    title: 'TaskFlow API',
    role: 'REST API Backend Engineer',
    description: 'Scalable RESTful API backend service for task orchestration featuring JWT auth, rate limiting, and PostgreSQL integration.',
    image: '/slide3.jfif',
    alt: 'TaskFlow API preview',
    status: 'LIVE',
    tech: ['TypeScript', 'Node', 'PostgreSQL', 'Docker'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'InventoryCore RBAC',
    role: 'Enterprise Systems Developer',
    description: 'Modular inventory tracking system with role-based access control, barcode logging, and multi-warehouse audit histories.',
    image: '/slide6.jfif',
    alt: 'InventoryCore RBAC preview',
    status: 'FEATURED',
    tech: ['PHP', 'Laravel', 'MySQL'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'PulseGraph SVG',
    role: 'Frontend Graphics Engineer',
    description: 'Zero-dependency interactive chart library tailored for lightweight mobile data visualizations and fast rendering.',
    image: '/slide 1.jfif',
    alt: 'PulseGraph SVG preview',
    status: 'OPEN SOURCE',
    tech: ['TypeScript', 'HTML', 'CSS'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'DocuCraft Engine',
    role: 'Documentation Tools Contributor',
    description: 'Minimalist markdown documentation generator featuring client-side full-text search and bespoke dark theme toggles.',
    image: '/slide5.jfif',
    alt: 'DocuCraft Engine preview',
    status: 'LIVE',
    tech: ['Vue', 'JavaScript', 'HTML'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },

  // Page 4
  {
    title: 'KeepR Vault',
    role: 'Creator & Sole Developer',
    description: 'Local-first password vault and personal workflow desktop app built with offline-first encryption and hardware keys.',
    image: '/slide2.jfif',
    alt: 'KeepR Vault preview',
    status: 'BETA',
    tech: ['Rust', 'React', 'Node'],
    actionLabel: 'READ CASE STUDY',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'PawsitiveCare Portal',
    role: 'Lead System Architect & Team Lead',
    description: 'Pet care management platform with biometric identity verification, client booking calendars, and vet clinical workflows.',
    image: '/slide4.jfif',
    alt: 'PawsitiveCare Portal preview',
    status: 'IN PROGRESS',
    tech: ['Laravel', 'React', 'Python', 'Docker'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'CloudNest Storage',
    role: 'Cloud Infrastructure Engineer',
    description: 'S3-compatible distributed object storage proxy with chunked uploads, checksum validation, and automated lifecycle rules.',
    image: '/slide7.jfif',
    alt: 'CloudNest Storage preview',
    status: 'LIVE',
    tech: ['Node', 'Docker', 'TypeScript'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'GitMetrics Pro',
    role: 'DevOps & Tooling Specialist',
    description: 'Continuous integration metrics aggregator that monitors pull request review times, test coverage trends, and deploy frequencies.',
    image: '/slide8.jfif',
    alt: 'GitMetrics Pro preview',
    status: 'LIVE',
    tech: ['TypeScript', 'PostgreSQL', 'Docker'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },

  // Page 5
  {
    title: 'Aura UI Design Kit',
    role: 'Design System Engineer',
    description: 'Comprehensive component library and design token framework engineered for accessible and responsive web applications.',
    image: '/slide 1.jfif',
    alt: 'Aura UI Design Kit preview',
    status: 'OPEN SOURCE',
    tech: ['Vue', 'CSS', 'TypeScript'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'EchoSocket Realtime',
    role: 'WebSockets & Protocol Specialist',
    description: 'Bi-directional messaging cluster designed for low-latency notifications, live presence indicators, and collaborative canvases.',
    image: '/slide3.jfif',
    alt: 'EchoSocket Realtime preview',
    status: 'LIVE',
    tech: ['Node', 'Redis', 'TypeScript'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'Zenith Blog CMS',
    role: 'Full-Stack PHP/Laravel Developer',
    description: 'Content management platform with custom block-based editor, granular permission matrix, and automated asset optimization.',
    image: '/slide6.jfif',
    alt: 'Zenith Blog CMS preview',
    status: 'LIVE',
    tech: ['Laravel', 'PHP', 'MySQL', 'CSS'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'VitePress Doc Theme',
    role: 'Frontend Tooling Contributor',
    description: 'Polished documentation theme tailored for developer libraries with interactive code snippets and Algolia search.',
    image: '/slide5.jfif',
    alt: 'VitePress Doc Theme preview',
    status: 'LIVE',
    tech: ['Vite', 'Vue', 'CSS'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },

  // Page 6
  {
    title: 'QuickPay Gateway',
    role: 'Fintech Integration Specialist',
    description: 'Unified payment gateway aggregation layer supporting multi-currency checkouts, webhooks retry, and transaction receipts.',
    image: '/slide2.jfif',
    alt: 'QuickPay Gateway preview',
    status: 'IN PROGRESS',
    tech: ['Node', 'TypeScript', 'PostgreSQL'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'GeoTrack Fleet Manager',
    role: 'Geospatial Data Engineer',
    description: 'Real-time vehicle telemetry and logistics route optimizer with geo-fencing alerts and interactive mapping tiles.',
    image: '/slide4.jfif',
    alt: 'GeoTrack Fleet Manager preview',
    status: 'LIVE',
    tech: ['React', 'TypeScript', 'Docker'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'Nexus RBAC Admin',
    role: 'Security & Auth Engineer',
    description: 'Single sign-on and identity governance dashboard managing enterprise tenant roles, session policies, and audit logs.',
    image: '/slide7.jfif',
    alt: 'Nexus RBAC Admin preview',
    status: 'FEATURED',
    tech: ['Vue', 'TypeScript', 'Node'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'PixelCraft Editor',
    role: 'Canvas & WebGL Developer',
    description: 'In-browser pixel art editor and sprite sheet animator with layer masks, palette generators, and GIF export.',
    image: '/slide8.jfif',
    alt: 'PixelCraft Editor preview',
    status: 'EXPERIMENT',
    tech: ['JavaScript', 'HTML', 'CSS'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },

  // Page 7
  {
    title: 'AssetPipeline CLI',
    role: 'Build Tools Developer',
    description: 'Zero-config asset bundler and image compression utility built to optimize web graphics in CI/CD build steps.',
    image: '/slide 1.jfif',
    alt: 'AssetPipeline CLI preview',
    status: 'OPEN SOURCE',
    tech: ['Node', 'TypeScript'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'HealthSync Watch API',
    role: 'IoT Backend Specialist',
    description: 'Health metrics ingestion daemon aggregating resting heart rates, sleep cycles, and telemetry from wearable devices.',
    image: '/slide5.jfif',
    alt: 'HealthSync Watch API preview',
    status: 'LIVE',
    tech: ['Node', 'PostgreSQL', 'Docker'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'Lumina Dark Engine',
    role: 'CSS Architecture Specialist',
    description: 'Automatic contrast calculation and accessible dark mode theming engine using native CSS custom properties.',
    image: '/slide3.jfif',
    alt: 'Lumina Dark Engine preview',
    status: 'LIVE',
    tech: ['CSS', 'JavaScript', 'HTML'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'QueryCache Daemon',
    role: 'High-Performance Systems Engineer',
    description: 'In-memory SQL query caching accelerator reducing database query latency and server compute overhead.',
    image: '/slide6.jfif',
    alt: 'QueryCache Daemon preview',
    status: 'BETA',
    tech: ['Redis', 'Docker', 'PHP'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },

  // Page 8
  {
    title: 'MarkdownStudio Web',
    role: 'Editor UI Engineer',
    description: 'Split-pane real-time markdown editor with KaTeX math rendering, mermaid diagram live previews, and PDF export.',
    image: '/slide2.jfif',
    alt: 'MarkdownStudio Web preview',
    status: 'LIVE',
    tech: ['Vue', 'TypeScript', 'CSS'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'K8s Deploy Helm Charts',
    role: 'DevOps Engineer',
    description: 'Production-ready Kubernetes Helm chart templates for deploying high-availability web applications with auto-scaling.',
    image: '/slide4.jfif',
    alt: 'K8s Deploy Helm Charts preview',
    status: 'OPEN SOURCE',
    tech: ['Docker', 'Node'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'Sentinel Error Monitor',
    role: 'Reliability & APM Specialist',
    description: 'Lightweight exception tracking agent and alerting webhook forwarder for web backends and microservices.',
    image: '/slide7.jfif',
    alt: 'Sentinel Error Monitor preview',
    status: 'LIVE',
    tech: ['Node', 'TypeScript', 'PostgreSQL'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
  {
    title: 'VectorSearch Microservice',
    role: 'AI Embeddings & Search Engineer',
    description: 'Semantic vector similarity search service for technical documentation and knowledge base indexing.',
    image: '/slide8.jfif',
    alt: 'VectorSearch Microservice preview',
    status: 'IN PROGRESS',
    tech: ['Python', 'Docker', 'TypeScript'],
    actionLabel: 'VISIT SITE',
    actionUrl: '#',
    githubUrl: 'https://github.com/JStillNoob',
  },
]

// Pagination state
const currentPage = ref(1)
const itemsPerPage = 4

const totalPages = computed(() => Math.ceil(allProjects.length / itemsPerPage))

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return allProjects.slice(start, start + itemsPerPage)
})

const changePage = (p: number) => {
  if (p >= 1 && p <= totalPages.value) {
    currentPage.value = p
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const mainEl = document.querySelector('.main-content')
    if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const renderTechIcon = (tech: string): string => {
  const k = tech.toLowerCase().trim()
  if (k.includes('next')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><circle cx="12" cy="12" r="11" fill="#000" stroke="rgba(255,255,255,0.2)" stroke-width="1"/><path d="M16.5 17L9.2 7.5H7.5v9h1.6v-6.6l6.6 8.5c.3-.4.5-.9.8-1.4z" fill="#fff"/><path d="M14.8 7.5h1.6v5.2l-1.6-2V7.5z" fill="#fff"/></svg>`
  }
  if (k.includes('css')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><rect width="22" height="22" x="1" y="1" rx="4" fill="#1572B6"/><path d="M6 5.5h12l-1.1 11.5L12 18.2l-4.9-1.2L6 5.5z" fill="#33A9DC"/><path d="M12 6.8v10.1l3.5-.9.8-8.2H12z" fill="#fff" opacity=".25"/><path d="M8.5 8.8h7l-.3 2.5H9.8l.2 2h4.8l-.4 3.7-2.4.7-2.4-.7-.2-1.7h-1.3l.3 2.9 3.6 1 3.6-1 .5-5.5H8.3l.2-2.3z" fill="#fff"/></svg>`
  }
  if (k.includes('react')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><circle cx="12" cy="12" r="1.8" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" stroke-width="1.3" fill="none"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" stroke-width="1.3" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" stroke-width="1.3" fill="none" transform="rotate(120 12 12)"/></svg>`
  }
  if (k.includes('vue')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M2.5 3.5h3.8L12 13.2l5.7-9.7h3.8L12 20.5 2.5 3.5z" fill="#42B883"/><path d="M6.3 3.5h3.2L12 7.7l2.5-4.2h3.2L12 13.2 6.3 3.5z" fill="#35495E"/></svg>`
  }
  if (k.includes('typescript') || k === 'ts') {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><rect width="22" height="22" x="1" y="1" rx="4" fill="#3178C6"/><path d="M4.5 9h6.5v1.6H8.6v6.4H6.8v-6.4H4.5V9zm8 5.7c.3.5 1 .9 1.7.9.8 0 1.3-.3 1.3-1 0-.6-.5-.9-1.5-1.3-1.4-.5-2.2-1-2.2-2.1 0-1.4 1.1-2.2 2.5-2.2 1.1 0 1.8.4 2.2 1.1l-1.2 1c-.3-.4-.6-.6-1.1-.6-.5 0-.9.3-.9.7 0 .5.4.7 1.3 1.1 1.5.5 2.4 1.1 2.4 2.3 0 1.5-1.1 2.4-2.8 2.4-1.3 0-2.2-.4-2.7-1.3l1-1.1z" fill="#fff"/></svg>`
  }
  if (k.includes('javascript') || k === 'js') {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><rect width="22" height="22" x="1" y="1" rx="4" fill="#F7DF1E"/><path d="M12.5 16.5c.4.7 1.1 1 2 1 1 0 1.7-.5 1.7-1.5 0-1-.7-1.4-1.9-1.9-1.5-.7-2.5-1.4-2.5-2.9 0-1.5 1.2-2.6 2.9-2.6 1.3 0 2.2.5 2.8 1.5l-1.5.9c-.3-.6-.7-.8-1.3-.8-.7 0-1.1.3-1.1.8 0 .5.4.8 1.4 1.2 1.7.7 3 1.4 3 3.1 0 1.8-1.4 2.9-3.4 2.9-1.6 0-2.8-.7-3.4-1.8l1.3-1zm-5.3-5.8h1.9v5.4c0 1.1-.6 1.6-1.7 1.6-.4 0-.8-.1-1.2-.3v-1.5c.3.1.5.2.8.2.3 0 .5-.2.5-.6V10.7z" fill="#000"/></svg>`
  }
  if (k.includes('laravel')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><rect width="22" height="22" x="1" y="1" rx="4" fill="#18181c"/><path d="M21 6.5v4.5c0 .1-.1.2-.2.3L17 13.5v4.2c0 .2-.1.3-.2.3L9 21.5c-.1 0-.2 0-.3 0L3 17c-.1-.1-.1-.2-.1-.3V4.5c0-.1.1-.2.2-.3L7 2c.1 0 .2 0 .3 0l4 2.2c.1.1.2.2.2.3v8.5l3.3-1.9V6.5c0-.1.1-.2.2-.3l4-2.2c.1 0 .2 0 .3 0l1.7 1c.1.1.1.1.1.2z" fill="#FF2D20"/></svg>`
  }
  if (k.includes('php')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><ellipse cx="12" cy="12" rx="11" ry="6.5" fill="#777BB4"/><text x="12" y="14.8" font-size="7.5" font-weight="900" font-family="sans-serif" text-anchor="middle" fill="#fff">PHP</text></svg>`
  }
  if (k.includes('mysql') || k.includes('sql') || k.includes('postgres')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><rect width="22" height="22" x="1" y="1" rx="4" fill="#00618A"/><ellipse cx="12" cy="7" rx="7" ry="2.5" fill="#fff" opacity=".9"/><path d="M5 7v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V7" stroke="#fff" stroke-width="1.2" fill="none"/><path d="M5 11v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4" stroke="#fff" stroke-width="1.2" fill="none"/></svg>`
  }
  if (k.includes('node')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2z" fill="#339933"/><text x="12" y="14.8" font-size="6.5" font-weight="800" font-family="sans-serif" text-anchor="middle" fill="#fff">node</text></svg>`
  }
  if (k.includes('docker')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><rect width="22" height="22" x="1" y="1" rx="4" fill="#0db7ed"/><path d="M20 12c-.4-.4-1.2-.4-1.7 0-.2-.7-.6-1.3-1.3-1.7-.2 0-.3-.1-.5-.1-.2-.5-.7-.9-1.2-1.1-.2-.1-.4-.2-.6-.2-.2-.4-.5-.8-.9-1-.3-.2-.7-.3-1.1-.3V9.5H11V5.5H9v2.2H7V5.5H5v4.2H3.2c-.5 0-.9.2-1.3.4-.6.6-.9 1.7-.9 3 0 3.3 3 5.9 9.2 5.9 5.7 0 9-2.7 9.7-6.3.6-.3 1.2-.9 1.2-1.5-.5-.4-.9-.9-.9-1.2h-.5z" fill="#fff"/></svg>`
  }
  if (k.includes('redis')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M2 8.5L12 3l10 5.5-10 5.5L2 8.5z" fill="#DC382D"/><path d="M2 8.5v6.5L12 20.5v-6.5L2 8.5z" fill="#A8251E"/><path d="M12 14v6.5l10-5.5V8.5L12 14z" fill="#C62828"/></svg>`
  }
  if (k.includes('vite')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M20.5 3.5L12.5 21 3.5 3.5h17z" fill="#646CFF"/><path d="M17 2.5l-5.8 12.5-2.4-4.8 8.2-7.7z" fill="#FFD62E"/></svg>`
  }
  if (k.includes('html')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><rect width="22" height="22" x="1" y="1" rx="4" fill="#E34F26"/><path d="M5.5 5h13l-1.2 12.5-5.3 1.5-5.3-1.5L5.5 5z" fill="#EF652A"/><text x="12" y="14" font-size="6" font-weight="900" font-family="sans-serif" text-anchor="middle" fill="#fff">HTML</text></svg>`
  }
  if (k.includes('python')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><rect width="22" height="22" x="1" y="1" rx="4" fill="#3776AB"/><path d="M12 5c-3 0-3.5 1.5-3.5 2.5h3.5v1h-5C5.5 8.5 5 10 5 12c0 2.5 1.5 3 2.5 3h1v-1.5C8.5 12 10 12 11 12h2v3.5c0 1.5-1 2.5-3 2.5h-1v1h1c3 0 3.5-1.5 3.5-2.5v-3.5h-3.5v-1h5c1.5 0 2-1.5 2-3.5 0-2.5-1.5-3-2.5-3h-1v1.5c0 1.5-1.5 1.5-2.5 1.5h-2V7.5C9 6 10 5 12 5z" fill="#FFD43B"/></svg>`
  }
  if (k.includes('rust')) {
    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><rect width="22" height="22" x="1" y="1" rx="4" fill="#CE412B"/><circle cx="12" cy="12" r="8" stroke="#ffffff" stroke-width="1.5"/><text x="12" y="15.2" font-size="8.5" font-weight="900" font-family="sans-serif" text-anchor="middle" fill="#fff">R</text></svg>`
  }
  return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><rect width="22" height="22" x="1" y="1" rx="4" fill="#23242b" stroke="rgba(255,255,255,0.15)" stroke-width="1"/><circle cx="12" cy="12" r="3" fill="rgba(255,255,255,0.7)"/></svg>`
}
</script>

<template>
  <div class="page-view">
    <div class="container projects-page-container">
      <!-- Back button matching system AboutMore style -->
      <button class="back-btn-global" @click="router.push('/')">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        <span>Back to Home</span>
      </button>

      <!-- Main Story Section -->
      <section class="story-section">
        <h1 class="story-headline" v-reveal>Selected Projects</h1>
        <p class="story-lead" v-reveal>
          A collection of web apps and sites I've designed, built, and optimized — spanning UI/UX, full-stack systems, and modern web applications.
        </p>

        <!-- 2-Column Projects Grid -->
        <div class="projects-grid reveal-stagger" v-reveal>
          <div
            v-for="proj in paginatedProjects"
            :key="proj.title"
            class="project-card"
          >
            <!-- Media / Framed container with light inset bezel -->
            <div class="project-card-media">
              <img
                class="project-card-img"
                :src="proj.image"
                :alt="proj.alt || proj.title"
                loading="lazy"
              />
            </div>

            <!-- Content Area -->
            <div class="project-card-content">
              <!-- Title & optional badge -->
              <div class="project-card-header">
                <h3 class="project-card-title" :title="proj.title">{{ proj.title }}</h3>
                <span v-if="proj.status" class="project-status-badge">{{ proj.status }}</span>
              </div>

              <!-- Role / Subtitle -->
              <p class="project-card-role" :title="proj.role">{{ proj.role }}</p>

              <!-- Description -->
              <p class="project-card-desc" :title="proj.description">{{ proj.description }}</p>

              <!-- Tech Stack Icons Row -->
              <div class="project-card-tech">
                <span
                  v-for="(t, tIdx) in proj.tech"
                  :key="tIdx"
                  class="tech-icon-pill"
                  :title="t"
                  v-html="renderTechIcon(t)"
                />
              </div>

              <!-- Divider Line -->
              <div class="project-card-divider" />

              <!-- Action Link: VISIT SITE ↗ -->
              <div class="project-card-footer">
                <a
                  :href="proj.actionUrl || proj.githubUrl || '#'"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-card-visit-link"
                >
                  <span>{{ (proj.actionLabel || 'VISIT SITE').toUpperCase() }}</span>
                  <svg class="visit-arrow-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Section -->
        <div class="pagination-divider" />
        <div class="pagination-bar">
          <!-- Prev Button -->
          <button
            v-if="currentPage > 1"
            class="nav-page-btn prev-btn"
            @click="changePage(currentPage - 1)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            <span>Prev</span>
          </button>

          <!-- Page Numbers Group (Centered) -->
          <div class="page-numbers-group">
            <button
              v-for="p in totalPages"
              :key="p"
              class="page-num-btn"
              :class="{ active: currentPage === p }"
              @click="changePage(p)"
            >
              {{ p }}
            </button>
          </div>

          <!-- Next Button (Right Aligned) -->
          <button
            v-if="currentPage < totalPages"
            class="nav-page-btn next-btn"
            @click="changePage(currentPage + 1)"
          >
            <span>Next</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Follows the exact system story-section margins & typography from AboutMoreView */
.story-section {
  padding: 0 0 70px 0;
  border-bottom: none;
}

.story-headline {
  font-size: clamp(32px, 4.5vw, 48px);
  font-weight: 400;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  line-height: 1.15;
  margin-bottom: 16px;
}

.story-lead {
  font-size: 16px;
  font-weight: 400;
  color: var(--text-secondary);
  line-height: 1.75;
  max-width: 640px;
  margin-bottom: 40px;
}

.container.projects-page-container {
  padding-left: 24px;
  padding-right: 24px;
}

/* 2-Column Grid matching 410px card container size */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 410px);
  gap: 20px;
  justify-content: center;
}

/* Dashed Editorial Card - Exactly matches DepthCarousel card size & styling */
.project-card {
  width: 410px;
  height: 550px;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary, #18181c);
  border: 1.5px dashed rgba(255, 255, 255, 0.24);
  border-radius: 20px;
  padding: 16px 20px 14px 20px;
  box-sizing: border-box;
  position: relative;
  transition: border-color var(--transition), transform var(--transition), box-shadow var(--transition);
}

.project-card:hover {
  border-color: rgba(255, 255, 255, 0.45);
  transform: translateY(-3px);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.75);
}

/* Framed Inset Media - Exactly matches 220px height and light inset frame */
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
  transition: transform 0.45s ease;
}

.project-card:hover .project-card-img {
  transform: scale(1.03);
}

/* Content Area */
.project-card-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 15px;
  min-width: 0;
}

.project-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 5px;
}

.project-card-title {
  font-size: 23px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.015em;
  line-height: 1.25;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-status-badge {
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 2px 7px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: rgba(255, 255, 255, 0.75);
  white-space: nowrap;
  flex-shrink: 0;
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
  min-height: 43px;
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

/* Pagination Section */
.pagination-divider {
  width: 100%;
  border-top: 1px dashed var(--border-subtle, rgba(255, 255, 255, 0.18));
  margin: 40px 0 24px 0;
}

.pagination-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  min-height: 38px;
}

.page-numbers-group {
  display: flex;
  align-items: center;
  gap: 7px;
}

.page-num-btn {
  width: 34px;
  height: 34px;
  border-radius: 6px;
  font-size: 13.5px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition);
  background: transparent;
  border: 1px dashed var(--border, rgba(255, 255, 255, 0.22));
  color: var(--text-muted, rgba(255, 255, 255, 0.5));
}

.page-num-btn:hover {
  border-color: var(--text-primary, rgba(255, 255, 255, 0.55));
  color: var(--text-primary, #ffffff);
}

.page-num-btn.active {
  background: var(--text-primary, #ffffff);
  color: var(--bg-primary, #0f1015);
  border: 1px solid var(--text-primary, #ffffff);
  font-weight: 700;
}

.nav-page-btn {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: var(--text-muted, rgba(255, 255, 255, 0.6));
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  transition: color var(--transition);
}

.nav-page-btn:hover {
  color: var(--text-primary, #ffffff);
}

.prev-btn {
  left: 0;
}

.next-btn {
  right: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .page-numbers-group {
    gap: 5px;
  }

  .page-num-btn {
    width: 30px;
    height: 30px;
    font-size: 12.5px;
  }
}
</style>
