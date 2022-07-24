import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import About from '@/views/About.vue'
import EventDetails from '@/views/event/Details.vue'
import EventEdit from '@/views/event/Edit.vue'
import EventRegister from '@/views/event/Register.vue'
import EventLayout from '@/views/event/Layout.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: route => ({ page: parseInt(route.query.page) || 1})
  },
  {
    path: '/about-us',
    name: 'About',
    component: About,
    // alias: '/about'
  },
  // redirecting - if concerned SEO this is probably better option
  // {
  //   path: '/about',
  //   redirect: { name: About }
  // },
  {
    // : indicates a dynamic segment
    path: '/events/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister
      }
    ]
  },
  {
    path: '/event/:id',
    redirect: () => {
      return { name: 'EventDetails' }
    },
    children: [
      { path: 'register', redirect: () => ({ name: 'EventRegister' })},
      { path: 'edit', redirect: () => ({ name: 'EventEdit' })}
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
