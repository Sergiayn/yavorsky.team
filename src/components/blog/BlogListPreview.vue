<script>
import {defineComponent} from 'vue'
import moment from 'moment'
import blog_1 from '@/assets/img/blog/blog_1.png'
import blog_2 from '@/assets/img/blog/blog_2.png'
import blog_3 from '@/assets/img/blog/blog_3.png'
import blog_4 from '@/assets/img/blog/blog_4.png'

export default defineComponent({
  name: "BlogListPreview",
  data() {
    const imgs = {1:blog_1,2:blog_2,3:blog_3,4:blog_4}
    return {imgs}
  },
  methods: {
    timestampToDate(timestamp){
      const date = moment(timestamp *1000)
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
    blogs() {
      return this.$store.getters.blogs
    },
  },
})
</script>

<template>
  <div class="blog-list-preview">
    <div class="container">
      <div class="row">
        <div class="col-lg-9">
          <div class="block-brief">
            <div class="title">{{$t('blog.title')}}</div>
            <div class="desc">{{$t('blog.desc')}}</div>
          </div>
        </div>
        <div class="col-lg-3 link-arrow-right link-purrple">
          <a href="#" class="all-blogs">{{$t('blog.see_all')}}</a>
        </div>
      </div>

      <ul class="list link-black">
        <li v-for="blog in blogs" :key="blog.id">
          <a href="#" class="img">
            <img :src="imgs[blog.id]" :alt="blog.name[$i18n.locale] ?? ''">
          </a>
          <div class="date">{{timestampToDate(blog.created_at)}}</div>
          <a href="#" class="name">{{blog.name[$i18n.locale] ?? ''}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/color.sass"

.blog-list-preview
  padding: 88px 0 120px
  .link-arrow-right
    text-align: right
    a
      margin-top: 40px
  .list
    display: flex
    display: -webkit-flex
    list-style: none
    justify-content: space-between
    margin-bottom: 0
    padding: 0
    .img
      border-radius: 8px
      display: block
      overflow: hidden
    img
      max-width: 100%

    li
      flex: 25%
      margin: 0 12px
      padding: 0

      &:first-child
        margin-left: 0
      &:last-child
        margin-right: 0
      .date
        font-size: 14px
        color: $color_gray_40
        padding: 8px 0 4px
      .name
        font-size: 18px
        font-weight: 600
        display: block
      img:hover
        transition: all .2s ease-in-out
        transform: scale(1.1)
      a:hover
        color: $color_black
        text-decoration: underline

//@media (max-width: 1199px)
//  .blog-list-preview
//    .list

</style>
