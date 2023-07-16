<script>
import {defineComponent, ref} from 'vue'
import index from "vuex";

export default defineComponent({
  name: "SliderDissolve",
  computed: {
    index() {
      return index
    }
  },
  props: {
    list: {
      type: Object,
      default() {return {}}
    },
    autoplay: {
      type: Number,
      default() {return 0}
    },
    hasPagination: {
      type: Boolean,
      default() {return true}
    },
    wrapAround: {
      type: Boolean,
      default() {return false}
    }
  },
  data() {
    const activeItemIndex = ref(0)
    const sliderTimer = ref(0)
    this.startAutoplay()

    return {activeItemIndex, sliderTimer}
  },
  methods: {
    isActiveItem(index) {
      return this.activeItemIndex === index
    },
    startAutoplay() {
      if (!this.autoplay)
        return

      if (undefined !== this.sliderTimer)
        clearInterval(String(this.sliderTimer))

      this.sliderTimer = setInterval(() => this.nextItem(), this.autoplay * 1000)
    },
    nextItem() {
      if (this.wrapAround) {
        if (this.activeItemIndex + 1 < this.list.length)
          this.activeItemIndex++
        else
          this.activeItemIndex = 0
      } else {
        if (this.activeItemIndex + 1 < this.list.length)
          this.activeItemIndex++
      }
      this.startAutoplay()
    },
    goToItem(index){
      this.activeItemIndex = index
      this.startAutoplay()
    }
  },
})
</script>

<template>
  <div class="slider-dissolve carousel">
    <TransitionGroup name="list" tag="ul">
      <li v-for="(item, index) in list" :key="index" class="dissolve-effect"
          :class="{show: isActiveItem(index)}">
        <div v-show="isActiveItem(index)">
          <slot :item="item" :index="index"></slot>
        </div>
      </li>
    </TransitionGroup>
    <div class="container">
      <ol class="carousel__pagination" v-if="hasPagination">
        <li class="carousel__pagination-item" v-for="(item, index) in list"
            @click="goToItem(index)"
            :key="index">
          <button :class="{'carousel__pagination-button--active': index === activeItemIndex}"
              type="button" class="carousel__pagination-button"
          ></button>
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped lang="sass">
.slider-dissolve
  ul
    margin: 0
    padding: 0
    list-style: none
  .dissolve-effect
    opacity: 0
    transition: opacity 1s ease-in-out
    &.show
      opacity: 1

</style>
