<script>
import {defineComponent} from 'vue'
import 'vue3-carousel/dist/carousel.css'
import SliderDissolve from "@/components/SliderDissolve"

export default defineComponent({
    name: "HomeBanner",
    data() {
        this.$store.dispatch('setAppsBanner')
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
        banners() {
            return this.$store.getters.apps_banner
        }
    },
    components: {
        SliderDissolve
    },
})
</script>

<template>
    <div class="home-banner">
        <slider-dissolve
            :list="banners"
            v-slot:default="slotProps"
            :wrap-around="true"
            :autoplay="10">
            <div class="banner" :style="{'background':slotProps.item.bg}">
                <div class="container">
                    <div class="banner-inner">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="image-single">
                                    <div class="image">
                                        <img :src="slotProps.item.images[0]" :alt="slotProps.item.name"
                                             class="img-fluid">
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div class="msg-dev" v-if="slotProps.item.dev">{{ $t('home.soon_on_app_store') }}</div>
                                <div class="name">{{ slotProps.item.name }}</div>
                                <div class="brief">{{ slotProps.item.brief[$i18n.locale] ?? '' }}</div>
                                <div class="desc">{{ slotProps.item.desc[$i18n.locale] ?? '' }}</div>
                                <div class="buttons">
                                    <router-link class="btn btn-secondary"
                                                 :to="{name:'App', params:{locale:$i18n.locale, slug:slotProps.item.slug}}">
                                        {{ $t('common.learn_more') }}
                                    </router-link>
                                    <a v-if="slotProps.item.url_app" :href="this.getBasePath() + slotProps.item.url_app"
                                       target="_blank"
                                       class="btn btn-primary">{{ $t('common.free_download') }}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </slider-dissolve>
    </div>
</template>

<style lang="sass">
@import "@/assets/color.sass"

.home-banner
    .msg-dev
        background-color: $color_green
        border-radius: 4px
        display: inline-block
        color: $color_white
        font-size: 14px
        font-weight: 600
        margin: 20px auto 26px
        padding: 2px 8px

    .banner
        padding: 116px 0 16px

        .image-single
            background-image: url("@/assets/img/image-shadow.webp")
            background-repeat: no-repeat
            background-position: bottom center
            background-size: 90% auto
            list-style: none
            padding: 0 0 100px
            margin: auto
            max-width: 510px

            img
                max-height: 336px

        .name
            font-size: 26px
            font-weight: 600
            line-height: 1.3
            padding-bottom: 8px

        .brief
            font-size: 18px
            font-weight: 600
            padding-bottom: 24px

        .desc
            font-size: 18px
            max-width: 495px

    .banner-inner
        text-align: left

    .buttons
        padding-top: 50px

        .btn
            margin-right: 24px

    .carousel__pagination
        margin: -80px 0 80px
        justify-content: right
        position: relative
        z-index: auto

@media (max-width: 1200px)
    .home-banner
        .buttons
            padding-top: 40px

        .banner
            padding: 100px 0 30px

            .image-single
                max-width: 420px

        .carousel__pagination
            margin: -40px 0 40px

@media (max-width: 991px)
    .home-banner
        .banner
            padding: 80px 0 40px

            .name
                font-size: 20px

            .brief
                font-size: 16px
                padding-bottom: 16px

            .desc
                font-size: 16px

        .buttons
            padding-top: 32px

            a
                min-width: 156px

                &:nth-child(1)
                    margin-right: 16px

                &:nth-child(2)
                    margin-right: 0

        .carousel__pagination
            margin: -45px 0 0

@media (max-width: 768px)
    .home-banner
        .banner
            padding: 40px 0

            .image-single
                background: none
                max-width: none
                padding-bottom: 58px
                text-align: center

            .name
                padding-bottom: 4px

        .banner-inner
            padding: 0 17px

        .msg-dev
            margin-top: 0

        .carousel__pagination
            display: none

</style>
