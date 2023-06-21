<template>
  <div class="page-home">
<!--    <blog-list-preview></blog-list-preview>-->
    <home-contacts/>
  </div>
</template>

<script>

import HomeContacts from "@/components/blocks/HomeContacts"
// import BlogListPreview from "@/components/blog/BlogListPreview"

export default {
  name: 'HomeView',
  components: {
    // BlogListPreview,
    HomeContacts
  }
}
</script>
