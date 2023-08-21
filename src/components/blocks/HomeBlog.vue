<script>
import {defineComponent} from 'vue'
import ListPreview from "@/components/blog/ListPreview"

export default defineComponent({
    name: "HomeBlog",
    data() {
        this.$store.dispatch('setBlogsShort')
        return {}
    },
    components: {ListPreview},
    computed: {
        blogs() {
            return this.$store.getters.blogs_short
        },
    },
})
</script>

<template>
    <div class="home-blog">
        <div class="container">
            <div class="row">
                <div class="col-lg-9">
                    <div class="block-brief">
                        <div class="title">{{ $t('blog.title') }}</div>
                        <div class="desc" v-html="$t('blog.desc')"></div>
                    </div>
                </div>
                <div class="col-lg-3 link-arrow-right link-purplle">
                    <router-link :to="{name:'Blogs', params:{locale:$i18n.locale}}" class="all-blogs">
                        {{ $t('blog.see_all') }}
                    </router-link>
                </div>
            </div>
            <list-preview :list="blogs"/>
        </div>
    </div>
</template>

<style scoped lang="sass">
@import "@/assets/color.sass"

.home-blog
    padding: 88px 0 120px

    .link-arrow-right
        text-align: right

        a
            margin-top: 65px

</style>
