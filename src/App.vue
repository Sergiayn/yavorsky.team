<template>
  <main-header></main-header>
  <div class="main">
    <RouterView />
  </div>
  <main-footer></main-footer>
</template>

<script>
import MainFooter from "@/components/MainFooter"
import MainHeader from "@/components/MainHeader"

export default {
  name: 'App',
  data(){
    this.$store.dispatch('loadAppsShort')
    return {}
  },
  components: {
    MainFooter,
    MainHeader,
  }
}

</script>

<style lang="sass">
@import "@/assets/color.sass"

body
  font-family: 'Open Sans', sans-serif

.form-control
  border-radius: 8px
  font-size: 14px
  padding: 9px
  &:focus
    border-color: $color_primary
    box-shadow: 0 0 0 0.05rem $color_primary

.btn
  border-radius: 8px
  min-width: 168px
  font-size: 16px
  font-weight: 600
  padding: 9px

.btn-primary
  background-color: $color_primary
  border-color: $color_primary
  &:hover
    background-color: $color_primary_hover
    border-color: $color_primary_hover
  &:disabled
    background-color: $color_gray_40
    border-color: $color_gray_40

.btn-secondary
  background-color: transparent
  border-color: $color_gray_40
  color: $color_black
  &:hover
    background-color: transparent
    color: $color_primary_hover
    border-color: $color_primary_hover
  &:disabled
    background-color: transparent
    color: $color_gray_40
    border-color: $color_gray_40

.btn-disabled
  background-color: $color_gray_40
  color: $color_white
  border-color: $color_gray_40

.btn-arrow
  background-color: $color_white
  background-position: center center
  background-repeat: no-repeat
  border: 1px solid $color_primary
  border-radius: 4px
  height: 40px
  width: 40px
  &.left
    background-image: url("@/assets/img/icons/arrow-left-purrple.svg")
  &.right
    background-image: url("@/assets/img/icons/arrow-right-purrple.svg")
  &:hover
    background-color: $color_primary
    border-color: $color_primary
    &.left
      background-image: url("@/assets/img/icons/arrow-left-white.svg")
    &.right
      background-image: url("@/assets/img/icons/arrow-right-white.svg")

.link-black a
  color: $color_black
  text-decoration: none
  &:hover
    color: $color_primary

.link-purrple a
  color: $color_primary
  text-decoration: none
  &:hover
    color: $color_primary

.link-arrow-right a
  background-image: url("@/assets/img/icons/link-arrow-right.png")
  background-repeat: no-repeat
  background-position: center right
  display: inline-block
  padding-right: 32px
  &:disabled
    background-image: url("@/assets/img/icons/link-arrow-right-disable.png")

.link-arrow-left a
  background-image: url("@/assets/img/icons/link-arrow-left.png")
  background-repeat: no-repeat
  background-position: center left
  display: inline-block
  padding-left: 32px
  &:disabled
    background-image: url("@/assets/img/icons/link-arrow-left-disable.png")

.block-brief
  background-image: url("@/assets/img/icons/divider-vertical.svg")
  background-repeat: no-repeat
  background-size: 2px 63px
  padding-left: 15px
  padding-bottom: 48px
  max-width: 286px
  &.single
    height: 63px
    padding-bottom: 0
    .title
      padding-top: 12px
      padding-bottom: 0
  .title
    font-size: 26px
    font-weight: 600
    padding-bottom: 5px
  .desc
    font-size: 14px
    font-weight: 400

.carousel__pagination
  padding-left: 0
.carousel .carousel__pagination-button::after
  background: transparent
  border: 2px solid $color_black
  border-radius: 50%
  height: 8px
  opacity: .5
  width: 8px
.carousel .carousel__pagination-button--active::after
  background: $color_black
  opacity: 1

</style>
