<script>
import {defineComponent} from 'vue'
import SiteLogo from "@/components/SiteLogo.vue";

export default defineComponent({
    name: "MainHeader",
    components: {SiteLogo},
    data() {
        return {isOpenMobileMenu: false}
    },
    methods: {
        screenWidth() {
            return this.$store.getters.screen_width
        }
    },
    watch: {
        $route() {
            this.isOpenMobileMenu = false
        }
    }
})
</script>

<template>
    <header>
        <div v-if="screenWidth() < 768">
            <div class="s-mobile" :class="{active:isOpenMobileMenu}">
                <div class="container">
                    <div class="s-mobile-inner">
                        <div>
                            <site-logo/>
                        </div>
                        <div>
                            <div class="mobile-top-menu">
                                <nav class="navbar">
                                    <button @click="isOpenMobileMenu = !isOpenMobileMenu"
                                            class="navbar-toggler"
                                            type="button"
                                            data-toggle="collapse"
                                            aria-expanded="false"
                                            aria-label="Toggle navigation">
                                        <span class="navbar-toggler-icon" :class="{active:isOpenMobileMenu}"></span>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="collapse mobile-top-list" :class="{show:isOpenMobileMenu}">
                <div class="container">
                    <ul>
                        <li>
                            <router-link :to="{name:'Apps', params:{locale:$i18n.locale}}">
                                {{ $t('header.our_apps') }}
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name:'Company', params:{locale:$i18n.locale}}">
                                {{ $t('header.company') }}
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name:'Blogs', params:{locale:$i18n.locale}}">
                                {{ $t('header.blog') }}
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name:'Contact', params:{locale:$i18n.locale}}">
                                {{ $t('header.contacts') }}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else class="s-desktop">
            <div class="container">
                <div class="row">
                    <div class="col-xxl-8 col-xl-7 col-lg-7 col-md-5 col-sm-6 col-xs-6">
                        <site-logo/>
                    </div>
                    <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-6 col-xs-6">
                        <nav class="d-md-block d-none">
                            <ul>
                                <li>
                                    <router-link :to="{name:'Apps', params:{locale:$i18n.locale}}">
                                        {{ $t('header.our_apps') }}
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :to="{name:'Company', params:{locale:$i18n.locale}}">
                                        {{ $t('header.company') }}
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :to="{name:'Blogs', params:{locale:$i18n.locale}}">
                                        {{ $t('header.blog') }}
                                    </router-link>
                                </li>
                                <li>
                                    <router-link :to="{name:'Contact', params:{locale:$i18n.locale}}">
                                        {{ $t('header.contacts') }}
                                    </router-link>
                                </li>
                            </ul>
                        </nav>
                        <div class="d-md-none d-sm-block d-xs-block">123</div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped lang="sass">
@import "@/assets/color.sass"

header
    //background-color: $color_white
    height: 62px
    padding-top: 6px
    //position: fixed
    //top: 0
    width: 100%
    //z-index: 10
    nav
        padding-top: 8px

        ul
            display: flex
            display: -webkit-flex
            list-style: none
            justify-content: space-between
            margin-bottom: 0
            padding: 5px 0

        a
            color: $color_black
            text-decoration: none

    .s-mobile
        padding: 17px 0

        &.active
            background-color: $color_black

    .s-mobile-inner
        align-items: center
        display: flex
        justify-content: space-between

        button
            &:focus, &:focus-visible
                border: none
                box-shadow: none

    .navbar-toggler-icon
        background-image: url("@/assets/img/icons/navbar-toggler-icon.svg")
        background-repeat: no-repeat
        background-position: center center
        height: 24px
        width: 24px

        &.active
            background-image: url("@/assets/img/icons/close-white.svg")

    .mobile-top-list
        background-color: $color_background_dark
        position: absolute
        z-index: 6
        width: 100%

        ul
            display: flex
            gap: 15px
            list-style: none
            align-items: center
            justify-content: space-between
            margin: 0
            padding: 21px 0 24px

        li
            flex: 1
            text-align: center

        a
            font-size: 16px
            font-weight: 600
            color: $color_white
            text-decoration: none

@media (max-width: 768px)
    header
        height: 84px
        padding-top: 0

@media (max-width: 400px)
    header .mobile-top-list a
        font-size: 14px

</style>
