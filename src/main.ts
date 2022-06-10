import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './styles/input.css';
import 'v-calendar/dist/style.css';
import VCalendar from 'v-calendar';
import { projectAuth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

let app: any;

onAuthStateChanged(projectAuth, () => {
    if(!app) {
        app = createApp(App).use(router)
        .use(VCalendar, {}).mount('#app');
    }
})
