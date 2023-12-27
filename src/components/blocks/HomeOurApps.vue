<script>
import {defineComponent} from 'vue'
import SiteLogo from "@/components/SiteLogo.vue";

export default defineComponent({
    name: "HomeOurApps",
    components: {SiteLogo},
    computed: {
        appsChunks() {
            return window.objectToChunks(this.$store.getters.apps_short, 3)
        }
    }
})
</script>

<template>
    <div class="home-our-apps" v-if="$store.getters.apps">
        <div class="container">
            <div class="block-brief">
                <div class="title">{{ $t('home.our_apps__title') }}</div>
                <div class="desc">{{ $t('home.our_apps__desc') }}</div>
            </div>
            <div class="list-app-chunks link-black">
                <div v-for="(chunkValue, chunkKey) in appsChunks" :key="chunkKey" class="app-chunk">
                    <div v-for="app in chunkValue" :key="app.id" class="app">
                        <router-link class="app-inner" :class="{'app-inner-dev':app.dev}" :to="{name:'App', params:{locale:$i18n.locale, slug:app.slug}}">
                            <span class="img"><img :src="app.logo" :alt="app.name" class="img-fluid"></span>
                            <span class="brief">
                                <span class="msg-dev">{{ $t('home.soon_on_app_store') }}</span>
                                <span class="name">{{ app.name }}</span>
                                <span class="desc">{{ app.desc[$i18n.locale] ?? '' }}</span>
                            </span>
                        </router-link>
                    </div>
                    <div v-if="1 === chunkKey" class="app app-new">
                        <div class="app-inner">
                            <div class="img">
                                <site-logo/>
                            </div>
                            <div class="brief">
                                <div class="desc">{{ $t('home.our_apps__new_desc') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="sass">
@import "@/assets/color.sass"

.home-our-apps
    padding-top: 120px

    .link-black a:hover
        color: $color_black

    .block-brief
        max-width: none

    .msg-dev
        border: 1px solid $color_green
        border-radius: 4px
        display: none
        color: $color_green
        font-size: 14px
        font-weight: 600
        margin: 0 auto 4px
        padding: 2px 8px

    .app
        flex: 1

        &:first-child .app-inner
            margin-left: 0

        &:last-child .app-inner
            margin-right: 0

    .app-inner
        border-radius: 12px
        border: 1px solid $color_secondary
        background: $color_white
        display: block
        margin: 0 12px
        height: 100%
        padding: 24px
        text-align: center

        &.app-inner-dev
            padding: 10px 24px

            .brief
                padding-top: 12px

            .msg-dev
                display: inline-block

        .name
            display: block
            font-size: 18px
            font-weight: 600
            padding-bottom: 4px

        .desc
            display: block
            font-size: 14px

        .brief
            display: block
            padding-top: 16px

        .img
            display: block

        img
            height: 80px
            width: 80px

    .app-new
        .img, .brief
            display: block

        .img
            height: 80px
            padding-top: 25px

        .brief
            max-width: 200px
            margin: auto

        .desc
            color: $color_gray_40
            font-size: 18px
            font-weight: 600

    .app-chunk
        display: flex
        margin-bottom: 24px

        &:nth-child(odd) .app:last-child, &:nth-child(even) .app:first-child
            flex: 2

            .app-inner
                align-items: center
                display: flex
                justify-content: center

            .brief
                padding-left: 50px
                padding-top: 0

            .desc
                max-width: 187px

        &:nth-child(odd) .app:last-child
            .img
                order: 2

            .brief
                order: 1
                padding-left: 0
                padding-right: 50px

        &:last-child
            margin-bottom: 0

</style>
