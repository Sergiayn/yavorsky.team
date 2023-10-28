<script>
// import {defineComponent} from 'vue'
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Slide, Navigation} from 'vue3-carousel'

export default {
    name: "app-block-user-review",
    props: {
        block: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    methods: {
        next() {
            this.$refs.reviewCarousel.next()
        },
        prev() {
            this.$refs.reviewCarousel.prev()
        },

    },
    computed: {
        reviewsChunks() {
            return window.objectToChunks(this.block.reviews, 2)
        }
    },
    components: {
        Carousel,
        Slide,
        Navigation
    },
}
</script>

<template>
    <div class="app-block-user-review">
        <div class="container" v-if="block">
            <div class="title">{{block.title[$i18n.locale] ?? ''}}</div>
            <div class="reviews">
                <carousel ref="reviewCarousel" :wrapAround="true">
                    <slide v-for="(reviewsChunk, index) in reviewsChunks" :key="index">
                        <div class="review-chunk">
                            <div class="review r-col" v-for="review in reviewsChunk" :key="review.id">
                                <div class="comment">{{ review.review[$i18n.locale] ?? '' }}</div>
                                <hr>
                                <div class="name">{{ review.name[$i18n.locale] ?? '' }}</div>
                            </div>
                            <div class="r-col" v-if="Object.keys(reviewsChunk).length === 1"></div>
                        </div>
                    </slide>
                    <template #addons>
                        <Navigation />
                    </template>
                </carousel>
            </div>
        </div>
    </div>
</template>

<style lang="sass">
@import "@/assets/color.sass"
.app-block-user-review
    padding: 54px

    .title
        color: $color_black
        font-size: 26px
        font-weight: 600
        padding-bottom: 48px
        text-align: center

    .reviews
        overflow: hidden
        padding: 0 95px

        .carousel__viewport
            padding-bottom: 1px

        .controls
            float: right

            div
                display: inline-block
                margin-left: 24px

        .carousel__prev, .carousel__next
            background-color: #fff
            background-position: 50%
            background-repeat: no-repeat
            background-size: 9px auto
            border: 1px solid $color_primary
            border-radius: 4px
            height: 40px
            width: 40px
            svg
                display: none
            &:hover
                background-color: $color_primary
                border-color: $color_primary
                &.carousel__prev
                    background-image: url("@/assets/img/icons/arrow-left-white.svg")

                &.carousel__next
                    background-image: url("@/assets/img/icons/arrow-right-white.svg")

        .carousel__prev
            background-image: url("@/assets/img/icons/arrow-left-purplle.svg")
            left: -95px
        .carousel__next
            background-image: url("@/assets/img/icons/arrow-right-purplle.svg")
            right: -95px

    .review-chunk
        display: flex
        justify-content: space-between

    .r-col
        flex: 50%

    .review
        background-image: url("@/assets/img/icons/quotation-mark.webp")
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

        .comment
            min-height: 72px


</style>
