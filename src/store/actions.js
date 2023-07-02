import axios from "@/axios/axios"

// const dev_mode = process.env.NODE_ENV === 'development'

export default {
    setApps: async ({ commit }) => {
        try {
            const {data} = await axios.get('apps/list.json')
            commit('setApps', data)
        } catch (e) {console.error(e.message)}
    },
    loadApps: async ({ getters, dispatch }) => {
        if(getters.apps.length === undefined)
            dispatch('setApps')
    },
}
