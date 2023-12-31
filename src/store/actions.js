import axios from "@/axios/axios"

// const dev_mode = process.env.NODE_ENV === 'development'

export default {
    setApp: async ({ commit }, params) => {
        try {
            const slug = params.slug
            if (undefined === slug) {
                commit('setApp', {})
            } else {
                const {data} = await axios.get('app/' + slug + '.json')
                commit('setApp', data)
            }
        } catch (e) {console.error(e.message); commit('setApp', {})}
    },
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
    setBlog: async ({ commit }, params) => {
        try {
            const slug = params.slug
            if (undefined === slug) {
                commit('setBlog', {})
            } else {
                const {data} = await axios.get('blog/' + slug + '.json')
                commit('setBlog', data)
            }
        } catch (e) {console.error(e.message); commit('setBlog', {})}
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
            let data = {}
            if (undefined !== params && Array.isArray(params)) {
                for (const param of params) {
                    const param_res = await axios.get('company/' + param + '.json')
                    data[param] = param_res.data
                }
            }
            commit('setCompany', data)
        } catch (e) {console.error(e.message)}
    },
    setPage: async ({ commit }, params) => {
        try {
            const slug = params.slug
            if (undefined === slug) {
                commit('setPage', {})
            } else {
                const {data} = await axios.get('page/' + slug + '.json')
                commit('setPage', data)
            }
        } catch (e) {console.error(e.message); commit('setPage', {})}
    },
}
