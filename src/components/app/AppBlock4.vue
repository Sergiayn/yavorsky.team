<script>
export default {
    name: "AppBlock4",
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
            return [this.block.first ?? {},this.block.middle ?? {},this.block.last ?? {}]
        }
    }
}
</script>

<template>
    <div class="app-block-4">
        <div class="container">
            <div class="items" v-for="item in items()" :key="item">
                <div class="text-part" v-if="item.type === 'text'">
                    <div class="title">{{item.title[$i18n.locale] ?? ''}}</div>
                    <div class="desc">{{item.desc[$i18n.locale] ?? ''}}</div>
                </div>
                <div class="img-part" v-if="item.type === 'img'">
                    <img :src="item.img" class="img-fluid" alt="">
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped lang="sass">
.app-block-4
    .text-part
        text-align: center
        .title
            font-size: 26px
            font-weight: 600
            margin: 0 auto 12px
            max-width: 550px

        .desc
            font-size: 16px
            max-width: 515px
            margin: auto
    .img-part
        padding-bottom: 20px
        text-align: center

</style>
