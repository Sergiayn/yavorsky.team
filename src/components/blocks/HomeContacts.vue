<template>
    <div class="home-contacts">
        <div class="container">
            <div class="block-brief">
                <div class="title">{{ $t('home.form_contact_title') }}</div>
                <div class="desc">{{ $t('home.form_contact_desc') }}</div>
            </div>
            <div class="row">
                <div class="col-6">
                    <block-contact-form/>
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
import BlockContactForm from "@/components/BlockContactForm"

export default {
    name: "HomeContacts",
    components: {BlockContactForm}
}
</script>

<style scoped lang="sass">
@import "@/assets/color.sass"

.home-contacts
    padding-bottom: 120px

    .block-brief
        max-width: 300px

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
