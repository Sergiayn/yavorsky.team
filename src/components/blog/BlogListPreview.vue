<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "BlogListPreview",
  data() {

  },
  methods: {
    timestampToDate(timestamp){
      const date = new Date(timestamp * 1000)
      return date.toDateString()
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
  <div class="container">
    <ul>
      <li v-for="blog in blogs" :key="blog.id">
        {{blog.name}}
        <br>
        {{timestampToDate(blog.created_at)}}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="sass">

</style>