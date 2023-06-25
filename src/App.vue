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
  .title
    font-size: 26px
    font-weight: 600
    padding-bottom: 5px
  .desc
    font-size: 14px
    font-weight: 400

</style>
