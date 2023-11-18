<script>
import {defineComponent, ref} from 'vue'
import Popper from "vue3-popper"
import ListPreview from "@/components/blog/ListPreview"
import ListPreviewTop from "@/components/blog/ListPreviewTop"
import BlockSubscribe from "@/components/BlockSubscribe"

export default defineComponent({
    name: "ListBlogsView",
    components: {Popper, BlockSubscribe, ListPreviewTop, ListPreview},
    props: {
        target_rubric: {
            type: String,
            default() {
                return 'all'
            }
        },
        search: {
            type: String,
            default() {
                return ''
            }
        }
    },
    data() {
        this.$store.dispatch('setBlogs')
        const inputSearch = ref('')
        const isOpenSearch = ref(false)
        const isOpenQuickSearch = ref(false)
        const quickSearchList = ref([])
        const quickSearchListMax = 3
        const quickSearchShowBtnAll = ref(false)
        const rubrics = ['all', 'news', 'how_to']

        return {inputSearch, isOpenSearch, isOpenQuickSearch, quickSearchList, quickSearchListMax, quickSearchShowBtnAll,rubrics}
    },
    mounted() {
        this.inputSearch = this.search
        this.calcRubricActiveLine()
    },
    methods: {
        eInputSearch() {
            this.runQuickSearch()
            this.isOpenQuickSearch = !!(this.isOpenSearch && this.inputSearch.length)
        },
        eOpenSearch() {
            this.isOpenSearch = true
            this.eInputSearch()
        },
        eCloseSearch() {
            this.isOpenSearch = false
            this.eInputSearch()
        },
        wrapSubstring(text, substring, wrapper = 'span') {
            const regex = new RegExp(substring, 'gi')
            return text.replace(regex, match => `<${wrapper} class="highlight">${match}</${wrapper}>`)
        },
        capitalizeWords(inputString) {
            return inputString.replace(/(^|\s)\S/g, function(l){
                return l.toUpperCase()
            })
        },
        runQuickSearch() {
            let list = []
            this.quickSearchShowBtnAll = false
            if (this.inputSearch.length) {
                for (const value of Object.entries(this.blogs)) {
                    try {
                        const item = Object.assign({}, value[1])
                        let name = item.name[this.$i18n.locale]
                        if (name.toLowerCase().includes(this.inputSearch.toLowerCase())) {
                            name = this.capitalizeWords(name)
                            item.name = this.wrapSubstring(name, this.inputSearch)
                            list.push(item)
                        }
                    } catch (e) { console.warn(e) }

                    if (this.quickSearchListMax === list.length) {
                        this.quickSearchShowBtnAll = true
                        break;
                    }
                }
            }
            this.quickSearchList = ref(list)
        },
        calcRubricActiveLine() {
            let left = 0
            let isLoop = true
            this.$refs.rubricItem.forEach((item) => {
                if(isLoop) {
                    const isActive = item.classList.contains('active')
                    if (isActive)
                    {
                        this.$refs.rubricItemLine.style.width = item.querySelector('a').offsetWidth + 'px'
                        isLoop = false
                    } else
                        left = left + item.offsetWidth
                }
            })
            if (0 !== left)
                left = left + 24

            this.$refs.rubricItemLine.style.left = left + 'px'
        }
    },
    computed: {
        hasTopBlock() {
            return 'all' === this.target_rubric || '' === this.target_rubric || null === this.target_rubric
        },
        blogs() {
            return this.$store.getters.blogs
        },
        list_top() {
            return this.hasTopBlock ? this.blogs.slice(0, 4) : []
        },
        list_main() {
            return this.hasTopBlock ? this.blogs.slice(4) : this.blogs
        }
    },
})
</script>

<template>
    <div class="page-content list-blogs-view">
        <div class="container">
            <div class="block-brief single">
                <div class="title">{{ $t('blog.title') }}</div>
            </div>
            <div class="filter-form">
                <div class="row">
                    <div class="col">
                        <div class="rubrics">
                            <ul>
                                <li v-for="rubric in rubrics" :key="rubric"
                                    @click="calcRubricActiveLine" ref="rubricItem"
                                    :class="{active: target_rubric === rubric}">
                                    <router-link
                                        :to="{name:'Blogs', params:{locale:$i18n.locale}, query: {rubric: rubric}}">
                                        {{ $t('blog.rubric_' + rubric) }}
                                    </router-link>
                                </li>
                                <li class="line-active" ref="rubricItemLine"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <div class="search">
                            <Popper class="search-popper" :show="isOpenQuickSearch">
                                <input type="search" :placeholder="$t('blog.search')"
                                       @focus="eOpenSearch" @blur="eCloseSearch"
                                       :class="{'active': isOpenSearch}" v-model.trim="inputSearch"
                                       @input="eInputSearch">
                                <template #content>
                                    <div class="quick-search">
                                        <div v-if="quickSearchList.length" class="list-fill">
                                            <ul>
                                                <li v-for="quickSearchItem in quickSearchList"
                                                    :key="quickSearchItem.id">
                                                    <a href="#" class="img">
                                                        <img :src="quickSearchItem.preview"
                                                             :alt="quickSearchItem.name"
                                                             class="img-fluid">
                                                    </a>
                                                    <a href="#" class="name" v-html="quickSearchItem.name"></a>
                                                </li>
                                            </ul>
                                            <button class="btn btn-primary" v-if="quickSearchShowBtnAll">{{ $t("blog.all_results") }}</button>
                                        </div>
                                        <div v-else class="list-empty">{{ $t("blog.no_results_found") }}</div>
                                    </div>
                                </template>
                            </Popper>
                        </div>
                    </div>
                </div>
            </div>
            <list-preview-top :list="list_top"/>
            <template v-if="false">
                <div class="list-preview-desc">{{ $t('blog.latest_posts') }}</div>
                <list-preview :list="list_main"/>
            </template>
        </div>
    </div>
    <block-subscribe :is_wide="true" :margin_top="0"/>
</template>

<style lang="sass">
@import "@/assets/color"

.list-blogs-view
    .block-brief
        margin-bottom: 40px

    .filter-form
        padding-bottom: 70px

        .rubrics
            padding-top: 6px

            ul
                list-style: none
                margin: 0
                overflow: hidden
                padding: 0
                position: relative

            li
                float: left
                padding: 0 24px

                &:first-child
                    padding-left: 0

            .line-active
                background-color: $color_black
                bottom: 0
                height: 1px
                position: absolute
                transition: left .50s

            a
                color: $color_black
                cursor: pointer
                display: inline-block
                font-size: 18px
                padding-bottom: 5px
                text-decoration: none

        .search
            padding-left: 15px

            .search-popper
                width: 100%

            input
                background-color: transparent
                background-image: url("@/assets/img/icons/search.svg")
                background-repeat: no-repeat
                background-position: 8px center
                border: none
                color: $color_black
                display: block
                font-size: 18px
                margin: 0 0 0 auto
                width: 140px
                padding: 8px 8px 8px 40px
                transition: width 1s ease-in-out

                &.active
                    border-left: none
                    border-bottom: 1px solid $color_black
                    box-shadow: none
                    max-width: none
                    outline: 0
                    width: 100%
                    transition: width 1s ease-in-out

                &::-webkit-search-cancel-button
                    -webkit-appearance: none
                    background-image: url("@/assets/img/icons/close.svg")
                    cursor: pointer
                    height: 24px
                    width: 24px

        .quick-search
            background: $color_white
            border-radius: 8px
            border: 1px solid $color_secondary
            width: 600px

            .list-empty
                color: $color_gray_60
                font-size: 16px
                padding: 32px 0
                text-align: center

            .list-fill
                text-align: center
                padding: 16px 12px

                ul
                    margin: 0
                    padding: 0
                    list-style: none
                    text-align: left

                li
                    overflow: hidden
                    padding: 8px 0

                    &:first-child
                        padding-top: 0

                    &:last-child
                        padding-bottom: 0

                    a
                        display: inline-block
                        float: left

                    .img
                        margin-right: 12px
                        width: 84px

                    .name
                        color: $color_black
                        text-decoration: none
                        max-width: 70%
                .btn
                    margin-top: 32px
                    margin-bottom: 16px

            .highlight
                color: $color_gray_60

    .list-preview-desc
        color: $color_gray_60
        font-size: 18px
        padding-bottom: 32px

</style>
