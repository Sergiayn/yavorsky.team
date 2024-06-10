<script>
export default {
    name: "app-block-3",
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
    <div class="app-block-3" :class="{'block-has-bg-color': block.bg_color ?? false}"
         :style="{ backgroundColor: block.bg_color ?? 'transperent'}">
        <div class="direction_column">
            <div v-for="item in items()" :key="item">
                <div v-if='item.type === "text"'
                     :class="{'txt-part-padding-top-xl': item.padding_top === 'xl', 'txt-part-padding-top-l': item.padding_top === 'l'}"
                     class="txt-part">
                    <div class="container">
                        <div class="txt-part-inner"
                             :style="{ backgroundImage: item.bg_side ? 'url(' + item.bg_side + ')' : '' }" >
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
                </div>
                <div v-else-if='item.type === "img"'
                     :class="{'img-part-padding-top-xl': item.padding_top === 'xl', 'img-part-size-xl': item.size === 'xl'}"
                     class="img-part">
                    <div class="img-part-wrapper">
                        <div class="img-part-inner">
                            <div class="app-imgs">
                                <img v-for="img in item.imgs" :src="img" class="img-fluid" :key="img">
                            </div>
                        </div>
                        <div class="img-part-bg1" v-if="item.bg_1" :style="{backgroundImage: 'url(' + item.bg_1 + ')'}"></div>
                        <div class="img-part-bg2" v-if="item.bg_2" :style="{backgroundImage: 'url(' + item.bg_2 + ')'}"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="sass">
$app_block_1_padding: 54px

.app-block-3
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
        .app-imgs
            text-align: center
            img
                margin: 0 95px
                max-height: 400px
                &:nth-child(1)
                    margin-bottom: 140px
                    margin-left: 0
                    margin-top: 0
                &:nth-child(2)
                    margin-bottom: 0
                    margin-top: 140px
                &:nth-child(3)
                    margin-bottom: 140px
                    margin-top: 0
                    margin-right: 0

        &.img-part-size-xl
            .app-imgs
                img
                    max-height: 580px

    .txt-part-inner
        background-repeat: no-repeat

    .direction_column
        > div:nth-child(1) > div > div
            background-position: right 75%
            padding-top: $app_block_1_padding
        > div:nth-child(2) > div > div
            padding-top: $app_block_1_padding
            padding-bottom: $app_block_1_padding
        .txt-part-inner
            margin: auto
            max-width: 850px
            padding: 0 150px
            text-align: center
        .txt-part-padding-top-xl, .img-part-padding-top-xl
            padding-top: 147px
        .txt-part-padding-top-l, .img-part-padding-top-l
            padding-top: 60px

    .img-part-wrapper
        position: relative

    .img-part-inner
        position: relative
        z-index: 5

    .img-part-bg1, .img-part-bg2
        background-repeat: no-repeat
        position: absolute
        height: 100%
        left: 0
        top: 0
        width: 100%

    .img-part-bg1
        background-position: center 30%
        background-size: 550px
        z-index: 1

    .img-part-bg2
        background-position: center 35%
        background-size: cover
        z-index: 2

@media (max-width: 1200px)
    .app-block-3
        .txt-part .desc
            margin: auto
        .img-part .app-imgs img
            max-height: 320px
            margin: 0 40px

        .direction_column
            .txt-part-inner
                max-width: none
                padding: 0

@media (max-width: 991px)
    .app-block-3
        .img-part .app-imgs img
            margin: 0 30px

@media (max-width: 767px)
    .app-block-3
        .img-part .app-imgs img
            max-height: 200px
            margin: 0 10px
            &:nth-child(1), &:nth-child(3)
                margin-bottom: 40px
            &:nth-child(2)
                margin-top: 40px
        .img-part-bg1, .img-part-bg2
            background-size: auto 100%

@media (max-width: 576px)
    .app-block-3
        .direction_column .txt-part-inner
            text-align: left
        .img-part .app-imgs img
            max-height: 180px
            margin: 0 5px

</style>
