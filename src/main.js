import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@/firebase/init.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const auth = getAuth();
let app = null;
onAuthStateChanged(auth, user => {
    if (user) {
        const uid = user.uid;
        const email = user.email;
        console.log('UID:', uid);
        console.log('MAIL:', email);
    } else {
        console.log('User is signed out');
    }
    if (!app) {
        app = createApp(App).use(router).mount('#app');
    }
});
