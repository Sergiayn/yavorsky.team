<script>
import {ref} from 'vue'
import {useCookies} from "vue3-cookies"
export default {
    name: "CookieAgreement",
    data() {
        const {cookies} = useCookies()
        let isVisible = ref(false)
        return {
            cookies,
            isVisible
        };
    },
    mounted() {
        if ("1" !== this.cookies.get("coolie_is_accept"))
            this.isVisible = true
    },
    methods: {
        closeModal() {
            this.isVisible = false
            this.cookies.set("coolie_is_accept", "1", '365d')
        }
    }
}
</script>

<template>
    <div class="block-cookie-agreement" v-if="isVisible">
        <div class="container">
            <div class="block-cookie-agreement-inner">
                <div class="desc link-purplle">
                    <span class="brief">{{ $t("common.coockie_desc") }}</span>
                    <span>&nbsp;</span>
                    <router-link class="link" :to="{name:'CookiesPolicy', params:{locale:$i18n.locale}}">
                        {{ $t('common.learn_more') }}
                    </router-link>
                </div>
                <div class="controls">
                    <button class="btn btn-primary" @click="closeModal">{{ $t("common.coockie_btn") }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="sass">
@import "@/assets/color"
.block-cookie-agreement
    background: $color_white
    bottom: 0
    padding: 18px 0
    position: fixed
    width: 100%
    z-index: 100
    .desc
        font-size: 15px
        color: $color_black

.block-cookie-agreement-inner
    align-items: center
    display: flex
    justify-content: space-around

</style>
