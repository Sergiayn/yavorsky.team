<script>
import {Modal} from 'usemodal-vue3'
import moment from "moment"
import ShareNetworks from "@/components/ShareNetworks"
import {ref} from "vue";

export default {
    name: "ItemBlogView",
    inject: ['emitter'],
    components: {Modal, ShareNetworks},
    data() {
        const isVisibleModal = ref(false)
        const email = ref('')
        return {
            isVisibleModal,
            email,
            showFixedBanner: false,
            closeFixedBanner: false
        }
    },
    created() {
        const slug = this.$route.params.slug
        this.$store.dispatch('setBlog', {slug})
        window.addEventListener('scroll', this.checkScroll)
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.checkScroll)
    },
    watch:{
        $route (){
            const slug = this.$route.params.slug
            this.$store.dispatch('setBlog', {slug})
        }
    },
    computed: {
        blog() {
            return this.$store.getters.blog
        },
        formattedDate() {
            return this.blog.created_at ? moment.unix(this.blog.created_at).format('D.MM.yyyy') : '';
        },
    },
    methods: {
        checkScroll() {
            if (this.screenWidth() > 767)
                this.showFixedBanner = (window.scrollY > 50 && window.scrollY < (this.getHeightOfPage() - 1400))
            else
                this.showFixedBanner = false
        },
        getHeightOfPage(){
            return document.body.offsetHeight
        },
        screenWidth() {
            return this.$store.getters.screen_width
        },
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
                    this.emitter.emit('modal_info', {type: 'open', desc: 'common.modal_successfully_subscribed'})
                    this.email = ''
                    this.isVisibleModal = false
                })
        }
    }
}
</script>

<template>
    <div class="page-content item-blog-view">
        <div class="container">
            <div class="item-blog-view__inner" v-if="blog.id !== undefined">
                <h1 class="title">{{blog.name[$i18n.locale] ?? ''}}</h1>
                <div class="author author-top">
                    <div class="img">
                        <img :src="blog.author.img" class="img-fluid" :alt="blog.author.name[$i18n.locale] ?? ''">
                    </div>
                    <div>
                        <div class="name">{{blog.author.name[$i18n.locale] ?? ''}}</div>
                        <div class="position">{{blog.author.position[$i18n.locale] ?? ''}}</div>
                    </div>
                </div>
                <div class="content">
                    <div class="fixed-banner" v-if="blog.banner_fixed !== undefined && showFixedBanner && !closeFixedBanner">
                        <div class="fixed-banner-inner" :style="{background: blog.banner_fixed.bg }">
                            <div class="close-banner" @click="closeFixedBanner = true"></div>
                            <div class="img"><img :src="blog.banner_fixed.logo" class="img-fluid" :alt="blog.name[$i18n.locale] ?? ''"></div>
                            <div class="name">{{blog.banner_fixed.name}}</div>
                            <div class="btns">
                                <a :href="blog.banner_fixed.url" class="btn btn-primary">{{ $t('common.download') }}</a>
                            </div>
                        </div>
                    </div>
                    <ul>
                        <li v-for="row in blog.content" :key="row">
                            <div v-if="'text' === row.type" class="block-text" v-html="row.html[$i18n.locale] ?? ''"></div>
                            <div v-if="'img' === row.type" class="block-img">
                                <div v-for="img in row.list" :key="img">
                                    <img :src="img" class="img-fluid" :alt="blog.name[$i18n.locale] ?? ''">
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="socials">
                    <div class="socials-inner">
                        <div class="txt-block">
                            <div class="name">{{ $t('blog.social_title') }}</div>
                            <div class="desc">{{ $t('blog.social_desc') }}</div>
                        </div>
                        <div class="btn-block">
                            <share-networks :name="blog.name[$i18n.locale] ?? ''" :url="'http://localhost:8080/ua/blog/2'"></share-networks>
                            <div class="dash"></div>
                            <div class="btns">
                                <button class="btn btn-primary" @click="isVisibleModal = true">{{ $t('blog.subscribe_btn') }}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="author author-bottom">
                    <div class="desc-block">
                        <div class="img">
                            <img :src="blog.author.img" class="img-fluid" :alt="blog.author.name[$i18n.locale] ?? ''">
                        </div>
                        <div>
                            <div class="name">{{blog.author.name[$i18n.locale] ?? ''}}</div>
                            <div class="position">{{blog.author.position[$i18n.locale] ?? ''}}</div>
                        </div>
                    </div>
                    <div class="date-block">
                        {{ $t('common.published') }} {{formattedDate}}
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom-banner" v-if="blog.banner_bottom !== undefined" :style="{backgroundColor: blog.banner_bottom.bg_color }">
            <div class="container">
                <div :style="{backgroundImage: blog.banner_bottom.bg_image ? 'url(' + blog.banner_bottom.bg_image + ')' : ''}"
                     class="bottom-banner-inner">
                    <div class="desc-block">
                        <div class="name">{{blog.banner_bottom.name}}</div>
                        <div class="desc">{{blog.banner_bottom.desc[$i18n.locale] ?? ''}}</div>
                        <div class="btns">
                            <a :href="blog.banner_bottom.url" class="btn btn-primary">{{ $t('common.free_download') }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal :visible="isVisibleModal" modalClass="modal-blog-subscribe" title="" type="clean" :width="screenWidth() > 990 ? '740px' : 'auto'" offsetTop="25%">
            <button class="close" @click="isVisibleModal = false"></button>
            <div class="modal-blog-subscribe-inner">
                <div class="title">{{ $t('home.subscribe_title') }}</div>
                <div class="desc" v-html='$t("home.subscribe_desc")'></div>
                <form @submit.prevent="subscribeUser">
                    <input type="email" class="form-control" name="email" v-model="email"
                           :placeholder='$t("common.email")' required>
                    <input type="submit" class="btn btn-primary" :value='$t("home.subscribe_btn")'>
                </form>
            </div>
        </Modal>
    </div>
</template>

<style lang="sass">
@import "@/assets/color"
.item-blog-view
    padding-bottom: 0
    .bottom-banner-inner
        background-repeat: no-repeat
        background-position: 30% 100%
        background-size: auto 80%
        height: 307px
        .desc-block
            margin-left: 50%
            padding-top: 84px
        .name
            color: $color_black
            font-size: 26px
            font-weight: 600
            margin-bottom: 8px
        .desc
            font-size: 16px
            margin-bottom: 32px
    .modal-blog-subscribe
        .modal-vue3-content
            max-width: 90%
        .modal-vue3-body
            background-color: $color_white
            border-radius: 12px
            padding: 100px
            .close
                border: none
                background-color: transparent
                background-image: url("@/assets/img/icons/close-gray.svg")
                background-repeat: no-repeat
                background-position: center center
                background-size: 24px 24px
                height: 24px
                width: 24px
                position: absolute
                right: 24px
                top: 24px
        .modal-blog-subscribe-inner
            width: 540px
            .title
                color: $color_black
                font-size: 26px
                font-weight: 600
                margin-bottom: 16px
                text-align: center
            .desc
                font-size: 16px
                margin-bottom: 32px
                text-align: center

            input
                height: 40px

            input[type="email"]
                height: 40px
                margin-right: 20px
                width: 350px

            input[type="email"], input[type="submit"], .submit
                display: inline-block

.item-blog-view__inner
    margin: 0 auto 120px
    max-width: 636px
    .title
        color: $color_black
        font-size: 30px
        font-weight: 600
        margin-bottom: 25px
        text-transform: capitalize
    .author
        font-size: 14px
        align-items: center
        display: flex
        .img
            padding-right: 16px
        img
            height: 48px
        .name
            margin-bottom: 4px
        .position
            color: $color_gray_60
    .author-top
        padding-bottom: 50px
    .author-bottom
        align-items: flex-start
        display: flex
        justify-content: space-between
        .desc-block
            display: flex
        .date-block
            color: $color_gray_60
    .content
        ul
            list-style: none
            margin: 0
            padding: 0
        h3
            font-size: 20px
            font-weight: 600
            margin-top: 12px
            margin-bottom: 12px
        h4
            font-size: 18px
            font-weight: 600
            margin-top: 12px
            margin-bottom: 12px
        p
            font-size: 14px
            margin-bottom: 30px
        .block-img
            align-items: center
            display: flex
            justify-content: space-between
            margin-bottom: 50px
        .fixed-banner
            top: 50%
            right: 10%
            position: fixed
    .socials
        border-top: 1px solid $color_gray_40
        border-bottom: 1px solid $color_black
        margin-bottom: 40px
    .socials-inner
        display: flex
        justify-content: space-between
        padding: 24px 0
        .txt-block
            padding-top: 18px
        ul
            padding: 0
            text-align: center
        .name
            font-size: 18px
            font-weight: 600
            margin-bottom: 4px
        .dash
            background-image: url("@/assets/img/icons/dash.svg")
            background-position: center center
            background-repeat: no-repeat
            padding: 12px 0
        .btns .btn
            background-image: url("@/assets/img/icons/mail-white.svg")
            background-position: 16px center
            background-repeat: no-repeat
            padding-left: 15px

    .fixed-banner-inner
        border-radius: 8px
        color: white
        padding: 50px 30px
        text-align: center
        img
            margin-bottom: 12px
            height: 48px
            width: 48px
        .name
            margin-bottom: 24px
        .btn
            min-width: 125px
        .close-banner
            background-image: url("@/assets/img/icons/close-gray.svg")
            background-position: center center
            background-size: 12px 12px
            position: absolute
            height: 12px
            width: 12px
            top: 0
            right: 0
            margin: 8px
            border: none
            cursor: pointer

@media (max-width: 1600px)
    .item-blog-view__inner
        .fixed-banner
            right: 8%
@media (max-width: 1399px)
    .item-blog-view__inner
        .fixed-banner
            right: 5%

@media (max-width: 1200px)
    .item-blog-view .bottom-banner-inner
        background-position: 20% 100%

@media (max-width: 991px)
    .item-blog-view
        .bottom-banner-inner
            background-position: 10% 100%
        .modal-blog-subscribe
            form
                text-align: center
            .modal-vue3-body
                padding: 50px
            .modal-blog-subscribe-inner
                width: auto

@media (max-width: 768px)
    .item-blog-view__inner
        margin: 0 auto 80px
        .author-top
            padding-bottom: 40px
        .title
            font-size: 26px
        .socials-inner
            flex-direction: column
            text-align: center
            .txt-block
                padding-bottom: 24px
                padding-top: 0

    .item-blog-view
        .bottom-banner-inner
            background-position: center 100%
            background-size: auto 250px
            height: 517px
            .desc-block
                margin: 0 auto
                max-width: 270px
                padding-top: 70px
                text-align: center
            .date-block
                padding-left: 15px
        .modal-blog-subscribe
            input
                display: block
                margin: 0 auto 10px!important
                max-width: 90%

@media (max-width: 576px)
    .item-blog-view .bottom-banner-inner
        background-size: auto 180px
        height: 400px
        .desc-block
            padding-top: 50px
        .desc
            margin-bottom: 20px
</style>
