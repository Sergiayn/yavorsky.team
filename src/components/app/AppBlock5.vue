<script>
export default {
    name: "app-block-5",
    props: {
        appUrl: {
            type: String,
            default() {
                return ''
            }
        },
        block: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    methods: {
        items() {
            return [this.block.first ?? {},this.block.last ?? {}]
        },
        screenWidth() {
            return this.$store.getters.screen_width
        }
    }
}
</script>

<template>
    <div class="app-block-5" :class="{'block-has-bg-color': block.bg_color ?? false, 'bg_auto_size': block.bg_auto_size ?? false, 'has_bg_mobile_img': block.last.bg_mobile ?? false}"
         :style="[
             block.bg_color ? {backgroundColor: block.bg_color}: {},
             block.last.bg ? {backgroundImage: 'url(' + (   (screenWidth() < 768 && block.last.bg_mobile) ? block.last.bg_mobile : block.last.bg) + ')'} : {},
             block.last.bg_position ? {backgroundPosition: block.last.bg_position} : {},
             (typeof block.block_padding_top === 'undefined') ? {} : {paddingTop: block.block_padding_top + 'px'},
             (typeof block.block_padding_bottom === 'undefined') ? {} : {paddingBottom: block.block_padding_bottom + 'px'},
             (block.bg_auto_size && screenWidth() < 768) ? {
                 backgroundSize: (screenWidth() > 600 ? 600 : screenWidth() + 40) + 'px auto',
                 backgroundPosition: 'center 95%'}: {}
         ]">
        <div class="container">
            <div class="direction_row row">
                <div class="col-xl-6 col-lg-6 col-md-6" v-for="item in items()" :key="item">
                    <div v-if='item.type === "text"' class="txt-part">
                        <div class="txt-part-inner">
                            <div :style="{ color: item.rubric_color ?? 'inherit' }"
                                class="rubric_title" v-if="item.rubric_title">
                                <span>{{item.rubric_title[$i18n.locale] ?? ''}}</span>
                                <i :style="{ borderColor: item.rubric_color ?? 'inherit' }"></i>
                            </div>
                            <div class="title">{{item.title[$i18n.locale] ?? ''}}</div>
                            <div class="desc">{{item.desc[$i18n.locale] ?? ''}}</div>
                            <a v-if="item.show_url" :href="appUrl" target="_blank" class="btn btn-primary">
                                {{ $t('common.free_download') }}
                            </a>
                        </div>
                    </div>
                    <div v-else-if='item.type === "img"'
                         :class="{
                         'img-part-padding-top-xl': item.padding_top === 'xl',
                         'img-part-size-xl': item.size === 'xl',
                         'bg-part-size-xl': item.bg_size === 'xl'}"
                         class="img-part" >
                        <div class="img-part-inner">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="sass">
$app_block_1_padding: 54px

.app-block-5
    background-position: 80% center
    background-repeat: no-repeat
    background-size: auto 100%
    .txt-part
        .rubric_title
            display: inline-block
            font-size: 14px
            padding-bottom: 16px
            span
                padding-right: 25px
            i
                border-bottom: 1px solid
                display: block
                height: 1px
                margin: 2px 0 auto auto
                width: 60px
        .title
            font-size: 26px
            font-weight: 600
            margin-bottom: 12px
        .desc
            font-size: 16px
            max-width: 540px
        .btn
            margin-top: 40px
    .img-part
        background-position: center center
        background-repeat: no-repeat
        background-size: auto 100%
        .app-img, .app-imgs
            text-align: center
        .app-img
            img
                max-height: 450px
        .app-imgs
            margin-top: 52px
            img
                margin: 0 30px
                max-height: 450px
                &:first-child
                    margin-top: 60px
                &:last-child
                    margin-bottom: 60px
        &.img-part-size-xl
            .app-img
                img
                    max-height: 580px
        &.bg-part-size-xl
            height: 450px

    .list-part
        padding: 64px 0
        ul
            display: flex
            justify-content: center
            margin: 0
            padding: 0
        li
            list-style: none
            text-align: center
        .li_inner
            border-radius: 12px
            margin: 0 12px
            padding: 16px 10px
            height: 110px
            width: 170px
        .title
            font-size: 14px
            margin-top: 12px

    .txt-part-inner, .img-part-inner
        background-repeat: no-repeat

    .direction_row
        .txt-part, .img-part
            padding: $app_block_1_padding 0
        .txt-part
            align-items: center
            display: flex
            height: 100%
            padding: $app_block_1_padding 0
        .txt-part-inner
            display: block
        .txt-part-padding-top-xl, .img-part-padding-top-xl
            padding-top: 147px

@media (max-width: 1399px)

    .app-block-5
        background-position: right center

@media (max-width: 1200px)
    .app-block-5
        background-size: auto 90%
        &.bg_auto_size
            background-size: auto 75%

@media (max-width: 991px)
    .app-block-5
        background-size: auto 85%
        &.bg_auto_size
            background-size: auto 55%

@media (max-width: 767px)
    .app-block-5
        background-position: center bottom
        background-size: auto 420px
        &.has_bg_mobile_img
            background-position: center 105% !important
            background-size: auto 60% !important
        .txt-part .title
            font-size: 20px
        .direction_row .img-part
            padding: 0
            &.bg-part-size-xl
                height: 320px

@media (max-width: 576px)
    .app-block-5
        background-size: auto 380px

@media (max-width: 400px)
    .app-block-5
        .direction_row .img-part.bg-part-size-xl
            height: 280px

</style>
