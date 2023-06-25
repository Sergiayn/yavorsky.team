<template>
  <div class="page-home">
    <home-user-review/>
    <blog-list-preview/>
    <home-contacts/>
  </div>
</template>

<script>

import HomeContacts from "@/components/blocks/HomeContacts"
import BlogListPreview from "@/components/blog/BlogListPreview"
import HomeUserReview from "@/components/blocks/HomeUserReview.vue";

export default {
  name: 'HomeView',
  components: {
    HomeUserReview,
    BlogListPreview,
    HomeContacts
  }
}
</script>
