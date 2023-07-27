<template>
  <div class="page-home">
    <home-banner/>
    <home-our-apps/>
    <home-company/>
    <block-subscribe/>
    <home-user-review/>
    <home-blog/>
    <home-contacts/>
  </div>
</template>

<script>

import HomeContacts from "@/components/blocks/HomeContacts"
import HomeBlog from "@/components/blocks/HomeBlog"
import HomeUserReview from "@/components/blocks/HomeUserReview";
import BlockSubscribe from "@/components/BlockSubscribe";
import HomeCompany from "@/components/blocks/HomeCompany";
import HomeOurApps from "@/components/blocks/HomeOurApps";
import HomeBanner from "@/components/blocks/HomeBanner";

export default {
  name: 'HomeView',
  components: {
    HomeBanner,
    HomeOurApps,
    HomeCompany,
    BlockSubscribe,
    HomeUserReview,
    HomeBlog,
    HomeContacts
  }
}
</script>
