<script>
import {defineComponent} from 'vue'
import SocialNetwork from "@/components/SocialNetwork.vue";

export default defineComponent({
  name: "HomeCompany",
  components: {SocialNetwork}
})
</script>

<template>
  <div class="home-company">
    <div class="container">
      <div class="block-brief single">
        <div class="title">{{$t('home.company__title')}}</div>
      </div>
      <div class="desc-part">
        <div class="desc">{{$t('home.company__desc')}}</div>
        <div class="link-purrple link-arrow-right">
          <a href="#">{{$t('home.company__link')}}</a>
        </div>
      </div>
      <div class="social-network-part">
        <div class="title">{{$t('home.company__network_title')}}:</div>
        <social-network :is-color="true"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.home-company
  padding: 120px 0
  .desc-part
    max-width: 576px
    margin: auto
    padding: 72px 0 64px
    text-align: center
    .desc
      padding-bottom: 16px
  .social-network-part
    max-width: 340px
    margin: auto
    text-align: center
    .title
      padding-bottom: 16px
    ul
      padding: 0

</style>
