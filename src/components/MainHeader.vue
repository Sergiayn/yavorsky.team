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
        <div class="col-xxl-8 col-xl-7 col-lg-7 col-md-5">
          <site-logo/>
        </div>
        <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7">
          <nav>
            <ul>
              <li>
                <router-link :to="{name:'Apps', params:{locale:$i18n.locale}}">
                  {{ $t('header.our_apps') }}
                </router-link>
              </li>
              <li><a href="#">{{ $t('header.company') }}</a></li>
              <li>
                <router-link :to="{name:'Blogs', params:{locale:$i18n.locale}}">
                  {{ $t('header.blog') }}
                </router-link>
              </li>
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
  height: 62px
  padding-top: 6px
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
      justify-content: space-between
      margin-bottom: 0
      padding: 5px 0
    a
      color: $color_black
      text-decoration: none
</style>