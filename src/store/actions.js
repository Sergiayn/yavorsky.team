import axios from "@/axios/axios"

// const dev_mode = process.env.NODE_ENV === 'development'

export default {
    setApps: async ({ commit }) => {
        try {
            const {data} = await axios.get('apps/list.json')
            commit('setApps', data)
        } catch (e) {console.error(e.message)}
    },
    setAppsShort: async ({ commit }) => {
        try {
            const {data} = await axios.get('apps/list-short.json')
            commit('setAppsShort', data)
        } catch (e) {console.error(e.message)}
    },
    loadAppsShort: async ({ getters, dispatch }) => {
        if(getters.apps_short.length === undefined)
            dispatch('setAppsShort')
    },
    setAppsBanner: async ({ commit }) => {
        try {
            const {data} = await axios.get('apps/banner.json')
            commit('setAppsBanner', data)
        } catch (e) {console.error(e.message)}
    },
    setBlogs: async ({ commit }) => {
        try {
            const {data} = await axios.get('blogs/list.json')
            commit('setBlogs', data)
        } catch (e) {console.error(e.message)}
    },
    setBlogsShort: async ({ commit }) => {
        try {
            const {data} = await axios.get('blogs/list-short.json')
            commit('setBlogsShort', data)
        } catch (e) {console.error(e.message)}
    },
    setCompany: async ({ commit }, params) => {
        try {
            if (undefined !== params && Array.isArray(params) && params.includes('employees')) {
                const {data} = await axios.get('company/employees.json')
                commit('setCompany', data)
            }
        } catch (e) {console.error(e.message)}
    },
}
