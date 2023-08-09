<script>
import {defineComponent} from 'vue'
import ListPreview from "@/components/blog/ListPreview"
import ListPreviewTop from "@/components/blog/ListPreviewTop";
import BlockSubscribe from "@/components/BlockSubscribe";

export default defineComponent({
  name: "ListBlogsView",
  components: {BlockSubscribe, ListPreviewTop, ListPreview },
  props: {
    target_rubric: {
      type: String,
      default() {return 'all'}
    },
    search: {
      type: String,
      default() {return ''}
    }
  },
  data(){
    this.$store.dispatch('setBlogs')
    const rubrics = ['all', 'news', 'how_to']
    return {rubrics}
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
        <div class="title">{{$t('blog.title')}}</div>
      </div>

      <div class="filter-form">
        <div class="row">
          <div class="col">
            <div class="rubrics">
              <ul>
                <li v-for="rubric in rubrics" :key="rubric" :class="{active: target_rubric === rubric}">
                  <router-link :to="{name:'Blogs', params:{locale:$i18n.locale}, query: {rubric: rubric}}">
                    {{ $t('blog.rubric_' + rubric)  }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="col">
            <div class="search">
              <input type="search" :placeholder="$t('blog.search')" :value="search">
            </div>
          </div>
        </div>
      </div>
      <list-preview-top :list="list_top"/>
      <div class="list-preview-desc">{{$t('blog.latest_posts')}}</div>
      <list-preview :list="list_main"/>
    </div>
  </div>
  <block-subscribe/>
</template>

<style scoped lang="sass">
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
        padding: 0
      li
        display: inline
        padding: 0 24px
        &:first-child
          padding-left: 0
      a
        color: $color_black
        cursor: pointer
        display: inline-block
        font-size: 18px
        padding-bottom: 5px
        text-decoration: none
      .active a
        border-bottom: 1px solid $color_black
    .search
      input
        background-image: url("@/assets/img/icons/search.svg")
        background-repeat: no-repeat
        background-position: 8px center
        border: none
        color: $color_black
        display: block
        font-size: 18px
        margin: 0 0 0 auto
        max-width: 130px
        padding: 8px 8px 8px 40px
        &:focus, &:focus-visible
          border-left: none
          border-bottom: 1px solid $color_black
          box-shadow: none
          max-width: none
          margin-left: 15px
          outline: 0
          width: 100%
  .list-preview-desc
    color: $color_gray_60
    font-size: 18px
    padding-bottom: 32px

</style>
