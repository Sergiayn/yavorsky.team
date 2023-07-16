<template>
  <div class="home-contacts">
    <div class="container">
      <div class="block-brief">
        <div class="title">{{$t('home.form_contact_title')}}</div>
        <div class="desc">{{$t('home.form_contact_desc')}}</div>
      </div>
      <div class="row">
        <div class="col-6">
          <form
              @submit="checkForm"
              action="#"
              method="post"
          >
            <p v-if="errors.length">
              <b>{{$t('common.message_show_all_errors')}}:</b>
              <ul><li v-for="error in errors" :key="error">{{ error }}</li></ul>
            </p>
            <div class="row">
              <div class="col-6">
                <p>
                  <input
                      required
                      class="form-control"
                      v-model="name"
                      type="text"
                      name="name"
                      :placeholder="$t('common.name')"
                  >
                </p>
              </div>
              <div class="col-6">
                <p>
                  <input
                      required
                      class="form-control"
                      v-model="email"
                      type="email"
                      name="email"
                      :placeholder="$t('common.email')"
                  >
                </p>
              </div>
            </div>
            <p>
              <textarea
                  required
                  class="form-control"
                  v-model="comment"
                  name="comment"
                  :placeholder="$t('common.form_comment')"
              >
              </textarea>
            </p>
            <div class="row">
              <div class="col-8">
                <p class="link-purrple">
                  <span>{{$t('common.i_agree_with_1')}}</span>&nbsp;
                  <a href="#">{{$t('common.i_agree_with_2')}}</a>
                </p>
              </div>
              <div class="col-4">
                <p>
                  <input
                      class="btn btn-primary"
                      type="submit"
                      :value="$t('common.send')"
                  >
                </p>
              </div>
            </div>
          </form>
        </div>
        <div class="col"></div>
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
export default {
  name: "HomeContacts",
  data() {
    return {
      errors: [],
      name: '',
      email: '',
      comment: '',
    };
  },
  methods: {
    checkForm: function (e) {

      this.errors = [];

      if (!this.name)
        this.errors.push('Требуется указать имя.')

      e.preventDefault();
    }
  }
}
</script>


<style scoped lang="sass">
@import "@/assets/color.sass"

.home-contacts
  padding-bottom: 120px
  .block-brief
    max-width: 340px
  p
    margin-bottom: 24px
  textarea
    height: 125px
  input[type="submit"]
    float: right
  form .link-purrple
    margin: 10px 0 0

  .logo
    padding-bottom: 18px
    span
      font-size: 18px
      font-weight: 600
  .email-title
    font-size: 16px
    font-weight: 600
  .email
    a
      color: $color_black
      font-size: 16px
      text-decoration: none

</style>