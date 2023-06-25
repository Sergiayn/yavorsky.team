<template>
  <div class="change-language"
       @mouseover="isOverLang = true"
       @mouseleave="isOverLang = false"
  >
    <Popper placement="top-start" offsetDistance="0" :show="isOpen">
      <div class="tooltip-lang_label"
           @mouseover="isOverLangLabel = true"
           @mouseleave="isOverLangLabel = false"
      >
        <label>{{ $t("languages.language") }}</label>
        <span class="tooltip-lang_txt" :class="{active:isOpen}">
        {{ $t('languages.' + getLocaleName($i18n.locale)) }}
      </span>
      </div>
      <template #content>
        <div class="tooltip-lang_content"
             @mouseover="isOverLangContent = true"
             @mouseleave="isOverLangContent = false" >
          <ul>
            <li v-for="language in languages"
                @click.prevent="setLocale(language.key)"
                :key="language.id">
              <a href="#" class="name">{{ $t('languages.' +language.name) }}</a>
            </li>
          </ul>
        </div>
      </template>
    </Popper>
  </div>
</template>

<script>
import {ref} from "vue"
import Popper from "vue3-popper"

export default {
  name: 'ChangeLanguage',
  data() {
    const isOpen = ref(false)
    const isOverLang = ref(false)
    const isOverLangContent = ref(false)
    const isOverLangLabel = ref(false)

    return {
      screenWidth: 0,
      locale: this.$i18n.locale,
      isOpen,
      isOverLang,
      isOverLangContent,
      isOverLangLabel
    }
  },
  components: {
    Popper,
  },
  mounted() {
    this.updateScreenWidth()
    this.onScreenResize()
    this.setLangAttribute()
  },
  methods: {
    onScreenResize() {
      window.addEventListener("resize", () => {
        this.updateScreenWidth();
      });
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
    getLocaleName(locale) {
      return this.$store.getters.languagesKeyValue[locale]
    },
    setLocale(locale) {
      if (locale === this.$i18n.locale)
        return
      const hash = this.$router.currentRoute.value.hash
      this.$i18n.locale = locale
      this.$router.replace({params: {locale}, hash})
      this.isOpen = false
      this.$emit('eventSetLocale', locale)
      this.setLangAttribute()
    },
    setLangAttribute(){
      document.documentElement.setAttribute('lang', this.$i18n.locale)
    },
    toggleMenu() {
      if (this.isOverLang === true)
        this.isOpen = true
      else {
        if (this.screenWidth < 575) {
          if (false === this.isOverLangContent && false === this.isOverLangLabel)
            this.isOpen = false
        } else {
          setTimeout(() => {
            if (false === this.isOverLangContent && false === this.isOverLangLabel)
              this.isOpen = false
          }, 400)
        }
      }
    }
  },
  computed: {
    languages() {
      return this.$store.getters.languages
    }
  },
  watch: {
    isOverLang() {
      this.toggleMenu()
    },
    isOverLangContent() {
      this.toggleMenu()
    },
    isOverLangLabel() {
      this.toggleMenu()
    },
  }
}
</script>


<style lang="sass">
@import "@/assets/color.sass"

.change-language
  max-width: 110px
  height: 48px

  label
    font-weight: 600
    margin: 0 4px 15px 0
    height: 24px

  label, .tooltip-lang_txt
    cursor: pointer
    display: block

  .tooltip-lang_txt
    background-color: transparent
    background-image: url("@/assets/img/icons/arrow-down.svg")
    background-repeat: no-repeat
    background-position: right center
    border: 0
    font-size: 14px
    font-weight: 400
    margin-right: 10px
    height: 24px
    outline: none
    width: 105px
    &.active
      background-image: url("@/assets/img/icons/arrow-up.svg")

  .tooltip-lang_content
    background-position: top center
    background-repeat: no-repeat
    color: $color_black
    position: relative
    top: 20px
    box-shadow: 0 2px 4px 1px rgba(143, 130, 130, 0.25)
    border-radius: 8px

    ul
      background-color: white
      border-radius: 8px
      list-style: none
      margin: 0
      padding: 6px 12px
      text-align: left

    li
      cursor: pointer
      padding: 6px 0

    a
      display: inline-block

    .name
      font-size: 14px
      font-weight: 500

</style>
