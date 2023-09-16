export default {
    languages: state => state.languages,
    languagesKeyValue: (state, data) => {
        let languages = []
        data.languages.map(function (item) {
            languages[item.key] = item.name
        })
        return languages
    },
    app: state => {
        let app = structuredClone( state.app)
        if (Object.keys(app).length) {
            app.logo = '/images/app/' + app.id + '/' + app.logo
            app.logo_bg = '/images/app/' + app.id + '/' + app.logo_bg
            app.dev = app.url_app === null
        }
        return app
    },
    apps: state => {
        let apps = structuredClone( state.apps)
        Object.keys(apps).forEach(key => {
            apps[key].logo = '/images/apps/' + apps[key].logo
            apps[key].img = '/images/apps/' + apps[key].img
            apps[key].dev = apps[key].url_app === null
        })
        return apps
    },
    apps_short: state => {
        let apps = structuredClone( state.apps_short)
        Object.keys(apps).forEach(key => {
                apps[key].logo = '/images/apps/' + apps[key].logo
                apps[key].dev = apps[key].url_app === null
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
                        banners[key].dev = banners[key].url_app === null
                    })
            })
        return banners
    },
    blogs: state => {
        let blogs = structuredClone( state.blogs)
        Object.keys(blogs).forEach(key => {
                blogs[key].preview = '/images/blogs/' + blogs[key].id + '/' + blogs[key].preview_small

                blogs[key].preview_large = '/images/blogs/' + blogs[key].id + '/' +
                    ((undefined === blogs[key].preview_large) ? blogs[key].preview_small : blogs[key].preview_large)
            }
        )
        return blogs
    },
    blogs_short: state => {
        let blogs = structuredClone( state.blogs_short)
        Object.keys(blogs).forEach(key => {
                blogs[key].preview = '/images/blogs/' + blogs[key].id + '/' + blogs[key].preview_small
            }
        )
        return blogs
    },
    company: state => {
        let company = structuredClone( state.company)
        Object.keys(company).forEach(key => {
            if('employees' === key) {
                Object.keys(company[key]).forEach(k => {
                    company[key][k].img = '/images/company/employees/' + company[key][k].id + '/' + company[key][k].img
                })
            } else if('slider' === key) {
                Object.keys(company[key]).forEach(k => {
                    company[key][k].img = '/images/company/slider/' + company[key][k].id + '/' + company[key][k].img
                })
            } else if('tasks' === key) {
                Object.keys(company[key]).forEach(k => {
                    company[key][k].img = '/images/company/tasks/' + company[key][k].id + '/' + company[key][k].img
                })
            }
        })
        return company
    },
    user_reviews: state => state.user_reviews,
}
