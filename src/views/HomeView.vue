<template>
    <div class="page-home">
        <home-banner/>
        <home-our-apps/>
        <block-subscribe/>
        <home-company/>
        <home-contacts/>
    </div>
</template>

<script>

import HomeContacts from "@/components/blocks/HomeContacts"
import BlockSubscribe from "@/components/BlockSubscribe"
import HomeCompany from "@/components/blocks/HomeCompany"
import HomeOurApps from "@/components/blocks/HomeOurApps"
import HomeBanner from "@/components/blocks/HomeBanner"

export default {
    name: 'HomeView',
    components: {
        HomeBanner,
        HomeOurApps,
        HomeCompany,
        BlockSubscribe,
        HomeContacts
    }
}
</script>
