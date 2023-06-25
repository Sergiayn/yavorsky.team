<template>
  <div class="page-home">
    <home-subscribe/>
    <home-user-review/>
    <blog-list-preview/>
    <home-contacts/>
  </div>
</template>

<script>

import HomeContacts from "@/components/blocks/HomeContacts"
import BlogListPreview from "@/components/blog/BlogListPreview"
import HomeUserReview from "@/components/blocks/HomeUserReview.vue";
import HomeSubscribe from "@/components/blocks/HomeSubscribe.vue";

export default {
  name: 'HomeView',
  components: {
    HomeSubscribe,
    HomeUserReview,
    BlogListPreview,
    HomeContacts
  }
}
</script>
