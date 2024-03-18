<script>
export default {
    name: "AppBlockTextColumn",
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
        bg_item() {
            return this.block.bg_item ?? {}
        },
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
    <div class="app-block-text-column" :style="{paddingBottom: (typeof block.padding_bottom === 'undefined') ? '120px' : block.padding_bottom + 'px'}">
        <div class="container">
            <div v-if="screenWidth() < 768">
                <div class="app-block-inner-mobile">
                    <div class="item">
                        <div :style="{ color: items()[0].rubric_color ?? 'inherit' }"
                             class="rubric_title" v-if="items()[0].rubric_title">
                            <span>{{items()[0].rubric_title[$i18n.locale] ?? ''}}</span>
                            <i :style="{ borderColor: items()[0].rubric_color ?? 'inherit' }"></i>
                        </div>
                        <div class="title">{{items()[0].title[$i18n.locale] ?? ''}}</div>
                        <div class="desc">{{items()[0].desc[$i18n.locale] ?? ''}}</div>
                    </div>
                    <div class="bg_item" v-if="bg_item()">
                        <div class="img-part">
                            <img :src="bg_item().img" class="img-fluid" alt="">
                        </div>
                    </div>
                    <div class="item">
                        <div :style="{ color: items()[1].rubric_color ?? 'inherit' }"
                             class="rubric_title" v-if="items()[1].rubric_title">
                            <span>{{items()[1].rubric_title[$i18n.locale] ?? ''}}</span>
                            <i :style="{ borderColor: items()[1].rubric_color ?? 'inherit' }"></i>
                        </div>
                        <div class="title">{{items()[1].title[$i18n.locale] ?? ''}}</div>
                        <div class="desc">{{items()[1].desc[$i18n.locale] ?? ''}}</div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="app-block-text-column-inner">
                    <div class="item" v-for="item in items()" :key="item">
                        <div :style="{ color: item.rubric_color ?? 'inherit' }"
                             class="rubric_title" v-if="item.rubric_title">
                            <span>{{item.rubric_title[$i18n.locale] ?? ''}}</span>
                            <i :style="{ borderColor: item.rubric_color ?? 'inherit' }"></i>
                        </div>
                        <div class="title">{{item.title[$i18n.locale] ?? ''}}</div>
                        <div class="desc">{{item.desc[$i18n.locale] ?? ''}}</div>
                    </div>
                </div>
                <div class="bg_item" v-if="bg_item()">
                    <div class="img-part">
                        <img :src="bg_item().img" class="img-fluid" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="sass">
.app-block-text-column
    padding: 120px 0
    .app-block-text-column-inner
        display: flex
        justify-content: center
        > :nth-child(odd)
            text-align: right
            .desc
                margin-left: auto
                margin-right: 0
            .item
                border-right: 1px solid #D6D6D6
                padding-right: 108px
        > :nth-child(even)
            .item
                padding-left: 108px
    .item
        padding-top: 38px
        padding-bottom: 38px
        &:first-child
            border-right: 1px solid #D6D6D6
            padding-right: 108px
            text-align: right
            .desc
                margin-left: auto
                margin-right: 0
        &:last-child
            padding-left: 108px
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

@media (max-width: 768px)
    .app-block-text-column
        padding: 80px 0
        .title
            font-size: 20px
            text-align: left
        .desc
            text-align: left
        .item
            &:first-child
                border-right: none
                padding: 0
                text-align: left
            &:last-child
                padding: 0

</style>
