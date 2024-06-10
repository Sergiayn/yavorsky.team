<template>
    <div class="home-contacts">
        <div class="container">
            <div class="block-brief">
                <div class="title">{{ $t('home.form_contact_title') }}</div>
                <div class="desc">{{ $t('home.form_contact_desc') }}</div>
            </div>
            <div class="contacts-row">
                <div class="contacts-col-1">
                    <block-contact-form/>
                </div>
                <div class="contacts-col-2">
                    <div class="logo">
                        <img alt="company logo" src="@/assets/img/logo.svg">
                        <span>Yavorsky Team</span>
                    </div>
                    <div class="email-title">{{ $t('common.email') }}</div>
                    <div class="email link-purplle"><a href="mailto:yavorsky.team@gmail.com">yavorsky.team@gmail.com</a>
                    </div>
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
        max-width: 380px

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
            font-size: 16px
            text-decoration: none

    .contacts-row
        display: flex
        gap: 120px

    .contacts-col-1
        flex: 5

    .contacts-col-2
        flex: 4

@media (max-width: 1200px)
    .home-contacts
        padding-bottom: 100px

        .block-brief
            padding-bottom: 40px

        .contacts-row
            gap: 90px

        .contacts-col-1
            flex: 6

        .contacts-col-2
            flex: 3

@media (max-width: 991px)
    .home-contacts
        padding-bottom: 80px

        .contacts-row
            gap: 75px

@media (max-width: 768px)
    .home-contacts
        .contacts-row
            display: block

        .contacts-col-2
            display: none

@media (max-width: 576px)
    .home-contacts
        .block-brief
            padding-bottom: 32px

</style>
