export default {
    setLanguages: (state, data) => state.languages = data,
    setApp: (state, data) => state.app = data,
    setApps: (state, data) => state.apps = data,
    setAppsShort: (state, data) => state.apps_short = data,
    setAppsBanner: (state, data) => state.apps_banner = data,
    setBlog: (state, data) => state.blog = data,
    setBlogs: (state, data) => state.blogs = data,
    setBlogsShort: (state, data) => state.blogs_short = data,
    setCompany: (state, data) => state.company = data,
    setPage: (state, data) => state.page = data,
    setScreenWidth: (state, data) =>  state.screen_width = data ?? 0,
}
