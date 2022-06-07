import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
// Auth
import SigninView from '../views/auth/SigninView.vue';
import SignupView from '../views/auth/SignupView.vue';
// Event
import CreateEventView from '../views/event/CreateEventView.vue';
import EventDetails from '../views/event/EventDetails.vue';
import UpdateEvent from '../views/event/UpdateEvent.vue';
import UserEvents from '../views/event/UserEvents.vue';



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
    path: '/events/create',
    name: 'create-event',
    component: CreateEventView,
    beforeEnter: requireAuth
  },
  {
    path: '/events/:id',
    name: 'event-details',
    component: EventDetails,
    beforeEnter: requireAuth,
    props: true,
  },
  {
    path: '/users/:id',
    name: 'user-events',
    component: UserEvents,
    beforeEnter: requireAuth,
    props: true,
  },
  {
    path: '/update/:id',
    name: 'update-event',
    component: UpdateEvent,
    beforeEnter: requireAuth,
    props: true,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    beforeEnter: requireAuth
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
