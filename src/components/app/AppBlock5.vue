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
        }
    }
}
</script>

<template>
    <div class="app-block-5" :class="{'block-has-bg-color': block.bg_color ?? false}"
         :style="{ backgroundColor: block.bg_color ?? 'transperent', backgroundImage: block.last.bg ? 'url(' + block.last.bg + ')' : '',
            paddingTop: (typeof block.block_padding_top === 'undefined') ? 0 : block.block_padding_top + 'px',
            paddingBottom: (typeof block.block_padding_bottom === 'undefined') ? 0 : block.block_padding_bottom + 'px'}">
        <div class="container">
            <div class="direction_row row">
                <div class="col-6" v-for="item in items()" :key="item">
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
</style>
