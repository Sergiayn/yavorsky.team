<script>
import {defineComponent} from 'vue'
import SliderDissolve from "@/components/SliderDissolve.vue";

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
                            <div class="col">
                                <ul class="images">
                                    <li class="image" v-for="(image,index) in slotProps.item.images" :key="index">
                                        <img :src="image" :alt="slotProps.item.name" class="img-fluid">
                                    </li>
                                </ul>
                            </div>
                            <div class="col">
                                <div class="msg-dev" v-if="slotProps.item.dev">{{ $t('home.soon_on_app_store') }}</div>
                                <div class="name">{{ slotProps.item.name }}</div>
                                <div class="brief">{{ slotProps.item.brief[$i18n.locale] ?? '' }}</div>
                                <div class="desc">{{ slotProps.item.desc[$i18n.locale] ?? '' }}</div>
                                <div class="buttons">
                                    <a href="#" class="btn btn-secondary">{{ $t('common.learn_more') }}</a>
                                    <a v-if="slotProps.item.url" :href="this.getBasePath() + slotProps.item.url"
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

        .images
            background-image: url("@/assets/img/image-shadow.webp")
            background-repeat: no-repeat
            background-position: bottom center
            list-style: none
            padding: 0 0 100px
            margin: auto
            max-width: 510px

            li
                display: inline-block
                padding: 0 6px
                max-width: 177px

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

</style>
