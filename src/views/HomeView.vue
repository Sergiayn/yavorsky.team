<template>
  <div class="page-home">
    <home-company/>
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
import HomeCompany from "@/components/blocks/HomeCompany.vue";

export default {
  name: 'HomeView',
  components: {
    HomeCompany,
    HomeSubscribe,
    HomeUserReview,
    BlogListPreview,
    HomeContacts
  }
}
</script>
