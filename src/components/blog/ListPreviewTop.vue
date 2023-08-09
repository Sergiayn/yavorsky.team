<script>
import {defineComponent} from 'vue'
import moment from "moment/moment";

export default defineComponent({
  name: "ListPreviewTop",
  props: {
    list: {
      type: Object,
      default() {return {}}
    }
  },
  methods: {
    timestampToDate(timestamp){
      const date = moment(timestamp *1000)
      let res = ''
      switch (this.$i18n.locale) {
        case 'ua':
          res = date.locale('uk').format('D MMMM YYYY') + ' р.'
          break
        case 'ru':
          res = date.locale('ru').format('D MMMM YYYY') + ' г.'
          break
        case 'en':
        default:
          res = date.locale('en').format('MMMM D, YYYY')
      }
      return res
    },
  },
  computed: {
    firstItem() {
      return this.list ? this.list.slice(0,1)[0] : []
    },
    otherItems() {
      return this.list.slice(1) ?? []
    }
  }
})
</script>

<template>
  <div class="blog__list-preview-top" v-if="firstItem">
    <div class="row">
      <div class="col">
        <div class="first-item link-black">
          <div class="img">
            <img :src="firstItem.preview_large" :alt="firstItem.name[$i18n.locale] ?? ''">
          </div>
          <div class="date">{{timestampToDate(firstItem.created_at)}}</div>
          <div class="name">
            <a href="#">{{ firstItem.name[$i18n.locale] ?? '' }}</a>
          </div>
        </div>
      </div>
      <div class="col">
        <ul class="list link-black">
          <li v-for="item in otherItems" :key="item.id">
            <div class="date">{{timestampToDate(item.created_at)}}</div>
            <div class="name">
              <a href="#">{{ item.name[$i18n.locale] ?? '' }}</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/color.sass"

.blog__list-preview-top
  padding-bottom: 80px
  .date
    color: $color_gray_60
    padding: 8px 0
  .name a
    font-size: 20px
    font-weight: 600
  .first-item
    &:hover
      img
        transition: all .2s ease-in-out
        transform: scale(1.1)
    .img
      border-radius: 8px
      overflow: hidden
      padding-bottom: 8px
  .list
    list-style: none
    margin: 0
    padding: 0
    li
      border-bottom: 1px solid $color_gray_40
      padding: 8px 0
      text-transform: capitalize
      &:first-child
        padding-top: 0


</style>
