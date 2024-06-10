import {createWebHistory, createRouter, RouterView} from "vue-router"

const routes = [
    {
        path: "/:locale?",
        component: RouterView,
        beforeEnter: (to, from, next) => {
            if (to.params.locale === '')
                window.location.replace("/en")

            next()
        },
        children: [
            {
                path: "",
                name: "Home",
                component: () => import("@/views/HomeView"),
            },
            {
                path: "app/:slug",
                name: "App",
                component: () => import("@/views/Apps/AppView"),
            },
            {
                path: "apps",
                name: "Apps",
                component: () => import("@/views/Apps/ListAppsView"),
            },
            {
                path: "company",
                name: "Company",
                component: () => import("@/views/CompanyView"),
            },
            {
                path: "contact",
                name: "Contact",
                component: () => import("@/views/ContactView"),
            },
            {
                path: "privacy-policy",
                name: "PrivacyPolicy",
                component: () => import("@/views/PolicyView"),
                props: () => ({slug: "privacy-policy"})
            },
            {
                path: "cookies-policy",
                name: "CookiesPolicy",
                component: () => import("@/views/PolicyView"),
                props: () => ({slug: "cookies-policy"})
            },
            {
                path: "blog/:slug",
                name: "Blog",
                component: () => import("@/views/Blogs/ItemBlogView"),
            },
            {
                path: "blogs",
                name: "Blogs",
                component: () => import("@/views/Blogs/ListBlogsView"),
                props: route => ({target_rubric: route.query.rubric, search: route.query.search})
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        return to.hash === '' ? {top: 0} : {el: to.hash, top: 70}
    }
})

export default router
