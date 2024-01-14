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
        font-weight: 600
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

@media (max-width: 1200px)
    .home-company
        padding: 100px 0

        .desc-part
            padding: 56px 0 40px

        .home-company-bg
            background-size: 100% auto
            height: 450px
            margin: -120px auto 0

@media (max-width: 768px)
    .home-company
        .desc-part
            padding: 40px 0

        .home-company-bg
            background-size: 768px auto
            height: 340px
            margin: -90px auto 0

@media (max-width: 576px)
    .home-company
        padding: 80px 0

        .desc-part
            padding: 32px 0

</style>
