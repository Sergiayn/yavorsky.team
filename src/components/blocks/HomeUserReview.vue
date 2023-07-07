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
    reviewsChunks() {
      return window.objectToChunks(this.$store.getters.user_reviews, 2)
    }
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
      <carousel ref="reviewCarousel" :wrapAround="true">
        <slide v-for="(reviewsChunk, index) in reviewsChunks" :key="index">
          <div class="review-chunk">
            <div class="review r-col" v-for="review in reviewsChunk" :key="review.id">
              <div class="comment">{{ review.review[$i18n.locale] ?? '' }}</div>
              <hr>
              <div class="name">{{ review.name[$i18n.locale] ?? '' }}</div>
              <div class="job-title">{{ review.job_title[$i18n.locale] ?? '' }}</div>
            </div>
            <div class="r-col" v-if="Object.keys(reviewsChunk).length === 1"> </div>
          </div>
        </slide>
      </carousel>
      <div class="controls">
        <div @click="prev" class="btn-arrow left"></div>
        <div @click="next" class="btn-arrow right"></div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="sass">
@import "@/assets/color.sass"

.home-user-review
  padding-top: 120px
  .block-brief
    max-width: 530px
  .reviews
    overflow: hidden
    .carousel__viewport
      margin-bottom: 40px
      padding-bottom: 1px
    .controls
      float: right
      div
        display: inline-block
        margin-left: 24px

  .review-chunk
    display: flex
    justify-content: space-between
  .r-col
    flex: 50%
  .review
    background-image: url("@/assets/img/icons/quotation-mark.png")
    background-repeat: no-repeat
    background-position: 16px 16px
    border-radius: 12px
    border: 1px solid $color_secondary
    height: 100%
    padding: 76px 16px 16px
    text-align: left
    &:first-child
      margin-right: 12px
    &:last-child
      margin-left: 12px
    .name, .job-title
      font-size: 14px
      color: $color_black
    .comment
      min-height: 72px

</style>
