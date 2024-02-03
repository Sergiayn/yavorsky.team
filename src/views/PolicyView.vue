<script>
import moment from "moment";
import {ref} from "vue";

export default {
    name: "PolicyView",
    props: {
        slug: {
            type: String,
            default() {
                return ''
            }
        }
    },
    created() {
        const slug = this.slug
        this.$store.dispatch('setPage', {slug})
        this.updateItemsParam()
    },
    mounted() {
        this.updateScreenPositionHeight()
        this.onScreenScroll()
    },
    data() {
        const itemsParam = ref({})
        const activeItem = ref(false)
        return {activeItem, itemsParam, screenPositionHeight: 0}
    },
    watch: {
        slug() {
            const slug = this.slug
            this.$store.dispatch('setPage', {slug})
        }
    },
    methods: {
        getRefNameById(id) {
            return 'block_item_' + id
        },
        getRefMenuNameById(id) {
            return 'block_menu_item_' + id
        },
        updateItemsParam(){
            if (this.page.list) {
                this.activeItem = false
                this.page.list.forEach((item) => {
                    try {
                        this.itemsParam[item.id] = this.$refs[this.getRefNameById(item.id)][0].getBoundingClientRect().top
                        this.checkActveItemForLeftMenu(item)
                    } catch (e) { console.warn(e)}
                })
            }
        },
        checkActveItemForLeftMenu(item) {
            if (undefined !== this.$refs[this.getRefMenuNameById(item.id)])
            {
                this.$refs[this.getRefMenuNameById(item.id)][0].classList.remove('active')
                if (false === this.activeItem && this.itemsParam[item.id] > -20)
                {
                    this.activeItem = item.id
                    this.$refs[this.getRefMenuNameById(item.id)][0].classList.add('active')
                }
            }
        },
        onScreenScroll() {
            window.addEventListener("scroll", () => {
                this.updateScreenPositionHeight()
                this.updateItemsParam()
            })
        },
        updateScreenPositionHeight() {
            this.screenPositionHeight = window.scrollY;
        },
        timestampToDate(timestamp) {
            const date = moment(timestamp * 1000)
            let res = ''
            switch (this.$i18n.locale) {
                case 'ua':
                    res = date.locale('uk').format('D MMMM YYYY') + ' р.'
                    break
                case 'ru':
                    res = date.locale('ru').format('D MMMM YYYY') + ' г.'
                    break
                case 'en':
                default:
                    res = date.locale('en').format('MMMM D, YYYY')
            }
            return res
        },
    },
    computed: {
        page() {
            return this.$store.getters.page
        }
    }
}
</script>

<template>
    <div class="page-content page-policy" v-if="page.id">
        <div class="container">
            <div class="block-brief">
                <div class="title">{{ page.name[$i18n.locale] ?? '' }}</div>
                <div class="desc">{{ $t('common.updated') }} {{ timestampToDate(page.updated_at) }}</div>
            </div>
            <div class="row">
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <div class="left-menu" v-if="page.has_menu"
                         :style="{top: (235 - screenPositionHeight < 0) ? 0 : (235 - screenPositionHeight) + 'px' }">
                        <strong>{{ $t('common.table_of_contents') }}</strong>
                        <ul class="link-black">
                            <li v-for="item in page.list" :key="item.id">
                                <a :href="'#' + getRefNameById(item.id)"
                                   :ref="getRefMenuNameById(item.id)">
                                    {{ item.title[$i18n.locale] ?? '' }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
                    <div class="main-content">
                        <ul class="link-purplle">
                            <li v-for="item in page.list" :key="item.id"
                                :ref="getRefNameById(item.id)"
                                :id="'block_item_' + item.id">
                                <h2>{{ item.title[$i18n.locale] ?? '' }}</h2>
                                <div v-html="item.content[$i18n.locale] ?? ''"></div>
                            </li>
                        </ul>
                        <div v-if="page.end_block" class="end_block">
                            <section>
                                <div class="block">
                                    <h3>{{ $t('common.still_have_questions') }}</h3>
                                    <span>{{ $t('common.still_have_questions__msg') }}</span>
                                </div>
                                <div class="block">
                                    <router-link :to="{name:'Contact', params:{locale:$i18n.locale}}"
                                                 class="btn btn-primary">
                                        {{ $t('common.contact_us') }}
                                    </router-link>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="sass">
@import "@/assets/color"

.page-policy
    .block-brief
        max-width: none

    ul
        list-style: none
        margin: 0
        padding: 0

    .left-menu
        position: fixed

        strong
            display: inline-block
            margin-bottom: 16px
            font-weight: 600

        ul
            max-width: 220px

        li
            background-image: url("@/assets/img/icons/dash.svg")
            background-position: left 2px
            background-repeat: no-repeat
            padding-left: 28px
            padding-bottom: 8px

    .list-1
        margin-bottom: 20px

        li
            background-image: url("@/assets/img/icons/dash.svg")
            background-position: left 2px
            background-repeat: no-repeat
            padding-left: 28px

    .list-2
        margin-bottom: 20px
        margin-left: 20px
        list-style: decimal

    .list-3
        margin-bottom: 20px
        margin-left: 20px
        list-style: disc

    .main-content
        h2, h3, h4
            font-weight: 600

        h2
            font-size: 20px

        h3
            font-size: 18px

        h4
            font-size: 16px

        p
            margin-bottom: 20px

        > ul > li
            padding-bottom: 20px

    .end_block
        border-top: 1px solid $color_gray_40
        border-bottom: 1px solid $color_black
        padding: 40px 0
        margin-bottom: 20px

        section
            display: flex
            flex-direction: row
            align-items: center
            justify-content: space-between

            span
                font-size: 14px

@media (max-width: 1200px)
    .page-policy
        .left-menu
            a
                font-size: 14px
        .main-content
            > ul li
                padding-bottom: 15px

@media (max-width: 991px)
    .page-policy
        .left-menu
            ul
                max-width: 168px

@media (max-width: 768px)
    .page-policy
        .left-menu
            padding-bottom: 40px
            position: static
            ul
                max-width: none
        .main-content
            ul
                word-break: break-word
@media (max-width: 350px)
    .page-policy
        .main-content
            .end_block
                section
                    gap: 10px
                    flex-direction: column

</style>
