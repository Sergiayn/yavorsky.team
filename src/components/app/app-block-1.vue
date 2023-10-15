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
            return [this.block.first ?? {},this.block.last ?? {}]
        }
    }
}
</script>

<template>
    <div class="block_1" :style="{ backgroundColor: block.bg_color ?? 'transperent', backgroundImage: block.bg_img ? 'url(' + block.bg_img + ')' : '' }">
        <div class="container">
            <div class="direction_row row" v-if='block.direction === "row"'>
                <div class="col-6" v-for="item in items()" :key="item">
                    <div v-if='item.type === "text"' class="txt-part">
                        <div class="txt-part-inner">
                            <div :style="{ color: item.rubric_color ?? 'inherit' }"
                                class="rubric_title" v-if="item.rubric_title">
                                <span>{{item.rubric_title[$i18n.locale] ?? ''}}</span>
                                <hr>
                            </div>
                            <div class="title">{{item.title[$i18n.locale] ?? ''}}</div>
                            <div class="desc">{{item.desc[$i18n.locale] ?? ''}}</div>
                            <a v-if="item.show_url" :href="appUrl" target="_blank" class="btn btn-primary">
                                {{ $t('common.free_download') }}
                            </a>
                        </div>
                    </div>
                    <div v-else-if='item.type === "img"' class="img-part" :style="{ backgroundImage: item.bg ? 'url(' + item.bg + ')' : '' }">
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
                    <div v-if='item.type === "text"' class="txt-part">
                        <div class="txt-part-inner"
                             :style="{ backgroundImage: item.bg_side ? 'url(' + item.bg_side + ')' : '' }" >
                            <div :style="{ color: item.rubric_color ?? 'inherit' }"
                                class="rubric_title" v-if="item.rubric_title">
                                <span>{{item.rubric_title[$i18n.locale] ?? ''}}</span>
                                <hr>
                            </div>
                            <div class="title">{{item.title[$i18n.locale] ?? ''}}</div>
                            <div class="desc">{{item.desc[$i18n.locale] ?? ''}}</div>
                        </div>
                    </div>
                    <div v-else-if='item.type === "img"' class="img-part" :style="{ backgroundImage: item.bg ? 'url(' + item.bg + ')' : '' }">
                        <div class="img-part-inner" :class="{'img-part-inner-3': item.imgs.length === 3}"
                             :style="{ backgroundImage: item.bg_side ? 'url(' + item.bg_side + ')' : '' }">
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
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="sass">
.block_1
    background-position: center 240%
    background-repeat: no-repeat
    padding: 120px 0 70px
    .txt-part
        .rubric_title
            display: inline-block
            font-size: 14px
            padding-bottom: 16px
            span
                padding-right: 25px
            hr
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
                    max-height: 320px
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
    .txt-part-inner, .img-part-inner
        background-repeat: no-repeat

    .direction_row
        .txt-part
            align-items: center
            display: flex
            height: 100%
        .txt-part-inner
            display: block
    .direction_column
        > div:nth-child(1) > div > div
            background-position: right 75%
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

</style>
