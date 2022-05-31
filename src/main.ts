import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './styles/input.css';
import 'v-calendar/dist/style.css';
import VCalendar from 'v-calendar';

createApp(App).use(router).use(VCalendar, {}).mount('#app')
