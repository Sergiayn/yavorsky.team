<script>
export default {
    name: "app-block-2",
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
    <div class="app-block-2" :style="{ backgroundImage: block.bg_img ? 'url(' + block.bg_img + ')' : '' }">
        <div class="container">
            <div class="row">
                <template v-for="(item, index) in items()" :key="item">
                    <div class="col-xl-6 col-lg-6 col-md-6"
                         v-if="1 === index && (screenWidth() >= 768 || !item.reverse_order_mobile)">
                        <div class="app-img" v-if="item.img">
                            <img :src="item.img" class="img-fluid">
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6"
                    :class="{'mobile-item-after-bg' : (screenWidth() < 768 && item.reverse_order_mobile)}">
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
                    <div class="col-xl-6 col-lg-6 col-md-6"
                         v-if="1 === index && (screenWidth() < 768 && item.reverse_order_mobile)">
                        <div class="app-img" v-if="item.img">
                            <img :src="item.img" class="img-fluid">
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6" v-if="0 === index && screenWidth() >= 768"> </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped lang="sass">
.app-block-2
    background-repeat: no-repeat
    background-position: right 0
    background-size: 65%
    .txt-part-inner
        padding: 150px 0
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

    .app-img
        text-align: center
        img
            max-height: 570px

@media (max-width: 1200px)
    .app-block-2
        background-position: right 10%
        background-size: 60%
@media (max-width: 767px)
    .app-block-2
        background-position: right 28%
        background-size: 100% 370px
        .txt-part-inner
            padding: 140px 0
@media (max-width: 576px)
    .app-block-2
        background-size: 100% 250px
        .txt-part-inner
            padding: 54px 0
        .mobile-item-after-bg
            padding-top: 120px

</style>
