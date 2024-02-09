<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "ListAppsView",
    data() {
        this.$store.dispatch('setApps')
        return {}
    },
    methods: {
        getBasePath() {
            let str = 'https://apps.apple.com/'
            if ('ua' === this.$i18n.locale)
                str += 'ua/'
            else if ('ru' === this.$i18n.locale)
                str += 'ru-ru/'
            else
                str += 'en-us/'
            return str + 'app/'
        }
    },
    computed: {
        apps() {
            return this.$store.getters.apps
        }
    }
})
</script>

<template>
    <div class="page-content list-apps-view">
        <div class="container">
            <div class="row">
                <div class="col-xxl-6 col-xl-6 col-lg-5 col-md-12 col-sm-12 col-xs-12">
                    <div class="block-brief single">
                        <div class="title">{{ $t('header.our_apps') }}</div>
                    </div>
                </div>
                <div class="col-xxl-6 col-xl-6 col-lg-7 col-md-12 col-sm-12 col-xs-12">
                    <ul class="info-list">
                        <li>
                            <div class="value">4+ {{ $t('common.years') }}</div>
                            <span class="desc ic-app-store">{{ $t('common.on_market') }}</span>
                        </li>
                        <li>
                            <div class="value">150 000+</div>
                            <span class="desc ic-downloads">{{ $t('common.app_downloads') }}</span>
                        </li>
                        <li></li>
                        <li>
                            <div class="value">4.7</div>
                            <span class="desc ic-star">{{ $t('common.average_rate') }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <ul class="list">
                <li v-for="app in apps" :key="app.id">
                    <div class="app">
                        <div class="img" :style="{ backgroundImage: 'url(' + app.logo + ')' }">
                            <div class="app-img"><img :src="app.img" :alt="app.name" class="img-fluid"></div>
                        </div>
                        <div class="title" v-if="app.name.length > 16">
                            <span class="msg-dev" v-if="app.dev">{{ $t('home.coming_soon') }}</span>
                            <span class="name">{{ app.name }}</span>
                        </div>
                        <div class="title" v-else>
                            <span class="name">{{ app.name }}</span>
                            <span class="msg-dev" v-if="app.dev">{{ $t('home.coming_soon') }}</span>
                        </div>
                        <div class="desc">{{ app.desc[$i18n.locale] ?? '' }}</div>
                        <div class="buttons">
                            <router-link class="btn btn-secondary" :to="{name:'App', params:{locale:$i18n.locale, slug:app.slug}}">
                                {{ $t('common.learn_more') }}
                            </router-link>
                            <a v-if="app.dev" href="#" class="btn btn-disabled">
                                {{ $t('common.download') }}
                            </a>
                            <a v-else :href="this.getBasePath() + app.url_app" target="_blank" class="btn btn-primary">
                                {{ $t('common.download') }}
                            </a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="sass">
@import "@/assets/color.sass"

.list-apps-view
    .list
        list-style: none
        margin: 0
        overflow: hidden
        padding: 0
        width: 100%

        li
            float: left
            width: 25%

        .app
            height: 100%
            padding: 22px 12px

        .img
            background-color: #EEECF4
            background-size: 40px 40px
            background-repeat: no-repeat
            background-position: 15px 26px
            border-radius: 12px
            padding: 26px 15px 18px
            text-align: center
            width: 100%
        img
            max-width: 75px

        .title, .desc, .buttons
            padding: 0 12px

        .title
            margin-top: 12px
            overflow: hidden

        .name
            font-size: 20px
            font-weight: 600
            float: left

        .msg-dev
            border: 1px solid $color_green
            border-radius: 4px
            color: $color_green
            font-size: 14px
            font-weight: 600
            padding: 2px 8px
            float: right

        .desc
            margin-top: 8px
            height: 120px

    .buttons
        margin-top: 16px
        overflow: hidden

        .btn
            border-radius: 4px
            font-size: 14px
            padding: 8px 1px
            min-width: 100px
            width: calc(50% - 10px)

            &:first-child
                float: left
            &:last-child
                float: right

        .btn-primary
            font-size: 16px
            padding: 6px 1px

            &:hover
                background-color: $color_primary
                border-color: $color_primary

    .info-list
        list-style: none
        margin: 0
        padding: 0

        li
            display: inline-block
            text-align: right
            width: 50%

            &:nth-child(1), &:nth-child(2)
                padding-bottom: 40px

        .value
            color: $color_primary
            font-size: 30px
            font-weight: 600
            padding-bottom: 8px

        .desc
            background-repeat: no-repeat
            background-position: center left
            background-size: 22px 22px
            padding-left: 30px

        .ic-app-store
            background-image: url("@/assets/img/icons/info-app-store.svg")

        .ic-downloads
            background-image: url("@/assets/img/icons/info-downloads.svg")

        .ic-star
            background-image: url("@/assets/img/icons/info-star.svg")

@media (min-width: 1200px)
    .list-apps-view .list li
        &:first-child .app, &:nth-child(5n) .app
            padding-left: 0

        &:nth-child(4n) .app
            padding-right: 0

@media (max-width: 1200px)
    .list-apps-view
        .list
            .msg-dev
                font-size: 10px
                padding: 4px
                margin-bottom: 2px

            .app
                max-width: 350px
                margin: auto
                padding: 22px 8px

            .title, .desc
                padding: 0 8px
            .desc
                height: 130px
            .buttons
                padding: 0 0 0 7px
            .btn
                font-size: 14px

@media (max-width: 992px)
    .list-apps-view
        .block-brief
            margin-bottom: 40px

        .list
            li
                width: 50%
            .desc
                height: 90px
            .buttons
                padding: 0 7px
            .btn-primary
                padding: 8px 1px

        .info-list
            li
                text-align: left

                &:nth-child(1), &:nth-child(2)
                    padding-bottom: 32px

                &:nth-child(3)
                    display: none

@media (max-width: 992px) and (min-width: 1200px)
    .list-apps-view .list li
        &:first-child .app, &:nth-child(4n) .app
            padding-left: 0

        &:nth-child(3n) .app
            padding-right: 0

@media (max-width: 768px) and (min-width: 992px)
    .list-apps-view
        .list
            li
                width: 50%

                &:nth-child(odd) .app
                    padding-left: 0

                &:nth-child(even) .app
                    padding-right: 0

@media (max-width: 767px)
    .list-apps-view
        .list
            li
                width: 100%

                .app
                    padding: 20px 0

            .desc
                height: auto

@media (max-width: 576px)
    .list-apps-view
        .info-list
            overflow: hidden
            li
                float: left
            .desc
                display: block
</style>
