<script>
import {defineComponent} from 'vue'
import ChangeLanguage from "@/components/ChangeLanguage"
import SocialNetwork from "@/components/SocialNetwork"
import SiteLogo from "@/components/SiteLogo"

export default defineComponent({
  name: "MainFooter",
  components: {
    ChangeLanguage,
    SocialNetwork,
    SiteLogo
  },
  data() {
    return {
      isOpenMobileMenu: true,
    }
  }
})
</script>

<template>
  <footer class="link-black">
    <div class="container">
      <div class="row">
        <div class="col-xxl-3 col-lg-3">
          <site-logo/>
          <div class="mail">
            <strong>{{ $t('common.email') }}</strong>
            <a href="mailto:yavorsky.team@gmail.com">yavorsky.team@gmail.com</a>
          </div>
        </div>
        <div class="col-xxl-2 col-lg-2">
          <strong class="title">{{ $t('footer.our_products') }}</strong>
          <nav>
            <ul>
              <li><a href="#">{{ $t('footer.ad_blocker') }}</a></li>
              <li><a href="#">{{ $t('footer.network_analyzer') }}</a></li>
              <li><a href="#">{{ $t('footer.secret_vault') }}</a></li>
              <li><a href="#">{{ $t('footer.robo_cleaner') }}</a></li>
              <li><a href="#">{{ $t('footer.pill_reminder') }}</a></li>
            </ul>
          </nav>
        </div>
        <div class="col-xxl-2 col-lg-2">
          <strong class="title">{{ $t('footer.company') }}</strong>
          <nav>
            <ul>
              <li><a href="#">{{ $t('footer.about_company') }}</a></li>
              <li><a href="#">{{ $t('footer.blog') }}</a></li>
              <li><a href="#">{{ $t('footer.support') }}</a></li>
            </ul>
          </nav>
        </div>
        <div class="col-xxl-3 col-lg-3">
          <strong class="title">{{ $t('footer.policy') }}</strong>
          <nav>
            <ul>
              <li><a href="#">{{ $t('footer.privacy_policy') }}</a></li>
              <li><a href="#">{{ $t('footer.cookies_policy') }}</a></li>
            </ul>
          </nav>
        </div>
        <div class="col-xxl-2 col-lg-2">
          <strong class="title">{{ $t('footer.follow_us') }}</strong>
          <social-network></social-network>
          <change-language @eventSetLocale="isOpenMobileMenu = false"></change-language>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="sass">
@import "@/assets/color.sass"

footer
  border-top: 1px solid $color_gray_40
  padding: 40px 0
  .title
    display: inline-block
    margin-bottom: 16px

  .logo
    padding-bottom: 30px

  .mail
    strong, a
      display: block

  nav
    ul
      list-style: none
      margin: 0
      padding: 0
    a
      display: block
      font-size: 14px
      padding: 6px 0

  .social-network
    padding: 0 0 45px

</style>
