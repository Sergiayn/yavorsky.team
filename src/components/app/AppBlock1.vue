<script>
export default {
    name: "app-block-1",
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
            if (this.screenWidth() < 768 && true === this.block.reverse_order_mobile)
                return [this.block.last ?? {},this.block.first ?? {}]
            else
                return [this.block.first ?? {},this.block.last ?? {}]
        },
        screenWidth() {
            return this.$store.getters.screen_width
        }
    }
}
</script>

<template>
    <div class="app-block-1" :class="{'block-has-bg-color': block.bg_color ?? false}"
         :style="{ backgroundColor: block.bg_color ?? 'transperent', backgroundImage: block.bg_img ? 'url(' + block.bg_img + ')' : '',
            paddingTop: (typeof block.block_padding_top === 'undefined') ? 0 : block.block_padding_top + 'px',
            paddingBottom: (typeof block.block_padding_bottom === 'undefined') ? 0 : block.block_padding_bottom + 'px'}">
        <div class="container">
            <div class="direction_row row" v-if='block.direction === "row"'>
                <div class="col-xl-6 col-lg-6 col-md-6" v-for="item in items()" :key="item">
                    <div v-if='item.type === "text"' class="txt-part">
                        <div class="txt-part-inner">
                            <div :style="{ color: item.rubric_color ?? 'inherit' }"
                                class="rubric_title" v-if="item.rubric_title">
                                <span>{{item.rubric_title[$i18n.locale] ?? ''}}</span>
                                <i :style="{ borderColor: item.rubric_color ?? 'inherit' }"></i>
                            </div>
                            <div class="title" v-html="item.title[$i18n.locale] ?? ''"></div>
                            <div class="desc">{{item.desc[$i18n.locale] ?? ''}}</div>
                            <a v-if="item.show_url" :href="appUrl" target="_blank" class="btn btn-primary">
                                {{ $t('common.free_download') }}
                            </a>
                        </div>
                    </div>
                    <div v-else-if='item.type === "img" && !(item.hide_mobile ?? false)'
                         :style="{ backgroundImage: item.bg ? 'url(' + item.bg + ')' : ''}"
                         :class="{
                         'img-part-padding-top-xl': item.padding_top === 'xl',
                         'img-part-size-xl': item.size === 'xl',
                         'bg-part-size-xl': item.bg_size === 'xl'}"
                         class="img-part" >
                        <div class="img-part-inner" :style="{ backgroundImage: item.bg_side ? 'url(' + item.bg_side + ')' : '' }">
                            <div class="app-img" v-if="item.img">
                                <img :src="item.img" class="img-fluid">
                            </div>
                            <div class="app-imgs" v-else-if="item.imgs">
                                <img v-for="img in item.imgs" :src="img" class="img-fluid" :key="img">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="direction_column" v-else-if='block.direction === "column"'>
                <div v-for="item in items()" :key="item">
                    <div v-if='item.type === "text"'
                         :class="{'txt-part-padding-top-xl': item.padding_top === 'xl'}"
                         class="txt-part">
                        <div class="txt-part-inner"
                             :style="{ backgroundImage: (item.bg_side && screenWidth() > 767) ? 'url(' + item.bg_side + ')' : '' }" >
                            <div :style="{ color: item.rubric_color ?? 'inherit' }"
                                class="rubric_title" v-if="item.rubric_title">
                                <span>{{item.rubric_title[$i18n.locale] ?? ''}}</span>
                                <i :style="{ borderColor: item.rubric_color ?? 'inherit' }"></i>
                            </div>
                            <div class="title" v-html="item.title[$i18n.locale] ?? ''"></div>
                            <div class="desc">{{item.desc[$i18n.locale] ?? ''}}</div>
                            <a v-if="item.show_url" :href="appUrl" target="_blank" class="btn btn-primary">
                                {{ $t('common.free_download') }}
                            </a>
                        </div>
                    </div>
                    <div v-else-if='item.type === "img"'
                         :style="{ backgroundImage: item.bg ? 'url(' + item.bg + ')' : ''}"
                         :class="{
                        'img-part-padding-top-xl': item.padding_top === 'xl',
                        'img-part-size-xl': item.size === 'xl',
                        'bg-part-size-xl': item.bg_size === 'xl'}"
                         class="img-part">
                        <div class="img-part-inner" :class="{'img-part-inner-3': item.imgs.length === 3}"
                             :style="{ backgroundImage: (item.bg_side && screenWidth() > 767) ? 'url(' + item.bg_side + ')' : '' }">
                            <div class="app-img" v-if="item.img">
                                <img :src="item.img" class="img-fluid">
                            </div>
                            <div class="app-imgs"
                                 :class="{'app-imgs-3': item.imgs.length === 3}"
                                 v-else-if="item.imgs">
                                <img v-for="img in item.imgs" :src="img" class="img-fluid" :key="img">
                            </div>
                        </div>
                    </div>
                    <div v-else-if='item.type === "list"' class="list-part">
                        <ul>
                            <li v-for="sub_item in item.list" :key="sub_item.id">
                                <div class="li_inner" :style="{ backgroundColor: item.bg_color ? item.bg_color : 'transperent' }">
                                    <img :src="sub_item.img" class="img-fluid">
                                    <div class="title" v-html="sub_item.title[$i18n.locale] ?? ''"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="sass">
$app_block_1_padding: 54px

.app-block-1
    background-position: center 240%
    background-repeat: no-repeat
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
            &.app-imgs-3
                img
                    max-height: 380px
                    margin-left: 95px
                    margin-right: 95px
                    &:first-child
                        margin-left: 0
                    &:last-child
                        margin-right: 0
                    &:nth-child(1), &:nth-child(3)
                        margin-bottom: 140px
                        margin-top: 0
                    &:nth-child(2)
                        margin-bottom: 0
                        margin-top: 140px
        &.img-part-size-xl
            .app-img, .app-imgs
                img
                    max-height: 580px
        &.bg-part-size-xl
            height: 560px

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
    .direction_column
        > div:nth-child(1) > div > div
            background-position: right 75%
            padding-top: $app_block_1_padding
        > div:nth-child(2) > div > div
            padding-bottom: $app_block_1_padding
        .txt-part-inner
            margin: auto
            max-width: 850px
            padding: 0 150px
            text-align: center
        > div:nth-child(2) > div > div
            background-position: 15% 0
        .img-part-inner
            max-width: 850px
            margin: auto
            &.img-part-inner
                max-width: none
        .txt-part-padding-top-xl, .img-part-padding-top-xl
            padding-top: 147px

@media (max-width: 1200px)
    .app-block-1
        .direction_column
            > div:nth-child(1) > div > div
                background-size: 85px
            > div:nth-child(2) > div > div
                background-position: 10% 0
                background-size: 85px

@media (max-width: 991px)
    .app-block-1
        .direction_column
            > div:nth-child(1) > div > div
                background-size: 65px
            > div:nth-child(2) > div > div
                background-position: 5% 0
                background-size: 65px

        .img-part
            background-size: auto 90%
            .app-imgs img
                max-height: 340px

@media (max-width: 768px)
    .app-block-1
        .txt-part
            .title
                font-size: 20px
        .img-part .app-imgs img
            margin: 0 15px
            max-height: 290px
        .direction_column
            > div:nth-child(1) > div > div
                padding: 40px 0 0
        .list-part
            ul
                flex-wrap: wrap
                gap: 16px
            li
                flex-basis: calc(50% - 16px)
            .li_inner
                margin: 0 auto
                width: auto

@media (max-width: 576px)
    .app-block-1
        .img-part .app-imgs img
            margin: 0 5px
            max-height: 250px
        .btn
            display: block
            max-width: 350px
            margin: 30px auto 0
            width: 100%


</style>
