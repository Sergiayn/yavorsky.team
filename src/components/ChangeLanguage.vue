<template>
  <div class="change-language"
       @mouseover="isOverLang = true"
       @mouseleave="isOverLang = false"
  >
    <div class="tooltip-lang_label"
         @mouseover="isOverLangLabel = true"
         @mouseleave="isOverLangLabel = false"
    >
      <label for="locale">{{ $t("languages.language") }}</label>
      <span class="tooltip-lang_txt" :class="{active:isOpen}">
        {{ $t('languages.' + getLocaleName($i18n.locale)) }}
      </span>
    </div>
    <div class="tooltip-lang_content"
         @mouseover="isOverLangContent = true"
         @mouseleave="isOverLangContent = false"
         v-if="isOpen">
      <ul>
        <li v-for="language in languages"
            @click.prevent="setLocale(language.key)"
            :key="language.id">
          <div class="locale">{{ language.key }}</div>
          <div class="name">{{ $t('languages.' +language.name) }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {ref} from "vue"

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


<style scoped lang="sass">
@import "@/assets/color.sass"

.change-language
  max-width: 85px
  width: 80px

  label
    font-weight: 600
    margin: 0 4px 0 0
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
    padding-top: 10px
    position: absolute

    ul
      background-color: white
      border-radius: 8px
      list-style: none
      margin: 0
      padding: 6px 0
      text-align: left

    li
      cursor: pointer
      padding: 5px 0

      > div
        display: inline-block

    .locale
      background-color: $color_gray_60
      border-radius: 4px
      color: $color_white
      font-size: 12px
      margin-right: 8px
      padding: 3px
      text-transform: uppercase
      height: 22px
      width: 22px

    .name
      font-size: 14px
      font-weight: 500

</style>
