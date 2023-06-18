<template>
  <div class="logo">
    <router-link :to="{name:'Home', params:{locale:$i18n.locale}}">
      <img alt="company logo" src="@/assets/img/logo.svg">
    </router-link>
  </div>
</template>

<style scoped lang="sass">

</style>