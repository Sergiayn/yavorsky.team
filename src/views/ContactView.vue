<template>
  <div class="page-content page-contact">
    <div class="container">
      <div class="block-brief single">
        <div class="title">{{$t('header.contacts')}}</div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="desc">
            {{ $t('common.page_contact__desc') }}
          </div>
        </div>
        <div class="col-6"></div>
        <div class="col-6">
          <block-contact-form :has_file_upload="true" />
        </div>
        <div class="col-1"></div>
        <div class="col-5">
          <div class="logo">
            <img alt="company logo" src="@/assets/img/logo.svg">
            <span>Yavorsky Team</span>
          </div>
          <div class="email-title">{{ $t('common.email') }}</div>
          <div class="email"><a href="mailto:yavorsky.team@gmail.com">yavorsky.team@gmail.com</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlockContactForm from "@/components/BlockContactForm"

export default {
  name: "PageContact",
  components: {BlockContactForm}
}
</script>

<style scoped lang="sass">
.page-contact
  .block-brief
    margin-bottom: 110px
  .desc
    margin-bottom: 50px

</style>
