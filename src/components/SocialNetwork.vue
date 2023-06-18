<template>
  <ul class="social-network">
    <li><a href="#" class="instagram"></a></li>
    <li><a href="#" class="facebook"></a></li>
    <li><a href="#" class="twitter"></a></li>
  </ul>
</template>

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
  .facebook
    background-image: url("@/assets/img/social-network/facebook.svg")
  .twitter
    background-image: url("@/assets/img/social-network/twitter.svg")

</style>