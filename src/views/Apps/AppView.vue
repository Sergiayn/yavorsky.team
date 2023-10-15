<script>
import AppBlock1 from "@/components/app/app-block-1.vue";

export default {
    name: "AppView",
    components: {AppBlock1},
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
                    <div class="col-6">
                        <div class="img" :style="{ backgroundImage: 'url(' + app.logo_bg + ')' }">
                            <div class="app-img"><img :src="app.logo" :alt="app.name" class="img-fluid"></div>
                        </div>
                    </div>
                    <div class="col-6">
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
            </div>
        </div>
    </div>
</template>

<style scoped lang="sass">
@import "@/assets/color.sass"

.app-view
    .app-item
        .app-img
            padding: 122px 0
            text-align: center
        .img
            background-position: center
            background-repeat: no-repeat
            background-size: 70%
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

</style>
