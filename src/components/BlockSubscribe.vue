<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "BlockSubscribe",
    inject: ['emitter'],
    methods: {
        subscribeUser() {
            let formData = new FormData();
            formData.append('email', this.email)
            formData.append('type', 'yavorsky.team')

            const requestOptions = {
                method: "POST",
                body: formData,
                mode: "no-cors"
            }

            fetch("https://api.galaxys.info/v1/subscribe", requestOptions)
                .then(() => {
                    this.emitter.emit('modal_info', {type: 'open', desc: this.msg})
                    this.email = ''
                })
        },
        description() {
            return (this.$store.getters.screen_width > 768) ?
                this.$t("home.subscribe_desc") :
                this.$t("home.subscribe_desc").replace(/<\/?[^>]+(>|$)/g, "")
        }
    },
    data() {
        return {
            email: '',
        }
    },
    props: {
        is_wide: {
            type: Boolean,
            default() {
                return false
            }
        },
        margin_top: {
            type: String,
            default() {
                return null;
            }
        },
        msg: {
            type: String,
            default() {
                return 'common.modal_successfully_subscribed'
            }
        }
    },
})
</script>

<template>
    <div class="block-subscribe"
         :style="[margin_top !== null ? {marginTop: margin_top} : {}]">
        <div :class="{'is-bg-wide': is_wide }">
            <div class="container">
                <div :class="{'is-bg-not-wide': !is_wide }">
                    <div class="block-subscribe-inner">
                        <div class="title">{{ $t("home.subscribe_title") }}</div>
                        <div class="desc" v-html='description()'></div>
                        <form @submit.prevent="subscribeUser">
                            <input type="email" class="form-control" name="email" v-model="email"
                                   :placeholder='$t("common.email")' required>
                            <input type="submit" class="btn btn-primary" :value='$t("home.subscribe_btn")'>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="sass">
@import "@/assets/color"
.block-subscribe-inner
    max-width: 750px
    margin: auto

.block-subscribe
    color: $color_white
    margin-top: 140px
    text-align: center

    .is-bg-wide, .is-bg-not-wide
        background-color: $color_background_dark
        padding: 48px 0

    .is-bg-not-wide
        border-radius: 12px

    .title
        font-size: 26px
        font-weight: 600
        padding-bottom: 12px

    .desc
        font-size: 16px
        padding-bottom: 36px

    input
        height: 40px

    input[type="email"]
        height: 40px
        margin-right: 30px
        width: 370px

    input[type="email"], input[type="submit"], .submit
        display: inline-block

@media (max-width: 1200px)
    .block-subscribe
        margin-top: 100px

@media (max-width: 768px)
    .block-subscribe
        background-color: $color_background_dark
        margin-top: 80px
        input[type="email"], input[type="submit"], .submit
            display: block
            margin: auto
        input[type="email"]
            max-width: 320px
            margin-bottom: 24px
            width: 90%

</style>
