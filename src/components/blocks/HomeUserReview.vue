<script>
import {defineComponent} from 'vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'

export default defineComponent({
  name: "HomeUserReview",
  methods: {
    next() {
      this.$refs.reviewCarousel.next()
    },
    prev() {
      this.$refs.reviewCarousel.prev()
    },
  },
  computed: {
    reviews() {
      return this.$store.getters.user_reviews
    },
  },
  components: {
    Carousel,
    Slide,
  },
})
</script>

<template>
<div class="home-user-review">
  <div class="container">
    <div class="block-brief">
      <div class="title">{{$t('home.user_review__title')}}</div>
      <div class="desc">{{$t('home.user_review__desc')}}</div>
    </div>
    <div class="reviews">
      <carousel :items-to-show="2" ref="reviewCarousel" itemsToScroll="2">
        <slide v-for="review in reviews" :key="review.id">
          <div class="review">
            <div class="comment">{{ review.review[$i18n.locale] ?? '' }}</div>
            <hr>
            <div class="name">{{ review.name[$i18n.locale] ?? '' }}</div>
            <div class="job-title">{{ review.job_title[$i18n.locale] ?? '' }}</div>
          </div>
        </slide>
      </carousel>
      <div class="controls">
        <button @click="prev" class="btn-arrow left"></button>
        <button @click="next" class="btn-arrow right"></button>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="sass">
@import "@/assets/color.sass"

.home-user-review
  .block-brief
    max-width: 390px

  .reviews
    .carousel__track
      margin-bottom: 40px
    .carousel__slide
      padding: 0 12px
    .controls
      float: right
      button
        margin-left: 24px

  .review
    background-image: url("@/assets/img/icons/quotation-mark.png")
    background-repeat: no-repeat
    background-position: 16px 16px
    border-radius: 12px
    border: 1px solid $color_secondary
    height: 100%
    padding: 76px 16px 16px
    text-align: left
    .name, .job-title
      font-size: 14px
      color: $color_black

</style>
