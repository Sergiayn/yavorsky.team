<script>
import AppBlock1 from "@/components/app/AppBlock1"
import AppBlock2 from "@/components/app/AppBlock2"
import AppBlock3 from "@/components/app/AppBlock3"
import AppBlock4 from "@/components/app/AppBlock4"
import AppBlock5 from "@/components/app/AppBlock5"
import AppBlockTextColumn from "@/components/app/AppBlockTextColumn"
import AppBlockUserReview from "@/components/app/AppBlockUserReview"

export default {
    name: "AppView",
    components: {AppBlock1, AppBlock2, AppBlock3, AppBlock4, AppBlock5, AppBlockTextColumn, AppBlockUserReview},
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
    created() {
        const slug = this.$route.params.slug
        this.$store.dispatch('setApp', {slug})
    },
    watch:{
        $route (){
            const slug = this.$route.params.slug
            this.$store.dispatch('setApp', {slug})
        }
    },
    computed: {
        app() {
            return this.$store.getters.app
        }
    }
}
</script>

<template>
    <div class="app-view" v-if="app.id">
        <div class="container">
            <div class="app-item">
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div class="img-wrapper">
                            <div class="img-inner">
                                <div class="app-img"><img :src="app.logo" :alt="app.name" class="img-fluid"></div>
                            </div>
                            <div class="img-bg1 rotating" :style="{ backgroundImage: 'url(' + app.logo_bg + ')' }"></div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div class="block-txt">
                            <div class="title">
                                <span class="msg-dev" v-if="app.dev">{{ $t('home.coming_soon') }}</span>
                                <div class="name">{{ app.name }}</div>
                            </div>
                            <div class="desc">{{ app.desc[$i18n.locale] ?? '' }}</div>
                            <a v-if="!app.dev" :href="this.getBasePath() + app.url_app" target="_blank" class="btn btn-primary">
                                {{ $t('common.download') }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="app-blocks" v-if="app.blocks !== undefined">
            <div class="app-block" v-for="appBlock in app.blocks" :key="appBlock.id">
                <app-block1 v-if="appBlock.type === 1" :block="appBlock" :app-url="this.getBasePath() + app.url_app"></app-block1>
                <app-block2 v-else-if="appBlock.type === 2" :block="appBlock" :app-url="this.getBasePath() + app.url_app"></app-block2>
                <app-block3 v-else-if="appBlock.type === 3" :block="appBlock" :app-url="this.getBasePath() + app.url_app"></app-block3>
                <app-block4 v-else-if="appBlock.type === 4" :block="appBlock" :app-url="this.getBasePath() + app.url_app"></app-block4>
                <app-block5 v-else-if="appBlock.type === 5" :block="appBlock" :app-url="this.getBasePath() + app.url_app"></app-block5>
                <app-block-text-column v-else-if="appBlock.type === 'text-column'" :block="appBlock"></app-block-text-column>
                <app-block-user-review v-else-if="appBlock.type === 'user-review'" :block="appBlock"></app-block-user-review>
            </div>
        </div>
    </div>
</template>

<style scoped lang="sass">
@import "@/assets/color.sass"

.app-view
    .app-item
        .img-wrapper
            position: relative
            .img-inner
                position: relative
                z-index: 5
            .img-bg1, .img-bg2
                background-position: center
                background-repeat: no-repeat
                background-size: 70%
                position: absolute
                height: 100%
                left: 0
                top: 0
                width: 100%

            @-webkit-keyframes rotating /* Safari and Chrome */
                from
                    -webkit-transform: rotate(0deg)
                    -o-transform: rotate(0deg)
                    transform: rotate(0deg)

                to
                    -webkit-transform: rotate(360deg)
                    -o-transform: rotate(360deg)
                    transform: rotate(360deg)

            @keyframes rotating
                from
                    -ms-transform: rotate(0deg)
                    -moz-transform: rotate(0deg)
                    -webkit-transform: rotate(0deg)
                    -o-transform: rotate(0deg)
                    transform: rotate(0deg)

                to
                    -ms-transform: rotate(360deg)
                    -moz-transform: rotate(360deg)
                    -webkit-transform: rotate(360deg)
                    -o-transform: rotate(360deg)
                    transform: rotate(360deg)

            .rotating
                -webkit-animation: rotating 10s linear infinite
                -moz-animation: rotating 10s linear infinite
                -ms-animation: rotating 10s linear infinite
                -o-animation: rotating 10s linear infinite
                animation: rotating 10s linear infinite

        .app-img
            padding: 122px 0
            text-align: center
        img
            height: 264px
            width: 264px
        .block-txt
            max-width: 550px
            padding-top: 122px
        .msg-dev
            display: inline-block
            border: 1px solid $color_green
            border-radius: 4px
            color: $color_green
            font-size: 14px
            font-weight: 600
            margin-bottom: 18px
            padding: 2px 8px
        .name
            font-size: 26px
            font-weight: 600
            padding-bottom: 12px
        .btn
            margin-top: 40px
    .app-blocks
        margin-bottom: 100px

@media (max-width: 1400px)
    .app-view
        .app-item
            img
                height: 210px
                width: 210px

@media (max-width: 1200px)
    .app-view
        .app-item
            img
                height: auto
                width: 50%
            .img-wrapper
                .img-bg1, .img-bg2
                    background-size: 100%
            .btn
                margin-top: 30px

@media (max-width: 991px)
    .app-view
        .app-item
            .block-txt
                padding-bottom: 50px

@media (max-width: 768px)
    .app-view
        .app-item
            .block-txt
                max-width: none
                padding-top: 20px

@media (max-width: 576px)
    .app-view
        .app-item
            .block-txt
                padding-top: 50px
            .app-img
                padding: 80px 0
            .name
                font-size: 20px
            .btn
                display: block
                max-width: 350px
                margin: 30px auto 0
                width: 100%
        .app-blocks
            margin-bottom: 80px

@media (max-width: 400px)
    .app-view
        .app-item
            .block-txt
                padding-top: 0


</style>
