import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import About from '@/views/About.vue'
import EventDetails from '@/views/event/Details.vue'
import EventEdit from '@/views/event/Edit.vue'
import EventRegister from '@/views/event/Register.vue'
import EventLayout from '@/views/event/Layout.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'
import NProgress from 'nprogress'
import EventService from '@/services/EventService.js'
import GStore from '@/store'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: route => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    // : indicates a dynamic segment
    path: '/events/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    beforeEnter: to => {
      // fetch single event by id and set local data
      return EventService.getEvent(to.params.id)
        .then(resp => {
          GStore.event = resp.data
        })
        .catch(err => {
          if (err.response && err.response.status == 404) {
            this.$router.push({
              name: '404Resource',
              params: { resource: 'event' },
            })
          } else {
            return { name: 'NetworkError' }
          }
        })
    },
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails,
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
        meta: { requireAuth: true },
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister,
      },
    ],
  },
  {
    // * is used to include / in the match as it doesn't by default
    path: '/event/:afterEvent(.*)',
    redirect: to => {
      return { path: '/events/' + to.params.afterEvent }
    },
  },
  {
    path: '/about-us',
    name: 'About',
    component: About,
    // alias: '/about'
  },
  // redirecting simple example - if concerned SEO this is probably better option
  // {
  //   path: '/about',
  //   redirect: { name: About }
  // },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true,
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// start progress bar
router.beforeEach(to => {
  NProgress.start()

  const notAuthorised = true
  if (to.meta.requireAuth && notAuthorised) {
    GStore.flashMessage = 'Sorry you are not authorised to view this page'

    setTimeout(() => {
      GStore.flashMessage = ''
    }, 2000)

    // if there was a previous page
    // if (from.href) {
    //   return false
    // } else {
    //   return { path: '/' }
    // }
  }
})

// end progress bar
router.afterEach(() => {
  NProgress.done()
})

export default router
