<template>
  <ul class="social-network">
    <li v-for="item in list" :key="item.id">
      <a
          :href="item.link"
          :class="item.name"
          :title="item.name"
          v-if="isColor || screenWidth < 768"
          class="active"
      ></a>
      <a
          :href="item.link"
          :class="item.name"
          :title="item.name"
          @mouseover="e => e.target.classList.add('active')"
          @mouseleave="e => e.target.classList.remove('active')"
          v-else
      ></a>
    </li>
  </ul>
</template>

<script>
import {ref} from "vue"

export default {
  name: "SocialNetwork",
  props: {
    isColor: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    const list = ref([
      {id:1,name:'instagram',link:'#'},
      {id:2,name:'facebook',link:'#'},
      {id:3,name:'twitter',link:'#'},
    ])

    return {
      list,
      screenWidth: 0
    }
  },
  mounted() {
    this.updateScreenWidth()
    this.onScreenResize()
  },
  methods: {
    onScreenResize() {
      window.addEventListener("resize", () => {
        this.updateScreenWidth()
      })
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth
    }
  },
}
</script>

<style scoped lang="sass">
.social-network
  list-style: none
  margin: 0
  li
    display: inline-block
    padding: 0 8px
    &:first-child
      padding-left: 0
    &:last-child
      padding-right: 0
  a
    display: block
    height: 32px
    width: 32px
  .instagram
    background-image: url("@/assets/img/social-network/instagram.svg")
    &.active
      background-image: url("@/assets/img/social-network/instagram-active.svg")
  .facebook
    background-image: url("@/assets/img/social-network/facebook.svg")
    &.active
      background-image: url("@/assets/img/social-network/facebook-active.svg")
  .twitter
    background-image: url("@/assets/img/social-network/twitter.svg")
    &.active
      background-image: url("@/assets/img/social-network/twitter-active.svg")

</style>