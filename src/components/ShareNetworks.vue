<script>
import {ref} from "vue";

export default {
    name: "ShareNetworks",
    props: {
        name: {
            type: String,
            default() {
                return ''
            }
        },
        url: {
            type: String,
            default() {
                return ''
            }
        }
    },
    data() {
        const list = ref([
            {id: 1, key: 'fb', name: 'Facebook',    link: 'https://www.facebook.com/sharer/sharer.php?u=' + this.url + '&amp;src=sdkpreparse'},
            {id: 2, key: 'x',  name: 'X',           link: 'https://twitter.com/intent/tweet?url=' + this.url + '&text=' + this.name},
            // {id: 3, key: 'tg', name: 'Telegram',    link: 'https://telegram.me/share/url?url=' + this.url + '&text=' + this.name},
        ])

        return {list}
    }
}
</script>

<template>
    <div class="share-networks">
        <ul>
            <li v-for="item in list" :key="item.id" :class="item.key + '-share-button'">
                <a target="_blank" :href="item.link" :title="item.name"></a>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="sass">
.share-networks
    ul
        display: flex
        list-style: none
        justify-content: center
        margin: 0
        padding: 0
        li
            padding: 0 12px
    a
        background-repeat: no-repeat
        background-position: center center
        background-size: cover
        display: block
        height: 40px
        width: 40px
    .fb-share-button a
        background-image: url("@/assets/img/social-network/facebook-active.svg")
    .x-share-button a
        background-image: url("@/assets/img/social-network/x-active.svg")
    //.tx-share-button a
    //    background-image: url("@/assets/img/social-network/facebook-active.svg")
</style>
