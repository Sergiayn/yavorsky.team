<script>
import {defineComponent} from 'vue'
import ListPreview from "@/components/blog/ListPreview"

export default defineComponent({
  name: "ListBlogsView",
  components: { ListPreview },
  data(){
    this.$store.dispatch('setBlogs')
    return {}
  },
  computed: {
    blogs() {
      return this.$store.getters.blogs
    },
  },
})
</script>

<template>
  <div class="list-blogs-view">
    <div class="container">
      <div class="block-brief single">
        <div class="title">{{$t('blog.title')}}</div>
      </div>
      <list-preview :list="blogs"/>
    </div>
  </div>
</template>

<style scoped lang="sass">
.list-blogs-view
  padding: 60px 0 120px
  .block-brief
    margin-bottom: 40px

</style>
