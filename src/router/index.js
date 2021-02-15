import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from "../store/index";

Vue.use(VueRouter)


const routes = [{
        path: "/login",
        name: "login",
        //beforeEnter : rejectAuthUser,
        component: () =>
            import ("@/views/Login.vue")
    },
    {
        path: '/Main',
        name: 'Main',
        component: () =>
            import ("@/views/Main.vue")
    },
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    duplicateNavigationPolicy: 'ignore',
    routes
});
export default router