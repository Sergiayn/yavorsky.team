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
  computed: {
    apps() {
      return this.$store.getters.apps_short
    }
  }
})
</script>

<template>
  <footer class="link-black">
    <div class="container">
      <div class="row f-desktop" v-if="screenWidth > 990">
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
              <li v-for="app in apps" :key="app.id">
                <a href="#">{{ app.name }}</a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-xxl-2 col-lg-2">
          <strong class="title">{{ $t('footer.company') }}</strong>
          <nav>
            <ul>
              <li><a href="#">{{ $t('footer.about_company') }}</a></li>
              <li>
                <router-link :to="{name:'Blogs', params:{locale:$i18n.locale}}">
                  {{ $t('footer.blog') }}
                </router-link>
              </li>
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
      <div class="row f-tablet" v-else-if="screenWidth > 767">
        <div class="col-5">
          <site-logo/>
          <div class="mail">
            <strong>{{ $t('common.email') }}</strong>
            <a href="mailto:yavorsky.team@gmail.com">yavorsky.team@gmail.com</a>
          </div>
        </div>
        <div class="col-4">
          <div>
            <strong class="title">{{ $t('footer.our_products') }}</strong>
            <nav>
              <ul>
                <li v-for="app in apps" :key="app.id">
                  <a href="#">{{ app.name }}</a>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <strong class="title">{{ $t('footer.company') }}</strong>
            <nav>
              <ul>
                <li><a href="#">{{ $t('footer.about_company') }}</a></li>
                <li>
                  <router-link :to="{name:'Blogs', params:{locale:$i18n.locale}}">
                    {{ $t('footer.blog') }}
                  </router-link>
                </li>
                <li><a href="#">{{ $t('footer.support') }}</a></li>
              </ul>
            </nav>
          </div>
        </div>
        <div class="col-3">
          <div>
            <strong class="title">{{ $t('footer.policy') }}</strong>
            <nav>
              <ul>
                <li><a href="#">{{ $t('footer.privacy_policy') }}</a></li>
                <li><a href="#">{{ $t('footer.cookies_policy') }}</a></li>
              </ul>
            </nav>
          </div>
          <div>
            <strong class="title">{{ $t('footer.follow_us') }}</strong>
            <social-network></social-network>
            <change-language @eventSetLocale="isOpenMobileMenu = false"></change-language>
          </div>
        </div>
      </div>
      <div class="row f-mobile" v-else>
        <div class="col-12">
          <div>
            <site-logo/>
            <div class="mail">
              <strong>{{ $t('common.email') }}</strong>
              <a href="mailto:yavorsky.team@gmail.com">yavorsky.team@gmail.com</a>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div>
            <div>
              <strong class="title">{{ $t('footer.our_products') }}</strong>
              <nav>
                <ul>
                  <li v-for="app in apps" :key="app.id">
                    <a href="#">{{ app.name }}</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div>
              <strong class="title">{{ $t('footer.company') }}</strong>
              <nav>
                <ul>
                  <li><a href="#">{{ $t('footer.about_company') }}</a></li>
                  <li>
                    <router-link :to="{name:'Blogs', params:{locale:$i18n.locale}}">
                      {{ $t('footer.blog') }}
                    </router-link>
                  </li>
                  <li><a href="#">{{ $t('footer.support') }}</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div>
            <div>
              <strong class="title">{{ $t('footer.policy') }}</strong>
              <nav>
                <ul>
                  <li><a href="#">{{ $t('footer.privacy_policy') }}</a></li>
                  <li><a href="#">{{ $t('footer.cookies_policy') }}</a></li>
                </ul>
              </nav>
            </div>
            <div>
              <strong class="title">{{ $t('footer.follow_us') }}</strong>
              <social-network/>
              <change-language @eventSetLocale="isOpenMobileMenu = false"></change-language>
            </div>
          </div>
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
