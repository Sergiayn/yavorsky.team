<template>
    <div class="page-content page-contact">
        <div class="container">
            <div class="block-brief single">
                <div class="title">{{ $t('header.contacts') }}</div>
            </div>
            <div class="row" v-if="$store.getters.screen_width > 991">
                <div class="col-6">
                    <div class="desc">
                        {{ $t('common.page_contact__desc') }}
                    </div>
                </div>
                <div class="col-6"></div>
                <div class="col-6">
                    <block-contact-form :has_file_upload="true"/>
                </div>
                <div class="col-1"></div>
                <div class="col-5">
                    <div class="logo">
                        <img alt="company logo" src="@/assets/img/logo.svg">
                        <span>Yavorsky Team</span>
                    </div>
                    <div class="email-title">{{ $t('common.email') }}</div>
                    <div class="email link-purplle">
                        <a href="mailto:yavorsky.team@gmail.com">yavorsky.team@gmail.com</a>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="desc">
                    {{ $t('common.page_contact__desc') }}
                </div>
                <div class="logo">
                    <img alt="company logo" src="@/assets/img/logo.svg">
                    <span>Yavorsky Team</span>
                </div>
                <div class="email-title">{{ $t('common.email') }}</div>
                <div class="email link-purplle">
                    <a href="mailto:yavorsky.team@gmail.com">yavorsky.team@gmail.com</a>
                </div>
                <block-contact-form :has_file_upload="true"/>
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

@media (max-width: 1200px)
    .page-contact
        .block-brief
            margin-bottom: 80px

        .desc
            margin-bottom: 40px

@media (max-width: 991px)
    .page-contact
        .desc
            max-width: 550px

        .contact-form
            padding-top: 40px

@media (max-width: 576px)
    .page-contact
        .block-brief
            margin-bottom: 40px

</style>
