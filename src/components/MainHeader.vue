<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "MainHeader"
})
</script>

<template>
  <header>
    <div class="container">
      <nav>
        <router-link :to="{name:'Home', params:{locale:$i18n.locale}}">
          Home
        </router-link>
        <router-link :to="{name:'About', params:{locale:$i18n.locale}}">
          About
        </router-link>
        <router-link :to="{name:'Contact', params:{locale:$i18n.locale}}">
          Contact
        </router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>

</style>