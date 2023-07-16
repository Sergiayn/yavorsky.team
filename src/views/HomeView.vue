<template>
  <div class="page-home">
    <home-banner/>
    <home-our-apps/>
    <home-company/>
    <home-subscribe/>
    <home-user-review/>
    <home-blog/>
    <home-contacts/>
  </div>
</template>

<script>

import HomeContacts from "@/components/blocks/HomeContacts"
import HomeBlog from "@/components/blocks/HomeBlog"
import HomeUserReview from "@/components/blocks/HomeUserReview.vue";
import HomeSubscribe from "@/components/blocks/HomeSubscribe.vue";
import HomeCompany from "@/components/blocks/HomeCompany.vue";
import HomeOurApps from "@/components/blocks/HomeOurApps.vue";
import HomeBanner from "@/components/blocks/HomeBanner.vue";

export default {
  name: 'HomeView',
  components: {
    HomeBanner,
    HomeOurApps,
    HomeCompany,
    HomeSubscribe,
    HomeUserReview,
    HomeBlog,
    HomeContacts
  }
}
</script>
