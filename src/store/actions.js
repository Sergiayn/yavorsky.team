import axios from "@/axios/axios"

// const dev_mode = process.env.NODE_ENV === 'development'

export default {
    setCategories: async ({ commit }) => {
        try {
            const {data} = await axios.get('languages')
            commit('setLanguages', data)
        } catch (e) {console.error(e.message)}
    },
}
