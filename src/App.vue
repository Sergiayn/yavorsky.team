<template>
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
  <router-view/>
</template>
