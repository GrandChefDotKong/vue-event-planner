import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
// Auth
import SigninView from '../views/auth/SigninView.vue';
import SignupView from '../views/auth/SignupView.vue';
// Events
import CreateEventView from '../views/events/CreateEventView.vue';
import EventDetails from '../views/events/EventDetails.vue';
import UpdateEvent from '../views/events/UpdateEvent.vue';
import GroupView from '../views/events/GroupView.vue';
// Users
import UserProfile from '../views/users/UserProfile.vue';
import UserUpdate from '../views/users/UserUpdate.vue';

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
    path: '/events/create/:date?',
    name: 'create-event',
    component: CreateEventView,
    beforeEnter: requireAuth,
    props: true,
  },
  {
    path: '/events/:id',
    name: 'event-details',
    component: EventDetails,
    beforeEnter: requireAuth,
    props: true,
  },
  {
    path: '/events/update/:id',
    name: 'update-event',
    component: UpdateEvent,
    beforeEnter: requireAuth,
    props: true,
  },
  {
    path: '/users/:id?',
    name: 'user-profile',
    component: UserProfile,
    beforeEnter: requireAuth,
    props: true,
  },
  {
    path: '/users/update',
    name: 'update-user',
    component: UserUpdate,
    beforeEnter: requireAuth,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    beforeEnter: requireAuth
  },
  {
    path: '/group',
    name: 'group',
    component: GroupView,
    beforeEnter: requireAuth
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
