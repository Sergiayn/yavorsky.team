<script>
import {defineComponent} from 'vue'
import SiteLogo from "@/components/SiteLogo.vue";

export default defineComponent({
  name: "MainHeader",
  components: {SiteLogo}
})
</script>

<template>
  <header>
    <div class="container">
      <div class="row">
        <div class="col-xxl-7 col-xl-6 col-lg-4">
          <site-logo/>
        </div>
        <div class="col-xxl-5 col-xl-6 col-lg-7">
          <nav>
            <ul>
              <li><a href="#">{{ $t('header.our_apps') }}</a></li>
              <li><a href="#">{{ $t('header.company') }}</a></li>
              <li><a href="#">{{ $t('header.blog') }}</a></li>
              <li><a href="#">{{ $t('header.contacts') }}</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="sass">
@import "@/assets/color.sass"

header
  background-color: $color_white
  height: 102px
  padding-top: 26px
  //position: fixed
  //top: 0
  width: 100%
  //z-index: 10
  nav
    padding-top: 8px
    ul
      display: flex
      display: -webkit-flex
      list-style: none
      justify-content: space-evenly
      margin-bottom: 0
      padding: 5px 0
    a
      color: $color_black
      text-decoration: none
</style>