export interface Technology {
  name: string
  logo?: string
  mark: string
  monochrome?: boolean
}

export interface TechnologyCategory {
  number: string
  label: string
  purpose: string
  technologies: Technology[]
}

const devicon = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

export const technologyCategories: TechnologyCategory[] = [
  {
    number: '01',
    label: 'Frontend',
    purpose: 'Interfaces, responsive layouts, and client-side experiences.',
    technologies: [
      { name: 'Vue.js', logo: `${devicon}/vuejs/vuejs-original.svg`, mark: 'V' },
      { name: 'JavaScript', logo: `${devicon}/javascript/javascript-original.svg`, mark: 'JS' },
      { name: 'HTML5', logo: `${devicon}/html5/html5-original.svg`, mark: '5' },
      { name: 'CSS3', logo: `${devicon}/css3/css3-original.svg`, mark: '3' },
      { name: 'Tailwind CSS', logo: `${devicon}/tailwindcss/tailwindcss-original.svg`, mark: 'TW' },
    ],
  },
  {
    number: '02',
    label: 'Backend',
    purpose: 'Server-side applications, business logic, and APIs.',
    technologies: [
      { name: 'PHP', logo: `${devicon}/php/php-original.svg`, mark: 'PHP' },
      { name: 'Laravel', logo: `${devicon}/laravel/laravel-original.svg`, mark: 'L' },
      { name: 'Python', logo: `${devicon}/python/python-original.svg`, mark: 'PY' },
      { name: 'C#', logo: `${devicon}/csharp/csharp-original.svg`, mark: 'C#' },
    ],
  },
  {
    number: '03',
    label: 'Database',
    purpose: 'Relational data, cloud data services, and persistence.',
    technologies: [
      { name: 'MySQL', logo: `${devicon}/mysql/mysql-original.svg`, mark: 'MY' },
      { name: 'PostgreSQL', logo: `${devicon}/postgresql/postgresql-original.svg`, mark: 'PG' },
      { name: 'Firebase', logo: `${devicon}/firebase/firebase-original.svg`, mark: 'FB' },
    ],
  },
  {
    number: '04',
    label: 'QA & Testing',
    purpose: 'Quality assurance, validation, test planning, and defect tracking.',
    technologies: [
      { name: 'Selenium', logo: `${devicon}/selenium/selenium-original.svg`, mark: 'SE' },
      { name: 'Functional Testing', mark: '✓' },
      { name: 'Integration Testing', mark: '↔' },
      { name: 'Regression Testing', mark: '↻' },
      { name: 'API Testing', mark: '</>' },
      { name: 'Test Case Design', mark: 'TC' },
      { name: 'Bug Reporting', mark: 'BUG' },
    ],
  },
  {
    number: '05',
    label: 'Cloud & Deployment',
    purpose: 'Hosting, cloud infrastructure, and production deployment.',
    technologies: [
      { name: 'Microsoft Azure', logo: `${devicon}/azure/azure-original.svg`, mark: 'AZ' },
      { name: 'Azure Virtual Machines', logo: `${devicon}/azure/azure-original.svg`, mark: 'VM' },
      { name: 'Vercel', logo: `${devicon}/vercel/vercel-original.svg`, mark: '▲', monochrome: true },
      { name: 'MonsterASP.NET', mark: 'M' },
    ],
  },
  {
    number: '06',
    label: 'System Administration',
    purpose: 'Server operations, workstation setup, networking, and remote support.',
    technologies: [
      { name: 'Windows Server', logo: `${devicon}/windows11/windows11-original.svg`, mark: 'WS' },
      { name: 'Server Deployment', mark: 'SRV' },
      { name: 'User/Client Configuration', mark: 'USR' },
      { name: 'Network Configuration', mark: 'NET' },
      { name: 'Remote Administration', mark: 'RMT' },
    ],
  },
  {
    number: '07',
    label: 'Development Tools',
    purpose: 'Version control, collaboration, and local development environments.',
    technologies: [
      { name: 'Git', logo: `${devicon}/git/git-original.svg`, mark: 'GIT' },
      { name: 'GitHub', logo: `${devicon}/github/github-original.svg`, mark: 'GH', monochrome: true },
      { name: 'XAMPP', logo: `${devicon}/xampp/xampp-original.svg`, mark: 'X' },
    ],
  },
  {
    number: '08',
    label: 'AI Tools',
    purpose: 'AI-assisted coding, problem solving, and development workflows.',
    technologies: [
      { name: 'Codex', logo: 'https://cdn.simpleicons.org/openai/10A37F', mark: 'AI' },
    ],
  },
]

export const allTechnologies = technologyCategories.flatMap(
  category => category.technologies,
)
