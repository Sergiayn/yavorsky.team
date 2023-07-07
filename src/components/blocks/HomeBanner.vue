<script>
import {defineComponent} from 'vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination } from 'vue3-carousel'

export default defineComponent({
  name: "HomeBanner",
  data(){
    this.$store.dispatch('setAppsBanner')
    return {}
  },
  methods: {
    getBasePath() {
      let str = 'https://apps.apple.com/'
      if ('ua' === this.$i18n.locale)
        str += 'ua/'
      else if ('ru' === this.$i18n.locale)
        str += 'ru-ru/'
      else
        str += 'en-us/'
      return str + 'app/'
    }
  },
  computed: {
    banners() {
      return this.$store.getters.apps_banner
    }
  },
  components: {
    Carousel,
    Slide,
    Pagination
  },
})
</script>

<template>
  <div class="home-banner">
    <carousel ref="appsBannerCarousel" :autoplay="10000" :wrapAround="true">
      <slide v-for="banner in banners" :key="banner.id" :style="{'background':banner.bg}" class="banner">
        <div class="container">
          <div class="banner-inner">
            <div class="row">
              <div class="col">
                <ul class="images">
                  <li class="image" v-for="(image,index) in banner.images" :key="index">
                    <img :src="image" :alt="banner.name" class="img-fluid">
                  </li>
                </ul>
              </div>
              <div class="col">
                <div class="msg-dev" v-if="banner.url === null">{{ $t('home.soon_on_app_store') }}</div>
                <div class="name">{{banner.name}}</div>
                <div class="brief">{{banner.brief[$i18n.locale] ?? ''}}</div>
                <div class="desc">{{banner.desc[$i18n.locale] ?? ''}}</div>
                <div class="buttons">
                  <a href="#" class="btn btn-secondary">{{$t('common.learn_more')}}</a>
                  <a v-if="banner.url" :href="this.getBasePath() + banner.url" target="_blank"
                     class="btn btn-primary">{{$t('common.free_download')}}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </slide>
      <template #addons>
        <div class="container">
          <pagination/>
        </div>
      </template>
    </carousel>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/color.sass"

.home-banner
  .msg-dev
    background-color: $color_green
    border-radius: 4px
    display: inline-block
    color: $color_white
    font-size: 14px
    font-weight: 600
    margin: 20px auto 26px
    padding: 2px 8px
  .banner
    padding: 116px 0 16px
    .images
      background-image: url("@/assets/img/image-shadow.png")
      background-repeat: no-repeat
      background-position: bottom center
      list-style: none
      padding: 0 0 100px
      margin: auto
      max-width: 510px
      li
        display: inline-block
        padding: 0 6px
        max-width: 177px
    .name
      font-size: 26px
      font-weight: 600
      line-height: 1.3
      padding-bottom: 8px
    .brief
      font-size: 18px
      font-weight: 600
      padding-bottom: 24px
    .desc
      font-size: 18px
  .banner-inner
    text-align: left
  .buttons
    padding-top: 50px
    .btn
      margin-right: 24px
  .carousel__pagination
    margin: -80px 0 80px
    justify-content: right
    position: relative
    z-index: auto

</style>