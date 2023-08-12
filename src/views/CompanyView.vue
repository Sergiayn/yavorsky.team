<script>
export default {
  name: "CompanyView",
  data(){
    this.$store.dispatch('setCompany',['employees'])
    return {}
  },
  computed: {
    employeesChunks() {
      return window.objectToChunks(this.$store.getters.company,4)
    }
  }
}
</script>

<template>
  <div class="page-content page-company">
    <div class="container">
      <div class="block-brief single">
        <div class="title">{{$t('header.company')}}</div>
      </div>

      <div class="list-employees">
        <ul v-for="(employees, index) in employeesChunks" :key="index">
          <li v-for="employee in employees" :key="employee.id">
            <div class="img">
              <img :src="employee.img" :alt="employee.name[$i18n.locale] ?? ''" class="img-fluid">
            </div>
            <div class="name">{{employee.name[$i18n.locale] ?? ''}}</div>
            <div class="position">{{employee.position}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/color.sass"

.page-company
  .list-employees
    ul
      display: flex
      display: -webkit-flex
      list-style: none
      justify-content: space-between
      margin: 18px 0
      padding: 0
      &:first-child
        margin-top: 0
      &:last-child
        margin-bottom: 0
    li
      flex: 25%
      padding: 0 12px
      &:first-child
        padding-left: 0
      &:last-child
        padding-right: 0
    .img
      background-color: #FFFAEA
      border-radius: 12px
      margin-bottom: 12px
    img
      height: 264px
    .name
      color: $color_primary
      font-size: 18px
      font-weight: 600
      margin-bottom: 4px
    .position
      font-size: 16px

</style>
