import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutMoreView from '../views/AboutMoreView.vue'
import ExperienceView from '../views/ExperienceView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import TechnologiesView from '../views/TechnologiesView.vue'
import CertificationsView from '../views/CertificationsView.vue'
import ContactView from '../views/ContactView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about-more', name: 'about-more', component: AboutMoreView },
  { path: '/experience', name: 'experience', component: ExperienceView },
  { path: '/projects', name: 'projects', component: ProjectsView },
  { path: '/technologies', name: 'technologies', component: TechnologiesView },
  { path: '/certifications', name: 'certifications', component: CertificationsView },
  { path: '/contact', name: 'contact', component: ContactView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

export default router
