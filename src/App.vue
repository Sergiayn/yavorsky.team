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
    background-color: $color_secondary
    border-color: $color_secondary

</style>
