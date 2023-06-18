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

body
  font-family: 'Open Sans', sans-serif

</style>
