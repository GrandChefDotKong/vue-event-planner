import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import SigninView from '../views/auth/SigninView.vue';
import SignupView from '../views/auth/SignupView.vue';

import CreateEventView from '../views/event/CreateEventView.vue';
import EventDetails from '../views/event/EventDisplay.vue';

import { projectAuth } from '@/firebase/config';


const requireAuth = (to: any, from: any, next: any) => {
  let user = projectAuth.currentUser;

  if(!user) {
    next({ name: 'signin' });
  } else {
    next();
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: requireAuth
  },
  {
    path: '/signin',
    name: 'signin',
    component: SigninView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/event/create',
    name: 'create-event',
    component: CreateEventView,
    beforeEnter: requireAuth
  },
  {
    path: '/event/:id',
    name: 'event-details',
    component: EventDetails,
    beforeEnter: requireAuth,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
