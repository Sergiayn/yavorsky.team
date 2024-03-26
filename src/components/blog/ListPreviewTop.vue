<script>
import {defineComponent} from 'vue'
import moment from "moment/moment"
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Slide} from "vue3-carousel"

export default defineComponent({
    name: "ListPreviewTop",
    props: {
        list: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    methods: {
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
        allItems() {
            return this.list ?? []
        },
        firstItem() {
            return this.list ? this.list.slice(0, 1)[0] : []
        },
        otherItems() {
            return this.list.slice(1) ?? []
        },
        screenWidth() {
            return this.$store.getters.screen_width
        }
    },
    components: {
        Carousel,
        Slide,
    },
})
</script>

<template>
    <div class="blog__list-preview-top" v-if="firstItem">
        <div class="row" v-if="screenWidth > 767">
            <div class="col-xl col-lg col-md-7">
                <div class="first-item link-black">
                    <div class="img">
                        <img :src="firstItem.preview_large" :alt="firstItem.name[$i18n.locale] ?? ''">
                    </div>
                    <div class="date">{{ timestampToDate(firstItem.created_at) }}</div>
                    <div class="name">
                        <router-link :to="{name:'Blog', params:{locale:$i18n.locale, slug:firstItem.id}}">
                            {{ firstItem.name[$i18n.locale] ?? '' }}
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="col-xl col-lg col-md-5">
                <ul class="list link-black">
                    <li v-for="item in otherItems" :key="item.id">
                        <div class="date">{{ timestampToDate(item.created_at) }}</div>
                        <div class="name">
                            <router-link :to="{name:'Blog', params:{locale:$i18n.locale, slug:item.id}}">
                                {{ item.name[$i18n.locale] ?? '' }}
                            </router-link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else class="mobile-block">
            <carousel :wrapAround="true" :items-to-show="(screenWidth > 520) ? 1.6 : 1">
                <slide v-for="(item, index) in allItems" :key="index">
                     <div class="item-inner link-black">
                         <div class="img">
                             <img :src="item.preview_large" :alt="item.name[$i18n.locale] ?? ''">
                         </div>
                         <div class="date">{{ timestampToDate(item.created_at) }}</div>
                         <div class="name">
                             <router-link :to="{name:'Blog', params:{locale:$i18n.locale, slug:item.id}}">
                                 {{ item.name[$i18n.locale] ?? '' }}
                             </router-link>
                         </div>
                     </div>
                </slide>
            </carousel>
        </div>
    </div>
</template>

<style scoped lang="sass">
@import "@/assets/color.sass"

.blog__list-preview-top
    //padding-bottom: 80px

    .date
        color: $color_gray_60
        padding: 8px 0

    .name a
        font-size: 20px
        font-weight: 600
        text-transform: capitalize

    .first-item
        &:hover
            img
                transition: all .2s ease-in-out
                transform: scale(1.1)

        .img
            border-radius: 8px
            overflow: hidden
            padding-bottom: 8px
        img
            max-width: 100%
            transform: scale(1.05)

    .list
        list-style: none
        margin: 0
        padding: 0

        li
            border-bottom: 1px solid $color_gray_40
            padding: 8px 0
            text-transform: capitalize

            &:first-child
                padding-top: 0
    .mobile-block
        .item-inner
            .img img
                max-width: 100%
            .date, .name
                padding-left: 10px
                padding-right: 10px
                text-align: left

@media (max-width: 1200px)
    .blog__list-preview-top
        .name a
            font-size: 18px
        .date
            font-size: 14px

</style>
