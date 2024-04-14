<script>
import {defineComponent} from 'vue'
import moment from 'moment'

export default defineComponent({
    name: "Blog_ListPreview",
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
        }
    },
    computed: {
        blogsChunks() {
            return window.objectToChunks(this.list, 4)
        }
    }
})
</script>

<template>
    <div class="blog__list-preview">
        <ul class="list link-black" v-for="(blogs, index) in blogsChunks" :key="index">
            <li v-for="blog in blogs" :key="blog.id">
                <router-link class="img" :to="{name:'Blog', params:{locale:$i18n.locale, slug:blog.id}}">
                    <img :src="blog.preview" :alt="blog.name[$i18n.locale] ?? ''" class="img-fluid">
                </router-link>
                <div class="date">{{ timestampToDate(blog.created_at) }}</div>
                <router-link class="name" :to="{name:'Blog', params:{locale:$i18n.locale, slug:blog.id}}">
                    {{ blog.name[$i18n.locale] ?? '' }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="sass">
@import "@/assets/color.sass"

.blog__list-preview
    .list
        display: flex
        display: -webkit-flex
        list-style: none
        justify-content: flex-start
        margin-bottom: 0
        padding: 12px 0

        &:first-child
            padding-top: 0

        &:last-child
            padding-bottom: 0

        .img
            border-radius: 8px
            display: block
            overflow: hidden
            text-align: center

        img
            max-width: 100%
            transform: scale(1.05)

        li
            flex: 25%
            max-width: 25%
            margin: 0 12px
            padding: 0
            text-transform: capitalize

            &:hover
                img
                    transition: all .2s ease-in-out
                    transform: scale(1.1)

                a
                    color: $color_black
                    text-decoration: none

            &:first-child
                margin-left: 0

            &:last-child
                margin-right: 0

            .date
                font-size: 14px
                color: $color_gray_40
                padding: 8px 12px 4px

            .name
                font-size: 18px
                font-weight: 600
                display: block
                padding: 0 12px

@media (max-width: 767px)
    .blog__list-preview
        .list li
            flex: 50%
            max-width: 50%

@media (max-width: 700px)
    .blog__list-preview
        .list
            gap: 40px
            flex-direction: column
            max-width: 350px
            margin: auto
            li
                flex: 100%
                max-width: none
                margin-right: 0
                margin-left: 0

</style>
