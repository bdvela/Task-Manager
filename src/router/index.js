import { createRouter, createWebHistory } from 'vue-router';
import firebase from 'firebase/compat/app';
const routes = [
    {
        path: '/',
        name: 'Diary',
        component: () => import('../views/Diary.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue'),
        beforeEnter: (to, from, next) => {
            const user = firebase.auth().currentUser;
            if (!user) {
                next();
            } else {
                next({
                    name: 'Diary',
                });
            }
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        beforeEnter: (to, from, next) => {
            const user = firebase.auth().currentUser;
            if (!user) {
                next();
            } else {
                next({
                    name: 'Diary',
                });
            }
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const user = firebase.auth().currentUser;
        if (user) {
            next();
        } else {
            next({
                name: 'Login',
            });
        }
    } else {
        next();
    }
});

export default router;
