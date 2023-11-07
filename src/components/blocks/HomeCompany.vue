<script>
import {defineComponent} from 'vue'
import SocialNetwork from "@/components/SocialNetwork.vue";

export default defineComponent({
    name: "HomeCompany",
    components: {SocialNetwork}
})
</script>

<template>
    <div class="home-company">
        <div class="container">
            <div class="block-brief single">
                <div class="title">{{ $t('home.company__title') }}</div>
            </div>
            <div class="desc-part">
                <div class="desc">{{ $t('home.company__desc') }}</div>
                <div class="link-purplle link-arrow-right">
                    <router-link :to="{name:'Company', params:{locale:$i18n.locale}}">
                        {{ $t('home.company__link') }}
                    </router-link>
                </div>
            </div>
            <div class="social-network-part">
                <div class="title">{{ $t('home.company__network_title') }}:</div>
                <social-network :is-color="true"/>
            </div>
        </div>
        <div class="home-company-bg"></div>
    </div>
</template>

<style scoped lang="sass">
.home-company
    padding: 120px 0

    .desc-part
        max-width: 576px
        margin: auto
        padding: 72px 0 64px
        text-align: center

        .desc
            padding-bottom: 16px

    .social-network-part
        max-width: 340px
        margin: auto
        text-align: center

        .title
            padding-bottom: 16px

        ul
            padding: 0

    .home-company-bg
        background-image: url("@/assets/img/home/company_bg.png")
        background-repeat: no-repeat
        background-position: center
        background-size: auto 100%
        height: 850px
        margin: -194px auto 0

</style>
