export default {
    languages: state => state.languages,
    languagesKeyValue: (state, data) => {
        let languages = []
        data.languages.map(function (item) {
            languages[item.key] = item.name
        })
        return languages
    },
    apps: state => {
        let apps = structuredClone( state.apps)
        Object.keys(apps).forEach(key => {
            apps[key].logo = '/images/apps/' + apps[key].logo
            apps[key].img = '/images/apps/' + apps[key].img
            apps[key].dev = apps[key].url === null
        })
        return apps
    },
    apps_short: state => {
        let apps = structuredClone( state.apps_short)
        Object.keys(apps).forEach(key => {
                apps[key].logo = '/images/apps/' + apps[key].logo
                apps[key].dev = apps[key].url === null
            }
        )
        return apps
    },
    apps_banner: state => {
        let banners = structuredClone( state.apps_banner)
        Object.keys(banners)
            .forEach(key => {
                banners[key].images
                    .forEach((v,i) => {
                        banners[key].images[i] = '/images/apps/banner/' + banners[key].id + '/' + v
                        banners[key].dev = banners[key].url === null
                    })
            })
        return banners
    },
    blogs: state => state.blogs,
    user_reviews: state => state.user_reviews,
}
