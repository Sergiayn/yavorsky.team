import { createWebHistory, createRouter, RouterView } from "vue-router"

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
        path: "apps",
        name: "Apps",
        component: () => import("@/views/Apps/ListAppsView"),
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/views/AboutView"),
      },
      {
        path: "contact",
        name: "Contact",
        component: () => import("@/views/ContactView"),
      },
      {
        path: "blogs",
        name: "Blogs",
        component: () => import("@/views/Blogs/ListBlogsView"),
        props: route => ({ target_rubric: route.query.rubric, search: route.query.search })
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to) {
    return to.hash === '' ? { top: 0 } : {el: to.hash,top: 70}
  }
})

export default router
